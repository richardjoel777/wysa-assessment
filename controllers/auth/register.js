import Joi from "joi";
import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";

export default async (req, res) => {

    try {

        const schema = Joi.object({
            username: Joi.string().min(1).required(),
            password: Joi.string().alphanum().min(8).required().regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ code: "400", errors: error.details.map((err) => err.message) });
        }

        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            await User.create({ username, password: hashedPassword });
            res.status(200).json({ message: "User Created Successfully" });
        }
        catch (error) {
            res.status(400).json({ code: "400", message: "Username should be unique" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ code: "500", message: "Internal Server Error" });
    }
}