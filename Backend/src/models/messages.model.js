import mongoose, { Schema, model } from "mongoose"

const messageSchema = new Schema(
    {
        sendID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recieverID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String
        },
        images: {
            type: String
        }
    }
    ,
    {
        timestamps: true
    }
)

export const Messages = model("Messages", messageSchema)