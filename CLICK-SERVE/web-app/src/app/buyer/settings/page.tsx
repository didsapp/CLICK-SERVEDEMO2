"use client"

import * as React from "react"
import { Settings, User, Bell, Shield, MapPin, Database, Save, LogOut } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = React.useState("My Account")

    const tabs = [
        { id: "my-account", name: "My Account", icon: User },
        { id: "global-settings", name: "Global Settings", icon: Settings },
        { id: "alert-settings", name: "Alert Settings", icon: Bell },
        { id: "security-protocols", name: "Security Protocols", icon: Shield },
        { id: "api-data", name: "API & Data", icon: Database },
    ]

    return (
        <div className="space-y-12 max-w-4xl">
            <div>
                <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Configurations</h1>
                <p className="text-white/40 italic">Manage your profile, data protocols, and notification vectors.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all italic tracking-tight ${activeTab === item.name ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-white/40 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="h-4 w-4 mr-3" />
                            {item.name}
                        </button>
                    ))}
                    <div className="pt-8">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500/60 hover:text-red-500 hover:bg-red-500/10 italic font-bold"
                            onClick={() => router.push("/")}
                        >
                            <LogOut className="h-4 w-4 mr-3" /> Terminate Session
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {activeTab === "My Account" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="glass-panel border-white/5 bg-black/10">
                                <CardHeader className="border-b border-white/5 pb-6">
                                    <CardTitle className="text-xl font-bold italic text-white">Identity Matrix</CardTitle>
                                    <CardDescription className="italic text-white/30">Standard identification data for your buyer account.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Legal Entity Name</label>
                                            <Input className="h-12 bg-white/5 border-white/10 text-white font-bold italic" defaultValue="John Doe Logistics" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Registered Email</label>
                                            <Input className="h-12 bg-white/5 border-white/10 text-white font-bold italic" defaultValue="john@logisticshub.com" />
                                        </div>
                                        <div className="space-y-3 col-span-2">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Operational Hub Address</label>
                                            <Input className="h-12 bg-white/5 border-white/10 text-white font-bold italic" defaultValue="Plot 45, Victoria Island Extension, Lagos" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button className="h-14 px-10 font-black uppercase tracking-widest italic shadow-xl shadow-primary/20">
                                            <Save className="mr-2 h-5 w-5" /> Save Identity
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-panel border-white/5 bg-black/10 border-l-4 border-l-primary/30">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-white font-bold italic">Verification Status</p>
                                        <p className="text-xs text-white/40 italic font-medium">Your buyer account is Tier 3 Verified. Enjoy 0% interest credit line up to ₦10M.</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "Global Settings" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="glass-panel border-white/5 bg-black/10">
                                <CardHeader className="border-b border-white/5 pb-6">
                                    <CardTitle className="text-xl font-bold italic text-white">System Preferences</CardTitle>
                                    <CardDescription className="italic text-white/30">Configure your regional and operational parameters.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Preferred Currency</label>
                                            <select className="flex h-12 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm font-bold italic text-white focus:outline-none focus:ring-2 focus:ring-primary/50">
                                                <option className="bg-slate-900">NGN (₦) - Nigerian Naira</option>
                                                <option className="bg-slate-900">USD ($) - US Dollar</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Language Interface</label>
                                            <select className="flex h-12 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm font-bold italic text-white focus:outline-none focus:ring-2 focus:ring-primary/50">
                                                <option className="bg-slate-900">English (NG)</option>
                                                <option className="bg-slate-900">Yoruba</option>
                                                <option className="bg-slate-900">Hausa</option>
                                                <option className="bg-slate-900">Igbo</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Timezone Protocol</label>
                                            <Input className="h-12 bg-white/5 border-white/10 text-white font-bold italic" defaultValue="GMT +01:00 (West Africa Time)" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button className="h-14 px-10 font-black uppercase tracking-widest italic shadow-xl shadow-primary/20">
                                            <Save className="mr-2 h-5 w-5" /> Update Globals
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "Alert Settings" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="glass-panel border-white/5 bg-black/10">
                                <CardHeader className="border-b border-white/5 pb-6">
                                    <CardTitle className="text-xl font-bold italic text-white">Notification Vectors</CardTitle>
                                    <CardDescription className="italic text-white/30">Control how and when you receive critical system updates.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    {[
                                        { title: "Order Status Updates", desc: "Receive alerts for transit milestones.", email: true, sms: true, wh: true },
                                        { title: "Credit Line Alerts", desc: "Warning when balance falls below 10%.", email: true, sms: false, wh: true },
                                        { title: "Supplier Market Rates", desc: "Daily summary of local fuel prices.", email: false, sms: false, wh: true },
                                        { title: "Security Protocols", desc: "Alert for every successful login.", email: true, sms: true, wh: false },
                                    ].map((alert, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-white/5">
                                            <div className="space-y-0.5">
                                                <p className="font-bold text-white italic">{alert.title}</p>
                                                <p className="text-xs text-white/30 italic">{alert.desc}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                {alert.email && <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase italic">Email</div>}
                                                {alert.sms && <div className="px-2 py-1 rounded-md bg-white/10 text-white/60 text-[10px] font-black uppercase italic">SMS</div>}
                                                {alert.wh && <div className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[10px] font-black uppercase italic">WhatsApp</div>}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-end pt-4">
                                        <Button className="h-14 px-10 font-black uppercase tracking-widest italic shadow-xl shadow-primary/20">
                                            <Save className="mr-2 h-5 w-5" /> Save Vector Prefs
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "Security Protocols" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="glass-panel border-white/5 bg-black/10">
                                <CardHeader className="border-b border-white/5 pb-6">
                                    <CardTitle className="text-xl font-bold italic text-white">Encryption & Access</CardTitle>
                                    <CardDescription className="italic text-white/30">Manage your credentials and active security tokens.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-primary/5">
                                            <div className="flex items-center space-x-4">
                                                <Shield className="h-6 w-6 text-primary" />
                                                <div>
                                                    <p className="font-bold text-white italic">Two-Factor Authentication (2FA)</p>
                                                    <p className="text-xs text-white/30 italic">Secure your account with mobile verification.</p>
                                                </div>
                                            </div>
                                            <Button variant="secondary" size="sm" className="font-black italic uppercase">Enabled</Button>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Update Master Password</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input type="password" placeholder="Current Secret" className="h-12 bg-white/5 border-white/10" />
                                                <Input type="password" placeholder="New Secret" className="h-12 bg-white/5 border-white/10" />
                                            </div>
                                            <Button variant="outline" className="w-full h-12 border-white/10 text-white italic font-bold">Initiate Password Rotation</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "API & Data" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="glass-panel border-white/5 bg-black/10">
                                <CardHeader className="border-b border-white/5 pb-6">
                                    <CardTitle className="text-xl font-bold italic text-white">Developer Interface</CardTitle>
                                    <CardDescription className="italic text-white/30">Integrate Click & Serve metrics into your own ecosystem.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] italic">Primary API Key</p>
                                            <span className="text-[10px] font-black text-green-500 uppercase italic">Active Matrix</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Input className="h-12 bg-white/5 border-white/10 font-mono text-white/60 italic" value="sk_production_882x_skywhale_lk99" readOnly />
                                            <Button variant="outline" className="h-12 border-white/10 text-white font-bold italic px-6">Copy Key</Button>
                                        </div>
                                        <p className="text-[10px] text-amber-500 italic font-bold">WARNING: Never leak your production keys. All data is end-to-end encrypted.</p>
                                    </div>
                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-white italic">Data Export (JSON/CSV)</p>
                                            <p className="text-xs text-white/30 italic">Generate a comprehensive audit trail of all logistics.</p>
                                        </div>
                                        <Button className="h-12 px-8 font-black uppercase italic shadow-lg shadow-primary/10">Build Archive</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
