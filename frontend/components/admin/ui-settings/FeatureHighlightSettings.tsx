"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Play } from "lucide-react"
import { toast } from "react-hot-toast"

interface FeaturePoint {
    title: string
    description: string
}

interface FeatureHighlightData {
    label: string
    title: string
    description: string
    image: string
    videoUrl: string
    ctaText: string
    ctaLink: string
    features: FeaturePoint[]
}

const defaultData: FeatureHighlightData = {
    label: "Innovation in Comfort",
    title: "The Air-Stride 2026 Edition",
    description: "Experience the future of footwear. Handcrafted with precision using sustainable materials and AI-optimized support for maximum comfort.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80",
    videoUrl: "",
    ctaText: "Shop the collection",
    ctaLink: "/product/air-stride-2026",
    features: [
        { title: "Sustainable", description: "Made from 100% recycled ocean plastics." },
        { title: "Smart Fit", description: "Self-adjusting compression technology." }
    ]
}

export default function FeatureHighlightSettings() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [data, setData] = useState<FeatureHighlightData>(defaultData)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/public/ui-settings?key=feature_highlight")
            const result = await res.json()
            if (result.success && result.data) {
                setData(result.data.value)
            }
        } catch (error) {
            console.error("Failed to fetch feature highlight settings:", error)
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
                body: JSON.stringify({ key: "feature_highlight", value: data }),
            })
            const result = await res.json()
            if (result.success) {
                toast.success("Feature Highlight settings saved")
            } else {
                toast.error(result.error || "Save failed")
            }
        } catch (error) {
            toast.error("Save failed")
        } finally {
            setSaving(false)
        }
    }

    const handleFeatureChange = (index: number, field: keyof FeaturePoint, value: string) => {
        const newFeatures = [...data.features]
        newFeatures[index] = { ...newFeatures[index], [field]: value }
        setData({ ...data, features: newFeatures })
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Feature Highlight settings...</div>

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-6">Main Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Label (Upper)</label>
                        <input
                            type="text"
                            value={data.label}
                            onChange={(e) => setData({ ...data, label: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                        <input
                            type="text"
                            value={data.image}
                            onChange={(e) => setData({ ...data, image: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CTA Button Text</label>
                        <input
                            type="text"
                            value={data.ctaText}
                            onChange={(e) => setData({ ...data, ctaText: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CTA Button Link</label>
                        <input
                            type="text"
                            value={data.ctaLink}
                            onChange={(e) => setData({ ...data, ctaLink: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.features.map((feature, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Feature Point #{index + 1}</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feature Title</label>
                                <input
                                    type="text"
                                    value={feature.title}
                                    onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feature Description</label>
                                <input
                                    type="text"
                                    value={feature.description}
                                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Feature Highlight Settings
                </button>
            </div>
        </div>
    )
}
