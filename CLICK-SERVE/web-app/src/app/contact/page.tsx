import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import {
    Mail,
    Phone,
    MessageSquare,
    MapPin,
    ChevronDown,
    Clock,
    Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ContactPage() {
    const faqs = [
        { q: "What are the common payment methods?", a: "We accept card payments, bank transfers, and USSD via Flutterwave and Paystack. Business accounts can also apply for 7–14 day credit terms." },
        { q: "How long does delivery usually take?", a: "Delivery typically takes between 45 to 90 minutes depending on your distance from the supplier and current traffic conditions." },
        { q: "Is the diesel quality guaranteed?", a: "Yes, every supplier on Click-Serve must upload batch density reports and is subject to random quality vetting by our team." },
        { q: "How does invoice discounting work?", a: "Suppliers can request 'Get Paid Now' for delivered orders. We release 98% of the invoice value instantly for a small 2% processing fee." },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pb-24">
                {/* Contact Hero */}
                <section className="py-24 lg:py-32 bg-muted/50 border-b px-8 relative overflow-hidden">
                    <div className="container mx-auto text-center relative z-10">
                        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-[0.9] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">Contact & Support</h1>
                        <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            We're here to help. Reach out to us for any questions regarding orders, payments, or supplier onboarding.
                        </p>
                    </div>
                    {/* Subtle Mobile Gradient Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-20 md:hidden pointer-events-none" />
                </section>

                <section className="py-24 px-8">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <div className="space-y-12">
                                <div className="text-center max-w-2xl mx-auto mb-16">
                                    <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">Have questions about our diesel supply chain? We&apos;re here to help you optimize your logistics.</p>
                                </div>

                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase opacity-60 tracking-widest">Full Name</label>
                                            <Input className="h-12 bg-muted/30 border-none" placeholder="Enter your name" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase opacity-60 tracking-widest">Email Address</label>
                                            <Input className="h-12 bg-muted/30 border-none" placeholder="email@example.com" type="email" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase opacity-60 tracking-widest">Subject</label>
                                        <Input className="h-12 bg-muted/30 border-none" placeholder="How can we help?" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase opacity-60 tracking-widest">Message</label>
                                        <textarea
                                            className="flex min-h-[180px] w-full rounded-xl border-none bg-muted/30 px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Type your message here..."
                                        />
                                    </div>
                                    <Button className="h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20" type="submit">
                                        Send Message <Send className="ml-2 h-5 w-5" />
                                    </Button>
                                </form>
                            </div>

                            {/* Contact Info Cards */}
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <Card className="border-none bg-muted/30">
                                        <CardContent className="p-8 space-y-6">
                                            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                <MessageSquare className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold">WhatsApp Support</h3>
                                                <p className="text-lg text-muted-foreground font-medium">+2348136337124</p>
                                            </div>
                                            <Button variant="link" className="p-0 h-auto text-primary font-bold text-lg">Chat Now</Button>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-none bg-muted/30">
                                        <CardContent className="p-8 space-y-6">
                                            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                <Phone className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold">Phone Support</h3>
                                                <p className="text-lg text-muted-foreground font-medium">07016435125</p>
                                                <p className="text-sm text-muted-foreground italic">Mon-Fri, 9am - 6pm</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card className="border-none bg-secondary text-secondary-foreground overflow-hidden">
                                    <CardContent className="p-10 space-y-8">
                                        <h3 className="text-2xl font-bold text-white">Direct Email</h3>
                                        <div className="flex items-center space-x-6">
                                            <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                <Mail className="h-7 w-7 text-primary" />
                                            </div>
                                            <p className="text-xl font-bold">didsystems12@gmail.com</p>
                                        </div>
                                        <div className="pt-8 border-t border-white/10 space-y-6">
                                            <p className="text-xs font-black text-white uppercase tracking-[0.3em]">Office Locations</p>
                                            <div className="space-y-6">
                                                <div className="flex items-start space-x-4">
                                                    <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                                                    <p className="text-lg leading-relaxed text-secondary-foreground/70"><span className="text-white font-bold">Abuja:</span> Central Business District, FCT Abuja.</p>
                                                </div>
                                                <div className="flex items-start space-x-4">
                                                    <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                                                    <p className="text-lg leading-relaxed text-secondary-foreground/70"><span className="text-white font-bold">Lagos:</span> Victoria Island, Lagos State.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-24 bg-muted/30 border-y px-8">
                    <div className="container mx-auto max-w-3xl">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">Quick answers to common questions about our platform.</p>
                        </div>
                        <div className="space-y-6">
                            {faqs.map((faq, i) => (
                                <Card key={i} className="border-none shadow-sm overflow-hidden bg-white">
                                    <button className="w-full text-left p-8 flex items-center justify-between group transition-colors hover:bg-muted/5">
                                        <span className="text-lg font-bold pr-8">{faq.q}</span>
                                        <ChevronDown className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-110" />
                                    </button>
                                    <div className="px-8 pb-8 text-lg text-muted-foreground leading-relaxed border-t pt-6">
                                        {faq.a}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
