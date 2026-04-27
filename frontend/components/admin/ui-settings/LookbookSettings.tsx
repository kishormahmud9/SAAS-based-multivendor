"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Upload, Plus, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface LookbookItem {
    title: string
    subtitle: string
    image: string
    link: string
    className: string
}

interface LookbookData {
    title: string
    description: string
    items: LookbookItem[]
}

const defaultData: LookbookData = {
    title: "Curated Collections",
    description: "Handpicked styles for every occasion.",
    items: [
        { title: "Summer Collection", subtitle: "Linen & Cottons", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80", link: "/shop?category=summer", className: "md:col-span-2 md:row-span-2" },
        { title: "Premium Suits", subtitle: "The Elite Class", image: "https://images.unsplash.com/photo-1594932224030-9404506f688e?w=800&q=80", link: "/shop?category=suits", className: "md:col-span-1 md:row-span-1" },
        { title: "Accessories", subtitle: "Details Matter", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", link: "/shop?category=accessories", className: "md:col-span-1 md:row-span-1" }
    ]
}

export default function LookbookSettings() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [data, setData] = useState<LookbookData>(defaultData)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/public/ui-settings?key=lookbook")
            const result = await res.json()
            if (result.success && result.data) {
                setData(result.data.value)
            }
        } catch (error) {
            console.error("Failed to fetch lookbook settings:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/admin/ui-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: "lookbook", value: data }),
            })
            const result = await res.json()
            if (result.success) {
                toast.success("Lookbook settings saved")
            } else {
                toast.error(result.error || "Save failed")
            }
        } catch (error) {
            toast.error("Save failed")
        } finally {
            setSaving(false)
        }
    }

    const handleItemChange = (index: number, field: keyof LookbookItem, value: string) => {
        const newItems = [...data.items]
        newItems[index] = { ...newItems[index], [field]: value }
        setData({ ...data, items: newItems })
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Lookbook settings...</div>

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-6">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Description</label>
                        <input
                            type="text"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {data.items.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Collection Item #{index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => handleItemChange(index, "title", e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    value={item.subtitle}
                                    onChange={(e) => handleItemChange(index, "subtitle", e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link URL</label>
                                <input
                                    type="text"
                                    value={item.link}
                                    onChange={(e) => handleItemChange(index, "link", e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                                />
                            </div>
                            <div className="lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={item.image}
                                        onChange={(e) => handleItemChange(index, "image", e.target.value)}
                                        className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                                    />
                                    {item.image && (
                                        <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden shrink-0">
                                            <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Lookbook Settings
                </button>
            </div>
        </div>
    )
}
