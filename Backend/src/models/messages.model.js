import mongoose, { Schema, model } from "mongoose"

const messageSchema = new Schema(
    {
        sendID:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        recieverID:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        text:{
            type: String,
            required: true
        },
        images:{
            type: String
        }
    }
    ,
    {
        timestamps: true
    }
)

export const Messages = model("Messages", messageSchema)