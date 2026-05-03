"use client"

import { useCart } from "@/lib/contexts/CartContext";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/src/lib/image-utils";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    salePrice?: number | null;
    image?: string | null;
    category: string;
    slug?: string;
    stock?: number;
}

export default function ProductCard({ id, name, price, salePrice, image, category, slug, stock = 10 }: ProductCardProps) {
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
            // Error handled in context
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100/50 relative flex flex-col h-full">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {salePrice && (
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider animate-pulse">
                        Sale
                    </span>
                )}
                {stock && stock < 5 && (
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                        Low Stock
                    </span>
                )}
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-red-50 hover:text-red-500 transform translate-y-[-10px] group-hover:translate-y-0">
                <Heart size={18} />
            </button>

            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F8F9FB]">
                <Image
                    src={getImageUrl(image)}
                    alt={name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Bottom Action Bar (Visible on Hover) */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 bg-gray-900 text-white h-11 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-orange-600 transition-colors shadow-xl disabled:opacity-50 active:scale-95"
                    >
                        <ShoppingCart size={18} className={isAdding ? "animate-spin" : ""} />
                        <span className="text-sm">Add to Cart</span>
                    </button>
                    <Link 
                        href={`/product/${slug || id}`} 
                        className="w-11 h-11 bg-white/90 backdrop-blur-md text-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all shadow-xl active:scale-95"
                    >
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-auto">
                    <p className="text-[11px] font-bold text-orange-500 uppercase tracking-[0.1em] mb-1.5 opacity-80">{category}</p>
                    <Link href={`/product/${slug || id}`}>
                        <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                            {name}
                        </h3>
                    </Link>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        {salePrice ? (
                            <>
                                <span className="text-xl font-bold text-gray-900 leading-none">
                                    ${salePrice}
                                </span>
                                <span className="text-xs text-gray-400 line-through mt-1">
                                    ${price}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-gray-900 leading-none">
                                ${price}
                            </span>
                        )}
                    </div>
                    
                    {/* Tiny stock indicator */}
                    <div className="flex items-center gap-1">
                         <div className={`w-1.5 h-1.5 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                         <span className="text-[10px] text-gray-500 font-medium">{stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
