import ProductCard from "../products/ProductCard"

interface Product {
    id: string
    name: string
    slug: string
    price: number
    salePrice: number | null
    images: string[]
    stock: number
    brand: {
        name: string
    } | null
    category: {
        name: string
    }
}

interface ProductGridProps {
    products: Product[]
    loading?: boolean
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col h-full animate-pulse">
                        <div className="relative aspect-[4/5] w-full bg-gray-200" />
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="mb-auto">
                                <div className="h-3 w-1/3 bg-gray-200 rounded mb-3" />
                                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                                <div className="h-5 w-1/2 bg-gray-200 rounded mb-2" />
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <div className="h-6 w-1/3 bg-gray-200 rounded" />
                                <div className="h-3 w-1/4 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-32 h-32 mb-6 text-gray-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    image={product.images[0]}
                    category={product.category.name}
                    slug={product.slug}
                    stock={product.stock}
                />
            ))}
        </div>
    )
}
