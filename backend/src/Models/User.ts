import { sequelize } from "../db.ts"
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
    email:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    role: {
        type: DataTypes.ENUM(UserRole.user, UserRole.manager, UserRole.admin),
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
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})
