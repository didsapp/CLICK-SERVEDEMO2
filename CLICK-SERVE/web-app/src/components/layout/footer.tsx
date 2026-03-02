import Link from "next/link"
import { Droplets, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
    return (
        <footer className="w-full border-t bg-secondary text-secondary-foreground py-16">
            <div className="container mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <Droplets className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase">
                            SKYWHALE <span className="text-primary tracking-normal">CLICK & SERVE</span>
                        </span>
                    </Link>
                    <p className="text-base text-secondary-foreground/70 leading-relaxed">
                        Revolutionizing diesel logistics across Nigeria. Fast, reliable, and transparent supply chains for homes and businesses.
                    </p>
                    <div className="flex space-x-5">
                        <Facebook className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
                        <Twitter className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
                        <Instagram className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
                        <Linkedin className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
                    </div>
                </div>

                <div>
                    <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-base text-secondary-foreground/70">
                        <li><Link href="/buyer" className="hover:text-primary transition-colors">Buy Diesel</Link></li>
                        <li><Link href="/supplier" className="hover:text-primary transition-colors">Join as Supplier</Link></li>
                        <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Hub</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-6">Cities Served</h4>
                    <ul className="space-y-4 text-base text-secondary-foreground/70">
                        <li>Lagos</li>
                        <li>Abuja</li>
                        <li>Kano</li>
                        <li>Port Harcourt</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-6">Contact Info</h4>
                    <ul className="space-y-4 text-base text-secondary-foreground/70">
                        <li>Email: didsystems12@gmail.com</li>
                        <li>Phone: 07016435125</li>
                        <li>WhatsApp: +2348136337124</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-8 mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-foreground/50 gap-4">
                <p>© {new Date().getFullYear()} SKYWHALE CLICK & SERVE. All rights reserved.</p>
                <p>
                    Designed by{" "}
                    <Link
                        href="https://dids-systemes.com"
                        target="_blank"
                        className="hover:text-primary transition-colors font-bold"
                    >
                        DIDS&apos; SYSTEMES INC
                    </Link>
                </p>
            </div>
        </footer>
    )
}

export { Footer }
