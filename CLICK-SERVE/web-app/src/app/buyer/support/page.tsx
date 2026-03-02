"use client"

import * as React from "react"
import { LifeBuoy, MessageCircle, Phone, Mail, ChevronDown, CheckCircle2, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const FAQS = [
    { q: "How fast is the delivery?", a: "Average delivery time is 45-60 minutes depending on your location and traffic conditions." },
    { q: "What ranges of diesel density do you supply?", a: "We supply standard AGO (Automotive Gas Oil) with densities ranging from 830 to 860 kg/m³." },
    { q: "Can I request a credit limit increase?", a: "Yes, you can request an increase in your wallet settings after 3 months of consistent transactions." },
    { q: "Are your suppliers verified?", a: "Strictly. Every supplier undergoes rigorous quality and documentation audits before joining." },
]

export default function SupportPage() {
    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                    <LifeBuoy className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Control Center</h1>
                <p className="text-white/40 italic text-lg max-w-xl mx-auto">Experiencing an issue? Our logistics experts are active 24/7 to ensure your supply remains uninterrupted.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all text-center group py-8">
                    <CardContent className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <MessageCircle className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-white text-lg italic">WhatsApp Chat</h3>
                        <p className="text-xs text-white/40 italic">Instant response for logistics issues.</p>
                        <Button className="w-full h-11 italic font-bold">Start Chat</Button>
                    </CardContent>
                </Card>

                <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all text-center group py-8">
                    <CardContent className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-white text-lg italic">Priority Line</h3>
                        <p className="text-xs text-white/40 italic">Direct access to hub management.</p>
                        <Button variant="outline" className="w-full h-11 border-white/10 text-white italic font-bold">Call Hub</Button>
                    </CardContent>
                </Card>

                <Card className="glass-panel border-white/5 hover:border-primary/20 transition-all text-center group py-8">
                    <CardContent className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-white text-lg italic">Email Support</h3>
                        <p className="text-xs text-white/40 italic">For billing and account inquiries.</p>
                        <Button variant="outline" className="w-full h-11 border-white/10 text-white italic font-bold">Send Mail</Button>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white flex items-center italic">
                    <HelpCircle className="mr-3 h-6 w-6 text-primary" /> Intelligence Base (FAQ)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FAQS.map((faq, i) => (
                        <Card key={i} className="glass-panel border-black/20 bg-black/10">
                            <CardContent className="p-6">
                                <h4 className="font-bold text-white flex items-center mb-3 italic">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 shadow-[0_0_5px_#facc15]" />
                                    {faq.q}
                                </h4>
                                <p className="text-sm text-white/40 leading-relaxed font-medium italic">{faq.a}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
