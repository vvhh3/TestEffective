import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    "postgres",
    process.env.DB_PASSWORD!,
    {
        host: "localhost",
        port: 5432,
        dialect: "postgres"
    }
)