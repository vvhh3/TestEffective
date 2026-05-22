import bcrypt from "bcrypt"
import { User, UserRole } from "./Models/User.ts"
import { Product } from "./Models/Product.ts"
import { Order, OrderStatus } from "./Models/Order.ts"

export const seedTestData = async () => {
    const testUsers = [
        {
            email: "admin@example.com",
            role: UserRole.admin,
            name: "Admin",
            lastName: "User",
            password: "admin123"
        },
        {
            email: "manager@example.com",
            role: UserRole.manager,
            name: "Manager",
            lastName: "User",
            password: "manager123"
        },
        {
            email: "user@example.com",
            role: UserRole.user,
            name: "Simple",
            lastName: "User",
            password: "user123"
        }
    ]

    for (const testUser of testUsers) {
        const candidate = await User.findOne({
            where: { email: testUser.email }
        })

        if (!candidate) {
            const hashPass = await bcrypt.hash(testUser.password, 10)

            await User.create({
                email: testUser.email,
                role: testUser.role,
                name: testUser.name,
                lastName: testUser.lastName,
                password: hashPass,
                isActive: true
            })
        } else if (candidate.dataValues.isActive === null || candidate.dataValues.isActive === undefined) {
            await candidate.update({
                isActive: true
            })
        }
    }

    const testProducts = [
        {
            name: "Laptop Pro 14",
            description: "Powerful laptop for managers and admins",
            price: 1499.99,
            stock: 12
        },
        {
            name: "Wireless Mouse",
            description: "Comfortable mouse for everyday work",
            price: 49.99,
            stock: 80
        },
        {
            name: "USB-C Dock",
            description: "Docking station with HDMI and Ethernet",
            price: 129.99,
            stock: 25
        }
    ]

    for (const testProduct of testProducts) {
        const candidate = await Product.findOne({
            where: { name: testProduct.name }
        })

        if (!candidate) {
            await Product.create(testProduct)
        }
    }

    const admin = await User.findOne({ where: { email: "admin@example.com" } })
    const manager = await User.findOne({ where: { email: "manager@example.com" } })
    const user = await User.findOne({ where: { email: "user@example.com" } })

    const laptop = await Product.findOne({ where: { name: "Laptop Pro 14" } })
    const mouse = await Product.findOne({ where: { name: "Wireless Mouse" } })
    const dock = await Product.findOne({ where: { name: "USB-C Dock" } })

    const testOrders = [
        {
            user,
            product: laptop,
            quantity: 1,
            status: OrderStatus.paid
        },
        {
            user,
            product: mouse,
            quantity: 2,
            status: OrderStatus.created
        },
        {
            user: manager,
            product: dock,
            quantity: 3,
            status: OrderStatus.shipped
        },
        {
            user: admin,
            product: mouse,
            quantity: 5,
            status: OrderStatus.paid
        }
    ]

    for (const testOrder of testOrders) {
        if (!testOrder.user || !testOrder.product) {
            continue
        }

        const userId = testOrder.user.dataValues.id
        const userEmail = testOrder.user.dataValues.email
        const productName = testOrder.product.dataValues.name
        const price = Number(testOrder.product.dataValues.price)

        const candidate = await Order.findOne({
            where: {
                userId,
                productName,
                quantity: testOrder.quantity,
                status: testOrder.status
            }
        })

        if (!candidate) {
            await Order.create({
                userId,
                userEmail,
                productName,
                quantity: testOrder.quantity,
                status: testOrder.status,
                total: price * testOrder.quantity
            })
        }
    }
}
