import Image from "next/image"
import { ShieldCheck, Truck, Clock, Heart, Users, Target, Rocket, Sparkles } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/about/hero.png"
                        alt="ReadyMart Hero"
                        fill
                        className="object-cover brightness-[0.6]"
                        priority
                    />
                </div>
                <div className="container relative z-10 px-6 text-center text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-600/20 backdrop-blur-md rounded-full border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Sparkles size={14} /> Redefining Modern Fashion
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">ReadyMart</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                        We don&apos;t just sell products; we curate experiences that empower your lifestyle through premium design and innovation.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Our Story</h2>
                                <div className="w-20 h-1.5 bg-orange-600 rounded-full"></div>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                Founded in 2026, ReadyMart began with a simple yet ambitious vision: to bridge the gap between high-end fashion and everyday accessibility. Our journey started in a small studio with a focused team of five, driven by the belief that quality should never be a luxury.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                Today, we stand as a beacon of modern e-commerce, serving thousands of happy customers worldwide. Our obsession with detail—from the initial sketch to the final stitch—defines the "ReadyMart Standard" that our community has come to trust.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div className="space-y-2">
                                    <div className="text-4xl font-black text-orange-600">100K+</div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-gray-400">Happy Shoppers</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-4xl font-black text-orange-600">2026</div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-gray-400">Est. Year</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative aspect-square lg:aspect-video w-full max-w-[600px]">
                            <div className="absolute -inset-4 bg-orange-600/5 rounded-[3rem] -rotate-3"></div>
                            <Image 
                                src="/images/about/story.png"
                                alt="Our Studio"
                                fill
                                className="object-cover rounded-[3rem] shadow-2xl relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-6 text-center space-y-16">
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Our Core Values</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium italic">The principles that guide every decision we make.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Innovation */}
                        <div className="group p-8 bg-white dark:bg-gray-950 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <Rocket size={32} />
                            </div>
                            <h3 className="text-xl font-black mb-4 dark:text-white">Unrelenting Innovation</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                We constantly push the boundaries of what's possible in digital retail, ensuring you always experience the cutting edge of fashion.
                            </p>
                        </div>

                        {/* Quality */}
                        <div className="group p-8 bg-white dark:bg-gray-950 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-black mb-4 dark:text-white">Quality Above All</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                Every piece we curate undergoes rigorous quality inspection. If it's not perfect, it doesn't make it to your cart.
                            </p>
                        </div>

                        {/* Support */}
                        <div className="group p-8 bg-white dark:bg-gray-950 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-black mb-4 dark:text-white">Community Driven</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                We listen. Our brand is built on the feedback and aspirations of our global community of fashion enthusiasts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl space-y-8">
                    <div className="inline-block p-4 bg-orange-600/10 rounded-full text-orange-600 mb-4">
                        <Target size={40} />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white">Our Vision for 2030</h2>
                    <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">
                        &quot;To become the most trusted digital destination for personalized fashion, where technology and craftsmanship unite to inspire individual expression.&quot;
                    </p>
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 font-bold uppercase tracking-[0.3em] text-xs">
                        <span className="flex items-center gap-2"><Truck size={14} className="text-orange-500" /> Global Delivery</span>
                        <div className="hidden sm:block w-20 h-[1px] bg-gray-200"></div>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-orange-500" /> 24/7 Support</span>
                        <div className="hidden sm:block w-20 h-[1px] bg-gray-200"></div>
                        <span className="flex items-center gap-2"><Heart size={14} className="text-orange-500" /> Sustainable Future</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
