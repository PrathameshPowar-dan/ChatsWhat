import mongoose, { Schema, model } from "mongoose"

const messageSchema = new Schema(
    {
        senderID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String
        },
        image: {
            type: String
        }
    }
    ,
    {
        timestamps: true
    }
)

export const Message = model("Message", messageSchema)