"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Star, ShieldCheck, Zap, ArrowRight, Filter, SortAsc, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Supplier {
    id: number;
    name: string;
    location: string;
    price: string;
    rating: string;
    status: string;
    color: string;
    logo: string;
}

const suppliers: Supplier[] = [
    // ... (suppliers array remains unchanged)
]

export default function MarketplacePage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredSuppliers = suppliers.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleOrderAction = () => {
        if (!session) {
            router.push("/login")
        } else {
            router.push("/buyer/order")
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-primary pt-20 pb-40 px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="container mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 text-black text-xs font-black uppercase tracking-widest mb-6">
                        <ShieldCheck className="h-4 w-4" />
                        Verified Suppliers Only
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase mb-6 leading-none">
                        Diesel <span className="italic text-white">Marketplace</span>
                    </h1>
                    <p className="text-black/60 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
                        Find and compare 20+ verified diesel suppliers across Nigeria. Get the best rates and fastest delivery for your business.
                    </p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="container mx-auto px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-[32px] shadow-2xl shadow-primary/10 p-4 md:p-8 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-8 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search by name or location (e.g. Lagos, Abuja)..."
                                className="pl-16 h-16 bg-gray-50 border-none rounded-2xl text-sm font-bold placeholder:text-gray-300 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Button variant="outline" className="w-full h-16 border-gray-100 rounded-2xl text-sm font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                        <div className="md:col-span-2">
                            <Button className="w-full h-16 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 group hover:scale-105 transition-all">
                                <SortAsc className="mr-2 h-4 w-4" />
                                Sort
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 mb-32 group">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
                                {filteredSuppliers.length} Available <span className="text-primary italic">Partners</span>
                            </h2>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Live rates updated 5 mins ago</p>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-2 w-2 rounded-full bg-gray-200" />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredSuppliers.map((supplier) => (
                            <div key={supplier.id} className="group bg-white rounded-[40px] p-6 border border-transparent hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer relative">
                                <div className="absolute top-6 right-6">
                                    <div className="bg-primary/10 text-primary text-[10px] font-black uppercase px-3 py-1 rounded-full border border-primary/20">
                                        {supplier.status}
                                    </div>
                                </div>

                                <div className={cn("h-16 w-16 rounded-2xl mb-6 flex items-center justify-center text-white font-black text-xl shadow-lg", supplier.color)}>
                                    {supplier.logo}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-black text-gray-800 tracking-tight group-hover:text-primary transition-colors uppercase">
                                            {supplier.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                                            <MapPin className="h-3 w-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{supplier.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 py-4 border-y border-gray-50">
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price / L</p>
                                            <p className="text-xl font-black text-gray-800 tracking-tighter">₦ {supplier.price}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="text-xs font-black">{supplier.rating}</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-gray-300 uppercase mt-1">120+ Orders</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleOrderAction}
                                        className={cn(
                                            "w-full font-black uppercase tracking-widest rounded-2xl h-12 transition-all border-none group-hover:shadow-lg group-hover:shadow-primary/20",
                                            session ? "bg-gray-50 hover:bg-primary text-gray-400 hover:text-black" : "bg-primary text-black hover:scale-[1.02]"
                                        )}
                                    >
                                        {session ? (
                                            <>Order Now <ArrowRight className="ml-2 h-4 w-4" /></>
                                        ) : (
                                            <>Login / Sign Up <LogIn className="ml-2 h-4 w-4" /></>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredSuppliers.length === 0 && (
                        <div className="py-40 text-center animate-in fade-in zoom-in duration-500">
                            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 grayscale opacity-50">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">No suppliers found</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}
