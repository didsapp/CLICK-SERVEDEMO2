"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function QuickStockUpdate() {
    const [isSaving, setIsSaving] = React.useState(false)

    const handleSave = async () => {
        setIsSaving(true)
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000))
        setIsSaving(false)
        alert("Stock updated successfully! (Mock)")
    }

    return (
        <Card className="border-primary/10">
            <CardHeader>
                <CardTitle>Add Stock / Update Pricing</CardTitle>
                <CardDescription>Instantly update your available quantity and price per liter.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase opacity-50">Density</label>
                        <Input placeholder="e.g. 84.5" defaultValue="84.5" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase opacity-50">Price/L (₦)</label>
                        <Input placeholder="e.g. 1250" defaultValue="1250" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase opacity-50">Quantity (L)</label>
                        <Input placeholder="e.g. 20000" />
                    </div>
                    <div className="flex items-end">
                        <Button className="w-full" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
