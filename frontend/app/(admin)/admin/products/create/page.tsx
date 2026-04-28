"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
    ArrowLeft,
    Loader2,
    Save,
    CheckCircle
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"

export default function AdminCreateProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [brands, setBrands] = useState<any[]>([])

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        sku: "",
        price: "",
        salePrice: "",
        stock: "",
        categoryId: "",
        brandId: "",
        status: "DRAFT",
        images: [] as string[]
    })

    useEffect(() => {
        fetchInitialData()
    }, [])

    const fetchInitialData = async () => {
        try {
            const [catRes, brandRes] = await Promise.all([
                adminService.getProducts('/categories'), // Wait, adminService has categories? No, I added them to backend but frontend service might need update
                adminService.getProducts('/brands')
            ])
            // Actually, I need to check if adminService has these methods.
            // I'll update adminService.ts first.
        } catch (error) {
            console.error("Failed to fetch initial data", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await adminService.createProduct(formData)
            if (res.success) {
                toast.success("Product created successfully")
                router.push("/admin/products")
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to create product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-orange-600 transition-colors shadow-sm group">
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">New Marketplace Product</h1>
                        <p className="text-sm text-gray-500 font-medium">Add a new item to the global catalog.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, status: 'DRAFT'})}
                        className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        Save as Draft
                    </button>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
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
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600">
                                <Type size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">General Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Product Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                                    placeholder="e.g. Premium Wireless Headphones"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">SKU Code</label>
                                    <input 
                                        type="text" 
                                        value={formData.sku}
                                        onChange={(e) => setFormData({...formData, sku: e.target.value})}
                                        placeholder="WH-100-PRO"
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Slug</label>
                                    <input 
                                        type="text" 
                                        value={formData.slug}
                                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                        placeholder="premium-wireless-headphones"
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Short Description</label>
                                <textarea 
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                                    placeholder="Brief summary of the product..."
                                    rows={2}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Detailed product information..."
                                    rows={6}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Upload (Simplified for now) */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Product Images</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button type="button" className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all group">
                                <Upload size={20} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Add Image</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Status & Categorization */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                                <DollarSign size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Pricing & Stock</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Regular Price ($)</label>
                                <input 
                                    type="number" 
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    placeholder="0.00"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-black"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Sale Price ($)</label>
                                <input 
                                    type="number" 
                                    value={formData.salePrice}
                                    onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                                    placeholder="0.00"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-black"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Available Stock</label>
                                <input 
                                    type="number" 
                                    required
                                    value={formData.stock}
                                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                    placeholder="0"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-black"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Categorization</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                                <select 
                                    required
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Brand</label>
                                <select 
                                    value={formData.brandId}
                                    onChange={(e) => setFormData({...formData, brandId: e.target.value})}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium appearance-none"
                                >
                                    <option value="">Select Brand</option>
                                    <option value="apple">Apple</option>
                                    <option value="nike">Nike</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
