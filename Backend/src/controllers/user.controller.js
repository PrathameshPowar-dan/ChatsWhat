import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import {UploadCloudinary} from "../utils/Cloudinary.js";

const options = {
    httpOnly: true,
    secure: true
}

export const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body);

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

    const ProfileLocalPath = req.files?.ProfilePic[0]?.path;

    if (!ProfileLocalPath) {
        throw new ApiError(400, "Profile pic is Required")
    }

    const ProfilePic = await UploadCloudinary(ProfileLocalPath, username , email)

    const user = await User.create({
        email,
        password,
        username: username.toLowerCase(),
        ProfilePic: ProfilePic.url
    });

    const CreatedUser = await User.findById(user._id).select("-password")

    if (!CreatedUser) {
        throw new ApiError(500, "Something went wrong creating User")
    }

    return res.status(201).json(
        new ApiResponse(201, CreatedUser, "User Registered Successfully")
    )

})

export const LoginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!password || !(username || email)) {
        throw new ApiError(400, "Username or Email and Password are required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

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

// export const UpdateProfile = asyncHandler(async (req, res) => {
//     try {
//         const { ProfilePic } = req.body
//         const user = req.user._id

//         if (!ProfilePic) {
//             throw new ApiError(400, "Profile is Required")
//         }

//         const Upload = await cloudinary.uploader.upload(ProfilePic)

//         const UpdatedUser = await User.findByIdAndUpdate(user._id, { ProfilePic: uploadResponse.secure_url }, { new: true })

//         return res.status(201).json(
//             new ApiResponse(201, UpdatedUser, "Profile Updated Successfully")
//         )
//     } catch (error) {
//         console.log("Error while Uploading the profile", error)
//     }
// })