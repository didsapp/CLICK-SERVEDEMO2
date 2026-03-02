"use client"

import React from "react"
import { UserPlus, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SignUpTabProps {
    users: any[]
}

export default function SignUpTab({ users }: SignUpTabProps) {
    const sortedUsers = [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                        Sign Up <span className="text-primary italic">Registry</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">All user registrations on the platform</p>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                    <UserPlus className="h-5 w-5 text-primary" />
                    <span className="text-sm font-black text-primary">{users.length} Total Users</span>
                </div>
            </div>

            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Registered</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {sortedUsers.map((user: any, i: number) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-300 font-bold">{i + 1}</td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{user.name || "N/A"}</td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                user.role === "BUYER" ? "bg-blue-500/10 text-blue-600" :
                                                    user.role === "SUPPLIER" ? "bg-purple-500/10 text-purple-600" :
                                                        "bg-red-500/10 text-red-600"
                                            )}>{user.role}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {new Date(user.createdAt).toLocaleDateString()} {new Date(user.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600">Active</span>
                                        </td>
                                    </tr>
                                ))}
                                {sortedUsers.length === 0 && (
                                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-300 font-bold uppercase text-xs">No registrations found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
