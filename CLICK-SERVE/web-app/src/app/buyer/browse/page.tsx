"use client"

import * as React from "react"
import { Search, MapPin, Star, Filter, Droplets, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const SUPPLIERS = [
    { id: 1, name: "FuelPro Supplies", price: 1250, density: 84.5, rating: 4.8, reviews: 124, eta: "25 min", location: "Lagos Island" },
    { id: 2, name: "Naija Diesel", price: 1245, density: 83.2, rating: 4.5, reviews: 89, eta: "40 min", location: "Ikeja" },
    { id: 3, name: "Swift Logistics", price: 1260, density: 85.0, rating: 4.9, reviews: 256, eta: "15 min", location: "Lekki" },
    { id: 4, name: "Sahara Energy", price: 1255, density: 84.1, rating: 4.7, reviews: 432, eta: "30 min", location: "Apapa" },
    { id: 5, name: "Oando Retail", price: 1248, density: 83.8, rating: 4.6, reviews: 567, eta: "35 min", location: "Victoria Island" },
]

export default function BrowseSuppliersPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Browse Suppliers</h1>
                    <p className="text-muted-foreground">Find the best rates and quality diesel from verified suppliers.</p>
                </div>
                <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-primary italic">Showing results for Lagos</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50" placeholder="Search by supplier name..." />
                </div>
                <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {SUPPLIERS.map((s) => (
                    <Card key={s.id} className="glass-panel group hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex items-center space-x-6">
                                    <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform">
                                        <Droplets className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{s.name}</h3>
                                        <div className="flex items-center space-x-4 mt-1">
                                            <div className="flex items-center text-amber-500">
                                                <Star className="h-4 w-4 fill-current mr-1" />
                                                <span className="text-sm font-bold">{s.rating}</span>
                                                <span className="text-xs text-white/40 ml-1">({s.reviews} reviews)</span>
                                            </div>
                                            <div className="flex items-center text-white/40 text-sm">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                <span>{s.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-8 lg:text-right">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Efficiency</p>
                                        <p className="text-sm font-bold text-white">Density {s.density}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Arrival</p>
                                        <p className="text-sm font-bold text-white">~{s.eta}</p>
                                    </div>
                                    <div className="min-w-[120px]">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Market Rate</p>
                                        <p className="text-3xl font-black text-primary">₦{s.price}</p>
                                    </div>
                                    <Button className="h-14 px-8 font-black uppercase tracking-tight shadow-lg shadow-primary/10" asChild>
                                        <Link href="/buyer/order">Order Now <ChevronRight className="ml-1 h-5 w-5" /></Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
