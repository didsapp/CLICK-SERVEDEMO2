"use client"

import * as React from "react"

import { useSession } from "next-auth/react"

interface SupplierContextType {
    companyName: string
    email: string
    phone: string
    address: string
    notifications: {
        newOrder: boolean
        paymentDisbursed: boolean
        stockLow: boolean
        marketRate: boolean
    }
    setCompanyName: (name: string) => void
    setEmail: (email: string) => void
    setPhone: (phone: string) => void
    setAddress: (address: string) => void
    setNotification: (key: string, value: boolean) => void
    saveSettings: () => void
}

const SupplierContext = React.createContext<SupplierContextType | undefined>(undefined)

export function SupplierProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()
    const [companyName, setCompanyName] = React.useState(session?.user?.name || "Lagos Refineries Ltd")
    const [email, setEmail] = React.useState(session?.user?.email || "ops@lagosrefineries.com")
    const [phone, setPhone] = React.useState("+234 812 345 6789")
    const [address, setAddress] = React.useState("Plot 42, Lekki Deep Sea Port Industrial Zone, Ibeju-Lekki, Lagos.")
    const [notifications, setNotifications] = React.useState({
        newOrder: true,
        paymentDisbursed: true,
        stockLow: true,
        marketRate: false,
    })

    // Update if session changes and we don't have local storage yet
    React.useEffect(() => {
        if (session?.user?.name && !localStorage.getItem("supplier_settings")) {
            setCompanyName(session.user.name)
        }
        if (session?.user?.email && !localStorage.getItem("supplier_settings")) {
            setEmail(session.user.email)
        }
    }, [session])

    // Load from localStorage on mount
    React.useEffect(() => {
        const saved = localStorage.getItem("supplier_settings")
        if (saved) {
            try {
                const data = JSON.parse(saved)
                if (data.companyName) setCompanyName(data.companyName)
                if (data.email) setEmail(data.email)
                if (data.phone) setPhone(data.phone)
                if (data.address) setAddress(data.address)
                if (data.notifications) setNotifications(data.notifications)
            } catch (e) {
                console.error("Failed to load settings", e)
            }
        }
    }, [])

    const setNotification = (key: string, value: boolean) => {
        setNotifications(prev => ({ ...prev, [key]: value }))
    }

    const saveSettings = () => {
        const data = { companyName, email, phone, address, notifications }
        localStorage.setItem("supplier_settings", JSON.stringify(data))
    }

    return (
        <SupplierContext.Provider value={{
            companyName,
            email,
            phone,
            address,
            notifications,
            setCompanyName,
            setEmail,
            setPhone,
            setAddress,
            setNotification,
            saveSettings
        }}>
            {children}
        </SupplierContext.Provider>
    )
}

export function useSupplier() {
    const context = React.useContext(SupplierContext)
    if (context === undefined) {
        throw new Error("useSupplier must be used within a SupplierProvider")
    }
    return context
}
