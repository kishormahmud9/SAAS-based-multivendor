"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Timer } from "lucide-react";

export default function OfferSection() {
    const [offer, setOffer] = useState<any>(null)
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 10,
        minutes: 45,
        seconds: 30,
    });

    const fetchOffer = async () => {
        try {
            const res = await fetch("/api/banners")
            const data = await res.json()
            if (data.success) {
                const offerItem = data.data.find((b: any) => b.type === "OFFER")
                if (offerItem) setOffer(offerItem)
            }
        } catch (error) {
            console.error("Failed to load offer")
        }
    }

    useEffect(() => {
        fetchOffer()
    }, [])

    useEffect(() => {
        if (!offer?.targetDate) return

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const target = new Date(offer.targetDate).getTime()
            const distance = target - now

            if (distance < 0) {
                clearInterval(timer)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                })
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [offer]);

    return (
        <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
                    <Timer className="text-orange-400" size={20} />
                    <span className="text-orange-300 font-bold uppercase tracking-widest text-sm">Limited Time Offer</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                    {offer?.title || "Deal of the Day"}
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                    {offer?.subtitle || "Get up to 40% OFF on our exclusive collection. Hurry up before the timer runs out!"}
                </p>

                {/* Countdown Timer */}
                <div className="flex justify-center space-x-4 md:space-x-8 mb-12">
                     <div className="flex flex-col items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                            <span className="text-3xl md:text-5xl font-bold font-mono">{String(timeLeft.days).padStart(2, "0")}</span>
                        </div>
                        <span className="text-xs md:text-sm uppercase mt-3 text-gray-400 tracking-wider">Days</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                            <span className="text-3xl md:text-5xl font-bold font-mono">{String(timeLeft.hours).padStart(2, "0")}</span>
                        </div>
                        <span className="text-xs md:text-sm uppercase mt-3 text-gray-400 tracking-wider">Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                            <span className="text-3xl md:text-5xl font-bold font-mono">{String(timeLeft.minutes).padStart(2, "0")}</span>
                        </div>
                        <span className="text-xs md:text-sm uppercase mt-3 text-gray-400 tracking-wider">Minutes</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                            <span className="text-3xl md:text-5xl font-bold font-mono">{String(timeLeft.seconds).padStart(2, "0")}</span>
                        </div>
                        <span className="text-xs md:text-sm uppercase mt-3 text-gray-400 tracking-wider">Seconds</span>
                    </div>
                </div>

                <Link
                    href={offer?.link || "/shop?offer=deal-of-day"}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
                >
                    Grab The Deal Now
                </Link>
            </div>
        </section>
    );
}
