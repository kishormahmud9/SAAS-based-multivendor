"use client"

import { useState } from "react"
import { Search, ChevronRight, Calendar, Clock, ArrowRight, User, Mail, Instagram, Twitter, Facebook } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = ["All", "Fashion", "Lifestyle", "Trends", "Behind the Scenes", "Sustainability"]

const blogPosts = [
    {
        id: "1",
        title: "The 2026 Trend Forecast: Minimalistic Futurism",
        excerpt: "Discover the shift towards functional luxury and how clean lines are redefining the modern wardrobe this season.",
        category: "Fashion",
        date: "March 20, 2026",
        readTime: "6 min read",
        author: "Sarah J. Lyons",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
        featured: true
    },
    {
        id: "2",
        title: "Sustainable Fabrics: Beyond Organic Cotton",
        excerpt: "Exploring new-age materials like mushroom leather and apple skin textiles that are changing the fashion industry.",
        category: "Sustainability",
        date: "March 18, 2026",
        readTime: "8 min read",
        author: "Michael Chen",
        image: "https://images.unsplash.com/photo-1523381235312-d02efe17348d?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "3",
        title: "Styling 101: The Art of Layering",
        excerpt: "Master the secrets of depth and texture. A comprehensive guide to building versatile outfits for any weather.",
        category: "Trends",
        date: "March 15, 2026",
        readTime: "5 min read",
        author: "Elena Rossi",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "4",
        title: "A Day in the ReadyMart Design Studio",
        excerpt: "Go behind the scenes and see how our premium collections come to life from initial sketches to final samples.",
        category: "Behind the Scenes",
        date: "March 12, 2026",
        readTime: "10 min read",
        author: "David Knight",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "5",
        title: "Mindful Living in a Fast-Paced World",
        excerpt: "How slow fashion practices can lead to a more intentional and fulfilling lifestyle beyond the closet.",
        category: "Lifestyle",
        date: "March 10, 2026",
        readTime: "7 min read",
        author: "Sophia Reed",
        image: "https://images.unsplash.com/photo-1445205170230-053b83e26371?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "6",
        title: "Shoes That Define the Decade",
        excerpt: "From tech-enhanced sneakers to reimagined classics, these are the footwear pieces you need to know about.",
        category: "Trends",
        date: "March 5, 2026",
        readTime: "4 min read",
        author: "Marcus West",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
    }
]

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const featuredPost = blogPosts.find(post => post.featured)
    const filteredPosts = activeCategory === "All" 
        ? blogPosts.filter(p => !p.featured) 
        : blogPosts.filter(p => p.category === activeCategory)

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* Blog Hero Section */}
            {featuredPost && activeCategory === "All" && (
                <section className="relative h-[80vh] md:h-[90vh] w-full flex items-end overflow-hidden group">
                    <Image 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        fill 
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
                    
                    <div className="container mx-auto px-6 relative z-10 pb-20 md:pb-32">
                        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                            <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-4 py-1.5 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{featuredPost.category}</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none italic uppercase">
                                {featuredPost.title}
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 text-white/60 text-xs font-black uppercase tracking-widest">
                                    <User size={14} className="text-orange-600" /> {featuredPost.author}
                                </div>
                                <div className="flex items-center gap-2 text-white/60 text-xs font-black uppercase tracking-widest">
                                    <Calendar size={14} className="text-orange-600" /> {featuredPost.date}
                                </div>
                                <div className="flex items-center gap-2 text-white/60 text-xs font-black uppercase tracking-widest">
                                    <Clock size={14} className="text-orange-600" /> {featuredPost.readTime}
                                </div>
                            </div>
                            <div className="pt-6">
                                <Link 
                                    href={`/blog/${featuredPost.id}`}
                                    className="inline-flex items-center gap-4 bg-white hover:bg-orange-600 hover:text-white text-gray-900 px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all active:scale-95 group"
                                >
                                    Read Article <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Content Section */}
            <main className="container mx-auto px-6 py-20">
                {/* Category & Search Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-20 border-b border-gray-100 dark:border-gray-800 pb-12">
                    <div className="space-y-4">
                        <h1 className="text-xs font-black text-orange-600 uppercase tracking-[0.4em]">Editorial Feed</h1>
                        <nav className="flex flex-wrap gap-x-8 gap-y-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-sm font-black uppercase tracking-widest transition-all relative py-2 ${
                                        activeCategory === cat 
                                        ? "text-gray-900 dark:text-white" 
                                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    }`}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    <div className="relative group min-w-[300px]">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-all">
                            <Search size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search articles..."
                            className="w-full pl-16 pr-8 py-4 bg-gray-50 dark:bg-gray-900 rounded-full border-2 border-transparent focus:border-orange-600 outline-none transition-all font-black text-xs uppercase tracking-widest"
                        />
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {filteredPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                            <article className="h-full flex flex-col">
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
                                    <Image 
                                        src={post.image} 
                                        alt={post.title} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-6 left-6 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2 italic">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white pt-2 group-hover:gap-4 transition-all">
                                        Read Post <ChevronRight size={14} className="text-orange-600" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Newsletter Section */}
                <section className="mt-40 bg-gray-950 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full -mr-[250px] -mt-[250px]"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full -ml-[150px] -mb-[150px]"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-none uppercase">
                                Stay Inside <br />
                                <span className="text-orange-600">The Loop.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-medium max-w-md leading-relaxed">
                                Join our exclusive newsletter for curated trends, early access to collections, and fashion insight.
                            </p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><Instagram size={20} /></a>
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><Twitter size={20} /></a>
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><Facebook size={20} /></a>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/10 border-t-white/20">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        <input 
                                            type="email" 
                                            placeholder="you@example.com"
                                            className="w-full bg-white dark:bg-gray-950 py-6 pl-16 pr-8 rounded-2xl outline-none focus:ring-2 ring-orange-600 transition-all font-black text-xs text-white uppercase tracking-widest"
                                        />
                                    </div>
                                </div>
                                <button className="w-full bg-orange-600 hover:bg-orange-500 py-6 rounded-2xl font-black uppercase tracking-widest text-xs text-white shadow-2xl shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center gap-4">
                                    Join ReadyMart Circle <ArrowRight size={18} />
                                </button>
                                <p className="text-center text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                    Privacy Guaranteed. Unsubscribe Any Time.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
