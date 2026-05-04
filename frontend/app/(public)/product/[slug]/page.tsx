"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart, Share2, ShieldCheck, Truck, RefreshCcw, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import ImageGallery from "@/components/product/ImageGallery"
import ProductInfo from "@/components/product/ProductInfo"
import QuantitySelector from "@/components/product/QuantitySelector"
import AddToCartButton from "@/components/product/AddToCartButton"
import RelatedProducts from "@/components/product/RelatedProducts"
import ReviewList from "@/components/product/ReviewList"
import ReviewForm from "@/components/product/ReviewForm"
import { productService } from "@/src/services/product.service"
import { useAuth } from "@/lib/contexts/AuthContext"

interface Product {
    id: string
    name: string
    slug: string
    description: string
    shortDescription: string | null
    price: string
    salePrice: string | null
    images: string[]
    stock: number
    sku: string | null
    barcode: string | null
    productType: string
    taxRate: number
    taxInclusive: boolean
    weight: string | null
    weightUnit: string | null
    length: string | null
    width: string | null
    height: string | null
    dimensionUnit: string | null
    categoryId: string
    category: {
        name: string
    }
    brand: {
        name: string
    } | null
    store: {
        name: string
        slug: string
    }
    attributes: { name: string; value: string }[]
    reviews?: Review[]
    averageRating?: number
    reviewCount?: number
}

interface Review {
    id: string
    rating: number
    comment: string | null
    createdAt: string
    user: {
        name: string | null
        avatar?: string | null
        email: string
    }
}

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const slug = params?.slug as string
    const { user } = useAuth()

    const [product, setProduct] = useState<Product | null>(null)
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')

    useEffect(() => {
        if (slug) {
            fetchProduct()
        }
    }, [slug])

    const fetchProduct = async () => {
        try {
            const productRes = await productService.getProductBySlug(slug)

            if (productRes.success && productRes.data) {
                const fetchedProduct = productRes.data as any
                setProduct(fetchedProduct)
                
                if (fetchedProduct.reviews) {
                    setReviews(fetchedProduct.reviews)
                }

                try {
                    const reviewsRes = await productService.getReviews(fetchedProduct.id)
                    if (reviewsRes.success && reviewsRes.data) {
                        setReviews(reviewsRes.data)
                    }
                } catch (reviewError) {
                    console.error("Non-critical error fetching reviews:", reviewError)
                }
            } else {
                router.push("/shop")
            }
        } catch (error) {
            console.error("Error fetching product:", error)
            router.push("/shop")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
                        <div className="space-y-4">
                            <div className="w-full aspect-square bg-gray-50 rounded-[2rem]" />
                            <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="aspect-square bg-gray-50 rounded-xl" />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-3 bg-gray-50 rounded w-1/4" />
                            <div className="h-8 bg-gray-50 rounded w-3/4" />
                            <div className="h-16 bg-gray-50 rounded-2xl" />
                            <div className="h-24 bg-gray-50 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) return null

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Minimal Top Nav */}
            <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-100">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/shop" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all">
                        <ArrowLeft size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Back to shop</span>
                    </Link>

                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-600 transition-all">
                            <Share2 size={14} />
                        </button>
                        <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                            <Heart size={14} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* LEFT: Image Gallery - Smaller Span */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24">
                            <ImageGallery images={product.images} productName={product.name} />
                            
                            {/* Compact Service Features */}
                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div className="text-center p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <Truck size={14} className="mx-auto mb-1.5 text-blue-500" />
                                    <p className="text-[8px] font-bold uppercase tracking-tight text-gray-900">Fast Shipping</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <ShieldCheck size={14} className="mx-auto mb-1.5 text-emerald-500" />
                                    <p className="text-[8px] font-bold uppercase tracking-tight text-gray-900">Secure Pay</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <RefreshCcw size={14} className="mx-auto mb-1.5 text-orange-500" />
                                    <p className="text-[8px] font-bold uppercase tracking-tight text-gray-900">Easy Return</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Info & Action - Larger Span */}
                    <div className="lg:col-span-8 space-y-6 lg:pl-4">
                        <ProductInfo
                            name={product.name}
                            price={product.price}
                            salePrice={product.salePrice}
                            description={product.description}
                            shortDescription={product.shortDescription}
                            stock={product.stock}
                            category={product.category}
                            brand={product.brand}
                            store={product.store}
                            sku={product.sku}
                            barcode={product.barcode}
                            productType={product.productType}
                            taxRate={product.taxRate}
                            taxInclusive={product.taxInclusive}
                            weight={product.weight}
                            weightUnit={product.weightUnit}
                            length={product.length}
                            width={product.width}
                            height={product.height}
                            dimensionUnit={product.dimensionUnit}
                            attributes={product.attributes}
                            reviews={reviews}
                        />

                        {/* Actions: Refined Minimalist Section (No Dark Mode) */}
                        {product.stock > 0 ? (
                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                    <div className="space-y-0.5">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Select Quantity</label>
                                        <p className="text-[10px] text-emerald-500 font-bold uppercase flex items-center gap-1">
                                            <CheckCircle2 size={10} />
                                            {product.stock} Units in stock
                                        </p>
                                    </div>
                                    <QuantitySelector
                                        min={1}
                                        max={product.stock}
                                        value={quantity}
                                        onChange={setQuantity}
                                    />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <AddToCartButton
                                        productId={product.id}
                                        productName={product.name}
                                        quantity={quantity}
                                        stock={product.stock}
                                        price={Number(product.price)}
                                        salePrice={product.salePrice ? Number(product.salePrice) : null}
                                        image={product.images[0]}
                                        slug={product.slug}
                                    />
                                    <button className="w-full py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                                        Buy it Now
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-8 text-center space-y-3">
                                <h3 className="text-xl font-bold text-rose-900 uppercase">Sold Out</h3>
                                <p className="text-rose-600/70 font-medium text-[10px] uppercase tracking-widest">Notification will be sent when back</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16">
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-100 inline-flex shadow-sm mb-8">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}
                            >
                                {tab} {tab === 'reviews' ? `(${reviews.length})` : ''}
                            </button>
                        ))}
                    </div>

                    <div className="animate-in fade-in duration-300">
                        {activeTab === 'description' && (
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-50 shadow-sm leading-relaxed text-gray-600 max-w-3xl font-medium text-sm whitespace-pre-line">
                                {product.description}
                            </div>
                        )}
                        
                        {activeTab === 'specifications' && (
                            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-50 shadow-sm max-w-3xl">
                                <table className="w-full text-sm text-left">
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { label: 'Brand', value: product.brand?.name },
                                            { label: 'Category', value: product.category?.name },
                                            { label: 'Store', value: product.store?.name },
                                            { label: 'SKU', value: product.sku },
                                            { label: 'Barcode', value: product.barcode },
                                            { label: 'Product Type', value: product.productType },
                                            { label: 'Weight', value: product.weight ? `${product.weight} ${product.weightUnit}` : null },
                                            { label: 'Dimensions', value: product.length ? `${product.length} x ${product.width} x ${product.height} ${product.dimensionUnit}` : null },
                                        ].filter(item => item.value).map((item, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest w-1/3">{item.label}</td>
                                                <td className="px-6 py-4 font-bold text-gray-700 text-xs">{item.value}</td>
                                            </tr>
                                        ))}
                                        {product.attributes?.map((attr, idx) => (
                                            <tr key={`attr-${idx}`} className="group hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest w-1/3">{attr.name}</td>
                                                <td className="px-6 py-4 font-bold text-gray-700 text-xs">{attr.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="max-w-5xl">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-8">
                                        <ReviewList reviews={reviews} />
                                    </div>
                                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                                        <ReviewForm
                                            productId={product.id}
                                            onReviewSubmitted={() => {
                                                productService.getReviews(product.id)
                                                    .then(data => {
                                                        if (data.success) setReviews(data.data)
                                                    })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Products */}
                <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
            </div>
        </div>
    )
}
