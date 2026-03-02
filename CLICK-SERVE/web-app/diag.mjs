import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' })
const prisma = new PrismaClient({ adapter })

async function check() {
    try {
        console.log("Checking Users...")
        const users = await prisma.user.findMany()
        console.log(`Found ${users.length} users`)

        console.log("\nChecking Stocks...")
        const stocks = await prisma.stock.findMany({ include: { user: true } })
        stocks.forEach(s => {
            if (!s.user) console.log(`[ERROR] Stock ${s.id} has no user! userId: ${s.userId}`)
        })

        console.log("\nChecking Orders...")
        const orders = await prisma.order.findMany({ include: { user: true, supplier: true } })
        orders.forEach(o => {
            if (!o.user) console.log(`[ERROR] Order ${o.id} has no buyer! userId: ${o.userId}`)
            if (!o.supplier) console.log(`[WARNING] Order ${o.id} has no supplier! supplierId: ${o.supplierId}`)
        })

        console.log("\nDone.")
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

check()
