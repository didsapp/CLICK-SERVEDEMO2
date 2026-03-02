"use client"

import React from "react"
import { Users, Building2, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NetworksTabProps {
    users: any[]
}

export default function NetworksTab({ users }: NetworksTabProps) {
    const [filter, setFilter] = React.useState<"ALL" | "BUYER" | "SUPPLIER">("ALL")

    const filtered = filter === "ALL" ? users.filter((u: any) => u.role !== "ADMIN") : users.filter((u: any) => u.role === filter)
    const buyerCount = users.filter((u: any) => u.role === "BUYER").length
    const supplierCount = users.filter((u: any) => u.role === "SUPPLIER").length

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    Network <span className="text-primary italic">Directory</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">All buyers and suppliers on the platform</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="bg-white border-none shadow-sm rounded-[20px] cursor-pointer hover:shadow-md transition-all" onClick={() => setFilter("ALL")}>
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-gray-50"><Users className="h-6 w-6 text-gray-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Network</p>
                            <h3 className="text-2xl font-black text-gray-800">{buyerCount + supplierCount}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px] cursor-pointer hover:shadow-md transition-all" onClick={() => setFilter("BUYER")}>
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-50"><ShoppingBag className="h-6 w-6 text-blue-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Buyers</p>
                            <h3 className="text-2xl font-black text-gray-800">{buyerCount}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px] cursor-pointer hover:shadow-md transition-all" onClick={() => setFilter("SUPPLIER")}>
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-purple-50"><Building2 className="h-6 w-6 text-purple-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Suppliers</p>
                            <h3 className="text-2xl font-black text-gray-800">{supplierCount}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {(["ALL", "BUYER", "SUPPLIER"] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={cn(
                        "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                        filter === f ? "bg-primary text-black shadow-lg shadow-primary/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    )}>{f === "ALL" ? "All Users" : f + "S"}</button>
                ))}
            </div>

            {/* Users Table */}
            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Orders</th>
                                    <th className="px-6 py-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                                    {(user.name || "?").split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-gray-800">{user.name || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                user.role === "BUYER" ? "bg-blue-500/10 text-blue-600" : "bg-purple-500/10 text-purple-600"
                                            )}>{user.role}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{user._count?.orders || user._count?.supplierOrders || 0}</td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-300 font-bold uppercase text-xs">No users found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
