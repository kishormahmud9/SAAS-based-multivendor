"use client"

import { useState } from "react"
import { Ruler, Users, ChevronRight, Info, HelpCircle, ArrowRight, User, ShoppingBag } from "lucide-react"
import Link from "next/link"

const sizeCharts = {
    men: [
        { size: "XS", chest: "34-36", waist: "28-30", neck: "14-14.5" },
        { size: "S", chest: "36-38", waist: "30-32", neck: "14.5-15" },
        { size: "M", chest: "38-40", waist: "32-34", neck: "15.5-16" },
        { size: "L", chest: "41-43", waist: "35-37", neck: "16.5-17" },
        { size: "XL", chest: "44-46", waist: "38-40", neck: "17.5-18" },
        { size: "XXL", chest: "47-49", waist: "41-43", neck: "18.5-19" }
    ],
    women: [
        { size: "0 (XS)", bust: "32-33", waist: "25-26", hips: "35-36" },
        { size: "2-4 (S)", bust: "34-35", waist: "27-28", hips: "37-38" },
        { size: "6-8 (M)", bust: "36-37", waist: "29-30", hips: "39-40" },
        { size: "10-12 (L)", bust: "38-40", waist: "31-33", hips: "41-43" },
        { size: "14-16 (XL)", bust: "41-43", waist: "34-37", hips: "44-46" },
        { size: "18-20 (XXL)", bust: "44-46", waist: "38-41", hips: "47-49" }
    ]
}

export default function SizeGuidePage() {
    const [activeTab, setActiveTab] = useState<"men" | "women">("men")

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 text-orange-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Ruler size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Perfect Fit Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Find Your Size
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Our clothing is designed for a modern, tailored fit. Use our comprehensive size guide to find the perfect match for your body type.
                    </p>
                </div>
            </section>

            {/* Tab Selector */}
            <section className="px-6 mb-16">
                <div className="container mx-auto max-w-lg">
                    <div className="flex bg-gray-100 dark:bg-gray-900 p-2 rounded-[2rem] border border-gray-200 dark:border-gray-800">
                        <button 
                            onClick={() => setActiveTab("men")}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all ${
                                activeTab === "men" 
                                ? "bg-white dark:bg-gray-800 text-orange-600 shadow-xl" 
                                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            <User size={16} /> Men
                        </button>
                        <button 
                            onClick={() => setActiveTab("women")}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all ${
                                activeTab === "women" 
                                ? "bg-white dark:bg-gray-800 text-orange-600 shadow-xl" 
                                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            <User size={16} /> Women
                        </button>
                    </div>
                </div>
            </section>

            {/* Sizing Table */}
            <section className="px-6 mb-20">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-700">
                        <div className="p-8 md:p-12 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight uppercase tracking-widest text-sm text-orange-600">
                                    {activeTab === "men" ? "Men's Tops & Outerwear" : "Women's Collection"}
                                </h2>
                                <p className="text-gray-500 font-medium">All measurements are in inches</p>
                            </div>
                            <div className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20">
                                Global Sizing Standard
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-8 py-6 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">ReadyMart Size</th>
                                        <th className="px-8 py-6 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">
                                            {activeTab === "men" ? "Chest" : "Bust"}
                                        </th>
                                        <th className="px-8 py-6 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">Waist</th>
                                        <th className="px-8 py-6 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">
                                            {activeTab === "men" ? "Neck" : "Hips"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {sizeCharts[activeTab].map((row: any, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                            <td className="px-8 py-6 font-black text-gray-900 dark:text-white">{row.size}</td>
                                            <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                                                {activeTab === "men" ? row.chest : row.bust}
                                            </td>
                                            <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium tracking-tight">{row.waist}</td>
                                            <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                                                {activeTab === "men" ? row.neck : row.hips}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Measure Section */}
            <section className="py-20 px-6 bg-gray-900 text-white border-y border-white/5">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">How to Measure</h2>
                        <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-500 font-black group-hover:bg-orange-600 group-hover:text-white transition-all">01</div>
                                <div>
                                    <h4 className="text-xl font-black mb-2 tracking-tight">Chest / Bust</h4>
                                    <p className="text-gray-400 font-medium leading-relaxed">Measure under your arms, around the fullest part of your chest or bust. Keep the tape level and comfortably snug.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 group text-gray-400 hover:text-white transition-colors">
                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-500 font-black">02</div>
                                <div>
                                    <h4 className="text-xl font-black mb-2 tracking-tight text-white">Waist</h4>
                                    <p className="font-medium leading-relaxed">Measure around your natural waistline, which is the narrowest part of your body. Don&apos;t pull too tightly.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-500 font-black">03</div>
                                <div>
                                    <h4 className="text-xl font-black mb-2 tracking-tight">Hips</h4>
                                    <p className="text-gray-400 font-medium leading-relaxed">Stand with your feet together and measure around the fullest part of your hips. Keep the tape parallel to the floor.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 group text-gray-400 hover:text-white transition-colors">
                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-500 font-black">04</div>
                                <div>
                                    <h4 className="text-xl font-black mb-2 tracking-tight text-white">Sleeve Length</h4>
                                    <p className="font-medium leading-relaxed">Measure from the center back of your neck, across your shoulder, and down to your wrist bone.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 text-center">
                <div className="container mx-auto max-w-xl">
                    <div className="p-10 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800">
                        <HelpCircle size={48} className="text-orange-600 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Between Sizes?</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">
                            If your measurements fall between two sizes, we recommend choosing the larger size for a more relaxed fit or the smaller size for a tailored look.
                        </p>
                        <Link 
                            href="/shop" 
                            className="inline-flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 active:scale-95 transition-all shadow-xl shadow-orange-600/20"
                        >
                            Return to Shop <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
