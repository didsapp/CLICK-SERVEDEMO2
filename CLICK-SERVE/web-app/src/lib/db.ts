import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const prismaClientSingleton = () => {
    const dbUrl = process.env.DATABASE_URL || 'file:dev.db'
    console.log(`[Prisma] Initializing with URL: ${dbUrl}`)
    try {
        const adapter = new PrismaBetterSqlite3({ url: dbUrl })
        return new PrismaClient({ adapter })
    } catch (error) {
        console.error(`[Prisma] Error initializing adapter:`, error)
        throw error
    }
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma
