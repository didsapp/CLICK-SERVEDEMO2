import * as React from "react"
import {
    Plus,
    TrendingDown,
    Clock,
    ChevronRight,
    TrendingUp,
    PackageCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { auth } from "@/auth"
import prisma from "@/lib/db"
import { TransportCalculator } from "@/components/dashboard/TransportCalculator"
import { redirect } from "next/navigation"

export default async function BuyerDashboard() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    // Fetch user data from DB
    const userEmail = session.user.email as string
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: {
            orders: true,
            transactions: true,
        },
    })

    if (!user) {
        return <div>User not found</div>
    }

    // Calculate real stats
    const activeOrdersCount = user.orders.filter(o => o.status === "PROCESSING" || o.status === "PENDING").length
    const totalSpendMTD = user.orders
        .filter(o => {
            const date = new Date(o.createdAt)
            const now = new Date()
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        })
        .reduce((sum, o) => sum + Number(o.price), 0)

    // Calculate Credit Balance from transactions
    const creditBalance = user.transactions.reduce((balance, t) => {
        if (t.type === "CREDIT") return balance + Number(t.amount)
        if (t.type === "DEBIT") return balance - Number(t.amount)
        return balance
    }, 0)

    // Format currency for Nigeria (Naira)
    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(1)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(0)}K`
        return `₦${amt.toLocaleString()}`
    }

    const stats = [
        { title: "Active Orders", value: activeOrdersCount.toString(), icon: PackageCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Total Spend (MTD)", value: formatNaira(totalSpendMTD), icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
        { title: "Avg. ETA", value: "45 mins", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        { title: "Credit Balance", value: formatNaira(creditBalance), icon: TrendingDown, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    ]

    // Fetch available stocks from all suppliers
    const stocks = await prisma.stock.findMany({
        include: {
            user: true,
        },
        take: 5,
    })

    const suppliersData = stocks.map(s => ({
        name: s.user.name || "Unknown Supplier",
        price: Number(s.price),
        product: s.product,
        qty: `${s.quantity.toLocaleString()} ${s.unit}`,
        rating: 4.8,
    }))

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-muted-foreground">Welcome back, {session.user.name}! Here&apos;s what&apos;s happening with your fuel supply.</p>
                </div>
                <Button className="h-12 px-6 font-bold text-lg" asChild>
                    <Link href="/buyer/order"><Plus className="mr-2 h-5 w-5" /> New Order</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <div className={cn("p-3 rounded-xl", stat.bg)}>
                                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle>Available Stock</CardTitle>
                            <CardDescription>Real-time availability from trusted suppliers near you.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/buyer/order">View all <ChevronRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                                    <tr>
                                        <th className="px-6 py-3">Supplier</th>
                                        <th className="px-6 py-3">Product</th>
                                        <th className="px-6 py-3">Available Qty</th>
                                        <th className="px-6 py-3">Price/L</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y border-t">
                                    {suppliersData.map((s, i) => (
                                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 font-bold">{s.name}</td>
                                            <td className="px-6 py-4 font-bold text-primary">{s.product}</td>
                                            <td className="px-6 py-4">{s.qty}</td>
                                            <td className="px-6 py-4 font-bold">₦{s.price.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href="/buyer/order">Order</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {suppliersData.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground italic">
                                                No stock currently available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <TransportCalculator />
            </div>
        </div>
    )
}
