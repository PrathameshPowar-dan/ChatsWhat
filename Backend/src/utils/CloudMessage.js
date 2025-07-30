import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises";
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a message attachment to Cloudinary with a unique name.
 * Ensures old files are preserved and not overwritten.
 * @param {string} localFilePath - Path to the local temp file
 * @param {string} senderID - Sender's ID or username
 * @param {string} receiverID - Receiver's ID or username
 * @param {string} folder - Optional folder name in Cloudinary (default: "messages")
 * @returns {object|null} Cloudinary result or null on failure
 */
const UploadMessageAttachment = async (localFilePath, senderID, receiverID, folder = "messages") => {
    try {
        if (!localFilePath) return null;

        // Sanitize IDs
        const safeSender = String(senderID).replace(/[^a-zA-Z0-9_-]/g, "_");
        const safeReceiver = String(receiverID).replace(/[^a-zA-Z0-9_-]/g, "_");

        // Unique file name: sender-receiver-timestamp.ext
        const timestamp = Date.now();
        const customFileName = `${safeSender}-${safeReceiver}-${timestamp}`;

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            public_id: `${folder}/${customFileName}`,
            overwrite: false, // ensures older files are NOT replaced
            invalidate: false // not needed since no overwrite
        });

        await fs.unlink(localFilePath); // delete temp file

        return uploadResult;

    } catch (error) {
        console.error("Upload Error:", error.message);

        try {
            await fs.unlink(localFilePath);
            console.log('TEMP FILE DELETED:', localFilePath);
        } catch (unlinkErr) {
            console.error('FILE DELETE FAILED:', unlinkErr.message);
        }

        return null;
    }
};

export { UploadMessageAttachment };
