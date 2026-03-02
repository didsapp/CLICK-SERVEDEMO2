"use client"

import React from "react"
import { ClipboardCheck, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ApprovalTabProps {
    orders: any[]
}

export default function ApprovalTab({ orders }: ApprovalTabProps) {
    const [localOrders, setLocalOrders] = React.useState(orders)
    const [updating, setUpdating] = React.useState<string | null>(null)

    const pendingOrders = localOrders.filter((o: any) => o.status === "PENDING")
    const processingOrders = localOrders.filter((o: any) => o.status === "PROCESSING")

    const handleAction = async (orderId: string, newStatus: string) => {
        setUpdating(orderId)
        try {
            const res = await fetch("/api/admin/orders", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status: newStatus })
            })
            if (res.ok) {
                setLocalOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
            }
        } catch (e) {
            console.error("Failed to update order", e)
        }
        setUpdating(null)
    }

    const formatNaira = (amt: number) => `₦${Number(amt).toLocaleString()}`

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                        Order <span className="text-primary italic">Approval</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Review and approve pending orders</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-xl">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-black text-amber-600">{pendingOrders.length} Pending</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-xl">
                        <ClipboardCheck className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-black text-blue-600">{processingOrders.length} Processing</span>
                    </div>
                </div>
            </div>

            {pendingOrders.length === 0 && (
                <Card className="bg-white border-none shadow-sm rounded-[32px]">
                    <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                        <CheckCircle className="h-16 w-16 text-emerald-200 mb-4" />
                        <p className="text-lg font-black text-gray-800">All Caught Up</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">No orders pending approval</p>
                    </CardContent>
                </Card>
            )}

            {pendingOrders.length > 0 && (
                <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                    <CardHeader className="px-8 pt-8 pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Pending Approval</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">Buyer</th>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Qty</th>
                                        <th className="px-6 py-4">Value</th>
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {pendingOrders.map((o: any) => (
                                        <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-800">{o.user?.name || "Unknown"}</td>
                                            <td className="px-6 py-4 text-primary font-medium">{o.product}</td>
                                            <td className="px-6 py-4">{Number(o.quantity).toLocaleString()}L</td>
                                            <td className="px-6 py-4 font-bold">{formatNaira(o.price)}</td>
                                            <td className="px-6 py-4 text-gray-400">{o.location || "—"}</td>
                                            <td className="px-6 py-4 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <Button
                                                        size="sm"
                                                        className="h-8 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold uppercase"
                                                        onClick={() => handleAction(o.id, "PROCESSING")}
                                                        disabled={updating === o.id}
                                                    >
                                                        <CheckCircle className="h-3 w-3 mr-1" /> Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 border-red-200 text-red-500 hover:bg-red-50 text-[10px] font-bold uppercase"
                                                        onClick={() => handleAction(o.id, "CANCELLED")}
                                                        disabled={updating === o.id}
                                                    >
                                                        <XCircle className="h-3 w-3 mr-1" /> Reject
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
