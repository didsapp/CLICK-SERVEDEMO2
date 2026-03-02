"use client"

import React from "react"
import {
    LayoutDashboard,
    DollarSign,
    Maximize,
    Bell,
    Moon,
    ChevronDown,
    Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession, signOut } from "next-auth/react"

interface HeaderProps {
    onSearch?: (query: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
    const { data: session } = useSession()
    const user = session?.user

    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500">DASHBOARD</span>
                </div>

                <div className="hidden xl:flex items-center relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search records..."
                        className="pl-10 h-9 w-64 bg-gray-50 border-none rounded-xl text-xs font-bold placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-[10px] font-bold group-hover:text-primary transition-colors">NGN</span>
                        <ChevronDown className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group">
                        <div className="h-4 w-6 bg-red-600 rounded-sm overflow-hidden border border-gray-200">
                            <div className="h-full w-full flex">
                                <div className="bg-green-700 w-1/3 h-full"></div>
                                <div className="bg-white w-1/3 h-full"></div>
                                <div className="bg-green-700 w-1/3 h-full"></div>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold group-hover:text-primary transition-colors">NGR</span>
                        <ChevronDown className="h-3 w-3" />
                    </div>
                    <Maximize className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                </div>

                <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
                    <div className="relative cursor-pointer group">
                        <Bell className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold leading-none">4</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {
                        if (confirm("Are you sure you want to terminate your session?")) {
                            signOut({ callbackUrl: "/" })
                        }
                    }}>
                        <div className="h-9 w-9 rounded-full bg-gray-100 border-2 border-primary/20 p-0.5 group-hover:border-primary transition-all overflow-hidden">
                            <div className="h-full w-full rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'AU'}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-gray-800 tracking-tight">{user?.name || "Admin User"}</span>
                            <span className="text-[9px] font-bold text-gray-400 leading-none">{(user as any)?.role || "Super Admin"}</span>
                        </div>
                    </div>

                    <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                        <Moon className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
                    </div>
                </div>
            </div>
        </header >
    )
}
