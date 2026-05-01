"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
    ChevronLeft, 
    Upload, 
    X, 
    Plus, 
    Trash2, 
    Info,
    Layout,
    Globe,
    Settings,
    Image as ImageIcon,
    Tag,
    Layers,
    Box,
    DollarSign,
    Search,
    Type,
    ArrowLeft
} from "lucide-react"

export default function AddProductPage() {
    const [images, setImages] = useState<string[]>([])
    const [variants, setVariants] = useState<{ type: string, values: string[] }[]>([
        { type: "Size", values: ["S", "M", "L", "XL"] },
        { type: "Color", values: ["Black", "Silver"] }
    ])

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/vendor/products" className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors shadow-sm group">
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Create New Product</h1>
                        <p className="text-sm text-gray-500 font-medium">Fill in the details below to list your item in the marketplace.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                        Save Draft
                    </button>
                    <button className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105">
                        Publish Product
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Basic Information */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                                <Type size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">General Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Product Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Premium Wireless Headphones"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">SKU Code</label>
                                    <input 
                                        type="text" 
                                        placeholder="WH-100-PRO"
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Slug (Auto)</label>
                                    <input 
                                        type="text" 
                                        placeholder="premium-wireless-headphones"
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none transition-all text-gray-400 font-medium"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Short Description</label>
                                <textarea 
                                    placeholder="Brief summary of the product..."
                                    rows={2}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Description</label>
                                <textarea 
                                    placeholder="Detailed product information, features, and specifications..."
                                    rows={6}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Upload */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Product Gallery</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Upload Trigger */}
                            <button className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Upload size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-500 transition-colors">Add Image</span>
                            </button>
                            
                            {/* Mock Images */}
                            {[1, 2].map(i => (
                                <div key={i} className="aspect-square rounded-3xl bg-gray-50 dark:bg-gray-800 relative group overflow-hidden border border-gray-100 dark:border-gray-800">
                                    <Image 
                                        src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop`} 
                                        alt="Product Preview"
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    <button className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center italic">Upload up to 10 high-resolution product images (JPG, PNG, WebP)</p>
                    </div>

                    {/* Variants & Inventory */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                                    <Box size={20} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Variants & Stock</h3>
                            </div>
                            <button className="flex items-center gap-2 text-xs font-black text-blue-600 hover:underline">
                                <Plus size={14} /> Add New Variant
                            </button>
                        </div>

                        <div className="space-y-4">
                            {variants.map((v, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                                    <div className="w-24">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{v.type}</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{v.type}</p>
                                    </div>
                                    <div className="flex-1 flex flex-wrap gap-2">
                                        {v.values.map(val => (
                                            <span key={val} className="px-3 py-1 bg-white dark:bg-gray-900 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 flex items-center gap-2 group">
                                                {val}
                                                <X size={12} className="text-gray-400 hover:text-red-500 cursor-pointer" />
                                            </span>
                                        ))}
                                        <button className="px-3 py-1 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center gap-1">
                                            <Plus size={12} /> Add
                                        </button>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Organization & Status */}
                <div className="space-y-8">
                    
                    {/* Status & Pricing */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600">
                                <DollarSign size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Price & Status</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Regular Price ($)</label>
                                <input 
                                    type="number" 
                                    placeholder="0.00"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-black"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Discount Price ($)</label>
                                <input 
                                    type="number" 
                                    placeholder="0.00"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-black"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Total Stock</label>
                                <input 
                                    type="number" 
                                    placeholder="0"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-black"
                                />
                            </div>
                            <div className="pt-2">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                    <span className="text-sm font-bold text-blue-900 dark:text-blue-100">Publish Now</span>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categorization */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl flex items-center justify-center text-fuchsia-600">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Organization</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                                <select className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium appearance-none">
                                    <option>Electronics</option>
                                    <option>Fashion</option>
                                    <option>Home Goods</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Sub Category</label>
                                <select className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium appearance-none">
                                    <option>Headphones</option>
                                    <option>Smart Watches</option>
                                    <option>Cameras</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Brand</label>
                                <select className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium appearance-none">
                                    <option>Sony</option>
                                    <option>Apple</option>
                                    <option>Samsung</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* SEO Meta */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl flex items-center justify-center text-cyan-600">
                                <Globe size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">SEO Management</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">SEO Title</label>
                                <input 
                                    type="text" 
                                    placeholder="Keywords rich title..."
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">SEO Description</label>
                                <textarea 
                                    placeholder="Meta description for search engines..."
                                    rows={3}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium resize-none"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
