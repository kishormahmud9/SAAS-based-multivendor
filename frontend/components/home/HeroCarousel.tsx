"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { marketingService } from "@/src/services/marketing.service";
import { getImageUrl } from "@/src/lib/image-utils";

const fallbackSlides = [
    {
        id: "1",
        title: "Summer Collection 2024",
        subtitle: "Experience the warmth with our vibrant new arrivals.",
        link: "/shop?category=summer",
        backgroundType: "SOLID",
        gradient: "bg-gradient-to-r from-orange-400 to-red-500",
    },
    {
        id: "2",
        title: "Premium Men's Wear",
        subtitle: "Sophistication meets comfort. Elevate your wardrobe.",
        link: "/shop?category=men",
        backgroundType: "SOLID",
        gradient: "bg-gradient-to-r from-blue-900 to-blue-600",
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [slides, setSlides] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchSlides = async () => {
        try {
            const res = await marketingService.getBanners()
            if (res.success) {
                // Ensure we access data.data as per backend response format
                const carouselItems = res.data.filter((b: any) => b.type === "CAROUSEL")
                setSlides(carouselItems.length > 0 ? carouselItems : fallbackSlides)
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
            <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gray-50 border-b border-gray-100">
                <Loader2 className="animate-spin text-orange-500" size={40} />
            </div>
        )
    }

    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden shadow-2xl bg-gray-900">
            {slides.map((slide, index) => {
                const isImageBg = slide.backgroundType === 'IMAGE';
                const hasImage = !!slide.image;
                const gradients = [
                    "bg-gradient-to-r from-orange-400 to-red-500",
                    "bg-gradient-to-r from-blue-900 to-blue-600",
                    "bg-gradient-to-r from-pink-500 to-purple-600",
                    "bg-gradient-to-r from-emerald-500 to-teal-700"
                ];
                const bgGradient = (slide.image && slide.image.startsWith('bg-')) ? slide.image : gradients[index % gradients.length];
                
                return (
                    <div
                        key={slide.id}
                        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-1000 ease-in-out transform ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            } ${!isImageBg ? bgGradient : ""}`}
                        style={isImageBg && hasImage ? { backgroundImage: `url(${getImageUrl(slide.image)})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    >
                        {/* Overlay Pattern for Solid BG */}
                        {!isImageBg && (
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        )}

                        {/* Content logic: Hide text if IMAGE type */}
                        {!isImageBg ? (
                            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                                <h2 className={`text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-white animate-fade-in-up`}>
                                    {slide.title}
                                </h2>
                                <p className={`text-xl md:text-3xl mb-10 font-light tracking-wide drop-shadow-md text-white animate-fade-in-up delay-100`}>
                                    {slide.subtitle}
                                </p>
                                {slide.link && (
                                    <Link
                                        href={slide.link}
                                        className="group bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-gray-100 transition duration-300 inline-flex items-center space-x-2 animate-bounce-subtle"
                                    >
                                        <span>Shop Now</span>
                                        <ArrowRight className="group-hover:translate-x-1 transition duration-300" size={20} />
                                    </Link>
                                )}
                            </div>
                        ) : (
                            /* If Image BG, we might still want the link if clickable */
                            slide.link && (
                                <Link href={slide.link} className="absolute inset-0 z-10 cursor-pointer">
                                    <span className="sr-only">Go to offer</span>
                                </Link>
                            )
                        )}
                    </div>
                )
            })}

            {/* Controls */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 text-white transition duration-300 border border-white/30"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 text-white transition duration-300 border border-white/30"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 shadow-lg ${index === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
