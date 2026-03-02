import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import bcrypt from "bcryptjs"

const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10)

    // Clear existing data
    await prisma.transaction.deleteMany()
    await prisma.order.deleteMany()
    await prisma.stock.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()

    // Create Users
    const admin = await prisma.user.create({
        data: {
            email: "admin@clickserve.com",
            password: await bcrypt.hash("Disown'sit26$", 10),
            name: "Admin User",
            role: "ADMIN",
        },
    })

    const supplier = await prisma.user.create({
        data: {
            email: "supadmin@clickserve.com",
            password: await bcrypt.hash("Sup123", 10),
            name: "Lagos Refineries Ltd (Supadmin)",
            role: "SUPPLIER",
        },
    })

    const buyer = await prisma.user.create({
        data: {
            email: "buyadmin@clickserve.com",
            password: await bcrypt.hash("Buyer123", 10),
            name: "Swift Logistics (Buyadmin)",
            role: "BUYER",
        },
    })

    // Create Stocks for Suppliers (with prices)
    await prisma.stock.createMany({
        data: [
            { userId: supplier.id, product: "Premium Diesel (AGO)", quantity: 50000, unit: "Liters", price: 1250 },
            { userId: supplier.id, product: "ECO Diesel", quantity: 25000, unit: "Liters", price: 1180 },
        ],
    })

    // Create Orders linked to both buyer AND supplier
    const order1 = await prisma.order.create({
        data: {
            userId: buyer.id,
            supplierId: supplier.id,
            product: "Premium Diesel (AGO)",
            quantity: 5000,
            price: 6250000,
            status: "DELIVERED",
            location: "Lagos",
        },
    })

    const order2 = await prisma.order.create({
        data: {
            userId: buyer.id,
            supplierId: supplier.id,
            product: "ECO Diesel",
            quantity: 2000,
            price: 2360000,
            status: "PROCESSING",
            location: "Lagos",
        },
    })

    const order4 = await prisma.order.create({
        data: {
            userId: buyer.id,
            supplierId: supplier.id,
            product: "Premium Diesel (AGO)",
            quantity: 1000,
            price: 1250000,
            status: "PENDING",
            location: "Lagos",
        },
    })

    // Create Transactions for the Buyer
    // Initial wallet top-up
    await prisma.transaction.create({
        data: {
            userId: buyer.id,
            amount: 20000000,
            type: "CREDIT",
            category: "WALLET_TOPUP",
            status: "COMPLETED",
        },
    })

    // Payment for order 1
    await prisma.transaction.create({
        data: {
            userId: buyer.id,
            amount: 6250000,
            type: "DEBIT",
            category: "ORDER",
            status: "COMPLETED",
        },
    })

    // Transactions for Supplier (revenue received)
    await prisma.transaction.create({
        data: {
            userId: supplier.id,
            amount: 6250000,
            type: "CREDIT",
            category: "ORDER",
            status: "COMPLETED",
        },
    })

    console.log("Database seeded successfully!")
    console.log(`  Admin:    admin@clickserve.com / Disown'sit26$`)
    console.log(`  Supplier: supadmin@clickserve.com / Sup123`)
    console.log(`  Buyer:    buyadmin@clickserve.com / Buyer123`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
