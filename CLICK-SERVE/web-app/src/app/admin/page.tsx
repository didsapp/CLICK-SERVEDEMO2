import React from "react"
import dynamic from "next/dynamic"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"
import { auth } from "@/auth"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import KpiCards from "@/components/admin/KpiCards"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Info } from "lucide-react"

// Dynamic imports — only load the active tab's JS bundle
const AnalyticsSection = dynamic(() => import("@/components/admin/AnalyticsSection"))
const OperationSection = dynamic(() => import("@/components/admin/OperationSection"))
const PerformanceSection = dynamic(() => import("@/components/admin/PerformanceSection"))
const InsightsTab = dynamic(() => import("@/components/admin/tabs/InsightsTab"))
const NetworksTab = dynamic(() => import("@/components/admin/tabs/NetworksTab"))
const SignUpTab = dynamic(() => import("@/components/admin/tabs/SignUpTab"))
const ApprovalTab = dynamic(() => import("@/components/admin/tabs/ApprovalTab"))
const BusinessTab = dynamic(() => import("@/components/admin/tabs/BusinessTab"))
const EWalletTab = dynamic(() => import("@/components/admin/tabs/EWalletTab"))
const PayoutTab = dynamic(() => import("@/components/admin/tabs/PayoutTab"))
const ProfileTab = dynamic(() => import("@/components/admin/tabs/ProfileTab"))
const PackageTab = dynamic(() => import("@/components/admin/tabs/PackageTab"))
const ReportsTab = dynamic(() => import("@/components/admin/tabs/ReportsTab"))
const ToolsTab = dynamic(() => import("@/components/admin/tabs/ToolsTab"))

// Helper to serialize Prisma dates for client components
function serialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data))
}

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

    // =======================
    // CONDITIONAL DATA FETCHING
    // Only fetch what the active tab needs
    // =======================

    // Dashboard tab only needs aggregate counts
    let totalRevenue = 0
    let totalUsers = 0
    let totalOrders = 0
    if (activeTab === "Dashboard") {
        const [userCount, orderCount, revenueAgg] = await Promise.all([
            prisma.user.count(),
            prisma.order.count(),
            prisma.order.aggregate({
                where: { status: "DELIVERED" },
                _sum: { price: true }
            })
        ])
        totalUsers = userCount
        totalOrders = orderCount
        totalRevenue = Number(revenueAgg._sum.price || 0)
    }

    // Users — needed by: Insights, Networks, SignUp, Business, Profile, Reports, Tools
    const tabsNeedingUsers = ["Insights", "Networks", "SignUp", "Business", "Profile", "Reports", "Tools"]
    let serializedUsers: any[] = []
    if (tabsNeedingUsers.includes(activeTab)) {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                _count: { select: { orders: true, supplierOrders: true, stocks: true } }
            }
        })
        serializedUsers = serialize(users)
    }

    // Orders — needed by: Insights, Approval, Business, Payout, Reports, Tools
    const tabsNeedingOrders = ["Insights", "Approval", "Business", "Payout", "Reports", "Tools"]
    let serializedOrders: any[] = []
    if (tabsNeedingOrders.includes(activeTab)) {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
                supplier: { select: { name: true, email: true } }
            }
        })
        serializedOrders = serialize(orders)
    }

    // Stocks — needed by: Package, Reports, Tools
    const tabsNeedingStocks = ["Package", "Reports", "Tools"]
    let serializedStocks: any[] = []
    if (tabsNeedingStocks.includes(activeTab)) {
        const stocks = await prisma.stock.findMany({
            include: { user: { select: { name: true, email: true } } }
        })
        serializedStocks = serialize(stocks)
    }

    // Transactions — needed by: Insights, E-Wallet, Payout, Reports, Tools
    const tabsNeedingTransactions = ["Insights", "E-Wallet", "Payout", "Reports", "Tools"]
    let serializedTransactions: any[] = []
    if (tabsNeedingTransactions.includes(activeTab)) {
        const transactions = await prisma.transaction.findMany({
            orderBy: { date: "desc" },
            include: { user: { select: { name: true, email: true } } }
        })
        serializedTransactions = serialize(transactions)
    }

    return (
        <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
            <Sidebar activeTab={activeTab} />

            <div className="flex-1 lg:pl-64 flex flex-col">
                <Header />

                <main className="flex-1 p-8 space-y-10">
                    {activeTab === "Dashboard" && (
                        <>
                            <KpiCards
                                totalRevenue={totalRevenue}
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
