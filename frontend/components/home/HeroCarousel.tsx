"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { marketingService } from "@/src/services/marketing.service";
import { getImageUrl } from "@/src/lib/image-utils";

const fallbackSlides = [
    {
        id: "1",
        title: "Welcome to ReadyMart",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
        link: "/shop",
    },
    {
        id: "2",
        title: "New Summer Arrivals",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070",
        link: "/shop",
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [slides, setSlides] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchSlides = async () => {
        try {
            const res = await marketingService.getBanners()
            if (res.success && res.data.length > 0) {
                setSlides(res.data)
            } else {
                setSlides(fallbackSlides)
            }
        } catch (error) {
            setSlides(fallbackSlides)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSlides()
    }, [])

    const nextSlide = () => {
        if (slides.length <= 1) return;
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (slides.length <= 1) return;
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [slides]);

    if (loading) {
        return (
            <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-gray-50 border-b border-gray-100">
                <Loader2 className="animate-spin text-orange-500" size={40} />
            </div>
        )
    }

    return (
        <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-gray-900 group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
                        index === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                >
                    {/* Background Image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${getImageUrl(slide.image)})` }}
                    >
                        {/* Dark Overlay for text readability */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start">
                        <div className="max-w-2xl space-y-6">
                             <h2 className={`text-4xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300`}>
                                {slide.title}
                            </h2>
                            {slide.link && (
                                <Link
                                    href={slide.link}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-600/20 transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500"
                                >
                                    Shop Collection
                                    <ArrowRight size={20} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    index === current ? "w-8 bg-orange-500" : "w-2 bg-white/40 hover:bg-white/60"
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
