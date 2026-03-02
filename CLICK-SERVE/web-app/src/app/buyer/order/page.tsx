"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Truck,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    UserCheck,
    Droplets,
    Calculator,
    ArrowRight,
    Search,
    Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { placeOrder, getAvailableSuppliers } from "./actions"

interface SupplierStock {
    supplierId: string
    supplierName: string
    product: string
    price: number
    availableQty: number
    unit: string
}

const STEPS = [
    { id: "start", title: "Start" },
    { id: "identity", title: "Identity" },
    { id: "city", title: "Select City" },
    { id: "supplier", title: "Browse Suppliers" },
    { id: "quantity", title: "Enter Quantity" },
    { id: "credit", title: "Check Credit" },
    { id: "finish", title: "Finish" }
]

const CITIES = ["Lagos", "Abuja", "Kano", "Port Harcourt"]

export default function OrderFlowPage() {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [orderData, setOrderData] = React.useState<{
        city: string
        supplier: SupplierStock | null
        quantity: number
        address: string
        distance: number
    }>({
        city: "",
        supplier: null,
        quantity: 0,
        address: "",
        distance: 0,
    })
    const [isCalculating, setIsCalculating] = React.useState(false)
    const [suppliers, setSuppliers] = React.useState<SupplierStock[]>([])
    const [isLoadingSuppliers, setIsLoadingSuppliers] = React.useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = React.useState(false)
    const [orderResult, setOrderResult] = React.useState<{ orderId?: string; total?: number; error?: string } | null>(null)

    const router = useRouter()

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

    // Fetch suppliers from DB when reaching the supplier step
    React.useEffect(() => {
        if (currentStep === 3 && suppliers.length === 0) {
            setIsLoadingSuppliers(true)
            getAvailableSuppliers().then(data => {
                setSuppliers(data)
                setIsLoadingSuppliers(false)
            })
        }
    }, [currentStep, suppliers.length])

    // Handle address change and simulate distance calculation
    const handleAddressChange = (addr: string) => {
        setOrderData(prev => ({ ...prev, address: addr }))

        if (addr.length > 5) {
            setIsCalculating(true)
            const timer = setTimeout(() => {
                const mockDistance = Math.floor(addr.length * 0.8 + Math.random() * 5)
                setOrderData(prev => ({ ...prev, distance: mockDistance }))
                setIsCalculating(false)
            }, 800)
            return () => clearTimeout(timer)
        } else {
            setOrderData(prev => ({ ...prev, distance: 0 }))
        }
    }

    // Handle order placement
    const handlePlaceOrder = async () => {
        if (!orderData.supplier) return
        setIsPlacingOrder(true)
        try {
            const result = await placeOrder({
                supplierId: orderData.supplier.supplierId,
                product: orderData.supplier.product,
                quantity: orderData.quantity,
                pricePerUnit: orderData.supplier.price,
                location: orderData.city,
                distance: orderData.distance,
            })
            setOrderResult(result)
            if (result.success) {
                nextStep()
            }
        } catch {
            setOrderResult({ error: "Something went wrong. Please try again." })
        } finally {
            setIsPlacingOrder(false)
        }
    }

    // Calculations
    const transportRate = 70
    const dieselCost = orderData.supplier ? orderData.supplier.price * orderData.quantity : 0
    const transportCost = orderData.distance * transportRate
    const platformFee = (dieselCost + transportCost) * 0.02
    const total = dieselCost + transportCost + platformFee
    const creditLimit = 10000000 // Will be checked server-side
    const isOverLimit = total > creditLimit

    return (
        <div className="max-w-4xl mx-auto py-12 px-8 min-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => currentStep === 0 ? router.back() : prevStep()}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="flex space-x-2">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1 w-8 rounded-full transition-all duration-500",
                                i <= currentStep ? "bg-primary" : "bg-white/10"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {currentStep === 0 && (
                        <div className="text-center space-y-8">
                            <div className="h-24 w-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                                <Truck className="h-12 w-12 text-primary" />
                            </div>
                            <h1 className="text-6xl font-black text-white tracking-tighter uppercase glass-font">Initiate Order</h1>
                            <p className="text-xl text-white/60 max-w-lg mx-auto leading-relaxed">Ready to secure your fuel? Our streamlined process ensures the best rates and fastest delivery.</p>
                            <Button size="lg" className="h-16 px-12 text-xl font-black uppercase shadow-2xl shadow-primary/20" onClick={nextStep}>
                                Start Process <ChevronRight className="ml-2 h-6 w-6" />
                            </Button>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="max-w-md mx-auto space-y-8">
                            <div className="text-center">
                                <UserCheck className="h-16 w-16 text-primary mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white mb-2">Verify Identity</h2>
                                <p className="text-white/40">Securing your session as a registered buyer.</p>
                            </div>
                            <Card className="glass-panel border-white/10">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="h-10 w-10 rounded-full bg-primary/20 mr-4 flex items-center justify-center">
                                            <span className="text-primary font-bold">✓</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">Verified Buyer</p>
                                            <p className="text-sm text-white/40 italic">Account Verified</p>
                                        </div>
                                        <CheckCircle2 className="ml-auto text-primary h-5 w-5" />
                                    </div>
                                    <Button className="w-full h-14 text-lg font-bold" onClick={nextStep}>
                                        Continue <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-12">
                            <div className="text-center">
                                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                                <h2 className="text-4xl font-bold text-white mb-2 uppercase tracking-tight">Deployment Hub</h2>
                                <p className="text-white/60">Where should we deliver your diesel?</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {CITIES.map(city => (
                                    <button
                                        key={city}
                                        onClick={() => { setOrderData({ ...orderData, city }); nextStep(); }}
                                        className={cn(
                                            "h-24 rounded-2xl border transition-all duration-300 flex items-center justify-center text-xl font-bold uppercase tracking-wider",
                                            orderData.city === city
                                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                        )}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <Search className="h-16 w-16 text-primary mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white">Verified Suppliers in {orderData.city}</h2>
                                <p className="text-white/40 italic">Real-time market rates and availability.</p>
                            </div>
                            {isLoadingSuppliers ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                                    <span className="ml-4 text-white/60 text-lg">Loading suppliers...</span>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {suppliers.map((s, i) => (
                                        <button
                                            key={`${s.supplierId}-${s.product}-${i}`}
                                            onClick={() => { setOrderData({ ...orderData, supplier: s }); nextStep(); }}
                                            className="w-full p-6 h-24 rounded-2xl glass-panel flex items-center justify-between group hover:scale-[1.02] transition-transform"
                                        >
                                            <div className="flex items-center">
                                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20">
                                                    <Droplets className="text-primary h-6 w-6" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-white text-lg">{s.supplierName}</p>
                                                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{s.product} • {s.availableQty.toLocaleString()} {s.unit}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-primary">₦{s.price.toLocaleString()}</p>
                                                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Per Litre</p>
                                            </div>
                                        </button>
                                    ))}
                                    {suppliers.length === 0 && (
                                        <div className="text-center py-16 text-white/40 italic">No suppliers available at this time.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 4: QUANTITY & AUTOMATIC DISTANCE */}
                    {currentStep === 4 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Order Details</h2>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase text-white/40 tracking-widest">Diesel Quantity (Liters)</label>
                                        <Input
                                            type="number"
                                            className="h-16 bg-white/5 border-white/10 text-3xl font-bold text-primary focus:border-primary/50"
                                            placeholder="Ex: 5000"
                                            max={orderData.supplier?.availableQty}
                                            onChange={(e) => setOrderData({ ...orderData, quantity: Number(e.target.value) })}
                                            autoFocus
                                        />
                                        {orderData.supplier && (
                                            <p className="text-xs text-white/30">Max available: {orderData.supplier.availableQty.toLocaleString()} {orderData.supplier.unit}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3 pt-4">
                                        <div className="flex justify-between items-end">
                                            <label className="text-xs font-black uppercase text-white/40 tracking-widest">Delivery Address</label>
                                            {isCalculating && (
                                                <span className="text-[10px] text-primary font-bold uppercase animate-pulse">Calculating Distance...</span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                                            <Input
                                                className="h-16 pl-12 bg-white/5 border-white/10 text-lg font-bold text-white"
                                                placeholder="Enter Full Delivery Address"
                                                value={orderData.address}
                                                onChange={(e) => handleAddressChange(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {orderData.distance > 0 && (
                                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between animate-in zoom-in duration-300">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                    <Truck className="h-4 w-4" />
                                                </div>
                                                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Estimated Distance</span>
                                            </div>
                                            <span className="text-xl font-black text-primary">{orderData.distance} KM</span>
                                        </div>
                                    )}

                                    <Button
                                        disabled={!orderData.quantity || orderData.quantity <= 0 || !orderData.distance || isCalculating}
                                        size="lg"
                                        className="w-full h-16 text-xl font-black uppercase mt-4 shadow-xl shadow-primary/10"
                                        onClick={nextStep}
                                    >
                                        Calculate Totals <ChevronRight className="ml-2 h-6 w-6" />
                                    </Button>
                                </div>
                            </div>

                            <Card className="glass-panel overflow-hidden border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <div className="bg-primary px-6 py-4 flex items-center justify-between">
                                    <h3 className="text-primary-foreground font-black uppercase text-sm tracking-widest flex items-center">
                                        <Calculator className="mr-2 h-4 w-4" /> System Calculation
                                    </h3>
                                    {isCalculating ? (
                                        <div className="flex gap-1">
                                            <div className="h-1 w-1 bg-black/40 rounded-full animate-bounce" />
                                            <div className="h-1 w-1 bg-black/40 rounded-full animate-bounce delay-75" />
                                            <div className="h-1 w-1 bg-black/40 rounded-full animate-bounce delay-150" />
                                        </div>
                                    ) : (
                                        <span className="text-[10px] bg-black/20 text-black px-2 py-1 rounded font-bold uppercase">Real-time</span>
                                    )}
                                </div>
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex justify-between items-center group">
                                        <span className="text-white/60 text-lg">Diesel Cost <span className="text-xs block text-white/20">{orderData.quantity}L x ₦{orderData.supplier?.price}</span></span>
                                        <span className="text-xl font-bold text-white">₦{dieselCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/60 text-lg">Transport Cost <span className="text-xs block text-white/20">{orderData.distance}KM x ₦{transportRate}</span></span>
                                        <span className="text-xl font-bold text-white">₦{transportCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-primary/80">
                                        <span className="text-lg">Platform Fee <span className="text-xs block opacity-50 font-bold uppercase">Fixed 2%</span></span>
                                        <span className="text-xl font-bold">₦{platformFee.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                        <div>
                                            <p className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">Total Value</p>
                                            <p className="text-4xl font-black text-primary">₦{total.toLocaleString()}</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-1">
                                            <CheckCircle2 className="text-primary/50 h-5 w-5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* STEP 5: CREDIT CHECK */}
                    {currentStep === 5 && (
                        <div className="max-w-2xl mx-auto space-y-12">
                            <div className="text-center">
                                <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
                                <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Financial Audit</h2>
                                <p className="text-white/60">Verifying your credit limit for this transaction.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-8 rounded-3xl glass-panel flex items-center justify-between border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-white/40 uppercase tracking-widest">Order Total</p>
                                        <p className="text-3xl font-bold text-primary">₦{total.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-xs font-black text-white/40 uppercase tracking-widest">Product</p>
                                        <p className="text-lg font-bold text-white">{orderData.supplier?.product}</p>
                                    </div>
                                </div>

                                {orderResult?.error ? (
                                    <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/30 space-y-6">
                                        <div className="flex items-center text-red-400">
                                            <AlertCircle className="mr-3 h-8 w-8" />
                                            <div>
                                                <p className="text-xl font-bold uppercase tracking-tight">Order Blocked</p>
                                                <p className="text-red-400/60 leading-tight">{orderResult.error}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full h-14 border-red-500/20 text-red-500 hover:bg-red-500/10" onClick={() => { setOrderResult(null); setCurrentStep(4); }}>
                                            Reduce Quantity
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="p-8 rounded-3xl bg-primary/10 border border-primary/30 space-y-6 shadow-[0_10px_40px_rgba(250,204,21,0.05)]">
                                        <div className="flex items-center text-primary">
                                            <CheckCircle2 className="mr-3 h-8 w-8" />
                                            <div>
                                                <p className="text-xl font-bold uppercase tracking-tight">Ready to Submit</p>
                                                <p className="text-primary/60 leading-tight">Your order will be verified and placed securely.</p>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full h-16 text-xl font-black uppercase"
                                            onClick={handlePlaceOrder}
                                            disabled={isPlacingOrder}
                                        >
                                            {isPlacingOrder ? (
                                                <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Placing Order...</>
                                            ) : (
                                                <>Place Order Now <ArrowRight className="ml-2 h-6 w-6" /></>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* STEP 6: FINISH */}
                    {currentStep === 6 && (
                        <div className="text-center space-y-10">
                            <div className="h-32 w-32 bg-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(250,204,21,0.4)] animate-pulse">
                                <CheckCircle2 className="h-20 w-20 text-primary-foreground" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-6xl font-black text-white tracking-widest uppercase glass-font">Order Placed</h1>
                                <p className="text-xl text-white/40 max-w-lg mx-auto italic">Your supply of {orderData.quantity}L is being processed for {orderData.city}.</p>
                            </div>
                            <Card className="max-w-md mx-auto glass-panel border-white/5">
                                <CardContent className="p-8 flex items-center justify-between">
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Order ID</p>
                                        <p className="font-mono text-primary font-bold">#{orderResult?.orderId?.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Total</p>
                                        <p className="font-bold text-white">₦{orderResult?.total?.toLocaleString()}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/10 text-white hover:bg-white/5" onClick={() => router.push("/buyer")}>
                                Return to Dashboard
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
