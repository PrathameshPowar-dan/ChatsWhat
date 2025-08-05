import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises";
import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads file to Cloudinary with custom filename (username-email)
 * @param {string} localFilePath - Path of the file on local disk
 * @param {string} username - Username to include in Cloudinary file name
 * @param {string} email - Email to include in Cloudinary file name
 * @param {string} folder - (Optional) Folder name in Cloudinary
 */
const UploadCloudinary = async (localFilePath, username, email, folder = "user") => {
    try {
        if (!localFilePath) return null;

        const safeEmail = email?.replace(/[@.]/g, "_");
        const safeUsername = username;
        const customFileName = `${safeUsername}-${safeEmail}`;

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
            public_id: `${folder}/${customFileName}`,
            use_filename: true,
            unique_filename: false,
            overwrite: true

        });

        await fs.unlink(localFilePath);
        return res;

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

export { UploadCloudinary };
