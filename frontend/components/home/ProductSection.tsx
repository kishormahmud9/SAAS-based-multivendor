import ProductCard from "../products/ProductCard";
import { productService } from "@/src/services/product.service";

export default async function ProductSection() {
    const res = await productService.getProducts('isFeatured=true&limit=4');
    const featuredProducts = res.success ? res.data : [];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-900 mb-2">
                            Featured Products
                        </h2>
                        <p className="text-gray-600">Handpicked for your style.</p>
                    </div>
                    <a
                        href="/shop"
                        className="text-orange-500 font-semibold hover:text-orange-600 transition"
                    >
                        View All &rarr;
                    </a>
                </div>
                {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product: any) => (
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
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 italic">No featured products found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
