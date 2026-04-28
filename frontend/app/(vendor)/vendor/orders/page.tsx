"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
    ShoppingBag, 
    Search, 
    Filter, 
    Eye, 
    Download, 
    Printer, 
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Loader2
} from "lucide-react"
import { vendorService } from "@/src/services/vendor.service"
import { toast } from "react-hot-toast"
import { format } from "date-fns"

export default function OrderListPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<any>(null)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    useEffect(() => {
        fetchOrders()
    }, [page, search, statusFilter])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await vendorService.getOrders({ 
                page, 
                limit: 10, 
                search, 
                status: statusFilter === 'ALL' ? undefined : statusFilter 
            })
            if (res.success) {
                setOrders(res.data)
                setPagination(res.pagination)
            }
        } catch (error) {
            toast.error("Failed to fetch orders")
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'DELIVERED': return CheckCircle
            case 'PENDING': return Clock
            case 'SHIPPED': return Truck
            case 'CANCELLED': return XCircle
            default: return Clock
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <ShoppingBag className="text-indigo-600" size={32} />
                        Sales Orders
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Track and manage all customer orders.</p>
                </div>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap items-center gap-3">
                {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(status => (
                    <button 
                        key={status}
                        onClick={() => { setStatusFilter(status); setPage(1); }}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            statusFilter === status 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" 
                            : "bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800"
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by Order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="animate-spin text-indigo-600" size={40} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order Details</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Amount</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Payment</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {orders.map((order) => {
                                    const StatusIcon = getStatusIcon(order.status)
                                    return (
                                        <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group cursor-pointer">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">
                                                        #{order.id.slice(-4)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">#{order.orderNumber}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">
                                                            {format(new Date(order.createdAt), 'MMM dd, yyyy')} • {order.items?.length || 0} items
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{order.mainOrder?.user?.name || 'Guest'}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-widest">{order.mainOrder?.user?.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-sm font-black text-gray-900 dark:text-white">${order.totalAmount}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                    order.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                                                }`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${
                                                    order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                                                    order.status === 'PENDING' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                                                    order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                                                    'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                                                }`}>
                                                    <StatusIcon size={12} />
                                                    {order.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/vendor/orders/${order.id}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                                                        <Eye size={16} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-400">Showing {orders.length} of {pagination.totalCount} orders</p>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-black text-gray-400 hover:text-indigo-600 transition-all flex items-center gap-2 disabled:opacity-30"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button 
                                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="px-4 py-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-black text-gray-400 hover:text-indigo-600 transition-all flex items-center gap-2"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
