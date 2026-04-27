"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, HelpCircle, Plus, Trash2, ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react"

export default function FAQManager() {
    const [saving, setSaving] = useState(false)
    const [faqs, setFaqs] = useState([
        { id: "1", question: "What is your return policy?", answer: "We offer a 30-day return policy for all unused items with original tags.", category: "Orders" },
        { id: "2", question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days depending on your location.", category: "Shipping" },
        { id: "3", question: "Do you offer international shipping?", answer: "Yes, we ship to over 50 countries worldwide.", category: "Shipping" }
    ])

    const handleAdd = () => {
        const newFaq = {
            id: Date.now().toString(),
            question: "New Question",
            answer: "New Answer",
            category: "General"
        }
        setFaqs([...faqs, newFaq])
    }

    const handleRemove = (id: string) => {
        setFaqs(faqs.filter(f => f.id !== id))
    }

    const handleChange = (id: string, field: string, value: string) => {
        setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f))
    }

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("FAQs updated successfully")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                            <HelpCircle size={20} />
                        </div>
                        FAQ & Support Center
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">Manage frequently asked questions and support content.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={handleAdd}
                        className="px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors flex items-center gap-2 border border-indigo-100 dark:border-indigo-900/30"
                    >
                        <Plus size={18} /> Add FAQ
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save FAQ List
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Categories & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 px-1">Browse Categories</h3>
                        <div className="space-y-2">
                            {["General", "Orders", "Shipping", "Payments", "Account"].map(cat => (
                                <button key={cat} className="w-full flex justify-between items-center px-4 py-3 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
                                    <span>{cat}</span>
                                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-[10px] group-hover:bg-white dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600">
                                        {faqs.filter(f => f.category === cat).length || 0}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                            <MessageCircle size={80} />
                        </div>
                        <h4 className="text-xl font-bold relative z-10">{faqs.length} FAQs Live</h4>
                        <p className="text-xs text-indigo-100/70 mt-1 relative z-10 font-medium">Helping customers help themselves 24/7.</p>
                        <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
                             <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Popular Article</p>
                             <p className="text-xs font-bold truncate">"How to track my order status?"</p>
                        </div>
                    </div>
                </div>

                {/* FAQ List */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="relative mb-6">
                        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input 
                            type="text" 
                            placeholder="Search existing questions..."
                            className="w-full bg-white dark:bg-[#0A0A0B] border border-gray-100 dark:border-gray-800 rounded-[1.5rem] py-4 pl-14 pr-6 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                        />
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={faq.id} className="bg-white dark:bg-[#0A0A0B] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group animate-in zoom-in-95 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="p-6 sm:p-8">
                                    <div className="flex justify-between items-start gap-4 mb-6">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Question</label>
                                            <input 
                                                type="text" 
                                                value={faq.question}
                                                onChange={(e) => handleChange(faq.id, "question", e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 w-32">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                                            <select 
                                                value={faq.category}
                                                onChange={(e) => handleChange(faq.id, "category", e.target.value)}
                                                className="w-full bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-[10px] font-black uppercase tracking-widest text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                                            >
                                                {["General", "Orders", "Shipping", "Payments", "Account"].map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <button 
                                            onClick={() => handleRemove(faq.id)}
                                            className="mt-6 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all hover:scale-110"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Answer Content</label>
                                        <textarea 
                                            value={faq.answer}
                                            onChange={(e) => handleChange(faq.id, "answer", e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-4 px-4 text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all min-h-[100px] resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
