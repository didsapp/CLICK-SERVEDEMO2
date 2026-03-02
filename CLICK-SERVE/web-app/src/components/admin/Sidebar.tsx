"use client"

import React from "react"
import {
    LayoutDashboard,
    PieChart,
    Network,
    UserPlus,
    ClipboardCheck,
    Briefcase,
    Wallet,
    ArrowUpCircle,
    UserCog,
    Package,
    FileText,
    Wrench,
    ChevronDown,
    LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

import Link from "next/link"

interface SidebarItemProps {
    icon: any
    label: string
    active?: boolean
    hasSubmenu?: boolean
    href: string
}

const SidebarItem = ({ icon: Icon, label, active, hasSubmenu, href }: SidebarItemProps) => (
    <Link
        href={href}
        className={cn(
            "w-full flex items-center justify-between px-6 py-3 transition-all duration-200 group",
            active
                ? "bg-primary text-black font-bold border-l-4 border-black"
                : "text-white/60 hover:bg-white/5 hover:text-white"
        )}
    >
        <div className="flex items-center gap-3">
            <Icon className={cn("h-5 w-5", active ? "text-black" : "text-primary/70 group-hover:text-primary")} />
            <span className="text-sm tracking-tight">{label}</span>
        </div>
        {hasSubmenu && <ChevronDown className={cn("h-4 w-4 opacity-50", active && "text-black")} />}
    </Link>
)

interface SidebarProps {
    activeTab: string
}

export default function Sidebar({ activeTab }: SidebarProps) {
    const menuSections = [
        { label: "Dashboard", tabKey: "Dashboard", icon: LayoutDashboard, href: "/admin?tab=Dashboard" },
        { label: "Insights", tabKey: "Insights", icon: PieChart, href: "/admin?tab=Insights" },
        { label: "Networks", tabKey: "Networks", icon: Network, hasSubmenu: true, href: "/admin?tab=Networks" },
        { label: "Sign Up", tabKey: "SignUp", icon: UserPlus, hasSubmenu: true, href: "/admin?tab=SignUp" },
        { label: "Approval", tabKey: "Approval", icon: ClipboardCheck, hasSubmenu: true, href: "/admin?tab=Approval" },
        { label: "Business", tabKey: "Business", icon: Briefcase, href: "/admin?tab=Business" },
        { label: "E-Wallet", tabKey: "E-Wallet", icon: Wallet, href: "/admin?tab=E-Wallet" },
        { label: "Payout", tabKey: "Payout", icon: ArrowUpCircle, href: "/admin?tab=Payout" },
        { label: "Profile Management", tabKey: "Profile", icon: UserCog, hasSubmenu: true, href: "/admin?tab=Profile" },
        { label: "Package", tabKey: "Package", icon: Package, hasSubmenu: true, href: "/admin?tab=Package" },
        { label: "Reports", tabKey: "Reports", icon: FileText, hasSubmenu: true, href: "/admin?tab=Reports" },
        { label: "Tools", tabKey: "Tools", icon: Wrench, hasSubmenu: true, href: "/admin?tab=Tools" },
    ]

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r border-white/5 flex flex-col z-50">
            <div className="p-8 pb-4">
                <Link href="/admin?tab=Dashboard" className="flex items-center gap-2 mb-8 cursor-pointer">
                    <div className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="h-4 w-4 bg-primary rounded-full animate-pulse" />
                    </div>
                    <span className="font-black text-xl tracking-tighter uppercase text-white">
                        SKY<span className="text-primary italic">WHALE</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                {menuSections.map((item) => (
                    <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={activeTab === item.tabKey}
                        hasSubmenu={item.hasSubmenu}
                        href={item.href}
                    />
                ))}
            </nav>

            <div className="p-6 border-t border-white/5 bg-black/20">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Logout</span>
                </button>
            </div>
        </aside>
    )
}
