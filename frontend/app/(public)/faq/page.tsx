"use client"

import { useState } from "react"
import { Search, Plus, Minus, HelpCircle, ShoppingBag, Truck, RotateCcw, User, CreditCard, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const faqData = [
    {
        category: "Orders & Shipping",
        icon: <Truck className="text-blue-600" />,
        questions: [
            {
                q: "How can I track my order?",
                a: "You can track your order by visiting the 'Track Order' page in the header. Enter your Order ID and Billing Email to see the real-time status of your shipment."
            },
            {
                q: "What are your shipping rates and delivery times?",
                a: "Shipping is free for orders over ৳150. For other orders, rates depend on your location. Standard delivery takes 3-5 business days, while express shipping takes 1-2 business days."
            },
            {
                q: "Do you ship internationally?",
                a: "Yes, ReadyMart ships to over 50 countries worldwide. International shipping times vary between 7-14 business days depending on customs and location."
            }
        ]
    },
    {
        category: "Returns & Refunds",
        icon: <RotateCcw className="text-orange-600" />,
        questions: [
            {
                q: "What is your return policy?",
                a: "We offer a 30-day hassle-free return policy. Items must be in their original condition, unworn, and with all tags attached. Returns are processed within 5-7 business days of receipt."
            },
            {
                q: "How do I start a return or exchange?",
                a: "To start a return, visit your account dashboard and select 'Returns'. Follow the simple steps to generate a return label. Exchanges can be initiated through the same process."
            },
            {
                q: "When will I receive my refund?",
                a: "Refunds are issued to the original payment method once the return is inspected. It usually takes 3-5 business days for the funds to appear in your account."
            }
        ]
    },
    {
        category: "Product & Sizing",
        icon: <ShoppingBag className="text-emerald-600" />,
        questions: [
            {
                q: "How do I find the right size?",
                a: "Each product page features a detailed 'Size Guide'. We recommend measuring yourself and comparing it to our charts. If you're between sizes, we suggest sizing up for a more comfortable fit."
            },
            {
                q: "Are your products ethically sourced?",
                a: "ReadyMart is committed to sustainability and ethical practices. We work exclusively with certified factories that ensure fair wages and safe working conditions."
            },
            {
                q: "How should I care for my ReadyMart clothing?",
                a: "Care instructions are included on the inner tag of every garment. We generally recommend gentle washing and avoiding high heat to maintain the longevity of our premium fabrics."
            }
        ]
    },
    {
        category: "Account & Security",
        icon: <ShieldCheck className="text-purple-600" />,
        questions: [
            {
                q: "I forgot my password. How do I reset it?",
                a: "On the login page, click 'Forgot Password'. Enter your email address, and we'll send you a secure link to create a new password immediately."
            },
            {
                q: "Is my payment information secure?",
                a: "ReadyMart uses industry-standard SSL encryption and PCI-compliant payment gateways. We never store your full credit card details on our servers."
            },
            {
                q: "Can I cancel my account?",
                a: "Yes, you can request account deletion through your account settings. Once confirmed, all your personal data will be removed from our systems in accordance with our privacy policy."
            }
        ]
    }
]

// Separate component for ShieldCheck icon to avoid import issues if not explicitly listed in previous turns
function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6v7z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [openIndex, setOpenIndex] = useState<string | null>("0-0")

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id)
    }

    const filteredData = faqData.map(group => ({
        ...group,
        questions: group.questions.filter(q => 
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(group => group.questions.length > 0)

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header Section */}
            <section className="pt-20 pb-12 px-6">
                <div className="container mx-auto text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 text-orange-600 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <HelpCircle size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Support Center</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Everything you need to know about your ReadyMart experience. Find answers to common questions about orders, shipping, and more.
                    </p>
                </div>
            </section>

            {/* Search Section */}
            <section className="px-6 mb-16 sticky top-0 z-20">
                <div className="container mx-auto max-w-2xl">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
                            <Search size={20} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search for answers..."
                            className="w-full pl-14 pr-6 py-5 bg-white rounded-[2rem] border-2 border-gray-100 focus:border-orange-600 outline-none transition-all font-medium text-gray-900 shadow-xl shadow-gray-200/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 pb-20">
                <div className="container mx-auto max-w-4xl">
                    {filteredData.length > 0 ? (
                        <div className="space-y-16">
                            {filteredData.map((group, groupIdx) => (
                                <div key={groupIdx} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                            {group.icon}
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase tracking-widest text-sm">
                                            {group.category}
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        {group.questions.map((item, qIdx) => {
                                            const id = `${groupIdx}-${qIdx}`
                                            const isOpen = openIndex === id
                                            return (
                                                <div 
                                                    key={qIdx}
                                                    className={`group transition-all duration-300 rounded-[2rem] border-2 ${
                                                        isOpen 
                                                        ? "bg-orange-600/5 border-orange-600/20" 
                                                        : "bg-white border-gray-50 hover:border-gray-100"
                                                    }`}
                                                >
                                                    <button 
                                                        onClick={() => toggleAccordion(id)}
                                                        className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                                                    >
                                                        <span className="font-black text-gray-900 pr-8">
                                                            {item.q}
                                                        </span>
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                                            isOpen ? "bg-orange-600 text-white rotate-180" : "bg-gray-100 text-gray-500"
                                                        }`}>
                                                            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                                        </div>
                                                    </button>
                                                    
                                                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                                        <div className="p-6 md:px-8 md:pb-8 pt-0 text-gray-500 font-medium leading-relaxed">
                                                            {item.a}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-300 mx-auto mb-6">
                                <Search size={40} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2 underline decoration-orange-600">No results found</h3>
                            <p className="text-gray-500 font-medium">Try searching for different keywords or check out our popular topics.</p>
                            <button 
                                onClick={() => setSearchTerm("")}
                                className="mt-6 text-sm font-black text-orange-600 uppercase tracking-widest hover:underline"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Help CTA Section */}
            <section className="bg-gray-900 py-20 px-6">
                <div className="container mx-auto text-center max-w-2xl">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-orange-600 mx-auto mb-8 shadow-2xl">
                        <MessageCircle size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6">
                        Still have questions?
                    </h2>
                    <p className="text-gray-400 font-medium text-lg leading-relaxed mb-10">
                        Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any inquiry.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link 
                            href="/contact" 
                            className="w-full md:w-auto px-10 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 active:scale-95 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3"
                        >
                            Contact Support <ArrowRight size={16} />
                        </Link>
                        <Link 
                            href="mailto:support@readymart.com" 
                            className="w-full md:w-auto px-10 py-5 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 active:scale-95 transition-all border border-white/10 flex items-center justify-center gap-3"
                        >
                            Email Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
