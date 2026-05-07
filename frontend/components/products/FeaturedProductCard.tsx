"use client"

import { useCart } from "@/lib/contexts/CartContext";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/src/lib/image-utils";

interface FeaturedProductCardProps {
    id: string;
    name: string;
    price: number;
    salePrice?: number | null;
    image?: string | null;
    category: string;
    slug?: string;
    stock?: number;
}

export default function FeaturedProductCard({ id, name, price, salePrice, image, category, slug, stock = 10 }: FeaturedProductCardProps) {
    const { addItem } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        try {
            await addItem(id, 1, {
                id,
                name,
                price,
                salePrice: salePrice || null,
                images: image ? [image] : [],
                slug: slug || id,
                stock: stock
            });
            toast.success(`${name} added to cart!`);
        } catch (error) {
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="group relative bg-white rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-transparent hover:border-blue-50/50 flex flex-col h-full overflow-hidden">
            {/* Image Container with unique shape */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-gray-50 mb-6 group-hover:shadow-inner transition-all duration-500">
                <Image
                    src={getImageUrl(image)}
                    alt={name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 scale-100 group-hover:scale-105"
                />
                
                {/* Sale Badge - Floating style */}
                {salePrice && price > 0 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm z-10 border border-white/20">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{Math.round(((price - salePrice) / price) * 100)}% OFF</span>
                    </div>
                )}

                {/* Quick actions - Vertical bar style */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-lg transition-colors">
                        <Heart size={18} />
                    </button>
                    <Link href={`/product/${slug || id}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-blue-500 shadow-lg transition-colors">
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-2 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">{category}</span>
                    <div className="h-[1px] flex-grow bg-blue-100/50"></div>
                </div>

                <Link href={`/product/${slug || id}`} className="block mb-4">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {name}
                    </h3>
                </Link>

                <div className="mt-auto flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 mb-0.5">Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-gray-900">
                                ৳{salePrice || price}
                            </span>
                            {salePrice && (
                                <span className="text-sm text-gray-400 line-through">৳{price}</span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="relative w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center overflow-hidden hover:w-32 transition-all duration-500 group/btn shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-700 z-10"
                    >
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover/btn:translate-x-[-40px] pointer-events-none">
                            <ShoppingCart size={20} className={isAdding ? "animate-spin" : ""} />
                        </div>
                        <span className="absolute left-10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 text-sm font-bold whitespace-nowrap pointer-events-none">
                            Add to Cart
                        </span>
                    </button>
                </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
        </div>
    );
}

