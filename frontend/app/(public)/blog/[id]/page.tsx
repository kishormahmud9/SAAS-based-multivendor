import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Instagram, Bookmark, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReadingProgressBar from "@/components/public/blog/ReadingProgressBar"
import BlogComments from "@/components/public/blog/BlogComments"

// Mock Data (Full sync with index)
const blogPosts = [
    {
        id: "1",
        title: "The 2026 Trend Forecast: Minimalistic Futurism",
        excerpt: "Discover the shift towards functional luxury and how clean lines are redefining the modern wardrobe this season.",
        category: "Fashion",
        date: "March 20, 2026",
        readTime: "6 min read",
        author: "Sarah J. Lyons",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
        authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        content: `
            <p>Fashion in 2026 is no longer just about aesthetics; it's about the marriage of high-performance technology and silent luxury. As we navigate a world that values both efficiency and elegance, the trend of 'Minimalistic Futurism' has emerged as the dominant force in global style.</p>
            <h3>The Philosophy of Clean Lines</h3>
            <p>Clean lines are the backbone of this movement. Designers are stripping away the unnecessary, focusing instead on structural integrity and the inherent beauty of the fabric.</p>
            <figure>
                <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000" alt="Futuristic Minimalism" />
                <figcaption>Functional luxury redefined through structural precision.</figcaption>
            </figure>
            <blockquote>
                "Future fashion isn't about looking like a sci-fi character; it's about clothes that anticipate your needs while maintaining a timeless elegance."
            </blockquote>
            <h3>Material Innovation</h3>
            <p>Sustainability is no longer a 'collection feature'—it's the baseline. From lab-grown silks to recycled ocean plastics that feel indistinguishable from cashmere...</p>
        `
    },
    {
        id: "2",
        title: "Sustainable Fabrics: Beyond Organic Cotton",
        excerpt: "Exploring new-age materials like mushroom leather and apple skin textiles that are changing the fashion industry.",
        category: "Sustainability",
        date: "March 18, 2026",
        readTime: "8 min read",
        author: "Michael Chen",
        image: "https://images.unsplash.com/photo-1523381235312-d02efe17348d?auto=format&fit=crop&q=80&w=1200",
        content: "<p>The search for sustainable alternatives to traditional textiles has led us to some of nature's most surprising corners. Mushroom leather, or Mycelium, is now being used by top-tier luxury brands...</p>"
    },
    {
        id: "3",
        title: "Styling 101: The Art of Layering",
        excerpt: "Master the secrets of depth and texture. A comprehensive guide to building versatile outfits for any weather.",
        category: "Trends",
        date: "March 15, 2026",
        readTime: "5 min read",
        author: "Elena Rossi",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
        content: "<p>Layering is more than just staying warm; it's an architectural approach to dressing. It allows you to express multiple facets of your style in a single silhouette...</p>"
    },
    {
        id: "4",
        title: "A Day in the ReadyMart Design Studio",
        excerpt: "Go behind the scenes and see how our premium collections come to life from initial sketches to final samples.",
        category: "Behind the Scenes",
        date: "March 12, 2026",
        readTime: "10 min read",
        author: "David Knight",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200",
        content: "<p>The studio is the heartbeat of ReadyMart. Here, creative tension meets technical expertise to produce pieces that aren't just worn, but experienced...</p>"
    },
    {
        id: "5",
        title: "Mindful Living in a Fast-Paced World",
        excerpt: "How slow fashion practices can lead to a more intentional and fulfilling lifestyle beyond the closet.",
        category: "Lifestyle",
        date: "March 10, 2026",
        readTime: "7 min read",
        author: "Sophia Reed",
        image: "https://images.unsplash.com/photo-1445205170230-053b83e26371?auto=format&fit=crop&q=80&w=1200",
        content: "<p>Mindfulness starts with what we put on our bodies. By choosing quality over quantity, we begin a cycle of respect for the environment and for the artisans who create our garments...</p>"
    },
    {
        id: "6",
        title: "Shoes That Define the Decade",
        excerpt: "From tech-enhanced sneakers to reimagined classics, these are the footwear pieces you need to know about.",
        category: "Trends",
        date: "March 5, 2026",
        readTime: "4 min read",
        author: "Marcus West",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200",
        content: "<p>Footwear has always been the foundation of any great outfit. In 2026, we're seeing a return to sculpted heels and ultra-lightweight midsoles that prioritize both posture and comfort...</p>"
    }
]

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = blogPosts.find(p => p.id === id) || blogPosts[0]
    const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2)

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* Client Component for Progress Bar */}
            <ReadingProgressBar />            <header className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
                {post.image && (
                    <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        priority 
                        className="object-cover scale-105 animate-in zoom-in-110 duration-[30s]" 
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/40 to-gray-950/90 backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                
                <div className="container mx-auto px-6 relative z-10 pt-20">
                    <div className="max-w-5xl mx-auto text-center space-y-12 animate-in fade-in slide-in-from-bottom-24 duration-1500 ease-out">
                        <Link href="/blog" className="inline-flex items-center gap-3 text-[11px] font-black text-white/60 hover:text-orange-500 uppercase tracking-[0.4em] transition-all hover:gap-5 mb-4 group">
                            <ArrowLeft size={16} className="text-orange-600" /> Back to Editorial Feed
                        </Link>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-px w-12 bg-orange-600"></div>
                                <span className="text-orange-600 text-[12px] font-black uppercase tracking-[0.3em]">
                                    {post.category}
                                </span>
                                <div className="h-px w-12 bg-orange-600"></div>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-[0.9] drop-shadow-2xl">
                                {post.title}
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-12 pt-12 border-t border-white/10 max-w-2xl mx-auto">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-orange-600 shadow-2xl transition-transform group-hover:scale-110">
                                    <Image src={post.authorImg || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"} alt={post.author} fill className="object-cover" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Written By</p>
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest">{post.author}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-2">Released On</p>
                                <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest leading-none">
                                    <Calendar size={14} className="text-orange-600" /> {post.date}
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-2">Reading Time</p>
                                <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest leading-none">
                                    <Clock size={14} className="text-orange-600" /> {post.readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 animate-bounce">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to Discover</span>
                    <ArrowRight size={20} className="rotate-90" />
                </div>
            </header>

            <main className="container mx-auto px-6 -mt-20 relative z-20 pb-40">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <aside className="lg:col-span-1 hidden lg:block h-fit sticky top-24 pt-12">
                            <div className="flex flex-col gap-8 items-center">
                                <button className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm"><Share2 size={18} /></button>
                                <button className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Facebook size={18} /></button>
                                <button className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-sm"><Twitter size={18} /></button>
                                <button className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-pink-600 hover:text-white transition-all shadow-sm"><Instagram size={18} /></button>
                                <div className="w-px h-12 bg-gray-100 dark:bg-gray-800"></div>
                                <button className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm"><Bookmark size={18} /></button>
                            </div>
                        </aside>

                        <div className="lg:col-span-11 bg-white dark:bg-gray-950 p-8 md:p-20 rounded-[4rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-50 dark:border-gray-900 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                            <div 
                                className="prose prose-xl dark:prose-invert max-w-none 
                                    prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic prose-headings:uppercase
                                    prose-p:text-gray-500 dark:prose-p:text-gray-400 prose-p:font-medium prose-p:leading-[1.8] prose-p:text-lg
                                    prose-blockquote:border-l-8 prose-blockquote:border-orange-600 prose-blockquote:bg-orange-600/5 dark:prose-blockquote:bg-gray-900 prose-blockquote:p-12 prose-blockquote:rounded-[3rem] prose-blockquote:not-italic prose-blockquote:font-black prose-blockquote:text-3xl prose-blockquote:tracking-tighter prose-blockquote:text-gray-900 dark:prose-blockquote:text-white
                                    prose-img:rounded-[3rem] prose-img:shadow-2xl prose-img:border prose-img:border-gray-100 dark:prose-img:border-gray-800
                                    prose-figcaption:text-center prose-figcaption:text-[11px] prose-figcaption:font-black prose-figcaption:uppercase prose-figcaption:tracking-widest prose-figcaption:mt-6
                                    drop-cap"
                                dangerouslySetInnerHTML={{ __html: post.content || "<p>Article content is loading...</p>" }}
                            />

                            {/* Author Bio Card */}
                            <div className="mt-32 pt-16 border-t border-gray-100 dark:border-gray-800">
                                <div className="bg-gray-50 dark:bg-gray-900/50 p-12 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 border border-gray-100 dark:border-gray-800 backdrop-blur-md">
                                    <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white dark:border-gray-800 flex-shrink-0 shadow-2xl">
                                        <Image src={post.authorImg || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"} alt={post.author} fill className="object-cover" />
                                    </div>
                                    <div className="space-y-6 text-center md:text-left flex-1">
                                        <div>
                                            <p className="text-[11px] font-black text-orange-600 uppercase tracking-[0.3em] mb-2">Editorial Voice</p>
                                            <h4 className="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter leading-none">{post.author}</h4>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium text-base leading-relaxed">Fashion editor and trend analyst with over 10 years of experience in high-end editorial storytelling. Obsessed with the intersection of tech and style.</p>
                                        <div className="flex justify-center md:justify-start gap-6">
                                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:scale-110 transition-all shadow-sm"><Twitter size={18} /></a>
                                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:scale-110 transition-all shadow-sm"><Instagram size={18} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section Component */}
                            <BlogComments />
                        </div>
                    </div>

                    <div className="mt-32 space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase text-balance">
                                You Might <span className="text-orange-600">Also Like</span>
                            </h2>
                            <Link href="/blog" className="text-[10px] font-black text-gray-400 hover:text-orange-600 uppercase tracking-widest flex items-center gap-2">
                                Explore All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedPosts.map((related) => (
                                <Link key={related.id} href={`/blog/${related.id}`} className="group flex gap-6 bg-white dark:bg-gray-950 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-orange-600/30 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none items-center">
                                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                                        <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                            <span>{related.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                            <span>{related.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight italic uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                                            {related.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-orange-600 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                                            Read More <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `
                .drop-cap p:first-of-type::first-letter {
                    float: left; font-size: 5rem; line-height: 1; font-weight: 900;
                    margin-right: 1.5rem; color: #EA580C; margin-bottom: -0.5rem;
                    font-style: italic; text-transform: uppercase;
                }
            ` }} />
        </div>
    )
}
