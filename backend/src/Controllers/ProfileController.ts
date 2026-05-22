
import { Response } from "express"
import { AuthRequest } from "../Middleware/AuthMidleware.ts"
import { User } from "../Models/User.ts"


export const UpdateDataUser = async (req: AuthRequest, res: Response) => {
    try {
        const { name, lastName } = req.body

        if (!name || !lastName) {
            return res.status(400).json({
                message: "data is failid"
            })
        }
        const user = await User.findByPk(req.id)

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        await user.update({
            name: name,
            lastName: lastName
        })

        return res.json({
            message: "success"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}