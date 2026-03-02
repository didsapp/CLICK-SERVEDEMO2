"use client"

import React from "react"
import {
    Wallet,
    TrendingUp,
    Gift,
    CheckCircle,
    Clock,
    Info,
    Users,
    ShoppingCart
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardProps {
    label: string
    value: string
    icon: any
    color: string
    iconColor: string
}

const KpiCard = ({ label, value, icon: Icon, color, iconColor }: KpiCardProps) => (
    <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all duration-300 group rounded-[20px]">
        <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-2xl", color)}>
                    <Icon className={cn("h-6 w-6", iconColor)} />
                </div>
                <Info className="h-4 w-4 text-gray-300 cursor-help" />
            </div>
            <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">{value}</h3>
            </div>
        </CardContent>
    </Card>
)

interface KpiCardsProps {
    totalRevenue: number
    totalUsers: number
    totalOrders: number
}

export default function KpiCards({ totalRevenue, totalUsers, totalOrders }: KpiCardsProps) {
    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(2)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(1)}K`
        return `₦${amt.toLocaleString()}`
    }

    const kpis = [
        {
            label: "Total Revenue",
            value: formatNaira(totalRevenue),
            icon: TrendingUp,
            color: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            label: "Total Users",
            value: totalUsers.toString(),
            icon: Users,
            color: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            label: "Total Orders",
            value: totalOrders.toString(),
            icon: ShoppingCart,
            color: "bg-indigo-50",
            iconColor: "text-indigo-600"
        },
        {
            label: "Bonus Pool",
            value: "₦0",
            icon: Gift,
            color: "bg-amber-50",
            iconColor: "text-amber-600"
        },
        {
            label: "Pending Payouts",
            value: "₦0",
            icon: Clock,
            color: "bg-red-50",
            iconColor: "text-red-600"
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {kpis.map((kpi) => (
                <KpiCard key={kpi.label} {...kpi} />
            ))}
        </div>
    )
}
