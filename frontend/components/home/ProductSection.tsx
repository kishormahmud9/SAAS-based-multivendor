import { productService } from "@/src/services/product.service";
import FeaturedCarousel from "./FeaturedCarousel";

export default async function ProductSection() {
    let featuredProducts: any[] = [];
    try {
        const res = await productService.getProducts('isFeatured=true&limit=12');
        featuredProducts = res.success ? res.data : [];
    } catch (error) {
        console.error("Failed to fetch featured products:", error);
    }

    if (featuredProducts.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Premium Collection
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Featured <span className="text-blue-600">Products</span>
                        </h2>
                        <p className="text-gray-500 text-lg max-w-xl">
                            Our handpicked selection of top-tier products chosen for their exceptional quality and style.
                        </p>
                    </div>
                    
                    <div className="hidden md:block">
                        <a
                            href="/shop"
                            className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200"
                        >
                            Explore Collection
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>
                </div>

                <FeaturedCarousel products={featuredProducts} />
                
                <div className="mt-10 md:hidden flex justify-center">
                    <a
                        href="/shop"
                        className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl"
                    >
                        View All Collection
                    </a>
                </div>
            </div>
        </section>
    );
}

