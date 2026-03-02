"use client"

import React from "react"
import { MoreVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Joinings Area Chart */}
            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-0">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Joinings</CardTitle>
                    <MoreVertical className="h-5 w-5 text-gray-300 cursor-pointer" />
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="h-[300px] w-full mt-4 relative">
                        {/* Mock Chart SVG */}
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="joinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                            {/* Grid Lines */}
                            {[20, 40, 60, 80].map(y => (
                                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f3f4f6" strokeWidth="0.5" />
                            ))}

                            {/* Area */}
                            <path
                                d="M0 90 Q 5 85, 10 80 T 20 60 T 30 70 T 40 40 T 50 85 T 60 75 T 70 50 T 80 80 T 90 60 T 100 80 V 100 H 0 Z"
                                fill="url(#joinGradient)"
                            />

                            {/* Line */}
                            <path
                                d="M0 90 Q 5 85, 10 80 T 20 60 T 30 70 T 40 40 T 50 85 T 60 75 T 70 50 T 80 80 T 90 60 T 100 80"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            {/* Data Points */}
                            <circle cx="40" cy="40" r="2.5" fill="#3b82f6" stroke="white" strokeWidth="1" />
                            <circle cx="70" cy="50" r="2.5" fill="#3b82f6" stroke="white" strokeWidth="1" />

                            {/* Tooltip Indicator */}
                            <line x1="40" y1="0" x2="40" y2="100" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" />
                            <rect x="30" y="25" width="20" height="10" rx="3" fill="#1e293b" />
                            <text x="40" y="32" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">Joinings</text>
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-300">
                            <span>2024 Nov</span>
                            <span>2024 Dec</span>
                            <span>2025 Jan</span>
                            <span>2025 Feb</span>
                            <span>2025 Mar</span>
                            <span>2025 Apr</span>
                            <span>2025 May</span>
                            <span>2025 Jun</span>
                            <span>2025 Jul</span>
                            <span>2025 Aug</span>
                            <span>2025 Sep</span>
                            <span>2025 Oct</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Income vs Commission Bar Chart */}
            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-0">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Income vs Commission</CardTitle>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#1e293b]" />
                            <span className="text-[10px] font-bold text-gray-400">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#9333ea]" />
                            <span className="text-[10px] font-bold text-gray-400">Commission</span>
                        </div>
                        <MoreVertical className="h-5 w-5 text-gray-300 cursor-pointer" />
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="h-[300px] w-full mt-4 relative">
                        {/* Mock Bar Chart */}
                        <div className="flex items-end justify-between h-5/6 px-2">
                            {[
                                { i: 40, c: 10 }, { i: 60, c: 15 }, { i: 100, c: 20 },
                                { i: 0, c: 0 }, { i: 90, c: 25 }, { i: 0, c: 0 },
                                { i: 0, c: 0 }, { i: 0, c: 0 }, { i: 0, c: 0 },
                                { i: 15, c: 5 }, { i: 8, c: 20 }, { i: 5, c: 10 }
                            ].map((data, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-0.5 w-full">
                                    <div className="flex gap-1 items-end">
                                        <div
                                            className="w-2 bg-[#1e293b] rounded-t-sm transition-all duration-500 hover:opacity-80"
                                            style={{ height: `${data.i}%` }}
                                        />
                                        <div
                                            className="w-2 bg-[#9333ea] rounded-t-sm transition-all duration-500 hover:opacity-80"
                                            style={{ height: `${data.c}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Horizontal Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none h-5/6 py-1">
                            {[1000, 800, 600, 400, 300, 200, 100, 0].map(val => (
                                <div key={val} className="w-full flex items-center gap-4">
                                    <span className="text-[10px] font-bold text-gray-300 w-6">{val}</span>
                                    <div className="flex-1 h-px bg-gray-50" />
                                </div>
                            ))}
                        </div>

                        {/* X-Axis Labels */}
                        <div className="flex justify-between mt-6 text-[10px] font-bold text-gray-300 pl-8">
                            <span>2024 Nov</span>
                            <span>2024 Dec</span>
                            <span>2025 Jan</span>
                            <span>2025 Feb</span>
                            <span>2025 Mar</span>
                            <span>2025 Apr</span>
                            <span>2025 May</span>
                            <span>2025 Jun</span>
                            <span>2025 Jul</span>
                            <span>2025 Aug</span>
                            <span>2025 Sep</span>
                            <span>2025 Oct</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
