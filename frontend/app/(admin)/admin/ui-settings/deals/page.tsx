"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Tag, Calendar, Globe } from "lucide-react"
import { fetchWithAuth } from "@/lib/api/fetchWithAuth"

export default function DealsPage() {
    const [loading, setLoading] = useState(true)
    const [savingOffer, setSavingOffer] = useState(false)
    const [offerBanner, setOfferBanner] = useState<any>({
        title: "Deal of the Day",
        subtitle: "Get up to 40% off on selected winter jackets.",
        targetDate: "",
        link: "/shop?offer=deal-of-day",
        image: "",
    })

    const fetchOffer = async () => {
        try {
            const res = await fetchWithAuth("/api/admin/banners")
            const data = await res.json()
            if (data.success) {
                const offerItem = data.data.find((b: any) => b.type === "OFFER")
                if (offerItem) {
                    setOfferBanner({
                        ...offerItem,
                        targetDate: offerItem.targetDate ? new Date(offerItem.targetDate).toISOString().split('T')[0] : ""
                    })
                }
            }
        } catch (error) {
            toast.error("Failed to load offer details")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOffer()
    }, [])

    const handleOfferChange = (e: any) => {
        const { name, value } = e.target
        setOfferBanner((prev: any) => ({ ...prev, [name]: value }))
    }

    const saveOfferBanner = async (e: any) => {
        e.preventDefault()
        setSavingOffer(true)
        try {
            const { id, createdAt, updatedAt, ...rest } = offerBanner
            const url = id ? `/api/admin/banners/${id}` : "/api/admin/banners"
            const method = id ? "PATCH" : "POST"
            const payload = { ...rest, type: "OFFER" }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: 'include',
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Deal of the Day updated")
            } else {
                toast.error(data.error || "Save failed")
            }
        } catch (error) {
            toast.error("Failed to save Deal of the Day")
        } finally {
            setSavingOffer(false)
        }
    }

    if (loading) return <div className="p-12 text-center text-gray-400 font-medium">Loading settings...</div>

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
                <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                    <Tag size={24} className="text-orange-500" />
                    Deal of the Day Configuration
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure the time-limited promotional banner with countdown targeting.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm max-w-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <Tag size={180} />
                </div>

                <form onSubmit={saveOfferBanner} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Banner Title</label>
                            <div className="relative">
                                <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                <input
                                    type="text"
                                    name="title"
                                    value={offerBanner.title}
                                    onChange={handleOfferChange}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all"
                                    placeholder="e.g. Flash Sale: 50% Off"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Subtitle / Description</label>
                            <textarea
                                name="subtitle"
                                value={offerBanner.subtitle}
                                onChange={handleOfferChange}
                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3.5 px-4 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 min-h-[100px] transition-all resize-none"
                                placeholder="Describe the offer details here..."
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Target End Date</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="date"
                                        name="targetDate"
                                        value={offerBanner.targetDate}
                                        onChange={handleOfferChange}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Redirect Link URL</label>
                                <div className="relative">
                                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="text"
                                        name="link"
                                        value={offerBanner.link}
                                        onChange={handleOfferChange}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all"
                                        placeholder="/shop/summer-collection"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            disabled={savingOffer}
                            className="bg-orange-500 hover:bg-orange-600 text-white w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
                        >
                            {savingOffer ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} className="group-hover:translate-y-0.5 transition-transform" />}
                            Update Campaign Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
