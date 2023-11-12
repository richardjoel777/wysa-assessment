import Joi from "joi";
import jwt from "jsonwebtoken";
import { Answer } from "../../models/index.js";

export default async (req, res) => {
    try {
        const schema = Joi.object({
            nickName: Joi.string().required(),
            submission: Joi.array().items(
                Joi.object({
                    questionId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                    answers: Joi.array().items(Joi.string().required()),
                })
            ),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ code: "400", errors: error.details.map((err) => err.message) });
        }

        try {
            const submission = await Answer.create(req.body);

            const token = jwt.sign(
                {
                    id: submission._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "30d"
                }
            );

            return res.status(200).json({ score : 75, token });
        }
        catch (error) {
            return res.status(400).json({ code: "400", errors: ["Invalid Question Id"] });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}