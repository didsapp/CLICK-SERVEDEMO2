import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

async function test() {
    // PrismaBetterSqlite3 is the factory name in @prisma/adapter-better-sqlite3
    const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' })
    const prisma = new PrismaClient({ adapter })

    try {
        await prisma.$connect()
        console.log("Connected successfully")
        const users = await prisma.user.findMany()
        console.log("Users count:", users.length)
    } catch (e) {
        console.error("Connection failed:", e)
    } finally {
        await prisma.$disconnect()
    }
}

test()
