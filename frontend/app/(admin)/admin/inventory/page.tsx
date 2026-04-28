"use client"

import { useState, useEffect } from "react"
import { 
    Boxes, 
    Search, 
    RefreshCw, 
    AlertCircle, 
    TrendingUp, 
    TrendingDown,
    Save,
    Loader2,
    Package,
    ArrowUpRight,
    History
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"

export default function AdminInventoryPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        fetchInventory()
    }, [])

    const fetchInventory = async () => {
        setLoading(true)
        try {
            const res = await adminService.getProducts()
            if (res.success) {
                setProducts(res.data)
            }
        } catch (error) {
            toast.error("Failed to fetch inventory")
        } finally {
            setLoading(false)
        }
    }

    const handleStockUpdate = async (id: string, newStock: number) => {
        setUpdating(id)
        try {
            const res = await adminService.updateProduct(id, { stock: newStock })
            if (res.success) {
                toast.success("Stock updated")
                setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p))
            }
        } catch (error) {
            toast.error("Update failed")
        } finally {
            setUpdating(null)
        }
    }

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Boxes className="text-orange-500" size={32} />
                        Inventory Control
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Real-time stock monitoring and replenishment hub.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchInventory} className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-all shadow-sm">
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button className="px-6 py-2.5 bg-gray-900 dark:bg-orange-600 text-white rounded-xl text-sm font-black shadow-lg transition-all flex items-center gap-2">
                        <History size={18} />
                        Stock Logs
                    </button>
                </div>
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-500">
                            <AlertCircle size={24} />
                        </div>
                        <span className="text-[10px] font-black text-rose-500 uppercase bg-rose-50 px-3 py-1 rounded-full">Urgent</span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">{products.filter(p => p.stock < 10).length}</h3>
                    <p className="text-sm font-bold text-gray-400">Low Stock Products</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-500">
                            <TrendingUp size={24} />
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-50 px-3 py-1 rounded-full">+12% Growth</span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">{products.reduce((acc, p) => acc + (p.stock || 0), 0)}</h3>
                    <p className="text-sm font-bold text-gray-400">Total Units in Hand</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500">
                            <RefreshCw size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">94%</h3>
                    <p className="text-sm font-bold text-gray-400">Inventory Turnover</p>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 dark:border-gray-800">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by SKU or Product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                        />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Item Details</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Current Stock</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Quick Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center">
                                        <Loader2 className="animate-spin text-orange-500 mx-auto" size={40} />
                                    </td>
                                </tr>
                            ) : filtered.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700">
                                                <img src={product.images?.[0] || "/placeholder.png"} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{product.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">SKU: {product.sku || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            product.stock === 0 ? 'bg-rose-50 text-rose-600' :
                                            product.stock < 10 ? 'bg-orange-50 text-orange-600' :
                                            'bg-emerald-50 text-emerald-600'
                                        }`}>
                                            {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-lg font-black text-gray-900 dark:text-white">{product.stock}</span>
                                        <span className="text-[10px] font-bold text-gray-400 block tracking-widest uppercase">Units</span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <input 
                                                type="number" 
                                                defaultValue={product.stock}
                                                onBlur={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
                                                className="w-20 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-sm font-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-center"
                                            />
                                            {updating === product.id && <Loader2 size={16} className="animate-spin text-orange-500" />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
