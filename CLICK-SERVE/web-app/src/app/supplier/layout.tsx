"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    BarChart3,
    Box,
    ShoppingCart,
    Banknote,
    Settings,
    Bell,
    Menu,
    ChevronDown,
    LogOut,
    Droplets,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SupplierProvider, useSupplier } from "@/context/SupplierContext"
import { signOut } from "next-auth/react"

export default function SupplierLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SupplierProvider>
            <SupplierContent>{children}</SupplierContent>
        </SupplierProvider>
    )
}

function SupplierContent({ children }: { children: React.ReactNode }) {
    const { companyName } = useSupplier()
    const [sidebarOpen, setSidebarOpen] = React.useState(true)
    const pathname = usePathname()

    const navigation = [
        { name: "Overview", href: "/supplier", icon: LayoutDashboard },
        { name: "Stock Management", href: "/supplier/stock", icon: Box },
        { name: "Orders", href: "/supplier/orders", icon: ShoppingCart },
        { name: "Invoice Discounting", href: "/supplier/payments", icon: Banknote },
        { name: "Analytics", href: "/supplier/analytics", icon: BarChart3 },
        { name: "Settings", href: "/supplier/settings", icon: Settings },
    ]

    return (
        <div className="flex h-screen bg-muted/30 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-secondary text-secondary-foreground transition-all duration-300 flex-col z-40 hidden md:flex",
                    sidebarOpen ? "w-64" : "w-20"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-secondary-foreground/10 bg-secondary/50">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                            <Droplets className="h-5 w-5" />
                        </div>
                        {sidebarOpen && (
                            <span className="font-bold text-lg tracking-tight text-white">
                                CLICK<span className="text-primary">-SERVE</span>
                            </span>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-3 text-sm font-bold rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-primary/10 hover:text-primary"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-secondary-foreground/10">
                    <Button
                        variant="outline"
                        className="w-full text-white border-white/10 hover:bg-white/5 h-12 mb-4"
                        onClick={() => {
                            alert("Initiating 'Get Paid Now' process... Your request for ₦31,801,000 is being processed.")
                        }}
                    >
                        <Zap className={cn("h-5 w-5", sidebarOpen && "mr-2 text-primary")} />
                        {sidebarOpen && <span>Get Paid Now</span>}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-secondary-foreground/60 hover:text-primary px-3"
                        onClick={() => {
                            if (confirm("Are you sure you want to logout?")) {
                                signOut({ callbackUrl: "/" })
                            }
                        }}
                    >
                        <LogOut className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
                        {sidebarOpen && <span>Logout</span>}
                    </Button>
                </div>
            </aside >

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden" >
                {/* Top Header */}
                <header className="h-20 border-b bg-background flex items-center justify-between px-8 z-30 sticky top-0" >
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden md:flex"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h2 className="text-sm font-black opacity-70 uppercase tracking-[0.2em]">Supplier Portal</h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
                        </Button>
                        <div className="flex items-center space-x-3 pl-4 border-l">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold">{companyName}</p>
                                <p className="text-xs text-muted-foreground uppercase bg-secondary/10 text-secondary px-2 py-0.5 rounded font-bold inline-block">Verified Supplier</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold shadow-lg shadow-secondary/20">
                                {companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header >

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8" >
                    {children}
                </main >
            </div >
        </div >
    )
}
