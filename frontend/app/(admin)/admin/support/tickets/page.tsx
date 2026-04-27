"use client"

import { useState } from "react"
import { Ticket, Search, Filter, MessageSquare, Clock, CheckCircle2, AlertCircle, User, MoreHorizontal, Eye, Reply, Archive, Star } from "lucide-react"

interface SupportTicket {
    id: string
    subject: string
    user: string
    role: 'VENDOR' | 'CUSTOMER'
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED'
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
    date: string
    lastActivity: string
}

const mockTickets: SupportTicket[] = [
    { id: "TK-8821", subject: "Payment failure during checkout", user: "John Customer", role: 'CUSTOMER', status: 'OPEN', priority: 'HIGH', date: "2024-03-24", lastActivity: "2 mins ago" },
    { id: "TK-8820", subject: "Unable to upload product images", user: "Elite Electronics", role: 'VENDOR', status: 'IN_PROGRESS', priority: 'MEDIUM', date: "2024-03-23", lastActivity: "1 hour ago" },
    { id: "TK-8819", subject: "Commission rate clarification", user: "Urban Vogue", role: 'VENDOR', status: 'CLOSED', priority: 'LOW', date: "2024-03-22", lastActivity: "1 day ago" },
    { id: "TK-8818", subject: "Account suspended without notice", user: "Mike Vendor", role: 'VENDOR', status: 'OPEN', priority: 'URGENT', date: "2024-03-24", lastActivity: "15 mins ago" },
]

export default function SupportTicketsPage() {
    const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets)
    const [statusFilter, setStatusFilter] = useState('ALL')

    const filtered = tickets.filter(t => statusFilter === 'ALL' || t.status === statusFilter)

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <Ticket className="text-blue-600" size={32} />
                        Support Desk
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and respond to vendor and customer support requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
                        <Archive size={18} /> View Archive
                    </button>
                    <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                        <Star size={18} /> Manage Agents
                    </button>
                </div>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Open Tickets", value: "24", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Pending Response", value: "8", icon: Clock, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Resolved Today", value: "42", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Avg. Resolution", value: "2.4h", icon: AlertCircle, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</h3>
                            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ticket Inbox Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Filter */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 px-1">Status Filter</h4>
                            <div className="space-y-1">
                                {['ALL', 'OPEN', 'IN_PROGRESS', 'CLOSED'].map(s => (
                                    <button 
                                        key={s}
                                        onClick={() => setStatusFilter(s)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                                            statusFilter === s 
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        }`}
                                    >
                                        <span className="capitalize">{s.replace('_', ' ').toLowerCase()}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-lg ${statusFilter === s ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200"}`}>
                                            {s === 'ALL' ? tickets.length : tickets.filter(t => t.status === s).length}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50 dark:border-gray-800">
                             <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 px-1">Priority</h4>
                             <div className="space-y-3">
                                {['URGENT', 'HIGH', 'MEDIUM', 'LOW'].map(p => (
                                    <label key={p} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-3 h-3 rounded-full ${
                                            p === 'URGENT' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' :
                                            p === 'HIGH' ? 'bg-orange-500' :
                                            p === 'MEDIUM' ? 'bg-blue-500' : 'bg-gray-400'
                                        }`}></div>
                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors">{p}</span>
                                    </label>
                                ))}
                             </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                            <MessageSquare size={120} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-2 relative z-10">AI Auto-Reply</h4>
                        <p className="text-[10px] text-blue-100/70 font-medium mb-4 relative z-10 leading-relaxed">Let Gemini handle simple inquiries like order tracking and returns automatically.</p>
                        <button className="w-full bg-white text-blue-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-lg relative z-10">Configure Bot</button>
                    </div>
                </div>

                {/* Ticket List */}
                <div className="lg:col-span-9 space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by ticket ID, subject or user..." 
                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 rounded-2xl hover:bg-gray-100">
                            <Filter size={20} />
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden divide-y divide-gray-50 dark:divide-gray-800">
                        {filtered.map(ticket => (
                            <div key={ticket.id} className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all group flex items-center gap-6">
                                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                                    ticket.status === 'OPEN' ? 'bg-blue-600 shadow-blue-600/20' :
                                    ticket.status === 'IN_PROGRESS' ? 'bg-orange-500 shadow-orange-500/20' :
                                    'bg-emerald-500 shadow-emerald-500/20'
                                }`}>
                                    <Ticket size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">#{ticket.id}</span>
                                        <span className="text-gray-300 dark:text-gray-700">•</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                                            ticket.priority === 'URGENT' ? 'text-rose-600' :
                                            ticket.priority === 'HIGH' ? 'text-orange-600' :
                                            ticket.priority === 'MEDIUM' ? 'text-blue-600' : 'text-gray-400'
                                        }`}>{ticket.priority} Priority</span>
                                    </div>
                                    <h4 className="text-base font-extrabold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{ticket.subject}</h4>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-700">
                                                <User size={10} className="text-gray-500" />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">{ticket.user}</span>
                                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${ticket.role === 'VENDOR' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {ticket.role}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                                            <Clock size={12} />
                                            Last active {ticket.lastActivity}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                    <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Reply">
                                        <Reply size={20} />
                                    </button>
                                    <button className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="View Details">
                                        <Eye size={20} />
                                    </button>
                                    <button className="p-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center pt-4">
                        <button className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">Load More Conversations</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
