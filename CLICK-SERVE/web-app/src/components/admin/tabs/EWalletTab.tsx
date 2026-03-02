"use client"

import React from "react"
import { Wallet, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface EWalletTabProps {
    transactions: any[]
}

export default function EWalletTab({ transactions }: EWalletTabProps) {
    const [filter, setFilter] = React.useState<"ALL" | "CREDIT" | "DEBIT">("ALL")

    const filtered = filter === "ALL" ? transactions : transactions.filter((t: any) => t.type === filter)
    const totalCredits = transactions.filter((t: any) => t.type === "CREDIT").reduce((sum: number, t: any) => sum + Number(t.amount), 0)
    const totalDebits = transactions.filter((t: any) => t.type === "DEBIT").reduce((sum: number, t: any) => sum + Number(t.amount), 0)

    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(2)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(1)}K`
        return `₦${amt.toLocaleString()}`
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    E-Wallet <span className="text-primary italic">Overview</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">System-wide transaction tracking</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-emerald-50"><ArrowDownRight className="h-6 w-6 text-emerald-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Credits</p>
                            <h3 className="text-2xl font-black text-emerald-600">{formatNaira(totalCredits)}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-red-50"><ArrowUpRight className="h-6 w-6 text-red-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Debits</p>
                            <h3 className="text-2xl font-black text-red-600">{formatNaira(totalDebits)}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-50"><Wallet className="h-6 w-6 text-blue-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Net Balance</p>
                            <h3 className="text-2xl font-black text-gray-800">{formatNaira(totalCredits - totalDebits)}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-2">
                {(["ALL", "CREDIT", "DEBIT"] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={cn(
                        "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                        filter === f ? "bg-primary text-black shadow-lg shadow-primary/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    )}>{f}</button>
                ))}
            </div>

            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((t: any) => (
                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">{t.user?.name || "Unknown"}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                t.type === "CREDIT" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                                            )}>{t.type}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs font-bold uppercase">{t.category}</td>
                                        <td className="px-6 py-4 font-black text-gray-800">{formatNaira(Number(t.amount))}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600">{t.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(t.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-300 font-bold uppercase text-xs">No transactions found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
