import mongoose, { Schema, model } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        Unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        Unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "PASSWORD IS REQUIRED"]
    },
    ProfilePic: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const User = model("User", userSchema)