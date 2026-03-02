import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/db"

export async function GET() {
    const session = await auth()

    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [users, orders, stocks, transactions] = await Promise.all([
        prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                _count: { select: { orders: true, supplierOrders: true, stocks: true } }
            }
        }),
        prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
                supplier: { select: { name: true, email: true } }
            }
        }),
        prisma.stock.findMany({
            include: {
                user: { select: { name: true, email: true } }
            }
        }),
        prisma.transaction.findMany({
            orderBy: { date: "desc" },
            include: {
                user: { select: { name: true, email: true } }
            }
        })
    ])

    return NextResponse.json({ users, orders, stocks, transactions })
}
