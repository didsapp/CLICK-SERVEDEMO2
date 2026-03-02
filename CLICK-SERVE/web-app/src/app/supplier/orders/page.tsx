"use client"

import * as React from "react"
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Truck,
    Clock,
    CheckCircle2,
    XCircle,
    Package,
    ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SupplierOrders() {
    const [filter, setFilter] = React.useState("all")

    const allOrders = [
        { id: "ORD-9921", buyer: "Tunde Logistics", city: "Lagos", qty: "5,000L", status: "Delivered", date: "2023-10-24", amount: "₦6.25M" },
        { id: "ORD-9922", buyer: "Sarah Construction", city: "Abuja", qty: "10,000L", status: "In Transit", date: "2023-10-24", amount: "₦12.5M" },
        { id: "ORD-9923", buyer: "Telecom Hub", city: "Port Harcourt", qty: "2,500L", status: "Processing", date: "2023-10-24", amount: "₦3.12M" },
        { id: "ORD-9924", buyer: "Kano Haulage", city: "Kano", qty: "15,000L", status: "Pending", date: "2023-10-23", amount: "₦18.75M" },
    ]

    const filteredOrders = filter === "all" ? allOrders : allOrders.filter(o => o.status.toLowerCase() === filter.toLowerCase())

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Orders</h1>
                    <p className="text-muted-foreground">Monitor your fulfillment pipeline and supply chain efficiency.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 border-primary/20 text-primary hover:bg-primary/5 px-6">
                        <Download className="mr-2 h-5 w-5" /> Export CSV
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10 h-12 bg-white/5 border-white/10" placeholder="Search by Order ID or Buyer..." />
                </div>
                <div className="flex bg-muted/50 p-1 rounded-lg border border-white/5">
                    {["all", "pending", "processing", "in transit", "delivered"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 text-xs font-bold uppercase rounded-md transition-all",
                                filter === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Buyer</th>
                                    <th className="px-6 py-4">Region</th>
                                    <th className="px-6 py-4">Quantity</th>
                                    <th className="px-6 py-4">Value</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y border-t border-white/5">
                                {filteredOrders.map((o) => (
                                    <tr key={o.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {o.status === "Delivered" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                                {o.status === "In Transit" && <Truck className="h-4 w-4 text-blue-500 animate-pulse" />}
                                                {o.status === "Processing" && <Clock className="h-4 w-4 text-amber-500" />}
                                                {o.status === "Pending" && <Package className="h-4 w-4 text-white/20" />}
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest",
                                                    o.status === "Delivered" ? "text-primary" : "text-white/60"
                                                )}>
                                                    {o.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-white/40 group-hover:text-primary transition-colors">{o.id}</td>
                                        <td className="px-6 py-4 font-bold">{o.buyer}</td>
                                        <td className="px-6 py-4 text-white/60 italic">{o.city}</td>
                                        <td className="px-6 py-4 font-bold">{o.qty}</td>
                                        <td className="px-6 py-4 font-black text-primary">{o.amount}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="sm" variant="outline" className="h-8 border-white/10 hover:bg-white/5 font-bold">Manage</Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/20 hover:text-white"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="glass-panel border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="text-xl">Dispatch Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs font-black text-white/20 uppercase tracking-widest mb-1">Avg. Fulfillment Time</p>
                                <p className="text-4xl font-extrabold text-primary">52 Min</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-green-500 flex items-center mb-1">
                                    <ArrowUpRight className="mr-1 h-3 w-3" /> 14.2% Improvements
                                </p>
                                <p className="text-[10px] text-white/40 italic">vs last month avg.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="p-8 rounded-3xl bg-secondary text-secondary-foreground flex items-center justify-between border-none">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Next Big Scheduled</p>
                        <p className="text-xl font-bold italic text-white underline decoration-primary underline-offset-8">Telecom Hub Refill</p>
                        <p className="text-xs opacity-60">Estimated: Tomorrow at 08:30 AM</p>
                    </div>
                    <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full shadow-lg">
                        <ArrowUpRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
