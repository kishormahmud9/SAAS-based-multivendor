"use client"

import { useEffect, useState } from "react"
import ProductCard from "../products/ProductCard"
import { productService } from "@/src/services/product.service"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface RelatedProductsProps {
    categoryId: string
    currentProductId: string
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRelatedProducts()
    }, [categoryId, currentProductId])

    const fetchRelatedProducts = async () => {
        try {
            const data = await productService.getProducts(`category=${categoryId}&limit=10`)
            if (data.success) {
                setProducts(data.data.filter((p: any) => p.id !== currentProductId))
            }
        } catch (error) {
            console.error("Error fetching related products:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="mt-24">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">
                        <Sparkles className="text-orange-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight italic uppercase">You May Also Like</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-[2rem] shadow-sm overflow-hidden animate-pulse border border-gray-100">
                            <div className="w-full h-72 bg-gray-100" />
                            <div className="p-6 space-y-3">
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                                <div className="h-4 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (products.length === 0) return null

    return (
        <div className="mt-24 relative group/carousel pb-12">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm">
                        <Sparkles className="text-orange-600" size={24} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight italic uppercase">Similar Products</h2>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Recommended for you</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="swiper-prev-related w-12 h-12 rounded-2xl border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm active:scale-90">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="swiper-next-related w-12 h-12 rounded-2xl border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm active:scale-90">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    prevEl: '.swiper-prev-related',
                    nextEl: '.swiper-next-related',
                }}
                pagination={{ clickable: true, el: '.swiper-pagination-related' }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 }
                }}
                className="related-products-swiper !overflow-visible"
            >
                {products.map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            price={Number(product.price)}
                            salePrice={product.salePrice ? Number(product.salePrice) : null}
                            image={product.images?.[0] || null}
                            category={product.category?.name || ''}
                            slug={product.slug}
                            stock={product.stock}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <div className="swiper-pagination-related !bottom-0 mt-8 flex justify-center"></div>
        </div>
    )
}
