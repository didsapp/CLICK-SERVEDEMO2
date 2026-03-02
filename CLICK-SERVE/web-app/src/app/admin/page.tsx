import React from "react"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"
import { auth } from "@/auth"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import KpiCards from "@/components/admin/KpiCards"
import AnalyticsSection from "@/components/admin/AnalyticsSection"
import OperationSection from "@/components/admin/OperationSection"
import PerformanceSection from "@/components/admin/PerformanceSection"
import InsightsTab from "@/components/admin/tabs/InsightsTab"
import NetworksTab from "@/components/admin/tabs/NetworksTab"
import SignUpTab from "@/components/admin/tabs/SignUpTab"
import ApprovalTab from "@/components/admin/tabs/ApprovalTab"
import BusinessTab from "@/components/admin/tabs/BusinessTab"
import EWalletTab from "@/components/admin/tabs/EWalletTab"
import PayoutTab from "@/components/admin/tabs/PayoutTab"
import ProfileTab from "@/components/admin/tabs/ProfileTab"
import PackageTab from "@/components/admin/tabs/PackageTab"
import ReportsTab from "@/components/admin/tabs/ReportsTab"
import ToolsTab from "@/components/admin/tabs/ToolsTab"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Info } from "lucide-react"

export default async function AdminDashboard({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const session = await auth()

    if (!session?.user || (session.user as any).role !== "ADMIN") {
        if (!session?.user) redirect("/login")
    }

    const activeTab = (searchParams.tab as string) || "Dashboard"
    const searchQuery = (searchParams.query as string) || ""

    // Fetch all data needed for every tab
    const [users, allOrders, stocks, transactions, totalRevenue] = await Promise.all([
        prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                _count: { select: { orders: true, supplierOrders: true, stocks: true } }
            }
        }),
        prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
                supplier: { select: { name: true, email: true } }
            }
        }),
        prisma.stock.findMany({
            include: { user: { select: { name: true, email: true } } }
        }),
        prisma.transaction.findMany({
            orderBy: { date: "desc" },
            include: { user: { select: { name: true, email: true } } }
        }),
        prisma.order.aggregate({
            where: { status: "DELIVERED" },
            _sum: { price: true }
        })
    ])

    const totalUsers = users.length
    const totalOrders = allOrders.length

    // Serialize dates for client components
    const serializedUsers = JSON.parse(JSON.stringify(users))
    const serializedOrders = JSON.parse(JSON.stringify(allOrders))
    const serializedStocks = JSON.parse(JSON.stringify(stocks))
    const serializedTransactions = JSON.parse(JSON.stringify(transactions))

    return (
        <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
            <Sidebar activeTab={activeTab} />

            <div className="flex-1 lg:pl-64 flex flex-col">
                <Header />

                <main className="flex-1 p-8 space-y-10">
                    {activeTab === "Dashboard" && (
                        <>
                            <KpiCards
                                totalRevenue={Number(totalRevenue._sum.price || 0)}
                                totalUsers={totalUsers}
                                totalOrders={totalOrders}
                            />
                            <AnalyticsSection />
                            <OperationSection searchQuery={searchQuery} />
                            <PerformanceSection searchQuery={searchQuery} />
                        </>
                    )}

                    {activeTab === "Insights" && (
                        <InsightsTab users={serializedUsers} orders={serializedOrders} transactions={serializedTransactions} />
                    )}

                    {activeTab === "Networks" && (
                        <NetworksTab users={serializedUsers} />
                    )}

                    {activeTab === "SignUp" && (
                        <SignUpTab users={serializedUsers} />
                    )}

                    {activeTab === "Approval" && (
                        <ApprovalTab orders={serializedOrders} />
                    )}

                    {activeTab === "Business" && (
                        <BusinessTab orders={serializedOrders} users={serializedUsers} />
                    )}

                    {activeTab === "E-Wallet" && (
                        <EWalletTab transactions={serializedTransactions} />
                    )}

                    {activeTab === "Payout" && (
                        <PayoutTab transactions={serializedTransactions} orders={serializedOrders} />
                    )}

                    {activeTab === "Profile" && (
                        <ProfileTab users={serializedUsers} />
                    )}

                    {activeTab === "Package" && (
                        <PackageTab stocks={serializedStocks} />
                    )}

                    {activeTab === "Reports" && (
                        <ReportsTab users={serializedUsers} orders={serializedOrders} transactions={serializedTransactions} stocks={serializedStocks} />
                    )}

                    {activeTab === "Tools" && (
                        <ToolsTab users={serializedUsers} orders={serializedOrders} stocks={serializedStocks} transactions={serializedTransactions} />
                    )}

                    {/* Footer */}
                    <footer className="pt-10 pb-20 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            <div className="space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Quick Links</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: "Dashboard", href: "/admin?tab=Dashboard" },
                                        { label: "Reports", href: "/admin?tab=Reports" },
                                        { label: "Networks", href: "/admin?tab=Networks" },
                                        { label: "Tools", href: "/admin?tab=Tools" },
                                    ].map((link, i) => (
                                        <li key={i}>
                                            <Link href={link.href} className="text-sm font-bold text-gray-500 hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group">
                                                <div className="h-1 w-1 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Management</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: "Approval", href: "/admin?tab=Approval" },
                                        { label: "E-Wallet", href: "/admin?tab=E-Wallet" },
                                        { label: "Payout", href: "/admin?tab=Payout" },
                                        { label: "Profiles", href: "/admin?tab=Profile" },
                                    ].map((link, i) => (
                                        <li key={i}>
                                            <Link href={link.href} className="text-sm font-bold text-gray-500 hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group">
                                                <div className="h-1 w-1 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="lg:col-span-2 space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Connect with us</h4>
                                <div className="flex gap-4">
                                    {[Facebook, Twitter, Linkedin, Info].map((Icon, i) => (
                                        <div key={i} className="h-12 w-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:scale-110 transition-all cursor-pointer group">
                                            <Icon className="h-5 w-5 group-hover:animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
                                    © 2024 SkyWhale Click-Serve. All rights reserved. <br />
                                    Designed for maximum performance and efficiency.
                                </p>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    )
}
