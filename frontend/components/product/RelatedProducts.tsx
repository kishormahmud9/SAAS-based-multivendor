"use client"

import { useEffect, useState } from "react"
import ProductCard from "../products/ProductCard"
import { productService } from "@/src/services/product.service"

interface RelatedProductsProps {
    categoryId: string
    currentProductId: string
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRelatedProducts()
    }, [categoryId, currentProductId])

    const fetchRelatedProducts = async () => {
        try {
            const data = await productService.getProducts(`category=${categoryId}&limit=4`)
            if (data.success) {
                setProducts(data.data.filter((p: any) => p.id !== currentProductId))
            }
        } catch (error) {
            console.error("Error fetching related products:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                            <div className="w-full h-64 bg-gray-200" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (products.length === 0) return null

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={Number(product.price)}
                        salePrice={product.salePrice ? Number(product.salePrice) : null}
                        image={product.images?.[0] || null}
                        category={product.category?.name || ''}
                        slug={product.slug}
                        stock={product.stock}
                    />
                ))}
            </div>
        </div>
    )
}
