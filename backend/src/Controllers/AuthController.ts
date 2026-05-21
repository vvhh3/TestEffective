import type { Request, Response } from "express"
import { User, UserRole } from "../Models/User.ts"
import { GenerateJWT } from "../utils/GenerateJWT.ts"
import bcrypt from "bcrypt"

import type { AuthRequest } from "../Middleware/AuthMidleware.ts"

export const registry = async (req: Request, res: Response) => {
    try {
        const { login, name, lastName, password } = req.body

        if (!name || !lastName || !login || !password) {
            return res.status(400).json({
                message: "data is faild"
            })
        }

        const candidate = await User.findOne({
            where: { login }
        })

        if (candidate !== null) {
            return res.status(400).json({
                message: "user exists already"
            })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = await User.create({
            login: login,
            role: UserRole.user,
            name: name,
            lastName: lastName,
            password: hashPass
        })

        const token = GenerateJWT(user.dataValues.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        return res.json({
            user: {
                id: user.dataValues.id,
                login: user.dataValues.login,
                name: user.dataValues.name,
                lastName: user.dataValues.lastName,
                role: user.dataValues.role
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const { login, password } = req.body

        if (!login || !password) {
            return res.status(400).json({
                message: "data is faild"
            })
        }

        const user = await User.findOne({
            where: { login }
        })

        if (!user) {
            return res.status(400).json({
                message: "server error"
            })
        }
        const pas = await bcrypt.compare(
            password,
            user.dataValues.password
        )

        if (!pas) {
            return res.status(400).json({
                message: "wrong password"
            })
        }

        const token = GenerateJWT(user.dataValues.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // можно с http
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        return res.json({
            user: {
                id: user.dataValues.id,
                login: user.dataValues.login,
                name: user.dataValues.name,
                lastName: user.dataValues.lastName,
                role: user.dataValues.role
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const getMe = async (req: AuthRequest, res: Response) => {
    try {

        const user = await User.findByPk(req.id)
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }
        return res.json({
            user: {
                id: user.dataValues.id,
                login: user.dataValues.login,
                name: user.dataValues.name,
                lastName: user.dataValues.lastName,
                role: user.dataValues.role
            }
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        return res.json({
            message: "logout successful"
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}