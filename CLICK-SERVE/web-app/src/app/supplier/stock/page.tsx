"use client"

import * as React from "react"
import { Fuel, Plus, Save, TrendingUp, AlertTriangle, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function StockManagement() {
    const [isSaving, setIsSaving] = React.useState(false)
    const [stockData, setStockData] = React.useState({
        density: "84.5",
        price: "1250",
        quantity: "85000"
    })

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            alert("Stock levels and pricing updated successfully!")
        }, 1000)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
                    <p className="text-muted-foreground">Monitor and update your fuel inventory and market pricing.</p>
                </div>
                <Button className="h-12 px-6 font-bold" onClick={() => alert("Opening 'Add Bulk Stock' modal...")}>
                    <Plus className="mr-2 h-5 w-5" /> Add New Batch
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-primary/10 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                            <Fuel className="mr-2 h-6 w-6 text-primary" /> Active Inventory Control
                        </CardTitle>
                        <CardDescription>Update your density, price per liter, and available volume below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Efficiency Density</label>
                                <Input
                                    className="h-14 text-lg font-bold bg-white/5 border-white/10"
                                    value={stockData.density}
                                    onChange={(e) => setStockData({ ...stockData, density: e.target.value })}
                                />
                                <p className="text-[10px] text-muted-foreground italic">Standard Nigerian AGO range: 820-860 kg/m³</p>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Market Price (₦/L)</label>
                                <Input
                                    className="h-14 text-2xl font-black text-primary bg-white/5 border-white/10"
                                    value={stockData.price}
                                    onChange={(e) => setStockData({ ...stockData, price: e.target.value })}
                                />
                                <p className="text-[10px] text-primary/60 font-bold uppercase tracking-tighter">Real-time market rate active</p>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Available Qty (L)</label>
                                <Input
                                    className="h-14 text-lg font-bold bg-white/5 border-white/10"
                                    value={stockData.quantity}
                                    onChange={(e) => setStockData({ ...stockData, quantity: e.target.value })}
                                />
                                <p className="text-[10px] text-muted-foreground italic">Capacity: 500,000 Liters</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex justify-end">
                            <Button size="lg" className="h-14 px-10 font-black uppercase shadow-lg shadow-primary/20" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Updating System..." : <><Save className="mr-2 h-5 w-5" /> Save Changes</>}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-secondary text-secondary-foreground border-none">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Market Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                <span className="text-white/40">Average Regional Price</span>
                                <span className="font-bold">₦1,245 /L</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                <span className="text-white/40">Highest Demand Hub</span>
                                <span className="font-bold text-primary">Lagos Island</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white/40">Your Price Position</span>
                                <span className="font-bold uppercase text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Competitive</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-amber-500/5 border-amber-500/10">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-amber-900 uppercase tracking-tight">Stock Warning</p>
                                    <p className="text-xs text-amber-800/70 leading-relaxed">Your inventory is currently at <strong>17%</strong>. Automated refill suggestions are active based on your ₦145M monthly volume.</p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full border-amber-500/20 text-amber-600 hover:bg-amber-500/10 font-bold">
                                Order Refill Now
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Past Stock Updates */}
            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader>
                    <CardTitle>Inventory History</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Action</th>
                                    <th className="px-6 py-3">Density</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3 text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">Oct 24, 2023 - 09:15 AM</td>
                                    <td className="px-6 py-4 font-bold text-primary">Manual Update</td>
                                    <td className="px-6 py-4">84.5</td>
                                    <td className="px-6 py-4">₦1,250</td>
                                    <td className="px-6 py-4 text-right"><Button variant="link" size="sm">View Log</Button></td>
                                </tr>
                                <tr className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">Oct 23, 2023 - 14:30 PM</td>
                                    <td className="px-6 py-4 font-bold text-blue-500">Refill Batch #921</td>
                                    <td className="px-6 py-4">83.9</td>
                                    <td className="px-6 py-4">₦1,240</td>
                                    <td className="px-6 py-4 text-right"><Button variant="link" size="sm">View Log</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
