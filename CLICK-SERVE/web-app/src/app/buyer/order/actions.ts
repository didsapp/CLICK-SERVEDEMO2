"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

interface PlaceOrderInput {
    supplierId: string
    product: string
    quantity: number
    pricePerUnit: number
    location: string
    distance: number
}

export async function placeOrder(input: PlaceOrderInput) {
    const session = await auth()

    if (!session?.user?.email) {
        return { error: "You must be logged in to place an order." }
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { transactions: true },
    })

    if (!user) {
        return { error: "User not found." }
    }

    // Calculate costs
    const transportRate = 70
    const dieselCost = input.pricePerUnit * input.quantity
    const transportCost = input.distance * transportRate
    const platformFee = (dieselCost + transportCost) * 0.02
    const totalCost = dieselCost + transportCost + platformFee

    // Check credit balance
    const creditBalance = user.transactions.reduce((balance, t) => {
        if (t.type === "CREDIT") return balance + Number(t.amount)
        if (t.type === "DEBIT") return balance - Number(t.amount)
        return balance
    }, 0)

    if (totalCost > creditBalance) {
        return { error: "Insufficient credit balance." }
    }

    // Create Order
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            supplierId: input.supplierId,
            product: input.product,
            quantity: input.quantity,
            price: totalCost,
            status: "PENDING",
            location: input.location,
        },
    })

    // Create debit transaction for buyer
    await prisma.transaction.create({
        data: {
            userId: user.id,
            amount: totalCost,
            type: "DEBIT",
            category: "ORDER",
            status: "COMPLETED",
        },
    })

    // Update supplier stock
    const stock = await prisma.stock.findFirst({
        where: {
            userId: input.supplierId,
            product: input.product,
        },
    })

    if (stock) {
        await prisma.stock.update({
            where: { id: stock.id },
            data: { quantity: Math.max(0, stock.quantity - input.quantity) },
        })
    }

    revalidatePath("/buyer")
    revalidatePath("/supplier")

    return {
        success: true,
        orderId: order.id,
        total: totalCost,
    }
}

export async function getAvailableSuppliers() {
    const stocks = await prisma.stock.findMany({
        where: { quantity: { gt: 0 } },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: { price: "asc" },
    })

    return stocks.map(s => ({
        supplierId: s.user.id,
        supplierName: s.user.name || "Unknown",
        product: s.product,
        price: Number(s.price),
        availableQty: s.quantity,
        unit: s.unit,
    }))
}
