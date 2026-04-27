"use client"

import { useState, useEffect } from "react"
import { Package, Loader2 } from "lucide-react"
import Link from "next/link"
import OrderCard from "@/components/order/OrderCard"

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<"in-progress" | "completed" | "cancel">("in-progress")

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await fetch("/api/orders", {
                credentials: "include",
            })
            const data = await response.json()
            if (data.success) {
                setOrders(data.data)
            }
        } catch (error) {
            console.error("Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    const filteredOrders = orders.filter((order) => {
        const status = order.status?.toLowerCase() || ""
        if (activeTab === "in-progress") {
            return ["pending", "processing", "shipped", "on-way", "confirmed"].includes(status)
        }
        if (activeTab === "completed") {
            return status === "delivered" || status === "completed"
        }
        if (activeTab === "cancel") {
            return status === "cancelled" || status === "returned" || status === "failed"
        }
        return false
    })

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent p-8 flex justify-center items-center">
                <Loader2 className="animate-spin text-orange-600" size={40} />
            </div>
        )
    }

    const tabs = [
        { id: "in-progress", label: "In Progress", count: orders.filter(o => ["pending", "processing", "shipped", "on-way", "confirmed"].includes(o.status?.toLowerCase())).length },
        { id: "completed", label: "Completed", count: orders.filter(o => ["delivered", "completed"].includes(o.status?.toLowerCase())).length },
        { id: "cancel", label: "Cancelled", count: orders.filter(o => ["cancelled", "returned", "failed"].includes(o.status?.toLowerCase())).length },
    ] as const

    return (
        <div className="p-6 md:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 dark:bg-orange-500/10 rounded-2xl text-orange-600 dark:text-orange-400">
                        <Package size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
                        <p className="text-gray-500 dark:text-gray-400">Track and manage your recent purchases</p>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800/50 rounded-2xl w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                                activeTab === tab.id
                                    ? "bg-white dark:bg-gray-900 text-orange-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                            }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                                    activeTab === tab.id 
                                        ? "bg-orange-100 text-orange-600" 
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredOrders.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800 p-16 text-center shadow-sm">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 dark:text-gray-600">
                            <Package size={48} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                            No {activeTab.replace("-", " ")} orders
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs mx-auto">
                            {activeTab === "in-progress" 
                                ? "You don't have any orders currently being processed." 
                                : activeTab === "completed" 
                                ? "You haven't completed any orders yet." 
                                : "You don't have any cancelled or returned orders."}
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center px-10 py-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full font-bold hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all transform hover:scale-105 shadow-xl"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
