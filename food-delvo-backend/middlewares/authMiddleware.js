import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "token is not present" })
        }

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded_token.id;
        req.body.userId = id;
        next();

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

