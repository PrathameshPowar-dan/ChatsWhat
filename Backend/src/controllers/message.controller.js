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
                { senderID: me, receiverID: UserToChat },
                { senderID: UserToChat, receiverID: me }
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
        const { text } = req.body;
        const { id: receiverID } = req.params;
        const senderID = req.user._id;

        console.log("Sender:", senderID, "Receiver:", receiverID, "Text:", text);

        let ImageURL;

        if (req.file) {
            const uploadRes = await UploadMessageAttachment(
                req.file.path,
                senderID,
                receiverID
            );
            if (!uploadRes?.url) {
                throw new ApiError(400, "Image upload failed");
            }
            ImageURL = uploadRes.url;
        }

        const newMessage = await Message.create({
            senderID,
            receiverID,
            text,
            image: ImageURL
        });

        await newMessage.save()

        return res.status(201).json(new ApiResponse(201, newMessage, "Message sent"));
    } catch (error) {
        console.error("Message send failed:", error);
        throw new ApiError(500, "Failed Loading Messages");
    }
});
