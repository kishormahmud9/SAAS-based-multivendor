"use client"

import { useState } from "react"
import { 
    HelpCircle, 
    Search, 
    ChevronRight, 
    MessageSquare, 
    Book, 
    FileText, 
    PlayCircle, 
    Phone, 
    Mail, 
    LifeBuoy,
    ExternalLink,
    ArrowUpRight,
    Star
} from "lucide-react"

const FAQ_ITEMS = [
    { q: "How do I process a refund?", a: "To process a refund, go to the 'Orders' tab, select the order, and click on 'Initiate Refund'. The customer will be notified once you confirm." },
    { q: "When will I receive my payout?", a: "Payouts are processed every Monday and Thursday for verified vendors. It typically takes 1-3 business days to reach your bank." },
    { q: "How to add product variants?", a: "In the 'Add Product' page, scroll down to the 'Variants' section where you can add sizes, colors, and other custom attributes." },
]

export default function HelpCenterPage() {
    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Hero Section */}
            <div className="text-center space-y-6 pt-8">
                <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-500/30">
                    <HelpCircle size={40} />
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">How can we help you today?</h1>
                    <p className="text-gray-500 font-medium max-w-lg mx-auto">Search our knowledge base, explore video tutorials, or connect with our support team.</p>
                </div>
                <div className="max-w-2xl mx-auto relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={24} />
                    <input 
                        type="text" 
                        placeholder="Search for articles, guides, or troubleshooting..."
                        className="w-full pl-16 pr-6 py-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-medium"
                    />
                </div>
            </div>

            {/* Quick Links / Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Getting Started", desc: "Learn the basics of setting up your store.", icon: Book, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { title: "Managing Orders", desc: "Guide to fulfillment, shipping and returns.", icon: FileText, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { title: "Payment & Fees", desc: "Understand payouts, commissions and wallet.", icon: LifeBuoy, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
                ].map((cat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:shadow-xl transition-all duration-500 cursor-pointer">
                        <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center ${cat.color} mb-6 group-hover:scale-110 transition-transform`}>
                            <cat.icon size={28} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{cat.title}</h3>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">{cat.desc}</p>
                        <div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            Explore Guide <ChevronRight size={16} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Tutorials Section */}
            <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black flex items-center gap-2">
                                <PlayCircle className="text-blue-400" size={28} />
                                Video Masterclass
                            </h3>
                            <p className="text-gray-400 font-medium text-sm">Watch our step-by-step video guides to become a pro vendor.</p>
                        </div>
                        <button className="px-6 py-2.5 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest transition-all">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Optimize Product Listings", time: "5:30", thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop" },
                            { title: "Mastering Sales Events", time: "8:45", thumb: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop" },
                            { title: "Financial Management 101", time: "12:10", thumb: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" },
                        ].map((v, i) => (
                            <div key={i} className="space-y-3 cursor-pointer group/video">
                                <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10">
                                    <img src={v.thumb} className="w-full h-full object-cover group-hover/video:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900">
                                            <PlayCircle size={28} />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded-lg text-[10px] font-black">{v.time}</span>
                                </div>
                                <h4 className="text-sm font-black group-hover/video:text-blue-400 transition-colors">{v.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ & Support Contact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, i) => (
                            <div key={i} className="p-6 rounded-[2rem] bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm space-y-3">
                                <h4 className="text-base font-black text-gray-900 dark:text-white">{item.q}</h4>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Can't find what you need?</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="p-8 rounded-[3rem] bg-blue-600 text-white shadow-xl shadow-blue-500/20 flex items-center gap-6 group hover:scale-[1.02] transition-transform">
                            <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center shadow-inner">
                                <MessageSquare size={32} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-black">Live Support Chat</h4>
                                <p className="text-sm opacity-80 font-medium mt-1">Average response time: 2 mins</p>
                            </div>
                            <ArrowUpRight size={28} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="p-8 rounded-[3rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h5 className="text-sm font-black text-gray-900 dark:text-white">Email Us</h5>
                                    <p className="text-xs text-gray-500 mt-1">support@readymart.com</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h5 className="text-sm font-black text-gray-900 dark:text-white">Call Helpline</h5>
                                    <p className="text-xs text-gray-500 mt-1">+880 1700 000 000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
