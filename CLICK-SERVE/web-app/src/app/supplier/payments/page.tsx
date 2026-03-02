"use client"

import * as React from "react"
import {
    Banknote,
    ArrowUpRight,
    Clock,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Zap,
    Download,
    ChevronRight,
    Calculator
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SupplierPayments() {
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const handleGetPaid = () => {
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 5000)
        }, 2000)
    }

    const pendingInvoices = [
        { id: "INV-2901", buyer: "Sarah Construction", date: "Oct 24, 2023", value: "₦12,500,000", status: "Verified" },
        { id: "INV-2900", buyer: "Telecom Hub", date: "Oct 22, 2023", value: "₦6,250,000", status: "Verified" },
        { id: "INV-2895", buyer: "Tunde Logistics", date: "Oct 20, 2023", value: "₦5,000,000", status: "Verified" },
        { id: "INV-2890", buyer: "Kano Haulage", date: "Oct 15, 2023", value: "₦8,700,000", status: "Verified" },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invoice Discounting</h1>
                    <p className="text-muted-foreground">Access instant liquidity by discounting your verified buyer invoices.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 border-primary/20 text-primary hover:bg-primary/5 px-6">
                        <Download className="mr-2 h-5 w-5" /> Payment History
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Instant Liquidity Card */}
                <Card className="lg:col-span-2 bg-primary text-primary-foreground border-none shadow-2xl shadow-primary/20 overflow-hidden relative">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl font-black uppercase tracking-tight flex items-center">
                                    <Zap className="mr-2 h-8 w-8 text-black" /> Get Paid Now
                                </CardTitle>
                                <CardDescription className="text-primary-foreground/70 font-medium italic mt-1">Convert your pending invoices to cash instantly.</CardDescription>
                            </div>
                            <div className="px-3 py-1 bg-black/20 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">Active Credit Line</div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-10 pt-8 relative z-10">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Total Pending Value</p>
                                <p className="text-5xl font-black">₦32.45M</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Discounting Fee (2%)</p>
                                <p className="text-5xl font-black text-black">₦649K</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-black/10 border border-white/5 space-y-4 backdrop-blur-md">
                            <div className="flex justify-between items-center text-sm font-bold opacity-60">
                                <span>Platform Processing</span>
                                <span className="text-green-400">0.00% FREE</span>
                            </div>
                            <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                <p className="text-lg font-bold">Net Payout Amount</p>
                                <p className="text-4xl font-black">₦31,801,000</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="pb-8 relative z-10">
                        {success ? (
                            <div className="w-full h-16 bg-white text-primary flex items-center justify-center rounded-2xl font-black text-xl animate-in zoom-in-50 duration-500">
                                <CheckCircle2 className="mr-2 h-8 w-8" /> TRANSFER INITIATED 100%
                            </div>
                        ) : (
                            <Button
                                className="w-full h-18 text-2xl font-black uppercase bg-secondary text-white hover:bg-secondary/90 shadow-2xl"
                                onClick={handleGetPaid}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing Credit..." : "Request Instant Payout"} <ArrowUpRight className="ml-2 h-8 w-8" />
                            </Button>
                        )}
                    </CardFooter>
                    {/* Design elements */}
                    <div className="absolute -top-12 -left-12 h-64 w-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 h-64 w-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />
                </Card>

                {/* Right Panel: Calculator & Stats */}
                <div className="space-y-6">
                    <Card className="glass-panel border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <Calculator className="mr-2 h-5 w-5 text-primary" /> Fee Calculator
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-white/40 tracking-widest">Entry Invoice Amount</label>
                                <Input className="bg-white/5 border-white/10 h-10 font-bold" placeholder="₦0.00" defaultValue="10,000,000" />
                            </div>
                            <div className="pt-2 space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-white/40">Fee (2%)</span>
                                    <span className="text-white">₦200,000</span>
                                </div>
                                <div className="flex justify-between text-lg font-black pt-2 border-t border-white/5">
                                    <span>You Get</span>
                                    <span className="text-primary">₦9.8M</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/30 border-none">
                        <CardHeader>
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">Financial Trust Rating</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full border-4 border-primary border-t-white/10 flex items-center justify-center">
                                    <span className="text-xl font-black">A+</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">Excellent Liquidity</p>
                                    <p className="text-[10px] text-white/40 italic">Next tier: Diamond Supplier (₦500M+)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Pending Invoices Table */}
            <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Unpaid Verified Invoices</CardTitle>
                    <CardDescription>Only invoices verified by Click-Serve and the buyer are eligible for discounting.</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Invoice ID</th>
                                    <th className="px-6 py-4">Buyer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Value</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y border-t border-white/5">
                                {pendingInvoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4 font-mono font-bold text-white/40">{inv.id}</td>
                                        <td className="px-6 py-4 font-bold">{inv.buyer}</td>
                                        <td className="px-6 py-4 text-white/60">{inv.date}</td>
                                        <td className="px-6 py-4 font-black text-primary">{inv.value}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-primary/80">
                                                <ShieldCheck className="h-3 w-3 mr-1.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{inv.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button size="sm" variant="ghost" className="h-8 font-bold text-xs hover:text-primary">View Documents</Button>
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
