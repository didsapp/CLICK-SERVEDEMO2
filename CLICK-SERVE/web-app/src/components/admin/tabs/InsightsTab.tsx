"use client"

import React from "react"
import { TrendingUp, Users, ShoppingCart, DollarSign, Activity, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InsightsTabProps {
    users: any[]
    orders: any[]
    transactions: any[]
}

export default function InsightsTab({ users, orders, transactions }: InsightsTabProps) {
    const totalRevenue = orders
        .filter((o: any) => o.status === "DELIVERED")
        .reduce((sum: number, o: any) => sum + Number(o.price), 0)

    const totalOrders = orders.length
    const pendingOrders = orders.filter((o: any) => o.status === "PENDING").length
    const deliveredOrders = orders.filter((o: any) => o.status === "DELIVERED").length
    const buyers = users.filter((u: any) => u.role === "BUYER").length
    const suppliers = users.filter((u: any) => u.role === "SUPPLIER").length

    const totalTransactionVolume = transactions.reduce((sum: number, t: any) => sum + Number(t.amount), 0)

    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(2)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(1)}K`
        return `₦${amt.toLocaleString()}`
    }

    const insights = [
        { label: "Total Revenue", value: formatNaira(totalRevenue), icon: DollarSign, color: "bg-emerald-50", iconColor: "text-emerald-600" },
        { label: "Total Orders", value: totalOrders.toString(), icon: ShoppingCart, color: "bg-blue-50", iconColor: "text-blue-600" },
        { label: "Active Buyers", value: buyers.toString(), icon: Users, color: "bg-purple-50", iconColor: "text-purple-600" },
        { label: "Active Suppliers", value: suppliers.toString(), icon: Activity, color: "bg-amber-50", iconColor: "text-amber-600" },
        { label: "Transaction Volume", value: formatNaira(totalTransactionVolume), icon: BarChart3, color: "bg-indigo-50", iconColor: "text-indigo-600" },
        { label: "Delivery Rate", value: totalOrders > 0 ? `${((deliveredOrders / totalOrders) * 100).toFixed(0)}%` : "0%", icon: TrendingUp, color: "bg-teal-50", iconColor: "text-teal-600" },
    ]

    // Monthly order breakdown
    const monthlyOrders: Record<string, number> = {}
    orders.forEach((o: any) => {
        const d = new Date(o.createdAt)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        monthlyOrders[key] = (monthlyOrders[key] || 0) + 1
    })
    const months = Object.entries(monthlyOrders).sort((a, b) => a[0].localeCompare(b[0])).slice(-6)
    const maxVal = Math.max(...months.map(m => m[1]), 1)

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    Platform <span className="text-primary italic">Insights</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Real-time analytics overview</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.map((item) => (
                    <Card key={item.label} className="bg-white border-none shadow-sm hover:shadow-md transition-all rounded-[20px]">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-3 rounded-2xl", item.color)}>
                                    <item.icon className={cn("h-6 w-6", item.iconColor)} />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight">{item.value}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Order Status Breakdown */}
            <Card className="bg-white border-none shadow-sm rounded-[32px]">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Order Status Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map(status => {
                            const count = orders.filter((o: any) => o.status === status).length
                            const colors: Record<string, string> = {
                                PENDING: "bg-amber-500/10 text-amber-600",
                                PROCESSING: "bg-blue-500/10 text-blue-600",
                                SHIPPED: "bg-indigo-500/10 text-indigo-600",
                                DELIVERED: "bg-emerald-500/10 text-emerald-600",
                                CANCELLED: "bg-red-500/10 text-red-600",
                            }
                            return (
                                <div key={status} className={cn("p-4 rounded-2xl text-center", colors[status])}>
                                    <p className="text-3xl font-black">{count}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1">{status}</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Monthly Orders Chart */}
            <Card className="bg-white border-none shadow-sm rounded-[32px]">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Monthly Order Volume</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="flex items-end gap-4 h-[200px]">
                        {months.map(([month, count]) => (
                            <div key={month} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs font-black text-gray-800">{count}</span>
                                <div
                                    className="w-full bg-primary/80 rounded-t-xl transition-all duration-500 hover:bg-primary"
                                    style={{ height: `${(count / maxVal) * 100}%`, minHeight: "8px" }}
                                />
                                <span className="text-[9px] font-bold text-gray-400 uppercase">{month.split("-")[1]}/{month.split("-")[0].slice(2)}</span>
                            </div>
                        ))}
                        {months.length === 0 && (
                            <p className="text-center text-xs font-bold text-gray-300 py-10 w-full uppercase">No order data available</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
