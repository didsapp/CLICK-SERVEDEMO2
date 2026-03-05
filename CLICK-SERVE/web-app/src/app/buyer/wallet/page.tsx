"use client"

import * as React from "react"
import { Wallet, Banknote, History, ArrowUpRight, ShieldCheck, TrendingUp, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AddFundsModal } from "@/components/dashboard/AddFundsModal"
import { CreditRequestModal } from "@/components/dashboard/CreditRequestModal"

const TRANSACTIONS = [
    { id: "TX-552-XD", type: "Purchase", amount: "-₦6,750,000", date: "Feb 20, 2026", method: "Credit Line", status: "Processed" },
    { id: "TX-441-BZ", type: "Top Up", amount: "+₦5,000,000", date: "Feb 18, 2026", method: "Bank Transfer", status: "Completed" },
    { id: "TX-334-QA", type: "Purchase", amount: "-₦2,520,000", date: "Feb 15, 2026", method: "Wallet Balance", status: "Processed" },
    { id: "TX-222-OM", type: "Refund", amount: "+₦150,000", date: "Feb 10, 2026", method: "Wallet Balance", status: "Completed" },
]

export default function WalletPage() {
    const [showAddFunds, setShowAddFunds] = React.useState(false)
    const [showCreditRequest, setShowCreditRequest] = React.useState(false)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Financials</h1>
                <p className="text-white/40 italic">Manage your capital, credit lines, and transaction history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative shadow-2xl shadow-primary/20 group">
                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.2em] opacity-80 flex items-center">
                            <Wallet className="mr-2 h-4 w-4" /> Available Wallet
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <p className="text-4xl font-black mb-1">₦4,250,500</p>
                        <p className="text-xs opacity-60 italic font-medium">Secured Liquid Capital</p>
                        <Button
                            variant="secondary"
                            className="w-full mt-6 h-12 text-primary font-black uppercase group-hover:scale-105 transition-transform"
                            onClick={() => setShowAddFunds(true)}
                        >
                            Add Funds <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardContent>
                    <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
                </Card>

                <Card className="glass-panel border-white/10 group relative overflow-hidden">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-white/40 flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" /> Credit Line
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-white mb-1">₦10,000,000</p>
                        <p className="text-xs text-primary italic font-bold uppercase tracking-widest">Active • 0% Interest</p>
                        <Button
                            variant="outline"
                            className="w-full mt-6 h-12 border-white/10 text-white hover:bg-white/5 font-bold italic"
                            onClick={() => setShowCreditRequest(true)}
                        >
                            Request Increase
                        </Button>
                    </CardContent>
                </Card>

                <Card className="glass-panel border-white/10 bg-white/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-white/40 flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4" /> Spend Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-white mb-1">₦24.8M</p>
                        <p className="text-xs text-amber-500 font-bold italic">+12.5% vs Prev Month</p>
                        <div className="mt-6 flex items-center text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">
                            <ShieldCheck className="h-4 w-4 mr-2 text-primary/50" /> Audited Transaction History
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-panel border-white/5 overflow-hidden">
                <CardHeader className="bg-white/5 py-4 border-b border-white/5">
                    <CardTitle className="text-lg font-bold text-white flex items-center italic">
                        <History className="mr-2 h-5 w-5 text-primary" /> Recent Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-white/20 uppercase text-[10px] font-black tracking-widest border-b border-white/5">
                                <tr>
                                    <th className="px-8 py-4">Transaction ID</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Method</th>
                                    <th className="px-8 py-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {TRANSACTIONS.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-white text-base">{tx.type}</p>
                                            <p className="text-xs text-white/20 font-mono italic">{tx.id} • {tx.date}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight",
                                                tx.status === "Completed" ? "bg-primary/20 text-primary" : "bg-white/10 text-white/60"
                                            )}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs text-white/40 italic font-bold uppercase tracking-wider">{tx.method}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className={cn(
                                                "text-lg font-black",
                                                tx.amount.startsWith('+') ? "text-primary shadow-[0_0_10px_rgba(250,204,21,0.1)]" : "text-white"
                                            )}>
                                                {tx.amount}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            <AddFundsModal
                isOpen={showAddFunds}
                onClose={() => setShowAddFunds(false)}
            />
            <CreditRequestModal
                isOpen={showCreditRequest}
                onClose={() => setShowCreditRequest(false)}
                currentLimit="₦10,000,000"
            />
        </div>
    )
}
