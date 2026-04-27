import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export default function FeatureHighlight({ data }: { data?: any }) {
    const label = data?.label || "Innovation in Comfort";
    const title = data?.title || "The Air-Stride 2026 Edition";
    const description = data?.description || "Experience the future of footwear. Handcrafted with precision using sustainable materials and AI-optimized support for maximum comfort.";
    const image = data?.image || "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80";
    const ctaText = data?.ctaText || "Shop the collection";
    const ctaLink = data?.ctaLink || "/product/air-stride-2026";
    const features = data?.features || [
        { title: "Sustainable", description: "Made from 100% recycled ocean plastics." },
        { title: "Smart Fit", description: "Self-adjusting compression technology." }
    ];

    return (
        <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
            {/* ... lines 8-10 remain same ... */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-l from-orange-500/30 to-transparent blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                        <div className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl">
                             <Image 
                                src={image}
                                alt={title}
                                width={1000}
                                height={600}
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                             />
                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-900 translate-x-1">
                                        <Play fill="currentColor" size={24} />
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm mb-6 block">{label}</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
                            {title.split(' ').slice(0, -2).join(' ')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{title.split(' ').slice(-2).join(' ')}</span>
                        </h2>
                        <p className="text-gray-400 text-xl mb-10 leading-relaxed font-light">
                            {description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            {features.map((f: any, idx: number) => (
                                <div key={idx}>
                                    <h4 className="text-2xl font-bold mb-2">{f.title}</h4>
                                    <p className="text-gray-500 text-sm">{f.description}</p>
                                </div>
                            ))}
                        </div>

                        <Link 
                            href={ctaLink}
                            className="inline-flex bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            {ctaText}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
