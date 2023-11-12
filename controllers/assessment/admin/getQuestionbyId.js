import mongoose from "mongoose";
import { Question } from "../../../models/index.js";

export default async (req, res) => {
    try {

        if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
            return res.status(400).json({ code: "400", errors: ["Invalid ID"] });
        }

        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ code: "404", error: "Question with given ID not found" });
        }

        res.status(200).json({ question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}