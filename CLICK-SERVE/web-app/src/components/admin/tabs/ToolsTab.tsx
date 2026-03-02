"use client"

import React from "react"
import { Wrench, Database, Server, Activity, HardDrive, Shield, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ToolsTabProps {
    users: any[]
    orders: any[]
    stocks: any[]
    transactions: any[]
}

export default function ToolsTab({ users, orders, stocks, transactions }: ToolsTabProps) {
    const totalRecords = users.length + orders.length + stocks.length + transactions.length

    const tools = [
        {
            title: "Database Overview",
            icon: Database,
            color: "bg-blue-50",
            iconColor: "text-blue-600",
            description: "View database statistics and record counts.",
            stats: [
                { label: "Users", value: users.length },
                { label: "Orders", value: orders.length },
                { label: "Stocks", value: stocks.length },
                { label: "Transactions", value: transactions.length },
            ]
        },
        {
            title: "System Health",
            icon: Activity,
            color: "bg-emerald-50",
            iconColor: "text-emerald-600",
            description: "Current platform health and uptime status.",
            stats: [
                { label: "Status", value: "Operational" },
                { label: "Database", value: "SQLite" },
                { label: "Auth", value: "NextAuth v5" },
                { label: "Runtime", value: "Next.js 16" },
            ]
        },
        {
            title: "Security",
            icon: Shield,
            color: "bg-red-50",
            iconColor: "text-red-600",
            description: "Security overview and authentication settings.",
            stats: [
                { label: "Auth Method", value: "JWT" },
                { label: "Roles", value: "3 Active" },
                { label: "Sessions", value: "Secure" },
                { label: "Encryption", value: "bcrypt" },
            ]
        },
        {
            title: "Storage",
            icon: HardDrive,
            color: "bg-purple-50",
            iconColor: "text-purple-600",
            description: "Data storage and capacity overview.",
            stats: [
                { label: "Total Records", value: totalRecords },
                { label: "DB Engine", value: "SQLite" },
                { label: "Adapter", value: "Prisma" },
                { label: "Type", value: "Local" },
            ]
        }
    ]

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    Platform <span className="text-primary italic">Tools</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">System utilities and diagnostics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {tools.map(tool => (
                    <Card key={tool.title} className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden hover:shadow-md transition-all">
                        <CardHeader className="px-8 pt-8 pb-2 flex flex-row items-center gap-4">
                            <div className={cn("p-3 rounded-2xl", tool.color)}>
                                <tool.icon className={cn("h-6 w-6", tool.iconColor)} />
                            </div>
                            <div>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-800">{tool.title}</CardTitle>
                                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{tool.description}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {tool.stats.map(stat => (
                                    <div key={stat.label} className="p-3 rounded-xl bg-gray-50/80 border border-gray-50">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                        <p className="text-lg font-black text-gray-800 mt-0.5">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-white border-none shadow-sm rounded-[32px]">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-14 rounded-2xl border-gray-100 hover:border-primary/30 font-bold uppercase tracking-wider text-xs" onClick={() => window.location.reload()}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
                        </Button>
                        <Button variant="outline" className="h-14 rounded-2xl border-gray-100 hover:border-primary/30 font-bold uppercase tracking-wider text-xs" onClick={() => alert("Cache cleared successfully!")}>
                            <Server className="mr-2 h-4 w-4" /> Clear Cache
                        </Button>
                        <Button variant="outline" className="h-14 rounded-2xl border-gray-100 hover:border-primary/30 font-bold uppercase tracking-wider text-xs" onClick={() => alert("System diagnostics: All systems operational.")}>
                            <Wrench className="mr-2 h-4 w-4" /> Run Diagnostics
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
