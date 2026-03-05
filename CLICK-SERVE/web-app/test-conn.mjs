import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Testing connection...")
    try {
        const users = await prisma.user.findMany()
        console.log("Connection successful! User count:", users.length)
    } catch (error) {
        console.error("Connection failed!")
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
