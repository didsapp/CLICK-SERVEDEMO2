import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/db"

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { amount, method, bank } = await req.json()

        const transaction = await prisma.transaction.create({
            data: {
                userId: (session.user as any).id,
                amount: parseFloat(amount),
                type: "DEPOSIT",
                category: method,
                status: method === "CARD" ? "COMPLETED" : "PENDING",
            }
        })

        return NextResponse.json(transaction)
    } catch (error) {
        console.error("Wallet fund error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
