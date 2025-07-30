import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/messages.model.js";
import { UploadMessageAttachment } from "../utils/CloudMessage.js";

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

export const GetMessage = asyncHandler(async (req, res) => {
    try {
        const { id: UserToChat } = req.params
        const me = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderID: me, recieverID: UserToChat },
                { senderID: UserToChat, recieverID: me }
            ]
        })

        return res.status(200).json(new ApiResponse(200, messages, "Messages Fetched"))
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Failed to fetch Messages");
    }
});

export const SendMessage = asyncHandler(async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverID } = req.params;
        const senderID = req.user._id;

        let ImageURL;
        if (image) {
            const uploadRes = await UploadMessageAttachment(image, senderID, receiverID);
            ImageURL = uploadRes?.url;
        }

        const newMessage = await Message.create({
            senderID,
            receiverID,
            text,
            image: ImageURL
        });

        return res.status(201).json(new ApiResponse(201, newMessage, "Message sent"));
    } catch (error) {
        throw new ApiError(500, "Failed Loading Messages")
    }
});