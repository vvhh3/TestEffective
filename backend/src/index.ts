import { sequelize } from "./db.ts";
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import {registry, login,getMe,logout} from "./Controllers/AuthController.ts"
import { authCheck } from "./Middleware/AuthMidleware.ts"

dotenv.config()


const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.post("/auth/register", registry)
app.post("/auth/login", login)
app.post("/auth/logout", authCheck, logout) 
app.get("/auth/me", authCheck, getMe)

async function start () {
    try{
        await sequelize.authenticate()

        await sequelize.sync()

        app.listen(5000,() => {
            console.log("server started on 5000 port")
        })
    }catch(e){
        console.log(e)
    }
}

start()
