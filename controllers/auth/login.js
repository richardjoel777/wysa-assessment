import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/index.js";

export default async (req, res) => {
    
    try {

        const schema = Joi.object({
            username: Joi.string().min(1).required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ code: "400", errors: error.details.map((err) => err.message) });
        }

        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ code: "400", message: "Invalid Username or Password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ code: "400", message: "Invalid Username or Password" });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            
            return res.status(200).json({ token: token });

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