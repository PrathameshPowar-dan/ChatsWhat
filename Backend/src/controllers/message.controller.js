import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const userSidebar = asyncHandler(async (req, res) => {
    try {
        const LoggedUser = req.user._id;
        const OtherUsers = await User.find(
            { _id: { $ne: LoggedUser } }
        ).select("-password");

        return res.status(200).json(
            new ApiResponse(200, OtherUsers, "Sidebar users fetched")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to fetch sidebar users");
    }
});

export const GetMessage = asyncHandler(async(req,res)=>{
    
})