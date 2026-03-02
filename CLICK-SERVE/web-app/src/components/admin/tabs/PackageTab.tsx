"use client"

import React from "react"
import { Package as PackageIcon, Fuel } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PackageTabProps {
    stocks: any[]
}

export default function PackageTab({ stocks }: PackageTabProps) {
    const formatNaira = (amt: number) => `₦${Number(amt).toLocaleString()}`
    const totalStock = stocks.reduce((sum: number, s: any) => sum + Number(s.quantity), 0)
    const totalValue = stocks.reduce((sum: number, s: any) => sum + (Number(s.quantity) * Number(s.price)), 0)

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                        Package <span className="text-primary italic">Catalog</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">All stock across all suppliers</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-50"><PackageIcon className="h-6 w-6 text-blue-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Listings</p>
                            <h3 className="text-2xl font-black text-gray-800">{stocks.length}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-indigo-50"><Fuel className="h-6 w-6 text-indigo-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Volume</p>
                            <h3 className="text-2xl font-black text-gray-800">{totalStock.toLocaleString()}L</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm rounded-[20px]">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-emerald-50"><PackageIcon className="h-6 w-6 text-emerald-600" /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Value</p>
                            <h3 className="text-2xl font-black text-emerald-600">{formatNaira(totalValue)}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Supplier</th>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Quantity</th>
                                    <th className="px-6 py-4">Unit</th>
                                    <th className="px-6 py-4">Price/Unit</th>
                                    <th className="px-6 py-4">Total Value</th>
                                    <th className="px-6 py-4">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stocks.map((s: any) => (
                                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">{s.user?.name || "Unknown"}</td>
                                        <td className="px-6 py-4 text-primary font-medium">{s.product}</td>
                                        <td className="px-6 py-4 font-bold">{Number(s.quantity).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-500 uppercase text-xs font-bold">{s.unit}</td>
                                        <td className="px-6 py-4 font-bold">{formatNaira(Number(s.price))}</td>
                                        <td className="px-6 py-4 font-black text-emerald-600">{formatNaira(Number(s.quantity) * Number(s.price))}</td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(s.lastUpdated).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {stocks.length === 0 && (
                                    <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-300 font-bold uppercase text-xs">No stock listings</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
