"use client"

import React from "react"
import { FileText, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ReportsTabProps {
    users: any[]
    orders: any[]
    transactions: any[]
    stocks: any[]
}

export default function ReportsTab({ users, orders, transactions, stocks }: ReportsTabProps) {
    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(2)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(1)}K`
        return `₦${amt.toLocaleString()}`
    }

    const deliveredRevenue = orders.filter((o: any) => o.status === "DELIVERED").reduce((s: number, o: any) => s + Number(o.price), 0)
    const totalOrderValue = orders.reduce((s: number, o: any) => s + Number(o.price), 0)
    const totalTransactionVolume = transactions.reduce((s: number, t: any) => s + Number(t.amount), 0)
    const totalStockValue = stocks.reduce((s: number, st: any) => s + (Number(st.quantity) * Number(st.price)), 0)

    const reports = [
        {
            title: "Revenue Report",
            icon: DollarSign,
            color: "bg-emerald-50",
            iconColor: "text-emerald-600",
            metrics: [
                { label: "Delivered Revenue", value: formatNaira(deliveredRevenue) },
                { label: "Total Order Value", value: formatNaira(totalOrderValue) },
                { label: "Avg. Order Value", value: orders.length > 0 ? formatNaira(totalOrderValue / orders.length) : "₦0" },
                { label: "Transaction Volume", value: formatNaira(totalTransactionVolume) },
            ]
        },
        {
            title: "Order Report",
            icon: ShoppingCart,
            color: "bg-blue-50",
            iconColor: "text-blue-600",
            metrics: [
                { label: "Total Orders", value: orders.length.toString() },
                { label: "Pending", value: orders.filter((o: any) => o.status === "PENDING").length.toString() },
                { label: "Delivered", value: orders.filter((o: any) => o.status === "DELIVERED").length.toString() },
                { label: "Cancelled", value: orders.filter((o: any) => o.status === "CANCELLED").length.toString() },
            ]
        },
        {
            title: "User Report",
            icon: Users,
            color: "bg-purple-50",
            iconColor: "text-purple-600",
            metrics: [
                { label: "Total Users", value: users.length.toString() },
                { label: "Buyers", value: users.filter((u: any) => u.role === "BUYER").length.toString() },
                { label: "Suppliers", value: users.filter((u: any) => u.role === "SUPPLIER").length.toString() },
                { label: "Admins", value: users.filter((u: any) => u.role === "ADMIN").length.toString() },
            ]
        },
        {
            title: "Inventory Report",
            icon: TrendingUp,
            color: "bg-amber-50",
            iconColor: "text-amber-600",
            metrics: [
                { label: "Stock Listings", value: stocks.length.toString() },
                { label: "Total Volume", value: `${stocks.reduce((s: number, st: any) => s + Number(st.quantity), 0).toLocaleString()}L` },
                { label: "Total Value", value: formatNaira(totalStockValue) },
                { label: "Unique Products", value: new Set(stocks.map((s: any) => s.product)).size.toString() },
            ]
        }
    ]

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    Platform <span className="text-primary italic">Reports</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Consolidated summaries of all platform data</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {reports.map(report => (
                    <Card key={report.title} className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden hover:shadow-md transition-all">
                        <CardHeader className="px-8 pt-8 pb-4 flex flex-row items-center gap-4">
                            <div className={cn("p-3 rounded-2xl", report.color)}>
                                <report.icon className={cn("h-6 w-6", report.iconColor)} />
                            </div>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">{report.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="grid grid-cols-2 gap-4">
                                {report.metrics.map(metric => (
                                    <div key={metric.label} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-50">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{metric.label}</p>
                                        <p className="text-xl font-black text-gray-800 mt-1">{metric.value}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
