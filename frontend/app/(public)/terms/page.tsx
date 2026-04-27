"use client"

import { FileText, Shield, Scale, Mail, Calendar, ArrowRight, ExternalLink, HelpCircle, Truck } from "lucide-react"
import Link from "next/link"

const legalSections = [
    {
        id: "introduction",
        title: "1. Introduction",
        content: "Welcome to ReadyMart. These Terms and Conditions govern your use of our website and services. By accessing or using our site, you agree to be bound by these terms. If you do not agree with any part of these terms, you must not use our services."
    },
    {
        id: "use-of-site",
        title: "2. Use of the Site",
        content: "You may use our site only for lawful purposes. You are prohibited from using the site to engage in any fraudulent activity, transmit any viruses or malicious code, or infringe upon the intellectual property rights of others. We reserve the right to terminate your access for any violation."
    },
    {
        id: "intellectual-property",
        title: "3. Intellectual Property",
        content: "All content on this site, including text, graphics, logos, images, and software, is the property of ReadyMart and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent."
    },
    {
        id: "limitation-of-liability",
        title: "4. Limitation of Liability",
        content: "ReadyMart shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services. We do not warrant that the site will be error-free or uninterrupted."
    },
    {
        id: "governing-law",
        title: "5. Governing Law",
        content: "These terms shall be governed by and construed in accordance with the laws of the Jurisdiction. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in that region."
    }
]

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 mb-8">
                        <Scale size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Legal Agreement</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
                        Terms & Conditions
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400 font-medium text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>Last Updated: March 24, 2026</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Sidebar Navigation */}
                        <aside className="hidden md:block space-y-4 sticky top-24 h-fit">
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Contents</h4>
                            {legalSections.map((section) => (
                                <Link 
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block text-sm font-black text-gray-500 hover:text-orange-600 transition-colors uppercase tracking-tight"
                                >
                                    {section.title.split(".")[1].trim()}
                                </Link>
                            ))}
                        </aside>

                        {/* Document Content */}
                        <div className="md:col-span-3 space-y-16">
                            {legalSections.map((section) => (
                                <div key={section.id} id={section.id} className="scroll-mt-24">
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight flex items-center gap-4">
                                        <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div>
                                        {section.title}
                                    </h2>
                                    <div className="text-gray-600 dark:text-gray-300 font-medium text-lg leading-relaxed space-y-4">
                                        <p>{section.content}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">Questions?</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">
                                    If you have any questions about these Terms and Conditions, please contact our legal department.
                                </p>
                                <Link 
                                    href="/contact" 
                                    className="inline-flex items-center gap-2 text-orange-600 font-black uppercase tracking-widest text-xs hover:underline"
                                >
                                    Contact Legal Team <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-20 px-6 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link href="/privacy" className="group p-8 bg-white dark:bg-gray-900 rounded-[2rem] border-2 border-transparent hover:border-blue-600/10 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1">
                            <Shield className="text-blue-600 mb-6" size={32} />
                            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 underline decoration-blue-600/20">Privacy Policy</h4>
                            <p className="text-gray-500 font-medium text-sm">How we handle and protect your personal data and information.</p>
                        </Link>
                        <Link href="/faq" className="group p-8 bg-white dark:bg-gray-900 rounded-[2rem] border-2 border-transparent hover:border-orange-600/10 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1">
                            <HelpCircle className="text-orange-600 mb-6" size={32} />
                            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 underline decoration-orange-600/20">Help Center</h4>
                            <p className="text-gray-500 font-medium text-sm">Answers to common questions about our platform and services.</p>
                        </Link>
                        <Link href="/shipping" className="group p-8 bg-white dark:bg-gray-900 rounded-[2rem] border-2 border-transparent hover:border-emerald-600/10 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1">
                            <Truck className="text-emerald-600 mb-6" size={32} />
                            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 underline decoration-emerald-600/20">Shipping Info</h4>
                            <p className="text-gray-500 font-medium text-sm">Detailed information on delivery times and shipping rates.</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
