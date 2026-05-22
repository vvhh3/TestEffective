import bcrypt from "bcrypt"
import { User, UserRole } from "./Models/User.ts"

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
}
