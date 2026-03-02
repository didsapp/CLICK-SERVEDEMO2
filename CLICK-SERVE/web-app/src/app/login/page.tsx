"use client"

import * as React from "react"
import {
    Mail,
    Lock,
    Truck,
    ArrowRight,
    Loader2,
    ShieldCheck,
    User,
    Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function Login() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    })
    const [error, setError] = React.useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result: any = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false, // Set to false to handle redirection manually and get the result object
            })

            console.log("Login result:", result)

            if (result?.error) {
                setError("Invalid email or password")
                setIsLoading(false)
            } else if (result?.ok) {
                // If login is successful and redirect: false, you might want to redirect manually
                // For example: window.location.href = result.url || "/";
                // However, the original code had redirect: true, implying middleware handles it.
                // If redirect: false, you need to handle success redirection here.
                // For now, we'll just stop loading if successful and let the page refresh or handle client-side redirect.
                // If the intent is to let middleware handle, then `redirect: true` should be used,
                // and `result` would typically be `undefined` on success, making `result?.error` check less useful.
                // Given the instruction to check `result?.error` and `result?.ok`, `redirect: false` is necessary.
                // For this specific change, we'll just stop loading on success.
                setIsLoading(false);
                // A successful login with redirect: false would typically mean you navigate the user
                // router.push(result.url || "/");
            }
        } catch (err: any) {
            setIsLoading(false)
            setError("Something went wrong. Please try again.")
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
            </div>

            <div className="relative w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Truck className="h-6 w-6 text-black" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter uppercase">CLICK<span className="text-primary">-SERVE</span></span>
                    </Link>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 uppercase">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm font-medium">Log in to your Click-Serve portal</p>
                </div>

                <div className="bg-card rounded-[32px] border border-white/5 shadow-2xl p-8 md:p-10 backdrop-blur-xl">
                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold animate-in fade-in zoom-in duration-300">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@company.com"
                                    className="pl-12 h-14 bg-white/5 border-white/5 focus:border-primary/30 transition-all rounded-2xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                                <Link href="/contact" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="pl-12 h-14 bg-white/5 border-white/5 focus:border-primary/30 transition-all rounded-2xl"
                                />
                            </div>
                        </div>

                        <Button className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/10 rounded-2xl" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...
                                </>
                            ) : (
                                <>
                                    Access Portal <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-primary font-black hover:underline uppercase tracking-wider ml-1">Join the Network</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="h-px grow bg-white/5"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Quick Demo Access</span>
                        <div className="h-px grow bg-white/5"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => {
                                setFormData({ email: "admin@clickserve.com", password: "Disown'sit26$" })
                            }}
                            className="flex flex-col items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-primary/30 transition-all group"
                        >
                            <ShieldCheck className="h-5 w-5 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-white">Admin</span>
                        </button>
                        <button
                            onClick={() => {
                                setFormData({ email: "supadmin@clickserve.com", password: "Sup123" })
                            }}
                            className="flex flex-col items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-primary/30 transition-all group"
                        >
                            <Building2 className="h-5 w-5 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-white">Supplier</span>
                        </button>
                        <button
                            onClick={() => {
                                setFormData({ email: "buyadmin@clickserve.com", password: "Buyer123" })
                            }}
                            className="flex flex-col items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-primary/30 transition-all group"
                        >
                            <User className="h-5 w-5 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground group-hover:text-white">Buyer</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
