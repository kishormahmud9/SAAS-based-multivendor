import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ShieldCheck } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/contact/hero.png"
                        alt="Contact ReadyMart"
                        fill
                        className="object-cover brightness-[0.7]"
                        priority
                    />
                </div>
                <div className="container relative z-10 px-6 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-700">
                        Get in <span className="text-orange-500 underline decoration-4 underline-offset-8">Touch</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-gray-200 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Have a question or just want to say hi? We&apos;re here to help you every step of the way.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
            </section>

            {/* Contact Grid & Form Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left: Contact Info */}
                        <div className="lg:col-span-4 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Contact Information</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    Our dedicated support team is available around the clock to ensure your ReadyMart experience is nothing short of exceptional.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 dark:text-white mb-1">Call Us</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">+1 (555) 123-4567</p>
                                        <p className="text-[10px] font-black uppercase text-blue-600 mt-1 tracking-widest">Mon - Fri, 9am - 6pm EST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-600 shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 dark:text-white mb-1">Email Support</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">support@readymart.com</p>
                                        <p className="text-[10px] font-black uppercase text-orange-600 mt-1 tracking-widest">Ready to reply in 2hr</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 dark:text-white mb-1">Headquarters</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                                            123 Fashion Street, <br />
                                            Design District, NY 10001
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 space-y-4">
                                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-orange-600 shadow-sm">
                                    <MessageSquare size={20} />
                                </div>
                                <h4 className="font-black text-gray-900 dark:text-white">Looking for quick help?</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Check out our frequently asked questions for instant answers.</p>
                                <Link href="/faq" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 hover:gap-3 transition-all">
                                    Visit FAQ Center <Send size={12} />
                                </Link>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-8">
                            <div className="bg-white dark:bg-gray-900/50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none">
                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="John Doe"
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-orange-600 transition-all font-medium text-gray-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                            <input 
                                                type="email" 
                                                placeholder="john@example.com"
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-orange-600 transition-all font-medium text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Subject</label>
                                        <select className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-orange-600 transition-all font-medium text-gray-900 dark:text-white appearance-none cursor-pointer">
                                            <option>General Inquiry</option>
                                            <option>Order Status</option>
                                            <option>Returns & Exchanges</option>
                                            <option>Wholesale & Partnership</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Message</label>
                                        <textarea 
                                            rows={6}
                                            placeholder="How can we help you today?"
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-orange-600 transition-all font-medium text-gray-900 dark:text-white resize-none"
                                        ></textarea>
                                    </div>

                                    <button className="w-full md:w-auto px-12 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 active:scale-95 transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-3">
                                        Send Message <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-600/20">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-sm dark:text-white leading-tight">Secure Platform</h5>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Your data is safe</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-sm dark:text-white leading-tight">Global Support</h5>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Available 24/7</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-600/20">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-sm dark:text-white leading-tight">Fast Response</h5>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Under 2 hours</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-950 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-gray-950 shrink-0 shadow-lg">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-sm dark:text-white leading-tight">AI Assistance</h5>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Instant answers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
