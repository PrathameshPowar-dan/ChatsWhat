import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { UploadCloudinary } from "../utils/Cloudinary.js";
import { v2 as cloudinary } from 'cloudinary';

const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
}

export const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const requiredFields = { email, username, password };

    for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        if (typeof fieldValue !== 'string' || !fieldValue.trim()) {
            throw new ApiError(400, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        }
    }

    if (password.length < 5) {
        throw new ApiError(400, "Password must be atleast 6 letters")
    }

    const ExistingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (ExistingUser) {
        throw new ApiError(409, "User Already Exists")
    }

    const ProfileLocalPath = req.file?.path;

    if (!ProfileLocalPath) {
        throw new ApiError(400, "Profile pic is Required")
    }

    const ProfilePic = await UploadCloudinary(ProfileLocalPath, username, email)

    const user = await User.create({
        email,
        password,
        username: username.toLowerCase(),
        ProfilePic: ProfilePic.url,
        ProfilePicId: ProfilePic.public_id
    });

    const Token = user.generateToken();

    const CreatedUser = await User.findById(user._id).select("-password")

    if (!CreatedUser) {
        throw new ApiError(500, "Something went wrong creating User")
    }

    return res
        .status(200)
        .cookie("Token", Token, options)
        .json(
            new ApiResponse(200, CreatedUser, "User Registered Successfully")
        )

})

export const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        throw new ApiError(400, "Email and Password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Credentials are INVALID");
    }

    const Token = user.generateToken();

    const LoggedIN = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .cookie("Token", Token, options)
        .json(new ApiResponse(200, LoggedIN, "Logged in Successfully"));
});

export const LogoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("Token", options)
        .json(new ApiResponse(200, {}, "LOGGED OUT SUCCESSFULLY"));
});

export const UpdateProfile = asyncHandler(async (req, res) => {
    const ProfileLocalPath = req.file?.path

    if (!ProfileLocalPath) {
        throw new ApiError(400, "Profile file is MISSING!")
    }

    const avatar = await UploadCloudinary(ProfileLocalPath, req.user.username, req.user.email)

    if (!avatar.url) {
        throw new ApiError(400, "Error While Uploading on Avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                ProfilePic: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "Avatar Updated Successfully"))
})

export const checkAuth = asyncHandler(async (req, res) => {
    try {
        data = req.user;
        res.status(200).json(new ApiResponse(200, data, "User is Authenticated"));
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        throw new ApiError(500, "Internal Server Error");
    }
})

export const UpdateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username?.trim() && !email?.trim()) {
    throw new ApiError(400, "At least one field (username or email) is required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isUsernameChanged = username && username !== user.username;
  const isEmailChanged = email && email !== user.email;

  // Validate and check conflicts before updating
  if (isUsernameChanged) {
    const existingUsername = await User.findOne({
      username: username.toLowerCase(),
      _id: { $ne: req.user._id }
    });
    if (existingUsername) {
      throw new ApiError(409, "Username is already in use");
    }
  }

  if (isEmailChanged) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: req.user._id }
    });
    if (existingEmail) {
      throw new ApiError(409, "Email is already in use");
    }
  }

  // If either changed, rename cloudinary image
  if ((isUsernameChanged || isEmailChanged) && user.ProfilePicId) {
    const safeUsername = username || user.username;
    const safeEmail = (email || user.email).replace(/[@.]/g, "_");
    const newPublicId = `user/${safeUsername}-${safeEmail}`;

    try {
      await cloudinary.uploader.rename(user.ProfilePicId, newPublicId);
      user.ProfilePicId = newPublicId;
      user.ProfilePic = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${newPublicId}`;
    } catch (error) {
      console.error("Cloudinary rename failed:", error.message);
      throw new ApiError(500, "Failed to rename Cloudinary image");
    }
  }

  // Update fields
  if (isUsernameChanged) user.username = username.toLowerCase();
  if (isEmailChanged) user.email = email;

  await user.save();

  const updatedUser = await User.findById(user._id).select("-password");

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Account details updated successfully")
  );
});


