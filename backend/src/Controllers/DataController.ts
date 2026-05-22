import type { Response } from "express"
import { Product } from "../Models/Product.ts"
import { Order } from "../Models/Order.ts"
import { User, UserRole } from "../Models/User.ts"
import type { AuthRequest } from "../Middleware/AuthMidleware.ts"

export const getProducts = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findByPk(req.id)

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        if (user.dataValues.role === UserRole.user) {
            return res.json({ products: [] })
        }

        const products = await Product.findAll({
            order: [["id", "ASC"]]
        })

        return res.json({ products })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "server error" })
    }
}

export const getOrders = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findByPk(req.id)

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        if (user.dataValues.role === UserRole.user) {
            return res.json({ orders: [] })
        }

        const orders = await Order.findAll({
            order: [["id", "ASC"]]
        })

        return res.json({ orders })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "server error" })
    }
}

export const getUsers = async (_req: AuthRequest, res: Response) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "email", "name", "lastName", "role", "isActive"],
            order: [["id", "ASC"]]
        })

        return res.json({ users })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "server error" })
    }
}
