"use client"

import { useState } from "react"
import { 
    Tag, 
    Plus, 
    Search, 
    Filter, 
    ArrowUpDown, 
    Edit3, 
    Trash2, 
    MoreHorizontal,
    CheckCircle2,
    Calendar,
    ShoppingBag,
    Layers,
    ArrowRight,
    Settings2,
    Clock,
    XCircle,
    Info
} from "lucide-react"
import Modal from "@/components/ui/Modal"
import ApplyOfferModal from "@/components/admin/ApplyOfferModal"

// ─── Data ──────────────────────────────────────────────────────────────────
interface OfferApplication {
    id: string
    offerName: string
    targetType: "product" | "category"
    targetName: string
    status: "active" | "scheduled" | "expired"
    appliedDate: string
    expiryDate: string
}

const mockApplications: OfferApplication[] = [
    { id: "APP-1", offerName: "Summer Flash Sale", targetType: "category", targetName: "All Summer Clothing", status: "active", appliedDate: "2024-03-01", expiryDate: "2024-04-30" },
    { id: "APP-2", offerName: "Electronic Deals", targetType: "product", targetName: "iPhone 15 Pro Max", status: "active", appliedDate: "2024-03-10", expiryDate: "2024-04-10" },
    { id: "APP-3", offerName: "New Member Discount", targetType: "category", targetName: "First Purchase Only", status: "active", appliedDate: "2024-01-01", expiryDate: "2026-12-31" },
    { id: "APP-4", offerName: "Winter Clearance", targetType: "category", targetName: "Winter Gear", status: "expired", appliedDate: "2023-11-01", expiryDate: "2024-02-28" },
    { id: "APP-5", offerName: "BOGO Tech", targetType: "product", targetName: "Mechanical Keyboard X", status: "scheduled", appliedDate: "2025-05-01", expiryDate: "2025-05-15" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function ApplyOfferPage() {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Tag size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Apply Offers
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Connect your active offers to specific products or entire categories.
                    </p>
                </div>
                
                <button 
                    onClick={() => setIsApplyModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-blue-500/25 transition-all active:scale-95 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Apply New Offer</span>
                </button>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 tracking-wider">ACTIVE APPLICATIONS</p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">18 Mappings</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 tracking-wider">SCHEDULED OFFERS</p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">4 Upcoming</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-2xl flex items-center justify-center">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 tracking-wider">COVERAGE</p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">156 Products</h3>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by offer name or target..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>Filter Type</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ArrowUpDown size={18} />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Applications List Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-none">Campaign Details</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-none">Mapping Target</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-none">Application Period</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-none">Status</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {mockApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-blue-600">
                                                <Settings2 size={20} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-gray-900 dark:text-white mb-0.5">{app.offerName}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {app.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-bold text-sm text-gray-900 dark:text-white">
                                        <div className="flex items-center gap-2">
                                            {app.targetType === 'category' ? <Layers size={14} className="text-gray-400" /> : <ShoppingBag size={14} className="text-gray-400" />}
                                            {app.targetName}
                                            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-500 uppercase tracking-tighter">{app.targetType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 italic text-sm text-gray-500 dark:text-gray-400 font-bold">
                                        {app.appliedDate} <ArrowRight className="inline mx-2" size={14} /> {app.expiryDate}
                                    </td>
                                    <td className="px-6 py-6">
                                        {app.status === "active" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit border border-emerald-200/50 dark:border-emerald-800/50">
                                                <CheckCircle2 size={12} /> Live
                                            </div>
                                        ) : app.status === "scheduled" ? (
                                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full w-fit border border-amber-200/50 dark:border-amber-800/50">
                                                <Clock size={12} /> Scheduled
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-bold text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
                                                <XCircle size={12} /> Ended
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all" title="Edit Application">
                                                <Edit3 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all" title="Remove Application">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Operational Tip */}
            <div className="bg-indigo-900 text-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl transition-transform hover:scale-[1.01] duration-500 cursor-default">
                <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <Info size={32} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1 leading-tight">Pro Tip: Conflict Prevention</h3>
                        <p className="text-indigo-100 text-lg opacity-80 max-w-lg">When applying overlapping offers, the one with the <span className="text-white font-bold">highest discount</span> will be automatically prioritized during checkout.</p>
                    </div>
                </div>
                <button className="bg-white text-indigo-900 font-black px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-all shadow-xl active:scale-95 flex items-center gap-2">
                    Review Rules <ArrowRight size={20} />
                </button>
            </div>

            <Modal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                title="Apply Offer to Products"
            >
                <ApplyOfferModal onClose={() => setIsApplyModalOpen(false)} />
            </Modal>
        </div>
    )
}
