import ProductCard from "../products/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function TrendingSection() {
    // For now, let's take top 4 products as trending
    const trendingProducts = await prisma.product.findMany({
        where: {
            isArchived: false,
        },
        take: 4,
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'asc', // Different order than featured to show variety
        },
    });

    if (trendingProducts.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Trending <span className="text-orange-500">Now</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Discover the hottest products that everyone is talking about this week.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trendingProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={Number(product.price)}
                            salePrice={product.salePrice ? Number(product.salePrice) : null}
                            image={product.images[0] || null}
                            category={product.category.name}
                            slug={product.slug}
                            stock={product.stock}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
