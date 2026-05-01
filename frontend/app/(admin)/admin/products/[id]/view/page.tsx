"use client"

import { useState, useEffect } from "react"
import { 
    ChevronLeft, 
    Box, 
    Loader2, 
    TrendingUp, 
    Package, 
    Layers, 
    Tag, 
    DollarSign, 
    ShoppingCart, 
    Star,
    Edit,
    Globe,
    AlertCircle,
    Info,
    Calendar,
    User,
    BarChart3,
    ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"

export default function AdminProductViewPage() {
    const router = useRouter()
    const params = useParams()
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params?.id) {
            fetchProduct()
        }
    }, [params?.id])

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const res = await adminService.getProductById(params.id as string)
            if (res.success) {
                setProduct(res.data)
            } else {
                toast.error("Product not found")
                router.push("/admin/products")
            }
        } catch (error) {
            toast.error("Failed to load product")
            router.push("/admin/products")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 size={48} className="animate-spin text-orange-500" />
                <p className="text-gray-500 font-bold animate-pulse">Analyzing product data...</p>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/products"
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-orange-500 transition-all shadow-sm group"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                            <Box size={12} />
                            Product Insight
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white truncate max-w-xl">{product?.name}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs font-bold text-gray-400">SKU: {product?.sku || 'N/A'}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${product?.status === 'ACTIVE' ? 'text-emerald-500' : 'text-orange-500'}`}>
                                {product?.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link 
                        href={`/admin/products/edit/${product?.id}`}
                        className="px-6 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-black text-gray-700 dark:text-white hover:text-orange-500 transition-all shadow-sm flex items-center gap-2"
                    >
                        <Edit size={18} /> Edit Product
                    </Link>
                    <Link 
                        href={`/product/${product?.slug}`}
                        target="_blank"
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
                    >
                        <Globe size={18} /> View Storefront
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Gallery & Main Stats */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Media Gallery */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <Package className="text-orange-500" size={20} />
                                Product Visuals
                            </h3>
                            <span className="text-xs font-bold text-gray-400">{product?.images?.length || 0} Assets</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {product?.images?.map((img: string, idx: number) => (
                                <div key={idx} className={`relative aspect-square rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 group ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                    <Image src={getImageUrl(img)} alt="" fill unoptimized className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    {idx === 0 && <span className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-white text-[10px] font-black uppercase rounded-lg shadow-lg">Primary</span>}
                                </div>
                            ))}
                            {(!product?.images || product.images.length === 0) && (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-3xl text-gray-300">
                                    <Package size={48} />
                                    <p className="mt-2 font-bold">No images available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Inventory & Variants */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <Layers className="text-blue-500" size={20} />
                                Inventory Variants
                            </h3>
                            <div className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-[10px] font-black text-blue-600 uppercase">
                                {product?.productType}
                            </div>
                        </div>

                        {product?.variants && product.variants.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-gray-50 dark:border-gray-800">
                                            <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Variant</th>
                                            <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">SKU</th>
                                            <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Price</th>
                                            <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {product.variants.map((v: any) => (
                                            <tr key={v.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center font-black text-gray-400 text-xs">
                                                            {v.name.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{v.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-center text-[10px] font-black text-gray-500 uppercase">{v.sku}</td>
                                                <td className="py-4 text-center font-black text-gray-900 dark:text-white">${v.price}</td>
                                                <td className="py-4 text-center">
                                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${v.stock < 10 ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                        {v.stock}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-10 text-gray-400 bg-gray-50 dark:bg-gray-800/30 rounded-3xl">
                                <Info size={32} />
                                <p className="mt-2 text-sm font-bold uppercase tracking-widest">No Variants Configured</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Detailed Info & Analytics */}
                <div className="space-y-8">
                    {/* Key Metrics */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange-500/20">
                        <div className="flex items-center justify-between mb-6">
                            <TrendingUp size={24} />
                            <ArrowUpRight size={18} className="opacity-50" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Retail Performance</p>
                        <h4 className="text-4xl font-black mt-1">${product?.price}</h4>
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                            <div>
                                <p className="text-[9px] font-black uppercase opacity-60">Inventory</p>
                                <p className="text-lg font-black">{product?.stock} Units</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase opacity-60">Status</p>
                                <p className="text-lg font-black capitalize">{product?.status.toLowerCase()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                            <Tag className="text-purple-500" size={18} />
                            Classification
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <Layers size={16} className="text-orange-500" />
                                    <span className="text-xs font-bold text-gray-500 uppercase">Category</span>
                                </div>
                                <span className="text-sm font-black text-gray-900 dark:text-white">{product?.category?.name || 'Unassigned'}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <Star size={16} className="text-blue-500" />
                                    <span className="text-xs font-bold text-gray-500 uppercase">Brand</span>
                                </div>
                                <span className="text-sm font-black text-gray-900 dark:text-white">{product?.brand?.name || 'Generic'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata & Stats */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                            <Info className="text-emerald-500" size={18} />
                            Logistics Info
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-xs">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="text-gray-500">Created:</span>
                                <span className="font-bold text-gray-700 dark:text-gray-300">{new Date(product?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                                <User size={14} className="text-gray-400" />
                                <span className="text-gray-500">Store:</span>
                                <span className="font-bold text-gray-700 dark:text-gray-300">{product?.store?.name}</span>
                            </div>
                            {product?.weight && (
                                <div className="flex items-center gap-3 text-xs">
                                    <AlertCircle size={14} className="text-gray-400" />
                                    <span className="text-gray-500">Shipping Weight:</span>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">{product?.weight} {product?.weightUnit}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
