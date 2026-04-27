"use client"

import { RotateCcw, Package, Truck, CreditCard, ArrowRight, HelpCircle, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

const returnSteps = [
    {
        title: "Request a Return",
        desc: "Log in to your account, select the order, and choose the items you wish to return.",
        icon: <Package className="text-orange-600" />
    },
    {
        title: "Pack Your Items",
        desc: "Place the items in the original packaging with all tags attached and include the packing slip.",
        icon: <Package className="text-blue-600" />
    },
    {
        title: "Ship It Back",
        desc: "Drop off the package at any authorized carrier location using the provided prepaid label.",
        icon: <Truck className="text-emerald-600" />
    }
]

const policyPoints = [
    {
        title: "30-Day Window",
        desc: "Items must be returned within 30 days of the delivery date.",
        icon: <CheckCircle2 className="text-green-500" />
    },
    {
        title: "Original Condition",
        desc: "Products must be unworn, unwashed, and have all original tags attached.",
        icon: <CheckCircle2 className="text-green-500" />
    },
    {
        title: "Free Returns",
        desc: "We provide prepaid return labels for all domestic orders.",
        icon: <CheckCircle2 className="text-green-500" />
    },
    {
        title: "Refund Method",
        desc: "Refunds are issued to the original payment method used for the purchase.",
        icon: <CheckCircle2 className="text-green-500" />
    }
]

export default function ReturnsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 text-orange-600 mb-8">
                        <RotateCcw size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Hassle-Free Returns</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-6 underline decoration-orange-600/30 decoration-8 underline-offset-8">
                        Returns & Exchanges
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
                        We want you to love what you ordered. If you&apos;re not completely satisfied, we&apos;re here to help you through the return process.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {returnSteps.map((step, idx) => (
                            <div key={idx} className="relative group">
                                <div className="mb-8 w-16 h-16 rounded-3xl bg-white dark:bg-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center justify-center border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-black shadow-lg">
                                        0{idx + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Policy Grid Section */}
            <section className="py-20 px-6 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight uppercase tracking-widest text-sm">Return Eligibility</h2>
                        <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {policyPoints.map((point, idx) => (
                            <div key={idx} className="flex gap-6 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border-2 border-transparent hover:border-orange-600/10 transition-colors duration-300">
                                <div className="flex-shrink-0 mt-1">
                                    {point.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">{point.title}</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{point.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-blue-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 justify-between shadow-2xl shadow-blue-600/20">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                <AlertCircle size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black tracking-tight">Need an Exchange?</h4>
                                <p className="text-blue-100 font-medium opacity-80">Quickly swap sizes or colors through our automated portal.</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto px-8 py-4 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors active:scale-95">
                            Start Exchange
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer FAQ Section */}
            <section className="py-20 px-6 bg-gray-900 text-white text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="mb-8 inline-block p-4 rounded-3xl bg-white/5 border border-white/10">
                        <HelpCircle size={40} className="text-orange-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Have more questions?</h2>
                    <p className="text-gray-400 font-medium text-lg leading-relaxed mb-10">
                        Visit our comprehensive FAQ center for more details on international returns, final sale items, and damaged products.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link 
                            href="/faq" 
                            className="w-full md:w-auto px-10 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 active:scale-95 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3"
                        >
                            View All FAQs <ArrowRight size={16} />
                        </Link>
                        <Link 
                            href="/contact" 
                            className="w-full md:w-auto px-10 py-5 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 active:scale-95 transition-all border border-white/10 flex items-center justify-center gap-3"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
