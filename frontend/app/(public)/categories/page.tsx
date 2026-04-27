import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight, Package, LayoutGrid } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: {
            name: 'asc'
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pt-12 pb-24 px-4">
                <div className="container mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-blue-100 text-sm font-medium mb-6 animate-fade-in">
                        <LayoutGrid size={16} />
                        <span>Discover Your Style</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Categories</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
                        From the latest fashion trends to essential accessories, find everything you need organized by category for a seamless shopping experience.
                    </p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="container mx-auto px-4 -mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category) => (
                        <Link 
                            key={category.id} 
                            href={`/shop?category=${category.slug}`}
                            className="group relative h-80 rounded-[2.5rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800"
                        >
                            {/* Category Image */}
                            <div className="absolute inset-0">
                                {category.image ? (
                                    <img 
                                        src={category.image} 
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                                        <Package size={48} className="text-gray-300 dark:text-gray-700" />
                                    </div>
                                )}
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-orange-600/90 group-hover:via-orange-600/40 transition-all duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                                        {category._count.products} Products
                                    </span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2 font-display uppercase tracking-tight">
                                    {category.name}
                                </h3>
                                <div className="flex items-center text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                                    <span>Browse Collection</span>
                                    <ChevronRight size={18} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <ChevronRight size={24} className="text-white" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {categories.length === 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-20 text-center shadow-xl border border-gray-100 dark:border-gray-800">
                        <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                            <Package size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Categories Found</h2>
                        <p className="text-gray-500 dark:text-gray-400">There are no categories available at the moment. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
