"use client"

import React from "react"
import { Briefcase, TrendingUp, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BusinessTabProps {
    orders: any[]
    users: any[]
}

export default function BusinessTab({ orders, users }: BusinessTabProps) {
    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(2)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(1)}K`
        return `₦${amt.toLocaleString()}`
    }

    const totalRevenue = orders.filter((o: any) => o.status === "DELIVERED").reduce((sum: number, o: any) => sum + Number(o.price), 0)
    const avgOrderValue = orders.length > 0 ? orders.reduce((sum: number, o: any) => sum + Number(o.price), 0) / orders.length : 0

    // Top suppliers by order volume
    const supplierMap: Record<string, { name: string; revenue: number; orders: number }> = {}
    orders.forEach((o: any) => {
        if (o.supplier) {
            const key = o.supplier.email || "unknown"
            if (!supplierMap[key]) supplierMap[key] = { name: o.supplier.name || "Unknown", revenue: 0, orders: 0 }
            supplierMap[key].revenue += Number(o.price)
            supplierMap[key].orders += 1
        }
    })
    const topSuppliers = Object.values(supplierMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5)

    // Top products
    const productMap: Record<string, { qty: number; revenue: number }> = {}
    orders.forEach((o: any) => {
        if (!productMap[o.product]) productMap[o.product] = { qty: 0, revenue: 0 }
        productMap[o.product].qty += Number(o.quantity)
        productMap[o.product].revenue += Number(o.price)
    })
    const topProducts = Object.entries(productMap).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 5)

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    Business <span className="text-primary italic">Intelligence</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Platform-wide business metrics</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: formatNaira(totalRevenue), icon: TrendingUp, color: "bg-emerald-50", iconColor: "text-emerald-600" },
                    { label: "Total Orders", value: orders.length.toString(), icon: ShoppingCart, color: "bg-blue-50", iconColor: "text-blue-600" },
                    { label: "Avg Order Value", value: formatNaira(avgOrderValue), icon: Briefcase, color: "bg-purple-50", iconColor: "text-purple-600" },
                    { label: "Platform Users", value: users.length.toString(), icon: Users, color: "bg-amber-50", iconColor: "text-amber-600" },
                ].map(stat => (
                    <Card key={stat.label} className="bg-white border-none shadow-sm rounded-[20px]">
                        <CardContent className="p-5">
                            <div className={cn("p-3 rounded-2xl w-fit mb-3", stat.color)}>
                                <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-800">{stat.value}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Suppliers */}
                <Card className="bg-white border-none shadow-sm rounded-[32px]">
                    <CardHeader className="px-8 pt-8 pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Top Suppliers by Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-4">
                        {topSuppliers.map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-black text-xs">{i + 1}</div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{s.name}</p>
                                        <p className="text-[10px] font-bold text-gray-400">{s.orders} orders</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-primary">{formatNaira(s.revenue)}</span>
                            </div>
                        ))}
                        {topSuppliers.length === 0 && <p className="text-center text-xs font-bold text-gray-300 py-6 uppercase">No supplier data</p>}
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card className="bg-white border-none shadow-sm rounded-[32px]">
                    <CardHeader className="px-8 pt-8 pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Top Products</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-4">
                        {topProducts.map(([product, data], i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs">{i + 1}</div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{product}</p>
                                        <p className="text-[10px] font-bold text-gray-400">{data.qty.toLocaleString()}L total</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-primary">{formatNaira(data.revenue)}</span>
                            </div>
                        ))}
                        {topProducts.length === 0 && <p className="text-center text-xs font-bold text-gray-300 py-6 uppercase">No product data</p>}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
