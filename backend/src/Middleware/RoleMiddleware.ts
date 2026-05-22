import type { Response, NextFunction } from "express"
import { User, UserRole } from "../Models/User.ts"
import { AuthRequest } from "./AuthMidleware.ts"

export const RoleMiddleware = (roles: UserRole[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {

        try {
            const user = await User.findByPk(req.id)

            if (!user) {
                return res.status(400).json({ message: "user not found" })
            }
            if (!roles.includes(user?.dataValues.role)) {
                return res.status(400).json({ message: "no access" })
            }

            next()
        } catch (e) {
            return res.status(500).json({ message: "server error" })
        }
    }
}
