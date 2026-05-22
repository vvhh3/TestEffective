import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    id?: number
}

export const authCheck = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "not auth"
            })
        }

        const decoded = jwt.verify(token, process.env.JWTSecret!) as { id: number }

        req.id = decoded.id

        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({
            message: "invalid token"
        })
    }
}
