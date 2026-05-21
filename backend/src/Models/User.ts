import { sequelize } from "../db"
import { DataTypes } from "sequelize"

export enum UserRole {
    user = "user",
    manager = "manager",
    admin = "admin"
}

export const User = sequelize.define("user",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    login:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM(),
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})