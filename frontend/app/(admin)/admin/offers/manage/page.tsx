"use client"

import { useState } from "react"
import { 
    Gift, 
    Plus, 
    Search, 
    Filter, 
    ArrowUpDown, 
    Edit3, 
    Trash2, 
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    Calendar,
    MousePointer2,
    TrendingUp,
    Zap
} from "lucide-react"
import Modal from "@/components/ui/Modal"
import CreateOfferModal from "@/components/admin/CreateOfferModal"

// ─── Data ──────────────────────────────────────────────────────────────────
interface Offer {
    id: string
    title: string
    description: string
    discount: string
    status: "active" | "expired" | "scheduled"
    startDate: string
    endDate: string
    usage: number
}

const mockOffers: Offer[] = [
    { id: "1", title: "Summer Flash Sale", description: "20% off on all summer apparel", discount: "20% OFF", status: "active", startDate: "2024-03-01", endDate: "2024-04-30", usage: 1240 },
    { id: "2", title: "New Year Electronics", description: "Flat BDT 5000 off on smartphones", discount: "৳5,000 OFF", status: "expired", startDate: "2023-12-15", endDate: "2024-01-05", usage: 850 },
    { id: "3", title: "Ramadan Special", description: "Buy 1 Get 1 on selected items", discount: "BOGO", status: "scheduled", startDate: "2024-04-10", endDate: "2024-05-10", usage: 0 },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function OffersManagementPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <Gift size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Offers & Deals
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Create and manage dynamic promotional campaigns to boost your store revenue.
                    </p>
                </div>
                
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create General Offer</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search campaigns by name or ID..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>All Types</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ArrowUpDown size={18} />
                        <span>Recently Updated</span>
                    </button>
                </div>
            </div>

            {/* Offers List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockOffers.map((offer) => (
                    <div key={offer.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 flex flex-col group">
                        
                        <div className="p-8 space-y-4 flex-1">
                            <div className="flex justify-between items-start">
                                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                    offer.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-200/50' : 
                                    offer.status === 'scheduled' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-200/50' :
                                    'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                }`}>
                                    {offer.status}
                                </div>
                                <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
                                    {offer.discount}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-orange-600 transition-colors">{offer.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{offer.description}</p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-gray-800">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-widest">
                                        <Calendar size={12} />
                                        <span>Campaign Period</span>
                                    </div>
                                    <span className="font-black text-gray-700 dark:text-gray-300">{offer.startDate} - {offer.endDate}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-widest">
                                        <TrendingUp size={12} />
                                        <span>Performance</span>
                                    </div>
                                    <span className="font-black text-emerald-600">{offer.usage.toLocaleString()} claimed</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-1">
                                <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all"><Edit3 size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"><Trash2 size={16} /></button>
                            </div>
                            <button className="text-xs font-black text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                                <MousePointer2 size={12} /> Manage
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Analytics Banner */}
            <div className="bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-black dark:to-gray-950 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Zap size={120} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 bg-orange-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-orange-500/30">
                        <TrendingUp size={32} className="text-orange-500" />
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black mb-1">Campaign Optimization</h3>
                        <p className="text-gray-400 max-w-lg font-medium leading-relaxed">Your "Summer Flash Sale" is performing <span className="text-orange-400 font-bold">42% better</span> than last month. Consider extending it for another week.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    View Analytics Report
                </button>
            </div>

            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Offer"
            >
                <CreateOfferModal onClose={() => setIsCreateModalOpen(false)} />
            </Modal>
        </div>
    )
}
