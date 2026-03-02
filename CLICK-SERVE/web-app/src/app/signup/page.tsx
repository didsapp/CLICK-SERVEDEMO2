"use client"

import * as React from "react"
import {
    User,
    Building2,
    Mail,
    Lock,
    Phone,
    Fingerprint,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Truck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Signup() {
    const [isSupplier, setIsSupplier] = React.useState(false)
    const [formData, setFormData] = React.useState({
        fullName: "",
        email: "",
        nin: "",
        phone: "",
        companyName: "",
        cacNumber: "",
        identity: "",
        businessEmail: "",
        password: "",
        confirmPassword: ""
    })
    const [buyerStep, setBuyerStep] = React.useState(1)
    const [supplierStep, setSupplierStep] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(false)

    const [error, setError] = React.useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!")
            return
        }

        setIsLoading(true)

        try {
            const signupData = {
                email: isSupplier ? formData.businessEmail : formData.email,
                password: formData.password,
                name: isSupplier ? formData.companyName : formData.fullName,
                role: isSupplier ? "SUPPLIER" : "BUYER",
            }

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            setIsLoading(false)
            alert("Registration successful! Please log in.")
            window.location.href = "/login"
        } catch (err: any) {
            setIsLoading(false)
            setError(err.message)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
            <div className={cn(
                "relative w-full max-w-5xl h-[700px] bg-card rounded-[40px] shadow-2xl overflow-hidden flex transition-all duration-700 ease-in-out border border-white/5",
                isSupplier ? "flex-row-reverse" : "flex-row"
            )}>

                {/* --- FORMS CONTAINER --- */}
                <div className="w-full md:w-1/2 h-full relative z-10 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar">

                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                                <Truck className="h-5 w-5 text-black" />
                            </div>
                            <span className="font-black text-xl tracking-tighter">CLICK<span className="text-primary">-SERVE</span></span>
                        </Link>
                        <h2 className="text-3xl font-black mb-2">
                            {isSupplier ? "Supplier Registration" : "Buyer Registration"}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            {isSupplier ? "Partner with us to supply premium diesel." : "Get reliable diesel delivery at the best market rates."}
                        </p>
                        {error && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold animate-in fade-in zoom-in duration-300">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Multi-step Form Content */}
                    <form onSubmit={handleSignup} className="space-y-6">

                        {/* BUYER STEPS */}
                        {!isSupplier && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                {buyerStep === 1 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your official name" className="pl-10 h-12 bg-white/5 border-white/10" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="name@company.com" className="pl-10 h-12 bg-white/5 border-white/10" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {buyerStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Verification (NIN)</label>
                                            <div className="relative">
                                                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="nin" value={formData.nin} onChange={handleInputChange} placeholder="Enter 11-digit NIN" className="pl-10 h-12 bg-white/5 border-white/10" maxLength={11} />
                                            </div>
                                            <p className="text-[10px] text-muted-foreground italic">Your identity is securely verified via NIMC.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+234..." className="pl-10 h-12 bg-white/5 border-white/10" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input required name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="pl-10 h-12 bg-white/5 border-white/10" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Confirm</label>
                                                <div className="relative">
                                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input required name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="pl-10 h-12 bg-white/5 border-white/10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 flex items-center justify-between">
                                    {buyerStep > 1 && (
                                        <Button type="button" variant="ghost" className="font-bold text-muted-foreground" onClick={() => setBuyerStep(prev => prev - 1)}>
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>
                                    )}
                                    <div className="flex-1" />
                                    {buyerStep < 2 ? (
                                        <Button type="button" className="font-black uppercase h-12 px-8" onClick={() => setBuyerStep(2)}>
                                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button className="font-black uppercase h-12 px-8 shadow-lg shadow-primary/20" disabled={isLoading}>
                                            {isLoading ? "Verifying..." : "Complete Signup"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* SUPPLIER STEPS */}
                        {isSupplier && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                                {supplierStep === 1 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Company Name</label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="As registered with CAC" className="pl-10 h-12 bg-white/5 border-white/10" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">CAC Registration Number</label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="cacNumber" value={formData.cacNumber} onChange={handleInputChange} placeholder="RC1234567" className="pl-10 h-12 bg-white/5 border-white/10" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {supplierStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Identity (NIN/BVN)</label>
                                            <div className="relative">
                                                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="identity" value={formData.identity} onChange={handleInputChange} placeholder="Enter BVN or NIN" className="pl-10 h-12 bg-white/5 border-white/10" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Business Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input required name="businessEmail" type="email" value={formData.businessEmail} onChange={handleInputChange} placeholder="ops@company.com" className="pl-10 h-12 bg-white/5 border-white/10" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input required name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="pl-10 h-12 bg-white/5 border-white/10" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Confirm</label>
                                                <div className="relative">
                                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input required name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="pl-10 h-12 bg-white/5 border-white/10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 flex items-center justify-between">
                                    {supplierStep > 1 && (
                                        <Button type="button" variant="ghost" className="font-bold text-muted-foreground" onClick={() => setSupplierStep(prev => prev - 1)}>
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>
                                    )}
                                    <div className="flex-1" />
                                    {supplierStep < 2 ? (
                                        <Button type="button" className="font-black uppercase h-12 px-8" onClick={() => setSupplierStep(2)}>
                                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button className="font-black uppercase h-12 px-8 shadow-lg shadow-primary/20" disabled={isLoading}>
                                            {isLoading ? "Verifying..." : "Join Platform"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </form>

                    {/* Step Indicators */}
                    <div className="mt-auto pt-10 flex justify-center space-x-2">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    (isSupplier ? supplierStep : buyerStep) === i ? "w-8 bg-primary" : "w-1.5 bg-white/10"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* --- SLIDING OVERLAY CONTAINER --- */}
                <div className={cn(
                    "hidden md:flex absolute top-0 w-1/2 h-full z-20 transition-all duration-700 ease-in-out items-center justify-center p-12 overflow-hidden",
                    isSupplier ? "right-1/2 rounded-r-[40px] bg-primary" : "left-1/2 rounded-l-[40px] bg-primary"
                )}>
                    {/* Animated Background Icons */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <Truck className="absolute -top-10 -left-10 h-40 w-40 rotate-12" />
                        <Building2 className="absolute -bottom-10 -right-10 h-40 w-40 -rotate-12" />
                        <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 opacity-20" />
                    </div>

                    <div className="relative z-10 text-center text-black">
                        <h3 className="text-4xl font-black mb-4 leading-tight">
                            {isSupplier ? "Are you a Buyer?" : "Apply as a Supplier?"}
                        </h3>
                        <p className="text-black/60 font-bold mb-8 max-w-[280px] mx-auto">
                            {isSupplier
                                ? "Register here if you want to purchase diesel for your trucks or operations."
                                : "Join the most trusted network of diesel suppliers in Nigeria today."}
                        </p>
                        <Button
                            variant="outline"
                            className="h-14 px-10 border-black/20 bg-transparent text-black hover:bg-black hover:text-primary border-4 font-black uppercase text-base rounded-2xl"
                            onClick={() => setIsSupplier(!isSupplier)}
                        >
                            {isSupplier ? "Login as Buyer" : "Join as Supplier"}
                        </Button>
                    </div>
                </div>

                {/* Mobile Toggle (Only visible on small screens) */}
                <div className="md:hidden absolute bottom-0 left-0 w-full p-4 bg-primary/10 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Switch Role Account
                    </span>
                    <Button variant="outline" size="sm" className="font-black uppercase border-primary text-primary" onClick={() => setIsSupplier(!isSupplier)}>
                        {isSupplier ? "I'm a Buyer" : "I'm a Supplier"}
                    </Button>
                </div>

            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    )
}
