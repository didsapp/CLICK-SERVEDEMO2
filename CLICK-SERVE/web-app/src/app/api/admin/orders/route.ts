import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/db"

export async function PATCH(request: Request) {
    const session = await auth()

    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
        return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 })
    }

    const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status }
    })

    return NextResponse.json({ success: true, order: updatedOrder })
}
