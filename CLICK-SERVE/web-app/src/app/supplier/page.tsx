import * as React from "react"
import {
    Plus,
    ArrowUpRight,
    ShoppingCart,
    Fuel,
    Banknote,
    TrendingUp,
    AlertTriangle,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { auth } from "@/auth"
import prisma from "@/lib/db"
import { QuickStockUpdate } from "@/components/dashboard/QuickStockUpdate"
import { redirect } from "next/navigation"

export default async function SupplierDashboard() {
    const session = await auth()

    if (!session?.user || (session.user as any).role !== "SUPPLIER") {
        if (!session?.user) redirect("/login")
    }

    const userEmail = session.user.email as string
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: {
            stocks: true,
            supplierOrders: {
                include: {
                    user: true, // the buyer
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            transactions: true,
        },
    })

    if (!user) return <div>Supplier not found</div>

    // Calculate stats from real data
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todaysOrders = user.supplierOrders.filter(o => new Date(o.createdAt) >= today).length

    const now = new Date()
    const revenueMTD = user.supplierOrders
        .filter(o => {
            const date = new Date(o.createdAt)
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() && o.status === "DELIVERED"
        })
        .reduce((sum, o) => sum + Number(o.price), 0)

    // Pending payments = orders that are DELIVERED but payment hasn't been settled
    const pendingPayments = user.supplierOrders
        .filter(o => o.status === "PROCESSING" || o.status === "SHIPPED")
        .reduce((sum, o) => sum + Number(o.price), 0)

    const totalStockQty = user.stocks.reduce((sum, s) => sum + s.quantity, 0)

    const formatNaira = (amt: number) => {
        if (amt >= 1000000) return `₦${(amt / 1000000).toFixed(1)}M`
        if (amt >= 1000) return `₦${(amt / 1000).toFixed(0)}K`
        return `₦${amt.toLocaleString()}`
    }

    // Calculate wallet balance from transactions
    const walletBalance = user.transactions.reduce((balance, t) => {
        if (t.type === "CREDIT") return balance + Number(t.amount)
        if (t.type === "DEBIT") return balance - Number(t.amount)
        return balance
    }, 0)

    const stats = [
        { title: "Today's Orders", value: todaysOrders.toString(), icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10", trend: "Live" },
        { title: "Revenue (MTD)", value: formatNaira(revenueMTD), icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", trend: revenueMTD > 0 ? "+Active" : "—" },
        { title: "Pending Payments", value: formatNaira(pendingPayments), icon: Banknote, color: "text-amber-500", bg: "bg-amber-500/10", trend: pendingPayments > 0 ? "In Transit" : "Clear" },
        { title: "Stock Level", value: `${totalStockQty.toLocaleString()}L`, icon: Fuel, color: "text-indigo-500", bg: "bg-indigo-500/10", trend: totalStockQty < 10000 ? "Low" : "Normal" },
    ]

    const recentOrders = user.supplierOrders.slice(0, 5).map(o => ({
        buyer: o.user.name || "Unknown",
        qty: `${o.quantity.toLocaleString()}L`,
        product: o.product,
        status: o.status,
        payment: o.status === "DELIVERED" ? "Paid" : o.status === "CANCELLED" ? "Refunded" : "Pending",
        track: "View"
    }))

    // Pending invoice value (orders delivered but not yet paid out via transactions)
    const deliveredTotal = user.supplierOrders
        .filter(o => o.status === "DELIVERED")
        .reduce((sum, o) => sum + Number(o.price), 0)
    const receivedTotal = user.transactions
        .filter(t => t.type === "CREDIT" && t.category === "ORDER")
        .reduce((sum, t) => sum + Number(t.amount), 0)
    const pendingInvoiceValue = Math.max(0, deliveredTotal - receivedTotal)
    const discountFee = pendingInvoiceValue * 0.02
    const youReceive = pendingInvoiceValue - discountFee

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-muted-foreground">Manage your stock, prices, and track your payments in real-time.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 border-primary/20 text-primary hover:bg-primary/5 px-6" asChild>
                        <Link href="/supplier/analytics">Analytics Report</Link>
                    </Button>
                    <Button className="h-12 px-6 font-bold" asChild>
                        <Link href="/supplier/stock">
                            <Plus className="mr-2 h-5 w-5" /> Add Stock
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    <p className={cn("text-xs font-bold mt-1", stat.trend.includes('+') || stat.trend === "Live" ? "text-primary" : "text-muted-foreground")}>{stat.trend}</p>
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
                <div className="lg:col-span-2 space-y-8">
                    <QuickStockUpdate />

                    {/* Orders Table */}
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Orders</CardTitle>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/supplier/orders">View All <ChevronRight className="ml-1 h-4 w-4" /></Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="px-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                                        <tr>
                                            <th className="px-6 py-3">Buyer</th>
                                            <th className="px-6 py-3">Product</th>
                                            <th className="px-6 py-3">Qty</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Payment</th>
                                            <th className="px-6 py-3 text-right">Track</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {recentOrders.map((o, i) => (
                                            <tr key={i} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-4 font-bold">{o.buyer}</td>
                                                <td className="px-6 py-4 text-primary font-medium">{o.product}</td>
                                                <td className="px-6 py-4">{o.qty}</td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                        o.status === 'DELIVERED' ? "bg-primary/10 text-primary" :
                                                            o.status === 'CANCELLED' ? "bg-red-500/10 text-red-500" :
                                                                "bg-amber-500/10 text-amber-500"
                                                    )}>
                                                        {o.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                        o.payment === 'Paid' ? "bg-blue-500/10 text-blue-500" :
                                                            o.payment === 'Refunded' ? "bg-red-500/10 text-red-500" :
                                                                "bg-muted text-muted-foreground"
                                                    )}>
                                                        {o.payment}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="link" size="sm" className="h-auto p-0">{o.track}</Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {recentOrders.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground italic">
                                                    No orders received yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Instant Payment Panel */}
                <div className="space-y-6">
                    <Card className="bg-primary text-primary-foreground border-none shadow-xl shadow-primary/20 overflow-hidden relative">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Banknote className="mr-2 h-5 w-5" /> Instant Payment
                            </CardTitle>
                            <CardDescription className="text-primary-foreground/70">Liquidity at your fingertips.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <div className="space-y-1">
                                <p className="text-xs opacity-60 uppercase font-bold tracking-wide">Pending Invoice Value</p>
                                <p className="text-3xl font-extrabold">{formatNaira(pendingInvoiceValue)}</p>
                            </div>

                            <div className="pt-4 space-y-2 border-t border-white/20">
                                <div className="flex justify-between text-sm">
                                    <span>Invoice Discounting Fee (2%)</span>
                                    <span className="font-bold">-{formatNaira(discountFee)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>You Receive</span>
                                    <span>{formatNaira(youReceive)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="relative z-10">
                            <Button variant="secondary" className="w-full h-12 text-primary font-bold shadow-lg" disabled={pendingInvoiceValue <= 0}>
                                Get Paid Now <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                        <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl" />
                    </Card>

                    {totalStockQty < 10000 && (
                        <Card className="bg-amber-500/5 border-amber-500/10">
                            <CardContent className="p-4 flex items-start space-x-3">
                                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-amber-900">Low Stock Alert</p>
                                    <p className="text-xs text-amber-800/70 leading-relaxed">Your current stock level is low ({totalStockQty.toLocaleString()}L). We recommend adding more soon.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
