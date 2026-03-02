"use client"

import * as React from "react"
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Activity,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function SupplierAnalytics() {
    const stats = [
        { title: "Revenue (MTD)", value: "₦145.8M", trend: "+8.5%", trendUp: true, desc: "vs last month" },
        { title: "Volume (Liters)", value: "112,400L", trend: "+12.3%", trendUp: true, desc: "vs last month" },
        { title: "Fulfillment Rate", value: "99.4%", trend: "+0.2%", trendUp: true, desc: "vs last month" },
        { title: "Avg. Sale/Order", value: "₦6.1M", trend: "-2.1%", trendUp: false, desc: "vs last month" },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
                    <p className="text-muted-foreground">Deep dive into your sales performance and supply chain metrics.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 border-primary/20 text-primary hover:bg-primary/5 px-6">
                        <Download className="mr-2 h-5 w-5" /> Export Report
                    </Button>
                    <Button className="h-12 px-6 font-bold flex items-center">
                        <Calendar className="mr-2 h-5 w-5" /> Last 30 Days
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-1">{stat.title}</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-2xl font-black">{stat.value}</h3>
                                <div className={cn(
                                    "flex items-center text-xs font-bold",
                                    stat.trendUp ? "text-primary" : "text-red-500"
                                )}>
                                    {stat.trendUp ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground italic mt-2">{stat.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Growth Chart Placeholder */}
                <Card className="lg:col-span-2 border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Revenue Growth</CardTitle>
                            <CardDescription>Monthly revenue tracking across all active hubs.</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-3 rounded-full bg-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">2023</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-3 rounded-full bg-white/10" />
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">2022</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-[300px] w-full bg-gradient-to-t from-primary/5 to-transparent relative flex items-end px-8 pb-8 space-x-4">
                            {[40, 60, 45, 75, 90, 85, 95].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary/40 transition-all duration-500 relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-primary text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            ₦{(h / 5).toFixed(1)}M
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter opacity-20">M{i + 4}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Regional Breakdown */}
                <Card className="border-none bg-secondary text-secondary-foreground shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Hub Performance</CardTitle>
                        <CardDescription className="text-white/40">Market share by deployment city.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { name: "Lagos", share: 45, color: "bg-primary" },
                            { name: "Abuja", share: 30, color: "bg-blue-500" },
                            { name: "Port Harcourt", share: 15, color: "bg-amber-500" },
                            { name: "Kano", share: 10, color: "bg-white/20" },
                        ].map((hub) => (
                            <div key={hub.name} className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                                    <span className="text-white/60">{hub.name}</span>
                                    <span className="text-white">{hub.share}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full transition-all duration-1000", hub.color)}
                                        style={{ width: `${hub.share}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="glass-panel border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                            <Users className="mr-2 h-5 w-5 text-primary" /> Key Buyers
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-1">
                            {[
                                { name: "Tunde Logistics", volume: "45,000L", growth: "+15%" },
                                { name: "Telecom Hub", volume: "32,000L", growth: "+8%" },
                                { name: "Sarah Construction", volume: "28,000L", growth: "-2%" },
                            ].map((buyer, i) => (
                                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0 border-primary/5">
                                    <div>
                                        <p className="text-sm font-bold text-white">{buyer.name}</p>
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Lifetime Volume: {buyer.volume}</p>
                                    </div>
                                    <div className={cn(
                                        "px-2 py-1 rounded text-[10px] font-black",
                                        buyer.growth.startsWith('+') ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"
                                    )}>
                                        {buyer.growth}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 relative overflow-hidden flex items-center justify-center p-12 group">
                    <div className="text-center space-y-4 relative z-10 transition-transform group-hover:scale-105 duration-500">
                        <Activity className="h-16 w-16 text-primary mx-auto animate-pulse" />
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">Download Smart Report</h3>
                        <p className="text-xs text-white/40 max-w-xs mx-auto">AI-powered predictive analysis for your supply chain based on Q4 2023 market trends.</p>
                        <Button className="font-black uppercase shadow-2xl relative overflow-hidden group/btn h-12">
                            <span className="relative z-10">Export AI PDF</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
