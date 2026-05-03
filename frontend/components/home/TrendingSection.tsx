import { productService } from "@/src/services/product.service";
import TrendingCarousel from "./TrendingCarousel";

export default async function TrendingSection() {
    // Fetch top 10 products as trending
    let trendingProducts: any[] = [];
    try {
        const res = await productService.getProducts('limit=10&sortBy=createdAt&sortOrder=asc');
        trendingProducts = res.success ? res.data : [];
    } catch (error) {
        console.error("Failed to fetch trending products:", error);
    }

    if (trendingProducts.length === 0) return null;

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            Trending <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">Now</span>
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Discover the hottest products that everyone is talking about this week.
                        </p>
                    </div>
                    
                    <div className="hidden md:block">
                        <a href="/shop" className="group flex items-center gap-2 text-gray-900 font-bold hover:text-orange-500 transition-colors">
                            View All Products
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>
                </div>
                
                <TrendingCarousel products={trendingProducts} />

                <div className="mt-10 md:hidden text-center">
                    <a href="/shop" className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-orange-500 transition-colors">
                        View All Products
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

