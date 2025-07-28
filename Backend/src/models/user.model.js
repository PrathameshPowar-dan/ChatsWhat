import mongoose, { Schema, model } from "mongoose"
import bcrpyt from "bcrypt"
import jwt from "jsonwebtoken"

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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrpyt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrpyt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        
    )
}

export const User = model("User", userSchema)