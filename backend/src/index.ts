import { sequelize } from "./db.ts";
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

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
