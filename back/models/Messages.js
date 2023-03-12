import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    chatId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
}, {
    timestamps: true,
})

export default  mongoose.model('Messages', MessagesSchema)