"use client"

import React from "react"
import { ArrowUpCircle, CheckCircle, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PayoutTabProps {
    transactions: any[]
    orders: any[]
}

export default function PayoutTab({ transactions, orders }: PayoutTabProps) {
    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(2)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(1)}K`
        return `₦${amt.toLocaleString()}`
    }

    const creditTransactions = transactions.filter((t: any) => t.type === "CREDIT")
    const totalPaidOut = creditTransactions.reduce((sum: number, t: any) => sum + Number(t.amount), 0)

    const deliveredOrdersValue = orders
        .filter((o: any) => o.status === "DELIVERED")
        .reduce((sum: number, o: any) => sum + Number(o.price), 0)

    const pendingPayout = Math.max(0, deliveredOrdersValue - totalPaidOut)

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    Payout <span className="text-primary italic">Management</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Track and manage disbursements</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-emerald-50"><CheckCircle className="h-6 w-6 text-emerald-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Paid Out</p>
                            <h3 className="text-2xl font-black text-emerald-600">{formatNaira(totalPaidOut)}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-amber-50"><Clock className="h-6 w-6 text-amber-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Pending Payout</p>
                            <h3 className="text-2xl font-black text-amber-600">{formatNaira(pendingPayout)}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-50"><ArrowUpCircle className="h-6 w-6 text-blue-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Disbursements</p>
                            <h3 className="text-2xl font-black text-blue-600">{creditTransactions.length}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Payout History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Recipient</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {creditTransactions.map((t: any) => (
                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">{t.user?.name || "Unknown"}</td>
                                        <td className="px-6 py-4 text-gray-500 text-xs font-bold uppercase">{t.category}</td>
                                        <td className="px-6 py-4 font-black text-emerald-600">{formatNaira(Number(t.amount))}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600">{t.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(t.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {creditTransactions.length === 0 && (
                                    <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-300 font-bold uppercase text-xs">No payouts recorded</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
