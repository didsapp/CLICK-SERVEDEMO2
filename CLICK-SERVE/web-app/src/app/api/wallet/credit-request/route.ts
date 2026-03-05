import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/db"

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { requestedAmount, reason } = await req.json()

        const transaction = await prisma.transaction.create({
            data: {
                userId: (session.user as any).id,
                amount: parseFloat(requestedAmount),
                type: "CREDIT_REQUEST",
                category: "CREDIT_LINE",
                status: "PENDING",
                // We could store the reason in a metadata field if the schema supported it, 
                // but for now, we'll just track the request.
            }
        })

        return NextResponse.json(transaction)
    } catch (error) {
        console.error("Credit request error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
