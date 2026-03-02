"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Search,
    Package,
    FileText,
    Map,
    MapPin,
    Wallet,
    LifeBuoy,
    Settings,
    Bell,
    Menu,
    ChevronDown,
    LogOut,
    Droplets
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export default function BuyerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session } = useSession()
    const user = session?.user
    const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'JD'

    const [sidebarOpen, setSidebarOpen] = React.useState(true)
    const pathname = usePathname()
    const router = useRouter()

    const navigation = [
        { name: "Dashboard", href: "/buyer", icon: LayoutDashboard },
        { name: "Browse Suppliers", href: "/buyer/browse", icon: Search },
        { name: "Orders", href: "/buyer/orders", icon: Package },
        { name: "Invoices", href: "/buyer/invoices", icon: FileText },
        { name: "Tracking", href: "/buyer/tracking", icon: Map },
        { name: "Wallet/Credit", href: "/buyer/wallet", icon: Wallet },
    ]

    const secondaryNavigation = [
        { name: "Support", href: "/buyer/support", icon: LifeBuoy },
        { name: "Settings", href: "/buyer/settings", icon: Settings },
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
                <div className="h-16 flex items-center px-6 border-b border-white/5 bg-black/20">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <Droplets className="h-5 w-5" />
                        </div>
                        {sidebarOpen && (
                            <span className="font-bold text-lg tracking-tighter text-white uppercase italic">
                                SKYWHALE <span className="text-primary tracking-normal">CLICK & SERVE</span>
                            </span>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto overflow-x-hidden">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 italic tracking-tight",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105"
                                        : "text-white/40 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", sidebarOpen ? "mr-3" : "mx-auto")} />
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        )
                    })}

                    <div className="pt-10 pb-2">
                        {sidebarOpen && <p className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic">Secondary Ops</p>}
                    </div>

                    {secondaryNavigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all italic tracking-tight",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-white/40 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", sidebarOpen ? "mr-3" : "mx-auto")} />
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-white/40 hover:text-red-500 hover:bg-red-500/10 px-4 h-12 rounded-xl italic font-bold"
                        onClick={() => {
                            if (confirm("Are you sure you want to terminate your session?")) {
                                signOut({ callbackUrl: "/" })
                            }
                        }}
                    >
                        <LogOut className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
                        {sidebarOpen && <span>Terminate Session</span>}
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b bg-background flex items-center justify-between px-8 z-30 sticky top-0">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden md:flex"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm font-bold">Lagos</span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
                        </Button>
                        <div className="flex items-center space-x-3 pl-4 border-l">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold">{user?.name || "John Doe"}</p>
                                <p className="text-xs text-muted-foreground uppercase bg-primary/10 text-primary px-2 py-0.5 rounded font-bold inline-block">{(user as any)?.role || "Buyer"}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">{initials}</div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
