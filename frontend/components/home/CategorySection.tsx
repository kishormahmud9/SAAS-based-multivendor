import Link from "next/link";
import Image from "next/image";
import { productService } from "@/src/services/product.service";
import { getImageUrl } from "@/src/lib/image-utils";

export default async function CategorySection() {
    let categories = [];
    try {
        const res = await productService.getCategories("isHomepageView=true&limit=12");
        // The backend now sorts by sortOrder asc, createdAt desc
        categories = res.success ? res.data : [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                            Shop by <span className="text-orange-600">Category</span>
                        </h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Explore our curated collections</p>
                    </div>
                    <Link
                        href="/categories"
                        className="px-6 py-3 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-orange-500 hover:text-orange-600 transition-all flex items-center gap-2 group"
                    >
                        View All <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </div>

                {categories.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
                        {categories.map((category: any) => (
                            <Link
                                key={category.id}
                                href={`/shop?category=${category.slug}`}
                                className="group flex flex-col items-center"
                            >
                                <div className="relative w-full aspect-square mb-4 rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-500 group-hover:rounded-2xl group-hover:border-orange-200 group-hover:shadow-2xl group-hover:shadow-orange-500/10">
                                    <Image
                                        src={getImageUrl(category?.image)}
                                        alt={category.name}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                                </div>
                                <h3 className="text-[11px] font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-widest text-center px-2">
                                    {category.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No categories available at the moment</p>
                    </div>
                )}
            </div>
        </section>
    );
}
