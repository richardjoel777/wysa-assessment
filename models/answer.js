import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
    },
    submission: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true,
            },
            answers: [
                {
                    type: String,
                    required: true,
                },
            ]
        }
    ]
});

export default mongoose.model("Answer", answerSchema);