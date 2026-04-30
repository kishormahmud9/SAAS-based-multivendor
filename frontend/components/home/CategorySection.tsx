import Link from "next/link";
import Image from "next/image";
import { productService } from "@/src/services/product.service";
import { getImageUrl } from "@/src/lib/image-utils";

const colors = [
    "from-blue-500 to-blue-700",
    "from-pink-500 to-rose-600",
    "from-yellow-400 to-orange-500",
    "from-purple-500 to-indigo-600",
    "from-green-500 to-teal-600",
    "from-red-500 to-orange-600",
];

export default async function CategorySection() {
    let categories = [];
    try {
        const res = await productService.getCategories();
        categories = res.success ? res.data.slice(0, 8) : [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
                    Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Category</span>
                </h2>
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {categories.map((category: any, index: number) => (
                            <Link
                                key={category.id}
                                href={`/shop?category=${category.slug}`}
                                className="group relative block h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={getImageUrl(category?.image)}
                                        alt={category.name}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${colors[index % colors.length]} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <h3 className="text-3xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{category.name}</h3>
                                    <span className="text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center">
                                        Explore Collection &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 italic">No categories found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
