"use client"

import React from "react"
import { UserCog, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ProfileTabProps {
    users: any[]
}

export default function ProfileTab({ users }: ProfileTabProps) {
    const [search, setSearch] = React.useState("")

    const filtered = users.filter((u: any) =>
        (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.role || "").toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                        Profile <span className="text-primary italic">Management</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Manage all user profiles</p>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                    <UserCog className="h-5 w-5 text-primary" />
                    <span className="text-sm font-black text-primary">{users.length} Users</span>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                <Input
                    placeholder="Search users by name, email, or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-11 h-12 bg-white border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300"
                />
            </div>

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
                                    <th className="px-6 py-4">Stocks</th>
                                    <th className="px-6 py-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("h-9 w-9 rounded-full flex items-center justify-center font-black text-xs border-2 border-white shadow-sm",
                                                    user.role === "ADMIN" ? "bg-red-50 text-red-600" : user.role === "SUPPLIER" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                                                )}>
                                                    {(user.name || "?").split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-gray-800">{user.name || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                user.role === "ADMIN" ? "bg-red-500/10 text-red-600" :
                                                    user.role === "SUPPLIER" ? "bg-purple-500/10 text-purple-600" :
                                                        "bg-blue-500/10 text-blue-600"
                                            )}>{user.role}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{(user._count?.orders || 0) + (user._count?.supplierOrders || 0)}</td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{user._count?.stocks || 0}</td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-300 font-bold uppercase text-xs">No users match your search</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
