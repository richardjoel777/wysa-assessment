import { Question } from "../../models/index.js";

export default async (req, res) => {
    try {
        const questions = await Question.find({
            active: true,
        }).select({
            active: 0,
            __v: 0,
        });
        
        res.status(200).send({ questions });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

