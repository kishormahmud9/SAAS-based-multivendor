"use client"

import { useState } from "react"
import {
    PlusCircle,
    Search,
    User,
    Package,
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    ChevronRight,
    CreditCard,
    Truck,
    Tag,
    CheckCircle2,
    ArrowLeft,
    Monitor,
    ShieldCheck
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface Product {
    id: string
    name: string
    price: number
    stock: number
    image: string
}

const mockProducts: Product[] = [
    { id: "1", name: "Premium Wireless Headphones", price: 12500, stock: 45, image: "🎧" },
    { id: "2", name: "Mechanical Gaming Keyboard", price: 8500, stock: 12, image: "⌨️" },
    { id: "3", name: "Ergonomic Office Chair", price: 18000, stock: 8, image: "💺" },
    { id: "4", name: "4K Ultra HD Monitor", price: 32000, stock: 5, image: "🖥️" },
    { id: "5", name: "USB-C Fast Charger", price: 1200, stock: 156, image: "🔌" },
]

interface SelectedItem extends Product {
    quantity: number
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function CreateOrderPage() {
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [couponCode, setCouponCode] = useState("")

    const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const shipping = subtotal > 0 ? 500 : 0
    const discount = couponCode === "WELCOME2026" ? subtotal * 0.1 : 0
    const total = subtotal + shipping - discount

    const addToCart = (product: Product) => {
        const existing = selectedItems.find(item => item.id === product.id)
        if (existing) {
            setSelectedItems(selectedItems.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ))
        } else {
            setSelectedItems([...selectedItems, { ...product, quantity: 1 }])
        }
    }

    const updateQuantity = (id: string, delta: number) => {
        setSelectedItems(selectedItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }))
    }

    const removeItem = (id: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== id))
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                            <PlusCircle className="text-blue-600" size={32} />
                            Create Manual Order
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Place an order on behalf of a customer.</p>
                    </div>
                </div>
                
                <div className="hidden md:flex items-center gap-3 text-sm font-bold text-gray-400 tracking-widest uppercase">
                    <span className="text-blue-600">Step 1</span>
                    <ChevronRight size={16} />
                    <span>Step 2</span>
                    <ChevronRight size={16} />
                    <span>Step 3</span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Left Column: Product Selection & Customer */}
                <div className="xl:col-span-2 space-y-8">
                    
                    {/* Customer Selection Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                            <User className="text-blue-600" size={24} />
                            <h2 className="text-xl font-extrabold">Customer Details</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Customer Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter full name..."
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="customer@example.com"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Selection Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                                <Package className="text-blue-600" size={24} />
                                <h2 className="text-xl font-extrabold">Add Products</h2>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search catalog..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mockProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                                <div key={product.id} className="group bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 p-4 rounded-3xl border border-transparent hover:border-blue-500/30 transition-all duration-300 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                                            {product.image}
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-gray-900 dark:text-white text-sm leading-tight">{product.name}</p>
                                            <p className="text-blue-600 dark:text-blue-400 font-black text-sm">৳{product.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Summary & Checkout */}
                <div className="space-y-8">
                    
                    {/* Cart Summary */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-8 flex flex-col h-fit sticky top-8">
                        <div className="flex items-center gap-3 text-gray-900 dark:text-white mb-8">
                            <ShoppingCart className="text-blue-600" size={24} />
                            <h2 className="text-xl font-extrabold">Order Summary</h2>
                        </div>

                        {/* Items List */}
                        <div className="space-y-6 mb-8 flex-1 overflow-y-auto max-h-[400px] pr-2">
                            {selectedItems.length === 0 ? (
                                <div className="text-center py-10 opacity-30 grayscale">
                                    <ShoppingCart size={48} className="mx-auto mb-2" />
                                    <p className="font-bold text-sm uppercase tracking-widest">Cart is empty</p>
                                </div>
                            ) : (
                                selectedItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between gap-4 animate-in slide-in-from-right-4 duration-300">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 items-center justify-center flex text-xl shrink-0">
                                                {item.image}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-black text-gray-900 dark:text-white truncate uppercase tracking-tight">{item.name}</p>
                                                <p className="text-xs font-bold text-gray-400">৳{item.price.toLocaleString()} x {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-blue-600"><Minus size={12} /></button>
                                                <span className="mx-2 text-xs font-black w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-blue-600"><Plus size={12} /></button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Totals */}
                        <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                            
                            <div className="relative group/coupon">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/coupon:text-blue-500 transition-colors" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Enter Coupon Code" 
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all uppercase placeholder:normal-case"
                                />
                                {couponCode === "WELCOME2026" && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 flex items-center gap-1 font-black text-[10px] uppercase">
                                        <CheckCircle2 size={10} /> Applied
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                                    <span className="font-black text-gray-900 dark:text-white">৳{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                                    <span className="font-black text-gray-900 dark:text-white">৳{shipping.toLocaleString()}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-emerald-600 font-black">
                                        <span className="font-bold uppercase tracking-widest text-[10px]">Discount</span>
                                        <span>-৳{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-end pt-2">
                                    <span className="text-gray-900 dark:text-white font-black text-lg uppercase tracking-tight">Total Amount</span>
                                    <span className="font-black text-2xl text-blue-600">৳{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                disabled={selectedItems.length === 0 || !customerName || !customerEmail}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 disabled:from-gray-300 disabled:to-gray-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest mt-4"
                            >
                                Process & Create Order
                            </button>
                            
                            <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-widest">
                                <ShieldCheck size={10} className="inline mr-1 text-emerald-500" /> Secure Order Processing
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Helper Panel */}
            <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-2xl">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Monitor size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-xs text-blue-400 mb-2">Omnichannel Support</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">Place orders for customers via phone, chat, or in-store walk-ins seamlessly.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Truck size={24} className="text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-xs text-emerald-400 mb-2">Automated Logistics</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">Once created, the order is automatically pushed to the shipping queue for processing.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                        <CreditCard size={24} className="text-rose-400" />
                    </div>
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-xs text-rose-400 mb-2">Payment Links</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">Manual orders send a secure payment link directly to the customer&apos;s email address.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
