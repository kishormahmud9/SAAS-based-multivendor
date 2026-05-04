"use client"

import { useState } from "react"
import { Search, Package, ArrowRight, Loader2, CheckCircle2, Truck, Clock, MapPin, ShoppingBag, ArrowLeft, MessageCircle, AlertCircle } from "lucide-react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"

// Mock Order Data for UI Demonstration
const mockOrder = {
    id: "ORD-20260324-RM882",
    status: "Shipped",
    estimatedDelivery: "March 27, 2026",
    placedAt: "March 24, 2026",
    shippingTo: "123 Fashion Street, Design District, NY 10001",
    carrier: "ReadyMart Express",
    trackingNumber: "RM-EXP-992837482",
    items: [
        {
            name: "Classic Oversized Tee",
            variant: "Midnight Blue / Large",
            price: 45.00,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200"
        },
        {
            name: "Slim Fit Chinos",
            variant: "Khaki / 32",
            price: 85.00,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1624371414361-e6e0ea2ec6c7?auto=format&fit=crop&q=80&w=200"
        }
    ],
    total: 175.00
}

const steps = [
    { name: "Order Placed", status: "completed", date: "Mar 24, 10:30 AM", icon: <CheckCircle2 size={16} /> },
    { name: "Processing", status: "completed", date: "Mar 24, 02:45 PM", icon: <CLOCK_ICON /> },
    { name: "Shipped", status: "current", date: "Mar 25, 08:00 AM", icon: <Truck size={16} /> },
    { name: "Out for Delivery", status: "upcoming", date: "Pending", icon: <Package size={16} /> },
    { name: "Delivered", status: "upcoming", date: "Pending", icon: <MapPin size={16} /> }
]

function CLOCK_ICON() {
    return <Clock size={16} />
}

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState("")
    const [loading, setLoading] = useState(false)
    const [isTracking, setIsTracking] = useState(false)

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!orderNumber.trim()) return

        setLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Match mock or show error for demo
        if (orderNumber.toUpperCase().includes("ORD")) {
            setIsTracking(true)
        } else {
            toast.error("Order not found. Please check the ID and try again.")
        }
        setLoading(false)
    }

    if (isTracking) {
        return (
            <div className="min-h-screen bg-gray-50/50 py-12 px-6">
                <div className="container mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Header Action */}
                    <div className="flex items-center justify-between mb-10">
                        <button 
                            onClick={() => setIsTracking(false)}
                            className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-orange-600 transition-all uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"
                        >
                            <ArrowLeft size={14} /> Back to Search
                        </button>
                        <div className="flex gap-4">
                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                                <span className="sr-only">Download Invoice</span>
                                <ShoppingBag size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Status Left Column */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Glassmorphic Header Card */}
                            <div className="relative overflow-hidden bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 md:p-10 shadow-2xl shadow-gray-200/50">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
                                <div className="relative space-y-6">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em]">Order Tracking</p>
                                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
                                                {mockOrder.id}
                                            </h1>
                                        </div>
                                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20">
                                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                            <span className="text-xs font-black uppercase tracking-widest leading-none">{mockOrder.status}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Expected Delivery</p>
                                            <p className="text-sm font-black text-gray-900">{mockOrder.estimatedDelivery}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Date</p>
                                            <p className="text-sm font-black text-gray-900">{mockOrder.placedAt}</p>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Carrier ID</p>
                                            <p className="text-sm font-black text-orange-600 font-mono">{mockOrder.trackingNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tracking Stepper */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100">
                                <h3 className="text-[11px] font-black text-gray-400 mb-10 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <Truck size={14} className="text-orange-600" /> Transit Timeline
                                </h3>
                                <div className="space-y-12 relative">
                                    <div className="absolute left-[21px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                                    {steps.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-8 relative group">
                                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 border-4 border-white ${
                                                step.status === "completed" 
                                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                                                : step.status === "current"
                                                ? "bg-orange-600 text-white shadow-xl shadow-orange-600/20 scale-110 ring-4 ring-orange-600/10"
                                                : "bg-gray-50 text-gray-300"
                                            }`}>
                                                {step.icon}
                                            </div>
                                            <div className="flex flex-col flex-1 pb-4 border-b border-gray-50 last:border-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className={`font-black tracking-tight text-base ${
                                                        step.status === "upcoming" ? "text-gray-400" : "text-gray-900"
                                                    }`}>
                                                        {step.name}
                                                    </h4>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{step.date}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium max-w-sm">
                                                    {step.status === "completed" 
                                                        ? "Your package successfully cleared this milestone." 
                                                        : step.status === "current" 
                                                        ? "Your package is currently at this facility and will depart soon." 
                                                        : "Pending arrival at this facility."}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/50">
                                <h3 className="text-[11px] font-black text-gray-400 mb-6 uppercase tracking-[0.2em]">Package Items</h3>
                                <div className="space-y-6">
                                    {mockOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-5 group">
                                            <div className="relative w-20 h-20 rounded-[1.5rem] overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50 p-2">
                                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 p-2" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h5 className="font-black text-gray-900 text-xs leading-5 mb-1">{item.name}</h5>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.variant}</p>
                                                <div className="mt-2 flex items-center gap-3">
                                                    <span className="text-xs font-black text-orange-600">Qty: {item.quantity}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                                    <span className="text-xs font-black text-gray-900">৳{item.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Value</span>
                                        <span className="text-xl font-black text-gray-900 tracking-tighter">৳{mockOrder.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Information */}
                            <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-orange-600/30 transition-colors"></div>
                                <h4 className="text-xs font-black mb-6 flex items-center gap-3 uppercase tracking-[0.2em] text-orange-500">
                                    <MapPin size={16} /> Destination
                                </h4>
                                <div className="space-y-4 relative">
                                    <p className="text-sm font-black leading-relaxed text-white">
                                        {mockOrder.shippingTo}
                                    </p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-orange-500">
                                            <Truck size={14} />
                                        </div>
                                        <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">
                                            Partner: {mockOrder.carrier}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-4 bg-white border border-gray-100 rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:border-orange-600/30 transition-all active:scale-95 shadow-lg shadow-gray-200/50">
                                    <MessageCircle size={14} className="text-orange-600" /> Support
                                </button>
                                <Link href="/returns" className="py-4 bg-white border border-gray-100 rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:border-orange-600/30 transition-all active:scale-95 shadow-lg shadow-gray-200/50">
                                    <AlertCircle size={14} className="text-blue-500" /> Policies
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50/10 via-transparent to-transparent">
            <div className="w-full max-w-xl text-center space-y-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Package size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Live Tracking</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Track Your Order
                    </h1>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Enter your tracking number to see the real-time status of your package.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 p-2 animate-in fade-in zoom-in duration-700 delay-300 border border-gray-100 overflow-hidden">
                    <form onSubmit={handleTrack} className="flex flex-col md:flex-row items-center gap-2">
                        <div className="relative flex-1 w-full group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-orange-600 transition-all">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="Order ID (e.g. ORD-123)"
                                className="w-full pl-16 pr-6 py-5 bg-transparent outline-none font-black text-lg text-gray-900 placeholder:text-gray-200"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-8 py-5 bg-orange-600 hover:bg-orange-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-600/20 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={16} />
                            ) : (
                                <>
                                    Locate <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="flex items-center justify-center gap-8 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                        <Truck size={14} /> READYMART LOGISTICS
                    </div>
                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                    <p className="text-gray-400 flex items-center gap-2">
                        <AlertCircle size={14} /> NO LOGIN REQUIRED
                    </p>
                </div>
            </div>
        </div>
    )
}

function ShieldCheck({ className, size = 24 }: { className?: string, size?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6v7z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
