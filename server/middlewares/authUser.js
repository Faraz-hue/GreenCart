import jwt from "jsonwebtoken";
import "dotenv/config";

const authUser = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized"
        })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.email) {
            req.body.userId = tokenDecode.id
        } else {
            res.json({
                success: false, message: "Not Authorized"
            })
        }
    } catch (error) {
        res.json({
            success: false, message: error.message
        })
    }
}

export default authUser