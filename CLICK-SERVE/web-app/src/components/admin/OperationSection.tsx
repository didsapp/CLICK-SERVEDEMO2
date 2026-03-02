"use client"

import React from "react"
import {
    Search,
    Filter,
    MoreVertical,
    CreditCard,
    FolderSearch
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OperationSectionProps {
    searchQuery?: string
}

export default function OperationSection({ searchQuery = "" }: OperationSectionProps) {
    const [activeTab, setActiveTab] = React.useState("Income")

    const incomeItems = [
        { label: "Joining Fee", value: "₦ 3.20K" },
        { label: "Commission Charge", value: "₦ 9.40" },
        { label: "Registration Fee", value: "₦ 0" },
        { label: "Fund Transfer Fee", value: "₦ 0" }
    ].filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

    const transactionItems = [
        { id: 1, type: "E-pin", label: "E-Pin Purchase", amount: 10 },
        { id: 2, type: "E-pin", label: "E-Pin Refund", amount: 20 },
        { id: 3, type: "E-pin", label: "E-Pin Purchase", amount: 30 },
        { id: 4, type: "E-pin", label: "E-Pin Refund", amount: 40 },
        { id: 5, type: "E-pin", label: "E-Pin Purchase", amount: 50 },
    ].filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Income & Commission */}
            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Income & Commission</CardTitle>
                    <div className="flex gap-4 border-b border-gray-100 mt-4">
                        {["Income", "Commission"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-2 text-xs font-bold transition-all px-1",
                                    activeTab === tab ? "text-primary border-b-2 border-primary" : "text-gray-400 border-b-2 border-transparent"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="space-y-6 mt-4">
                        {incomeItems.map((item, i) => (
                            <div key={i} className="flex justify-between items-center group">
                                <span className="text-sm font-bold text-gray-500">{item.label}</span>
                                <div className="bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/20 group-hover:bg-primary/10 transition-all">
                                    <span className="text-sm font-black text-gray-800">{item.value}</span>
                                </div>
                            </div>
                        ))}
                        {incomeItems.length === 0 && (
                            <p className="text-center text-xs font-bold text-gray-300 py-4 uppercase">No matches</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Transactions */}
            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Transactions</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="space-y-4">
                        {transactionItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-800 tracking-tight">{item.type}</p>
                                        <p className="text-[10px] font-bold text-gray-400">{item.label}</p>
                                    </div>
                                </div>
                                <div className="bg-primary/5 px-3 py-1 rounded-lg">
                                    <span className="text-xs font-black text-primary">₦ {item.amount}</span>
                                </div>
                            </div>
                        ))}
                        {transactionItems.length === 0 && (
                            <p className="text-center text-xs font-bold text-gray-300 py-4 uppercase">No results</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Payout Overview */}
            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Payout Overview</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex flex-col items-center justify-center min-h-[250px]">
                    <div className="relative mb-6">
                        <FolderSearch className="h-20 w-20 text-gray-100" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Search className="h-8 w-8 text-gray-300 animate-pulse" />
                        </div>
                    </div>
                    <p className="text-sm font-bold text-gray-300 uppercase tracking-widest">No data found...</p>
                </CardContent>
            </Card>
        </div>
    )
}
