import Joi from "joi";
import { Question } from "../../../models/index.js";

export default async (req, res) => {
    
    try {

        const schema = Joi.object({
            title: Joi.string().min(1).required(),
            options: Joi.array().items(Joi.string()),
            answerType: Joi.string().valid("TEXT", "TIME", "RANGE").required(),
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

        const newQuestion = await Question.create(req.body);

        return res.status(200).json({ question: newQuestion, message: "Question Created Successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};