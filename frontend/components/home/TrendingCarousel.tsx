"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from "../products/ProductCard";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TrendingCarouselProps {
    products: any[];
}

export default function TrendingCarousel({ products }: TrendingCarouselProps) {
    return (
        <div className="relative group/carousel px-4 md:px-0">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next-trending',
                    prevEl: '.swiper-button-prev-trending',
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                className="!pb-14"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto">
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            price={Number(product.price)}
                            salePrice={product.salePrice ? Number(product.salePrice) : null}
                            image={product.images[0] || null}
                            category={product.category.name}
                            slug={product.slug}
                            stock={product.stock}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-trending absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:bg-orange-500 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden lg:flex border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="swiper-button-next-trending absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:bg-orange-500 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden lg:flex border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

        </div>
    );
}

