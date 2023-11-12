import Joi from "joi";
import { Question } from "../../../models/index.js";
import mongoose from "mongoose";

export default async (req, res) => {
    
    try {

        const schema = Joi.object({
            title: Joi.string().min(1),
            options: Joi.array().items(Joi.string()),
            answerType: Joi.string().valid("TEXT", "TIME", "RANGE"),
            multiSelect: Joi.boolean(),
            range: Joi.object({
                min: Joi.number().required(),
                max: Joi.number().required(),
                unit: Joi.string().required(),
            }),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ code: "400", errors: error.details.map((err) => err.message) });
        }

        if (req.body.answerType === "RANGE" && !req.body.range) {
            return res.status(400).json({ code: "400", errors: ["Range is required for RANGE type questions"] });
        }

        if(req.body.answerType !== "RANGE" && req.body.range) {
            return res.status(400).json({ code: "400", errors: ["Range is not allowed for this answer type"] });
        }

        if(req.body.answerType === "RANGE" && req.body.range.min > req.body.range.max) {
            return res.status(400).json({ code: "400", errors: ["Minimum value should be less than maximum value"] });
        }

        if (req.body.answerType === "TEXT" && !req.body.options) {
            return res.status(400).json({ code: "400", errors: ["Options are required for TEXT type questions"] });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ code: "400", errors: ["Invalid ID"] });
        }
        
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ code: "404", error: "Question with given ID not found" });
        }

        await Question.findByIdAndUpdate(req.params.id, req.body);

        const updatedQuestion = await Question.findById(req.params.id);

        return res.status(200).json({ question: updatedQuestion, message: "Question Updated Successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};