import jwt from "jsonwebtoken";

export default (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                code: "401",
                error: "Unauthorized",
            });
        }

        const token = header.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                code: "401",
                error: "Unauthorized",
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
        
    } catch (error) {
        return res.status(401).json({
            code: "401",
            error: "Unauthorized",
        });
    }
}