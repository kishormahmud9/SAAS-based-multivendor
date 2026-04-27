"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Thank you for subscribing!");
        setEmail("");
    };

    return (
        <section className="relative h-[400px] md:h-[450px]">
            {/* Split Background */}
            <div className="absolute inset-0 flex flex-col">
                <div className="h-1/2 bg-white"></div>
                <div className="h-1/2 bg-blue-900"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
                <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-700 to-blue-800 rounded-[3rem] p-10 md:p-16 border border-white/20 shadow-2xl text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Join the <span className="text-orange-400">ReadyMart</span> Club
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                        Subscribe to get 10% off your first order and stay updated with our latest collections and exclusive offers.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            className="w-full bg-blue-900/30 border border-white/20 rounded-full px-8 py-5 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-full shadow-lg hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center space-x-2 group shrink-0"
                        >
                            <span>Subscribe</span>
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                    
                    <p className="mt-8 text-blue-300 text-sm">
                        By subscribing, you agree to our <a href="/terms" className="underline hover:text-white">Terms of Service</a> and <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}
