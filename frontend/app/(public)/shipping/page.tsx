"use client"

import { Truck, Globe, Clock, ShieldCheck, Mail, MapPin, ArrowRight, Info } from "lucide-react"
import Link from "next/link"

const shippingRates = [
    {
        method: "Standard Shipping",
        time: "3-5 Business Days",
        cost: "FREE",
        condition: "On orders over $150"
    },
    {
        method: "Standard Shipping",
        time: "3-5 Business Days",
        cost: "$9.95",
        condition: "On orders under $150"
    },
    {
        method: "Express Shipping",
        time: "1-2 Business Days",
        cost: "$19.95",
        condition: "Available at checkout"
    },
    {
        method: "Next Day Delivery",
        time: "1 Business Day",
        cost: "$29.95",
        condition: "Order by 2PM EST"
    }
]

export default function ShippingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 bg-blue-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 blur-3xl bg-orange-600 rounded-full w-96 h-96 -top-48 -left-24"></div>
                <div className="container mx-auto text-center max-w-3xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-orange-400 mb-8 backdrop-blur-md">
                        <Truck size={16} />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Logistics & Delivery</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        Shipping Policy
                    </h1>
                    <p className="text-blue-100/70 font-medium text-lg leading-relaxed">
                        Fast, reliable, and transparent shipping to your doorstep. We strive to process and deliver your ReadyMart favorites as quickly as possible.
                    </p>
                </div>
            </section>

            {/* Rates Table Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="p-8 md:p-12 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-sm text-orange-600">Domestic Shipping</h2>
                            <p className="text-gray-500 font-medium italic">Available for all 50 US States</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800/80">
                                    <tr>
                                        <th className="px-8 py-5 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">Service Method</th>
                                        <th className="px-8 py-5 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">Delivery Time</th>
                                        <th className="px-8 py-5 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">Cost</th>
                                        <th className="px-8 py-5 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs">Conditions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {shippingRates.map((rate, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                            <td className="px-8 py-6 font-black text-gray-900 dark:text-gray-100">{rate.method}</td>
                                            <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium">{rate.time}</td>
                                            <td className={`px-8 py-6 font-black ${rate.cost === "FREE" ? "text-emerald-500" : "text-gray-900 dark:text-white"}`}>
                                                {rate.cost}
                                            </td>
                                            <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium text-sm italic">{rate.condition}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* International & Detailed Info */}
            <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* International */}
                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-xl shadow-orange-600/20">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">International Shipping</h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
                                We ship to over 50 countries worldwide! International shipping rates are calculated at checkout based on weight and destination. 
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-medium">
                                    <Clock size={20} className="text-orange-600 mt-1 flex-shrink-0" />
                                    <span>Delivery typically takes 7-14 business days.</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-medium">
                                    <ShieldCheck size={20} className="text-orange-600 mt-1 flex-shrink-0" />
                                    <span>All duties and taxes are prepaid at checkout (DDP) for most countries.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Order Tracking */}
                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-gray-800 text-white flex items-center justify-center shadow-2xl">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Order Processing</h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
                                Orders are processed Monday through Friday, excluding holidays. Most orders are shipped within 24-48 hours of being placed.
                            </p>
                            <div className="p-8 bg-white dark:bg-gray-900 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <Info className="text-blue-600" size={20} />
                                    <h4 className="font-black text-gray-900 dark:text-white">Pro Tip</h4>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                    Download the ReadyMart app to receive real-time push notifications about your order status and location tracking!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="container mx-auto max-w-2xl">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-sm text-orange-600">Still have questions?</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-10">
                        Our logistics team is here to help if your package is delayed, lost, or damaged during transit.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link 
                            href="/track-order" 
                            className="w-full md:w-auto px-10 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                        >
                            Track Your Order <ArrowRight size={16} />
                        </Link>
                        <Link 
                            href="/contact" 
                            className="w-full md:w-auto px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                        >
                            Support Center
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
