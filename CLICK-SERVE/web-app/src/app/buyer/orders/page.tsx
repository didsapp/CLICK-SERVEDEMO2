"use client"

import * as React from "react"
import { Package, Clock, CheckCircle2, ChevronRight, RefreshCw, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ORDERS = [
    { id: "SW-992-XD", supplier: "FuelPro Supplies", qty: "5,000L", date: "Feb 20, 2026", status: "In Transit", total: "₦6.75M", color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: "SW-881-BZ", supplier: "Naija Diesel", qty: "10,000L", date: "Feb 18, 2026", status: "Delivered", total: "₦12.45M", color: "text-primary", bg: "bg-primary/10" },
    { id: "SW-774-QA", supplier: "Swift Logistics", qty: "2,000L", date: "Feb 15, 2026", status: "Delivered", total: "₦2.52M", color: "text-primary", bg: "bg-primary/10" },
    { id: "SW-662-OM", supplier: "FuelPro Supplies", qty: "8,000L", date: "Feb 10, 2026", status: "Delivered", total: "₦10.8M", color: "text-primary", bg: "bg-primary/10" },
]

export default function OrdersPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders History</h1>
                    <p className="text-muted-foreground">Track your active shipments and view past transactions.</p>
                </div>
                <Button variant="outline" className="h-12 border-primary/20 text-primary hover:bg-primary/5">
                    <FileText className="mr-2 h-4 w-4" /> Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {ORDERS.map((o) => (
                    <Card key={o.id} className="glass-panel border-white/5 hover:border-white/10 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", o.bg)}>
                                        <Package className={cn("h-7 w-7", o.color)} />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{o.id}</span>
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight",
                                                o.status === "In Transit" ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary"
                                            )}>
                                                {o.status}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mt-1">{o.supplier}</h3>
                                        <p className="text-sm text-white/40 italic">{o.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-12">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Quantity</p>
                                        <p className="text-lg font-bold text-white">{o.qty}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Total Value</p>
                                        <p className="text-xl font-black text-primary">{o.total}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl border border-white/5 hover:bg-white/5">
                                            <RefreshCw className="h-5 w-5 text-white/40" />
                                        </Button>
                                        <Button size="icon" className="h-12 w-12 rounded-xl shadow-lg">
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
