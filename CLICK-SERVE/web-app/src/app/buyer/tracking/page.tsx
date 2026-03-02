"use client"

import * as React from "react"
import { MapPin, Truck, Navigation, Clock, ShieldCheck, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TrackingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Live Tracking</h1>
                <p className="text-white/40 italic">Monitor your diesel shipments in real-time across Nigeria.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Tracking Card */}
                <Card className="lg:col-span-2 glass-panel border-primary/20 overflow-hidden relative min-h-[500px] bg-[#0A0A0B]">
                    {/* Stylized Map Background */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-full h-full max-w-2xl opacity-40" viewBox="0 0 800 600" fill="none">
                            {/* Lagos Grid Simulation */}
                            <path d="M100 100 L700 100 M100 200 L700 200 M100 300 L700 300 M100 400 L700 400 M100 500 L700 500" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                            <path d="M100 100 L100 500 M200 100 L200 500 M300 100 L300 500 M400 100 L400 500 M500 100 L500 500 M600 100 L600 500 M700 100 L700 500" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />

                            {/* Route Path */}
                            <path d="M150 450 Q 300 400, 450 350 T 650 200" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />

                            {/* Animated Truck Icon */}
                            <g className="animate-[move_10s_ease-in-out_infinite] alternate">
                                <circle cx="450" cy="350" r="12" fill="#FACC15" className="animate-pulse" />
                                <circle cx="450" cy="350" r="20" stroke="#FACC15" strokeWidth="1" opacity="0.4" className="animate-ping" />
                                <Truck className="h-6 w-6 text-black absolute" style={{ transform: 'translate(438px, 338px)' }} />
                            </g>

                            {/* Destination Marker */}
                            <g transform="translate(650, 200)">
                                <MapPin className="h-8 w-8 text-white animate-bounce" />
                            </g>
                        </svg>
                    </div>

                    {/* HUD Overlays */}
                    <div className="absolute top-6 left-6 space-y-4">
                        <div className="p-4 glass-panel border-white/10 z-10 bg-black/40 backdrop-blur-md rounded-2xl">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Current Speed</p>
                            <p className="text-2xl font-black text-white">42 <span className="text-xs text-white/40">KM/H</span></p>
                        </div>
                        <div className="p-4 glass-panel border-white/10 z-10 bg-black/40 backdrop-blur-md rounded-2xl">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Altitude</p>
                            <p className="text-2xl font-black text-white">12 <span className="text-xs text-white/40">M</span></p>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div className="p-4 glass-panel border-white/10 z-10 bg-black/40 backdrop-blur-md rounded-2xl flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">Signal: <span className="text-primary italic">Strong</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Live Telemetry</p>
                            <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-2/3 animate-[shimmer_2s_infinite]" />
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
                        @keyframes dash { to { stroke-dashoffset: -100; } }
                        @keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
                    `}</style>
                </Card>

                {/* Delivery Stats Side Panel */}
                <div className="space-y-6">
                    <Card className="glass-panel border-white/5">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase text-primary tracking-widest">In Transit</span>
                                <span className="text-xs font-mono text-white/20">#SW-992-XD</span>
                            </div>
                            <CardTitle className="text-xl font-bold flex items-center">
                                <Truck className="mr-2 h-5 w-5 text-primary" /> Lagos Hub Delivery
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                                <div className="relative">
                                    <div className="absolute -left-[26px] top-1 px-1 bg-background">
                                        <div className="h-3 w-3 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-sm font-bold text-white">Supplier Depot</p>
                                    <p className="text-xs text-white/40 italic font-medium">Lagos Island Hub • 08:30 AM</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[26px] top-1 px-1 bg-background">
                                        <div className="h-3 w-3 rounded-full bg-primary animate-ping" />
                                    </div>
                                    <p className="text-sm font-bold text-primary">Ikorodu Road</p>
                                    <p className="text-xs text-white/40 italic font-medium">En Route • 09:12 AM</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[26px] top-1 px-1 bg-background">
                                        <div className="h-3 w-3 rounded-full border-2 border-white/10" />
                                    </div>
                                    <p className="text-sm font-bold text-white/40">Buyer Destination</p>
                                    <p className="text-xs text-white/20 italic font-medium">Victoria Island Hub</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">ETA</p>
                                    <p className="text-lg font-bold text-white flex items-center italic">
                                        <Clock className="mr-1.5 h-4 w-4 text-amber-500" /> ~22 Min
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Safety</p>
                                    <p className="text-lg font-bold text-white flex items-center italic">
                                        <ShieldCheck className="mr-1.5 h-4 w-4 text-primary" /> Secured
                                    </p>
                                </div>
                            </div>

                            <Button className="w-full h-12 font-bold italic" variant="outline">
                                Contact Driver <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="glass-panel border-primary/10 bg-primary/5 overflow-hidden">
                        <CardHeader className="pb-2">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Shipment Health</span>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-white/30 uppercase">Temp</p>
                                <p className="text-sm font-black text-white">18.4°C</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-white/30 uppercase">Pressure</p>
                                <p className="text-sm font-black text-white">32 PSI</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-white/30 uppercase">Seal</p>
                                <p className="text-[10px] font-black text-green-500 uppercase italic">Intact</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-white/30 uppercase">Quality</p>
                                <p className="text-[10px] font-black text-primary uppercase italic">Premium</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-6 rounded-2xl bg-[#111113] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform">
                            <ShieldCheck className="h-12 w-12 text-primary" />
                        </div>
                        <p className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-2">Security Notice</p>
                        <p className="text-[11px] text-white/60 leading-relaxed italic">
                            All Click & Serve shipments are GPS tagged and monitored 24/7 for quality and safety assurance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
