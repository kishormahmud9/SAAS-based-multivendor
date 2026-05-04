"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useCart } from "@/lib/contexts/CartContext";
import { getRedirectPath } from "@/lib/auth/authRedirect";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isLoading } = useAuth();
    const { itemCount } = useCart();
    const router = useRouter();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const categories = [
        { name: "All Categories", href: "/categories" },
        { name: "Men", href: "/shop?category=men" },
        { name: "Women", href: "/shop?category=women" },
        { name: "Kids", href: "/shop?category=kids" },
        { name: "Accessories", href: "/shop?category=accessories" },
        { name: "Flash Sale 🔥", href: "/shop?category=sale", special: true },
    ];

    const handleUserClick = () => {
        if (isLoading) return;
        router.push(getRedirectPath(user));
    };


    return (
        <>
            <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-[100] border-b border-orange-100">
                {/* Top Bar - Hidden on mobile */}
                <div className="hidden md:block bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-xs py-2">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <p className="font-medium tracking-wide">✨ Welcome to {process.env.NEXT_PUBLIC_APP_NAME || 'ReadyMart'} - Your Premium Fashion Destination</p>
                        <div className="flex space-x-6">
                            <Link href="/track-order" className="hover:text-orange-300 transition duration-300">Track Order</Link>
                            <Link href="/about" className="hover:text-orange-300 transition duration-300">About Us</Link>
                        </div>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className="container mx-auto px-4 py-4 md:py-5">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 hover:from-orange-500 hover:to-orange-600 transition duration-500">
                            {process.env.NEXT_PUBLIC_APP_NAME?.split('Mart')[0] || 'Ready'}<span className="text-orange-500">{process.env.NEXT_PUBLIC_APP_NAME?.includes('Mart') ? 'Mart' : ''}</span>
                        </Link>

                        {/* Search Bar (Hidden on mobile) */}
                        <div className="hidden md:flex flex-1 mx-12 max-w-2xl relative group justify-center">
                            <SearchBar />
                        </div>

                        {/* Icons - Hidden on mobile (Cart & User) */}
                        <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
                            <Link href="/cart" className="hidden md:flex relative group hover:text-orange-500 transition duration-300">
                                <div className="p-2 rounded-full group-hover:bg-orange-50 transition duration-300">
                                    <ShoppingCart size={26} />
                                </div>
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                                    {itemCount}
                                </span>
                            </Link>
                            <button
                                onClick={handleUserClick}
                                className="hidden md:flex group hover:text-orange-500 transition duration-300 cursor-pointer"
                            >
                                <div className="p-2 rounded-full group-hover:bg-orange-50 transition duration-300">
                                    <User size={26} />
                                </div>
                            </button>
                            <button 
                                onClick={toggleMenu}
                                className="md:hidden p-2 hover:bg-orange-50 rounded-xl transition text-gray-500 active:scale-95"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Refined Mobile Search (Visible on mobile) */}
                <div className="md:hidden mt-4">
                    <SearchBar />
                </div>
                </div>

                {/* Categories Bar */}
                <div className="bg-white border-t border-gray-100 hidden md:block shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-center space-x-10 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <Link href="/categories" className="hover:text-orange-500 hover:scale-105 transition duration-300">All Categories</Link>
                            <Link href="/shop?category=men" className="hover:text-orange-500 hover:scale-105 transition duration-300">Men</Link>
                            <Link href="/shop?category=women" className="hover:text-orange-500 hover:scale-105 transition duration-300">Women</Link>
                            <Link href="/shop?category=kids" className="hover:text-orange-500 hover:scale-105 transition duration-300">Kids</Link>
                            <Link href="/shop?category=accessories" className="hover:text-orange-500 hover:scale-105 transition duration-300">Accessories</Link>
                            <Link href="/shop?category=sale" className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 font-bold hover:scale-110 transition duration-300">Flash Sale 🔥</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] md:hidden transition-opacity duration-300"
                    onClick={toggleMenu}
                />
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-[999] md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-2xl font-bold text-gray-900 font-display">Menu</span>
                        <button onClick={toggleMenu} className="p-2 bg-gray-50 rounded-xl text-gray-500">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto space-y-8">
                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Explore Categories</h3>
                            <div className="space-y-1">
                                {categories.map((cat) => (
                                    <Link 
                                        key={cat.href}
                                        href={cat.href}
                                        onClick={toggleMenu}
                                        className={`flex items-center justify-between p-3.5 rounded-2xl transition-all active:scale-[0.98] ${
                                            cat.special 
                                                ? "bg-orange-50 text-orange-600 font-bold" 
                                                : "hover:bg-gray-50 text-gray-700"
                                        }`}
                                    >
                                        <span className="text-sm">{cat.name}</span>
                                        <ChevronRight size={16} className="opacity-40" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Need Help?</h3>
                            <div className="space-y-1">
                                <Link onClick={toggleMenu} href="/track-order" className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-gray-50 text-sm text-gray-700 transition-all">
                                    <span>Track Your Order</span>
                                    <ChevronRight size={16} className="opacity-40" />
                                </Link>
                                <Link onClick={toggleMenu} href="/about" className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-gray-50 text-sm text-gray-700 transition-all">
                                    <span>About {process.env.NEXT_PUBLIC_APP_NAME || 'ReadyMart'}</span>
                                    <ChevronRight size={16} className="opacity-40" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-auto">
                        <Link 
                            href="/" 
                            onClick={toggleMenu}
                            className="block text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600"
                        >
                            {process.env.NEXT_PUBLIC_APP_NAME?.split('Mart')[0] || 'Ready'}<span className="text-orange-500">{process.env.NEXT_PUBLIC_APP_NAME?.includes('Mart') ? 'Mart' : ''}</span>
                        </Link>
                        <p className="text-[10px] text-center text-gray-400 mt-2 italic px-8">Premium Fashion & Lifestyle Destination</p>
                    </div>
                </div>
            </div>
        </>
    );
}
