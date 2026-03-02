"use client"

import * as React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, Droplets, UserCircle, ChevronDown, LayoutDashboard, LogIn, UserPlus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Navbar = () => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = React.useState(false)
    const [showAccount, setShowAccount] = React.useState(false)

    // Only show Buyers and Suppliers portals IF user is logged in
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Marketplace", href: "/marketplace" },
        ...(session ? [
            { name: "Buyers", href: "/buyer" },
            { name: "Suppliers", href: "/supplier" },
        ] : []),
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]

    // Conditionally show Admin, Login/Signup or Logout
    const accountLinks = session ? [
        ...((session.user as any)?.role === "ADMIN" ? [{ name: "Admin Dashboard", href: "/admin", icon: LayoutDashboard }] : [{ name: "Admin Portal", href: "/admin", icon: LayoutDashboard }]),
        { name: "Logout", onClick: () => signOut(), icon: LogOut, isButton: true },
    ] : [
        { name: "Login", href: "/login", icon: LogIn },
        { name: "Sign Up", href: "/signup", icon: UserPlus },
        { name: "Admin Portal", href: "/admin", icon: LayoutDashboard },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-8">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <Droplets className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-foreground uppercase">
                        SKYWHALE <span className="text-primary tracking-normal">CLICK & SERVE</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="relative ml-4 border-l pl-8">
                        <button
                            onClick={() => setShowAccount(!showAccount)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all text-sm font-black uppercase tracking-widest text-primary"
                        >
                            <UserCircle className="h-5 w-5" />
                            {session ? session.user?.name || "Member" : "Account"}
                            <ChevronDown className={cn("h-4 w-4 transition-transform", showAccount && "rotate-180")} />
                        </button>

                        {showAccount && (
                            <div className="absolute right-0 mt-4 w-64 rounded-2xl bg-white border border-gray-100 shadow-2xl p-2 animate-in fade-in zoom-in duration-200 z-50">
                                {accountLinks.map((link) => (
                                    link.isButton ? (
                                        <button
                                            key={link.name}
                                            onClick={() => { link.onClick?.(); setShowAccount(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all group"
                                        >
                                            <div className="h-9 w-9 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                                <link.icon className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-wider">{link.name}</span>
                                        </button>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            href={link.href || "/"}
                                            onClick={() => setShowAccount(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-primary transition-all group"
                                        >
                                            <div className="h-9 w-9 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <link.icon className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 rounded-lg bg-muted/50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-b bg-background px-8 py-8 space-y-6 animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-base font-bold uppercase transition-colors hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                        {accountLinks.map((link) => (
                            link.isButton ? (
                                <button
                                    key={link.name}
                                    onClick={() => { link.onClick?.(); setIsOpen(false); }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-red-50 text-red-500 font-bold uppercase text-sm"
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.name}
                                </button>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href || "/"}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-foreground font-bold uppercase text-sm"
                                >
                                    <link.icon className="h-5 w-5 text-primary" />
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export { Navbar }
