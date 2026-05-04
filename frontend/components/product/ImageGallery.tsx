"use client"

import { useState } from "react"
import Image from "next/image"
import { getImageUrl } from "@/src/lib/image-utils"
import { Maximize2 } from "lucide-react"

interface ImageGalleryProps {
    images: string[]
    productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    if (images.length === 0) {
        return (
            <div className="w-full aspect-[4/5] bg-gray-50 rounded-[2rem] flex items-center justify-center border border-gray-100">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest italic">No image</span>
            </div>
        )
    }

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/5] bg-white rounded-[2rem] shadow-xl shadow-gray-100/50 overflow-hidden group border border-gray-50">
                <Image
                    src={getImageUrl(images[selectedImage])}
                    alt={`${productName} - Image ${selectedImage + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                        <Maximize2 size={14} className="text-gray-900" />
                    </div>
                </div>
            </div>

            {/* Thumbnails Strip - Smaller */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar justify-center">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`
                                relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition-all duration-300
                                ${selectedImage === index
                                    ? "border-orange-600 scale-90 shadow-sm"
                                    : "border-gray-100 hover:border-gray-200"
                                }
                            `}
                        >
                            <Image
                                src={getImageUrl(image)}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
