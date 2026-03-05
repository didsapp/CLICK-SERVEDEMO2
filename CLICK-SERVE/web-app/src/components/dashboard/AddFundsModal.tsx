"use client"

import * as React from "react"
import {
    X,
    Wallet,
    CreditCard,
    Building2,
    ArrowRight,
    CheckCircle2,
    Copy,
    Check,
    AlertCircle,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AddFundsModalProps {
    isOpen: boolean
    onClose: () => void
}

const NIGERIAN_BANKS = [
    "Access Bank",
    "Access Bank (Diamond)",
    "ALAT by WEMA",
    "ASO Savings and Loans",
    "Bowen Microfinance Bank",
    "Carbon",
    "CEMCS Microfinance Bank",
    "Citibank Nigeria",
    "Ecobank Nigeria",
    "Ekondo Microfinance Bank",
    "Eyowo",
    "Fidelity Bank",
    "First Bank of Nigeria",
    "First City Monument Bank",
    "Globus Bank",
    "Guaranty Trust Bank",
    "Hasal Microfinance Bank",
    "Heritage Bank",
    "Jaiz Bank",
    "Keystone Bank",
    "Kuda Bank",
    "Lagos Building Investment Company PLC",
    "Lotus Bank",
    "Mayfair Microfinance Bank",
    "Mint MFB",
    "Moniepoint MFB",
    "OPay Digital Services Limited (OPay)",
    "Paga",
    "PalmPay",
    "Parallex Bank",
    "Parkway ReadyCash",
    "Paycom (OPay)",
    "Polaris Bank",
    "Providus Bank",
    "Rubies MFB",
    "Safe Haven MFB",
    "Sparkle Microfinance Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank",
    "Taj Bank",
    "Tangerine Money",
    "TCF MFB",
    "Titan Bank",
    "Unical MFB",
    "Union Bank of Nigeria",
    "United Bank For Africa",
    "Unity Bank",
    "VFD Microfinance Bank Limited",
    "Wema Bank",
    "Zenith Bank"
]

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
    const [activeTab, setActiveTab] = React.useState<"transfer" | "card">("transfer")
    const [amount, setAmount] = React.useState("")
    const [selectedBank, setSelectedBank] = React.useState("")
    const [cardNumber, setCardNumber] = React.useState("")
    const [expiry, setExpiry] = React.useState("")
    const [cvv, setCvv] = React.useState("")
    const [cardType, setCardType] = React.useState<"visa" | "mastercard" | "verve" | "unknown">("unknown")
    const [step, setStep] = React.useState<"form" | "confirm" | "success">("form")
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [copied, setCopied] = React.useState(false)

    // Detect card type
    React.useEffect(() => {
        const firstDigit = cardNumber.charAt(0)
        if (firstDigit === "4") setCardType("visa")
        else if (firstDigit === "5") setCardType("mastercard")
        else if (firstDigit === "6" || (cardNumber.startsWith("506") || cardNumber.startsWith("507") || cardNumber.startsWith("650"))) setCardType("verve")
        else setCardType("unknown")
    }, [cardNumber])

    if (!isOpen) return null

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSubmit = async () => {
        setIsProcessing(true)
        try {
            const response = await fetch("/api/wallet/fund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    method: activeTab === "card" ? "CARD" : "TRANSFER",
                    bank: selectedBank
                })
            })

            if (!response.ok) throw new Error("Failed to process funding")

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
        setAmount("")
        setSelectedBank("")
        setCardNumber("")
        setExpiry("")
        setCvv("")
        setCardType("unknown")
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
                        <h2 className="text-xl font-bold text-white italic uppercase tracking-tight">Add Funds to Wallet</h2>
                        <p className="text-white/40 text-xs italic">Choose your preferred deposit method</p>
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
                        <h3 className="text-2xl font-black text-white italic uppercase mb-2">Transaction Initiated</h3>
                        <p className="text-white/40 text-sm mb-8 leading-relaxed italic">
                            {activeTab === "transfer"
                                ? "Your transfer is being tracked. Funds will reflect once payment is confirmed via our escrow partners."
                                : "Your card payment of ₦" + Number(amount).toLocaleString() + " has been processed successfully."}
                        </p>
                        <Button
                            variant="primary"
                            className="w-full h-14 bg-primary text-secondary font-black uppercase text-lg shadow-xl shadow-primary/20"
                            onClick={handleClose}
                        >
                            Back to Wallet
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Tabs */}
                        <div className="flex p-2 gap-2 bg-black/40 mx-8 mt-6 rounded-2xl">
                            <button
                                onClick={() => setActiveTab("transfer")}
                                className={cn(
                                    "flex-1 flex items-center justify-center py-3 text-sm font-bold rounded-xl italic transition-all",
                                    activeTab === "transfer"
                                        ? "bg-white/10 text-white shadow-lg"
                                        : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                )}
                            >
                                <Building2 className="mr-2 h-4 w-4" /> Bank Transfer
                            </button>
                            <button
                                onClick={() => setActiveTab("card")}
                                className={cn(
                                    "flex-1 flex items-center justify-center py-3 text-sm font-bold rounded-xl italic transition-all",
                                    activeTab === "card"
                                        ? "bg-white/10 text-white shadow-lg"
                                        : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                )}
                            >
                                <CreditCard className="mr-2 h-4 w-4" /> Card Payment
                            </button>
                        </div>

                        <div className="p-8">
                            {activeTab === "transfer" ? (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Deposit Amount (₦)</label>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount (e.g. 500,000)"
                                            className="h-14 bg-white/5 border-white/5 focus:border-primary/50 text-white text-lg font-bold placeholder:text-white/10"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Select Your Bank</label>
                                        <select
                                            className="w-full h-14 rounded-md bg-white/5 border border-white/5 focus:border-primary/50 text-white text-sm font-bold px-4 appearance-none outline-none"
                                            value={selectedBank}
                                            onChange={(e) => setSelectedBank(e.target.value)}
                                        >
                                            <option value="" className="bg-secondary">Select Bank</option>
                                            {NIGERIAN_BANKS.map(bank => (
                                                <option key={bank} value={bank} className="bg-secondary">{bank}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {amount && selectedBank && (
                                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-primary/20 p-2 rounded-lg">
                                                    <AlertCircle className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-primary font-black uppercase tracking-tight mb-2">Escrow Account Generated</p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-[10px] text-white/40 uppercase mb-1">Bank Name</p>
                                                            <p className="text-sm font-bold text-white uppercase italic">SkyWhale Escrow</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-white/40 uppercase mb-1">Bank Partner</p>
                                                            <p className="text-sm font-bold text-white italic">Wema Bank</p>
                                                        </div>
                                                        <div className="col-span-2 relative">
                                                            <p className="text-[10px] text-white/40 uppercase mb-1">Account Number</p>
                                                            <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
                                                                <p className="text-lg font-black text-primary font-mono tracking-widest">7820129443</p>
                                                                <button
                                                                    onClick={() => handleCopy("7820129443")}
                                                                    className="text-white/40 hover:text-white transition-colors"
                                                                >
                                                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        disabled={!amount || !selectedBank || isProcessing}
                                        className="w-full h-14 bg-primary text-secondary font-black uppercase text-lg shadow-xl shadow-primary/20 disabled:opacity-30"
                                        onClick={handleSubmit}
                                    >
                                        {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : "I have made the transfer"}
                                    </Button>

                                    <p className="text-center text-[10px] text-white/20 uppercase font-black tracking-widest italic">
                                        Funds are secured in Escrow until petroleum product delivery is confirmed.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Card Number</label>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                    className="h-14 bg-white/5 border-white/5 focus:border-primary/50 text-white text-lg font-bold placeholder:text-white/10 pr-12"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    {cardType === "visa" && <div className="text-blue-500 font-black italic text-sm">VISA</div>}
                                                    {cardType === "mastercard" && <div className="text-amber-500 font-black italic text-sm">MASTERCARD</div>}
                                                    {cardType === "verve" && <div className="text-green-500 font-black italic text-sm">VERVE</div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Expiry Date</label>
                                                <Input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="h-14 bg-white/5 border-white/5 focus:border-primary/50 text-white text-lg font-bold placeholder:text-white/10"
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value.substring(0, 5))}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">CVV</label>
                                                <Input
                                                    type="password"
                                                    placeholder="***"
                                                    className="h-14 bg-white/5 border-white/5 focus:border-primary/50 text-white text-lg font-bold placeholder:text-white/10"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-widest italic ml-1">Amount to Fund (₦)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter amount"
                                                className="h-14 bg-white/5 border-white/5 focus:border-primary/50 text-white text-lg font-bold placeholder:text-white/10"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        disabled={!amount || !cardNumber || !expiry || !cvv || isProcessing}
                                        className="w-full h-14 bg-primary text-secondary font-black uppercase text-lg shadow-xl shadow-primary/20 disabled:opacity-30"
                                        onClick={handleSubmit}
                                    >
                                        {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : "Pay Now"}
                                    </Button>

                                    <div className="flex items-center justify-center gap-6 opacity-30">
                                        <div className="text-[10px] font-black text-white italic">VISA</div>
                                        <div className="text-[10px] font-black text-white italic">MASTERCARD</div>
                                        <div className="text-[10px] font-black text-white italic">VERVE</div>
                                        <div className="text-[10px] font-black text-white italic">SECURED</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
