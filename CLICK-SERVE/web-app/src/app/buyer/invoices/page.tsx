"use client"

import * as React from "react"
import { FileDown, FileText, Download, Eye, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const INVOICES = [
    { id: "INV-2026-001", orderId: "SW-992-XD", date: "Feb 20, 2026", amount: "₦6,750,000", status: "Unpaid", due: "Mar 20, 2026" },
    { id: "INV-2026-002", orderId: "SW-881-BZ", date: "Feb 18, 2026", amount: "₦12,450,000", status: "Paid", due: "Paid" },
    { id: "INV-2026-003", orderId: "SW-774-QA", date: "Feb 15, 2026", amount: "₦2,520,000", status: "Paid", due: "Paid" },
    { id: "INV-2026-004", orderId: "SW-662-OM", date: "Feb 10, 2026", amount: "₦10,800,000", status: "Paid", due: "Paid" },
]

export default function InvoicesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Invoices</h1>
                    <p className="text-white/40 italic">Manage your billing and payment documents.</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5 text-white">
                        <DollarSign className="mr-2 h-4 w-4" /> Bulk Payment
                    </Button>
                    <Button className="h-12 shadow-lg shadow-primary/20 font-bold">
                        <FileDown className="mr-2 h-4 w-4" /> Download All
                    </Button>
                </div>
            </div>

            <Card className="glass-panel border-white/5 overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-white/40 uppercase text-[10px] font-black tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-5">Invoice Details</th>
                                    <th className="px-8 py-5">Value</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {INVOICES.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                                                    <FileText className="h-6 w-6 text-white/40 group-hover:text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-base">{inv.id}</p>
                                                    <p className="text-xs text-white/20 uppercase tracking-widest mt-0.5">Order {inv.orderId} • {inv.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-lg font-black text-white">{inv.amount}</p>
                                            {inv.status !== "Paid" && (
                                                <p className="text-[10px] uppercase font-bold text-amber-500 flex items-center mt-1">
                                                    <Calendar className="h-3 w-3 mr-1" /> Due {inv.due}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm",
                                                inv.status === "Paid" ? "bg-primary text-primary-foreground" : "bg-amber-500/20 text-amber-500"
                                            )}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Button size="icon" variant="ghost" className="h-10 w-10 border border-white/5 hover:bg-white/10">
                                                    <Eye className="h-4 w-4 text-white/60" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 border border-white/5 hover:bg-white/10">
                                                    <Download className="h-4 w-4 text-white/60" />
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
        </div>
    )
}
