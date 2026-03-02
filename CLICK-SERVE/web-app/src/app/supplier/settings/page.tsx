"use client"

import * as React from "react"
import {
    User,
    Bell,
    Shield,
    Smartphone,
    Mail,
    Lock,
    Save,
    Camera,
    ChevronRight,
    CheckCircle2,
    ShoppingCart,
    Banknote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSupplier } from "@/context/SupplierContext"

export default function SupplierSettings() {
    const {
        companyName, setCompanyName,
        email, setEmail,
        phone, setPhone,
        address, setAddress,
        notifications, setNotification,
        saveSettings
    } = useSupplier()

    const [activeTab, setActiveTab] = React.useState("profile")
    const [isSaving, setIsSaving] = React.useState(false)

    const handleSave = () => {
        setIsSaving(true)
        saveSettings()
        setTimeout(() => {
            setIsSaving(false)
            alert("Settings updated and saved successfully!")
        }, 800)
    }

    const tabs = [
        { id: "profile", name: "Company Profile", icon: User },
        { id: "notifications", name: "Notifications", icon: Bell },
        { id: "security", name: "Security", icon: Shield },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                    <p className="text-muted-foreground">Manage your company profile, security preferences, and alert systems.</p>
                </div>
                <Button className="h-12 px-8 font-black uppercase" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : <><Save className="mr-2 h-5 w-5" /> Save Changes</>}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar Tabs */}
                <div className="w-full lg:w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-sm font-bold transition-all",
                                activeTab === tab.id
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <tab.icon className="h-5 w-5" />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </div>

                {/* Main Settings Content */}
                <div className="flex-1 space-y-6">
                    {activeTab === "profile" && (
                        <Card className="border-none bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="mr-2 h-5 w-5 text-primary" /> Profile Information
                                </CardTitle>
                                <CardDescription>Update your refinery details and public contact information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center space-x-6 pb-6 border-b border-white/5">
                                    <div className="relative group">
                                        <div className="h-24 w-24 rounded-2xl bg-secondary flex items-center justify-center text-3xl font-black text-white shadow-xl uppercase">
                                            {companyName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold">{companyName}</p>
                                        <p className="text-xs text-muted-foreground">Premium Verified Supplier since 2021</p>
                                        <div className="flex space-x-2 mt-2">
                                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">AGO Specialist</span>
                                            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest">Lagos Bulk</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Company Name</label>
                                        <Input
                                            className="bg-white/5 border-white/10 h-12 font-medium"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Registered Email</label>
                                        <Input
                                            className="bg-white/5 border-white/10 h-12 font-medium"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Business Phone</label>
                                        <Input
                                            className="bg-white/5 border-white/10 h-12 font-medium"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-full space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Operational Address</label>
                                        <Input
                                            className="bg-white/5 border-white/10 h-12 font-medium"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "notifications" && (
                        <Card className="border-none bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="mr-2 h-5 w-5 text-primary" /> Delivery Alerts
                                </CardTitle>
                                <CardDescription>Configure how you want to be notified about orders and market movements.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-0">
                                {[
                                    { id: "newOrder", title: "New Order Placement", desc: "Instant alert when a buyer places a new bulk order.", icon: ShoppingCart },
                                    { id: "paymentDisbursed", title: "Payment Disbursed", desc: "Get notified as soon as your funds are released from escrow.", icon: Banknote },
                                    { id: "stockLow", title: "Stock Low Warning", desc: "Alert when your inventory drops below your 15% safety threshold.", icon: Mail },
                                    { id: "marketRate", title: "Market Rate Change", desc: "Weekly summary of regional AGO price fluctuations.", icon: Smartphone },
                                ].map((n, i) => (
                                    <div key={i} className="flex items-center justify-between py-6 border-b border-white/5 last:border-0">
                                        <div className="flex items-start space-x-4">
                                            <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mt-1">
                                                <n.icon className="h-5 w-5 text-white/40" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{n.title}</p>
                                                <p className="text-xs text-muted-foreground max-w-sm">{n.desc}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                "h-6 w-11 rounded-full p-1 flex items-center cursor-pointer shadow-inner transition-colors",
                                                notifications[n.id as keyof typeof notifications] ? "bg-primary justify-end" : "bg-white/10 justify-start"
                                            )}
                                            onClick={() => setNotification(n.id, !notifications[n.id as keyof typeof notifications])}
                                        >
                                            <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "security" && (
                        <Card className="border-none bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="mr-2 h-5 w-5 text-primary" /> Security & Access
                                </CardTitle>
                                <CardDescription>Protect your account with two-factor authentication and hardware keys.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="font-bold">Two-Factor Authentication</p>
                                        <p className="text-xs text-primary/60">Highly recommended to secure large payouts.</p>
                                    </div>
                                    <Button variant="outline" className="h-10 border-primary text-primary font-bold px-6">Enabled</Button>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest opacity-40">Hardware Security</h4>
                                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <Smartphone className="h-4 w-4 text-white/20" />
                                            <span className="text-sm font-medium">Samsung S24 Ultra (Active)</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-white/20" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border-t border-white/5">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="h-4 w-4 text-white/20" />
                                            <span className="text-sm font-medium">Secondary Recovery Email</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-white/20" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0 pb-8">
                                <Button variant="ghost" className="text-red-500 font-bold hover:bg-red-500/10 hover:text-red-500">
                                    <Lock className="mr-2 h-4 w-4" /> Reset All Passwords
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
