"use client"

import * as React from "react"
import { MapPin, Truck } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function TransportCalculator() {
    const [calcData, setCalcData] = React.useState({
        address: "",
        distance: 0,
    })
    const [isCalculating, setIsCalculating] = React.useState(false)

    const handleAddressChange = (addr: string) => {
        setCalcData(prev => ({ ...prev, address: addr }))

        if (addr.length > 5) {
            setIsCalculating(true)
            const timer = setTimeout(() => {
                const mockDistance = Math.floor(addr.length * 0.8 + Math.random() * 5)
                setCalcData(prev => ({ ...prev, distance: mockDistance }))
                setIsCalculating(false)
            }, 800)
            return () => clearTimeout(timer)
        } else {
            setCalcData(prev => ({ ...prev, distance: 0 }))
        }
    }

    const transportRate = 70
    const totalDelivery = calcData.distance * transportRate

    return (
        <Card className="bg-secondary text-secondary-foreground border-none">
            <CardHeader>
                <CardTitle className="text-white">Transport Calculator</CardTitle>
                <CardDescription className="text-secondary-foreground/60 tracking-tight">Estimate your delivery costs instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold uppercase text-secondary-foreground/40">Delivery Address</label>
                        {isCalculating && (
                            <span className="text-[10px] text-primary font-bold animate-pulse">CALCULATING...</span>
                        )}
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <Input
                            className="bg-white/5 border-white/10 text-white pl-9 h-12"
                            placeholder="Enter full address"
                            value={calcData.address}
                            onChange={(e) => handleAddressChange(e.target.value)}
                        />
                    </div>
                </div>

                {calcData.distance > 0 && (
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between animate-in zoom-in duration-300">
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary/60" />
                            <span className="text-xs font-bold text-secondary-foreground/40 uppercase">Distance</span>
                        </div>
                        <span className="text-lg font-black text-primary">{calcData.distance} KM</span>
                    </div>
                )}

                <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-secondary-foreground/60">Rate per KM</span>
                        <span className="font-bold">₦{transportRate}</span>
                    </div>
                    <div className="flex justify-between text-base border-t border-white/10 pt-3">
                        <span className="text-secondary-foreground/80 font-bold">Total Delivery</span>
                        <span className="text-primary text-xl font-bold">₦{totalDelivery.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="bg-primary/20 text-primary border border-primary/20 p-3 rounded-lg w-full text-center text-sm font-bold">
                    Save 20–30% via Click & Serve Trucks
                </div>
            </CardFooter>
        </Card>
    )
}
