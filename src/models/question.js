import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    answerType: {
        type: String,
        required: true,
        enum: ["TEXT", "TIME", "RANGE"],
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
    multiSelect: {
        type: Boolean,
        default: false,
    },
    range: {
        min: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
    },
})

export default mongoose.model("Question", questionSchema);