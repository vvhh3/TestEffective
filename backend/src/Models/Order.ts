import { DataTypes } from "sequelize"
import { sequelize } from "../db.ts"

export enum OrderStatus {
    created = "created",
    paid = "paid",
    shipped = "shipped"
}

export const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(OrderStatus.created, OrderStatus.paid, OrderStatus.shipped),
        allowNull: false,
        defaultValue: OrderStatus.created
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
})
