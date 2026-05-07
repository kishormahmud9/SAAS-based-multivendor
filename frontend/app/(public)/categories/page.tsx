"use client"

import { useState, useEffect, useMemo } from "react"
import { productService } from "@/src/services/product.service"
import Link from "next/link"
import Image from "next/image"
import { getImageUrl } from "@/src/lib/image-utils"
import { Search, Package, LayoutGrid, ArrowRight, Loader2, Filter } from "lucide-react"

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productService.getAllCategories()
                if (res.success) {
                    setCategories(res.data)
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.slug.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [categories, searchQuery])

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 pb-20">
            {/* Minimalist Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full mb-4">
                            <LayoutGrid size={14} className="text-orange-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Product Directory</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
                            Shop by <span className="text-orange-500">Category</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8">
                            Browse our entire collection organized by specialized departments to find exactly what you're looking for.
                        </p>

                        {/* Modern Search Bar */}
                        <div className="relative w-full max-w-lg group">
                            <div className="absolute inset-0 bg-orange-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative flex items-center">
                                <Search className="absolute left-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search departments..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white dark:focus:bg-gray-900 transition-all text-sm font-medium shadow-sm"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-4 text-[10px] font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Content */}
            <div className="container mx-auto px-4 py-16">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading Departments...</p>
                    </div>
                ) : filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {filteredCategories.map((category: any) => (
                            <Link 
                                key={category.id} 
                                href={`/shop?category=${category.slug}`}
                                className="group flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500"
                            >
                                <div className="relative w-24 h-24 mb-5">
                                    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden z-10">
                                        {category.image ? (
                                            <Image 
                                                src={getImageUrl(category.image)} 
                                                alt={category.name}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                                                <Package size={24} className="text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-lg z-20 shadow-lg shadow-orange-500/30 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                        {category._count?.products || 0}
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1 group-hover:text-orange-500 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1">
                                        Shop Now <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Search size={32} />
                        </div>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">No matches found</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6">
                            We couldn't find any departments matching "{searchQuery}". Try a different search term.
                        </p>
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="px-6 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Recommendation */}
            <div className="container mx-auto px-4 mt-8">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 transform group-hover:rotate-12 transition-transform duration-1000">
                        <LayoutGrid size={200} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">Can't find what you need?</h2>
                            <p className="text-gray-400 text-sm font-medium">Our support team is here to help you navigate our collection.</p>
                        </div>
                        <Link 
                            href="/contact" 
                            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all active:scale-95"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
