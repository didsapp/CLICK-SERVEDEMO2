import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import {
    Target,
    MapPin,
    TrendingUp,
    Users,
    ShieldCheck,
    Zap,
    Globe
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
    const impacts = [
        { label: "₦24–36B", sub: "Annual industry savings goal" },
        { label: "20–30%", sub: "Logistics cost reduction" },
        { label: "100%", sub: "Verified suppliers" },
        { label: "Real-time", sub: "End-to-end visibility" },
    ]

    const cities = ["Abuja", "Lagos", "Kano", "Port Harcourt"]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section with Image Background */}
                <section className="relative min-h-[60vh] flex items-center justify-center text-center px-8 overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-[0.4]"
                        style={{ backgroundImage: 'url("/about-banner.png")' }}
                    />

                    <div className="container mx-auto relative z-10">
                        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-[0.9] text-white glass-font uppercase">
                            Transforming Diesel Logistics
                        </h1>
                        <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed backdrop-blur-[2px]">
                            Click-Serve is a tech-driven platform dedicated to solving the most critical challenges in the Nigerian diesel supply chain.
                        </p>
                    </div>

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background z-[1] pointer-events-none" />
                </section>

                {/* Mission Section */}
                <section className="py-24 px-8">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-tight">
                                <Target className="h-4 w-4" />
                                <span>Our Mission</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">Efficiency and Reliability at Every Drop</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our mission is to transform diesel supply in Nigeria by eliminating delivery delays, preventing overpricing, and ensuring supplier transparency through automation and smart logistics.
                            </p>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary mt-1 shrink-0">
                                        <Zap className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">The Problem</p>
                                        <p className="text-muted-foreground leading-relaxed">70% of businesses experience significant delivery delays and non-transparent pricing.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary mt-1 shrink-0">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">The Solution</p>
                                        <p className="text-muted-foreground leading-relaxed">End-to-end GPS tracking, verified vendor vetting, and instant transparent quoting.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden relative shadow-2xl">
                                {/* Placeholder for Nigeria Map Image */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                    <Globe className="h-20 w-20 text-primary opacity-20 mb-4" />
                                    <p className="font-bold text-xl mb-4">Coverage in Major Cities</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {cities.map(city => (
                                            <div key={city} className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg font-bold">
                                                {city}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Numbers */}
                <section className="py-24 bg-muted/50 border-y px-8">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-16 tracking-tight">The Click-Serve Impact</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {impacts.map((imp, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="text-5xl lg:text-6xl font-black text-primary tracking-tighter drop-shadow-sm">{imp.label}</div>
                                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">{imp.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-8">
                    <div className="container mx-auto text-center space-y-10">
                        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Ready to Power Your Business?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" className="h-16 px-10 text-lg font-bold shadow-xl shadow-primary/20" asChild>
                                <Link href="/signup">Join the Network</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold" asChild>
                                <Link href="/contact">Contact Sales</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
