"use client"

import React from "react"
import { MoreVertical, User, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PerformanceSectionProps {
    searchQuery?: string
}

export default function PerformanceSection({ searchQuery = "" }: PerformanceSectionProps) {
    const [performanceTab, setPerformanceTab] = React.useState("Top Earners")

    const earners = [
        { id: "INF04512451", name: "Shane Ibarra", amount: "24", avatar: "SI" },
        { id: "INF04501056", name: "Cathy Todd", amount: "18", avatar: "CT" },
        { id: "INF00123", name: "John Smith", amount: "10", avatar: "JS" },
        { id: "INF04519752", name: "Cynthia Coleman", amount: "8", avatar: "CC" }
    ].filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.id.toLowerCase().includes(searchQuery.toLowerCase()))

    const newMembers = [
        { name: "John", id: "INF00123", avatar: "J" },
        { name: "Christopher", id: "INF04538908", avatar: "C" },
        { name: "Cathy", id: "INF04501056", avatar: "Ca" },
        { name: "Shane", id: "INF04512451", avatar: "S" },
        { name: "Robert", id: "INF04491288", avatar: "R" }
    ].filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.id.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Team Performance */}
            <Card className="lg:col-span-8 bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Team Performance</CardTitle>
                    <MoreVertical className="h-5 w-5 text-gray-300 cursor-pointer" />
                </CardHeader>
                <CardContent className="px-8 pb-8 flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col gap-3 w-full md:w-48">
                        {["Top Earners", "Top Recruiters", "Package Overview"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setPerformanceTab(tab)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left",
                                    performanceTab === tab
                                        ? "bg-primary text-black shadow-lg shadow-primary/20"
                                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 space-y-4">
                        {earners.map((earner, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary border-2 border-white shadow-sm">
                                        {earner.avatar}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 leading-none mb-1">{earner.id}</p>
                                        <p className="text-sm font-black text-gray-800">{earner.name}</p>
                                    </div>
                                </div>
                                <div className="bg-primary/5 px-4 py-2 rounded-xl group-hover:bg-primary/10 transition-all">
                                    <span className="text-sm font-black text-gray-800">₦ {earner.amount}</span>
                                </div>
                            </div>
                        ))}
                        {earners.length === 0 && (
                            <p className="text-center text-xs font-bold text-gray-300 py-10 uppercase">No earners found</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* New Members */}
            <Card className="lg:col-span-4 bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">New Members</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {newMembers.map((member, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
                                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center font-black text-indigo-400 border-2 border-white shadow-sm shrink-0">
                                    {member.avatar}
                                </div>
                                <div className="flex-1 border-b border-gray-50 pb-2 group-last:border-none">
                                    <p className="text-sm font-black text-gray-800 leading-none mb-1">{member.name}</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{member.id}</span>
                                    </div>
                                </div>
                                <MoreVertical className="h-4 w-4 text-gray-200 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                        ))}
                        {newMembers.length === 0 && (
                            <p className="text-center text-xs font-bold text-gray-300 py-10 uppercase">Empty</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
