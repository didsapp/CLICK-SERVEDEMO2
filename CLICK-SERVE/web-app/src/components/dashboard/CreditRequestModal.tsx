"use client"

import * as React from "react"
import {
    X,
    CreditCard,
    ArrowUpCircle,
    CheckCircle2,
    Loader2,
    TrendingUp,
    Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CreditRequestModalProps {
    isOpen: boolean
    onClose: () => void
    currentLimit: string
}

const PRESET_AMOUNTS = [
    { label: "₦15M", value: 15000000 },
    { label: "₦20M", value: 20000000 },
    { label: "₦25M", value: 25000000 },
    { label: "₦50M", value: 50000000 },
]

export function CreditRequestModal({ isOpen, onClose, currentLimit }: CreditRequestModalProps) {
    const [requestedAmount, setRequestedAmount] = React.useState<number | "">("")
    const [reason, setReason] = React.useState("")
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [step, setStep] = React.useState<"form" | "success">("form")

    if (!isOpen) return null

    const handleSubmit = async () => {
        setIsProcessing(true)
        try {
            const response = await fetch("/api/wallet/credit-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requestedAmount,
                    reason
                })
            })

            if (!response.ok) throw new Error("Failed to submit request")

            setStep("success")
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please try again.")
        } finally {
            setIsProcessing(false)
        }
    }

    const reset = () => {
        setStep("form")
        setRequestedAmount("")
        setReason("")
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-secondary w-full max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                    <div>
                        <h2 className="text-xl font-bold text-white italic uppercase tracking-tight">Request Credit Increase</h2>
                        <p className="text-white/40 text-xs italic">Scale your purchasing power with Click-Serve Credit</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {step === "success" ? (
                    <div className="p-12 text-center animate-in slide-in-from-bottom-4 duration-500">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black text-white italic uppercase mb-2">Request Submitted</h3>
                        <p className="text-white/40 text-sm mb-8 leading-relaxed italic">
                            Your request to increase your credit limit to ₦{Number(requestedAmount).toLocaleString()} is being reviewed by our underwriting team. You will be notified within 24 hours.
                        </p>
                        <Button
                            variant="secondary"
                            className="w-full h-14 bg-primary text-secondary font-black uppercase text-lg shadow-xl shadow-primary/20"
                            onClick={handleClose}
                        >
                            Return to Dashboard
                        </Button>
                    </div>
                ) : (
                    <div className="p-8 space-y-8">
                        {/* Current Limit Info */}
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-white/40" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-white/20 tracking-widest italic">Current Credit Limit</p>
                                <p className="text-xl font-black text-white italic">{currentLimit}</p>
                            </div>
                        </div>

                        {/* Presets */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Select New Limit</label>
                            <div className="grid grid-cols-4 gap-2">
                                {PRESET_AMOUNTS.map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => setRequestedAmount(preset.value)}
                                        className={cn(
                                            "py-3 rounded-xl text-xs font-black italic border transition-all",
                                            requestedAmount === preset.value
                                                ? "bg-primary border-primary text-secondary shadow-lg shadow-primary/20 scale-105"
                                                : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Or Specify Amount (₦)</label>
                                <Input
                                    type="number"
                                    placeholder="Enter custom amount"
                                    className="h-14 bg-white/5 border-white/5 focus:border-primary/50 text-white text-lg font-bold placeholder:text-white/10"
                                    value={requestedAmount}
                                    onChange={(e) => setRequestedAmount(Number(e.target.value))}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Reason for Increase</label>
                                <textarea
                                    placeholder="Briefly explain your need for more credit (e.g., Seasonal volume peak)"
                                    className="w-full min-h-[100px] bg-white/5 border border-white/5 rounded-xl p-4 text-white text-sm font-medium focus:border-primary/50 outline-none transition-colors placeholder:text-white/10"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex gap-4">
                            <Shield className="h-5 w-5 text-amber-500 shrink-0" />
                            <p className="text-[10px] text-amber-500/60 font-medium leading-relaxed italic uppercase tracking-tight">
                                Loyalty Benefit: Your account age and repayment history are automatically considered for instant approval on requests under ₦25M.
                            </p>
                        </div>

                        <Button
                            disabled={!requestedAmount || !reason || isProcessing}
                            className="w-full h-14 bg-primary text-secondary font-black uppercase text-lg shadow-xl shadow-primary/20 disabled:opacity-30"
                            onClick={handleSubmit}
                        >
                            {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : "Submit Request"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
