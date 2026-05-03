"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import FeaturedProductCard from "../products/FeaturedProductCard";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface FeaturedCarouselProps {
    products: any[];
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
    return (
        <div className="relative group/featured px-4 md:px-0">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next-featured',
                    prevEl: '.swiper-button-prev-featured',
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 35,
                    },
                }}
                className="!pb-16 !px-2"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto py-4">
                        <FeaturedProductCard
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

            {/* Custom Navigation Buttons - Blue theme for featured */}
            <button className="swiper-button-prev-featured absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover/featured:opacity-100 hidden lg:flex border border-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="swiper-button-next-featured absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover/featured:opacity-100 hidden lg:flex border border-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
        </div>
    );
}
