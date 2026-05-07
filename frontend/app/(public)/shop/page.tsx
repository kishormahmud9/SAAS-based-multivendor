"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import FilterSidebar from "@/components/shop/FilterSidebar"
import SortDropdown from "@/components/shop/SortDropdown"
import ProductGrid from "@/components/shop/ProductGrid"
import Pagination from "@/components/shop/Pagination"
import { productService } from "@/src/services/product.service"
import type { IProduct } from "@/src/types/product"

type Product = IProduct;

interface Category {
    id: string
    name: string
    slug: string
}

interface Brand {
    id: string
    name: string
    slug: string
}

export default function ShopPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const urlSearchTerm = searchParams.get("searchTerm") || ""
    const urlCategorySlug = searchParams.get("category") || ""

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
    const [sortBy, setSortBy] = useState("latest")
    const [currentPage, setCurrentPage] = useState(1)
    const [isInitialized, setIsInitialized] = useState(false)

    // Fetch categories and brands on mount
    useEffect(() => {
        fetchFilters()
    }, [])

    // Sync URL params to state once filters are loaded
    useEffect(() => {
        if (categories.length > 0) {
            let initialCategories = [...selectedCategories];
            
            if (urlCategorySlug) {
                const cat = categories.find(c => c.slug === urlCategorySlug)
                if (cat && !initialCategories.includes(cat.id)) {
                    initialCategories = [cat.id]
                    setSelectedCategories(initialCategories)
                }
            }
            setIsInitialized(true)
        }
    }, [urlCategorySlug, categories])

    // Fetch products when filters or URL params change
    useEffect(() => {
        if (isInitialized) {
            fetchProducts()
        }
    }, [selectedCategories, selectedBrands, priceRange, sortBy, currentPage, urlSearchTerm, isInitialized])

    const fetchFilters = async () => {
        try {
            const [categoriesRes, brandsRes] = await Promise.all([
                productService.getCategories(),
                productService.getBrands(),
            ])

            if (categoriesRes.success) setCategories(categoriesRes.data)
            if (brandsRes.success) setBrands(brandsRes.data)
        } catch (error) {
            console.error("Error fetching filters:", error)
        }
    }

    const fetchProducts = async () => {
        // Only show loading state if it's the first page (so we don't clear the screen during infinite scroll)
        if (currentPage === 1) setLoading(true)
        
        try {
            const params = new URLSearchParams()

            if (urlSearchTerm) {
                params.append("searchTerm", urlSearchTerm)
            }
            if (selectedCategories.length > 0) {
                const categorySlugs = selectedCategories
                    .map(id => categories.find(c => c.id === id)?.slug)
                    .filter(Boolean)
                    .join(",")
                if (categorySlugs) params.append("category", categorySlugs)
            }
            if (selectedBrands.length > 0) {
                const brandSlugs = selectedBrands
                    .map(id => brands.find(b => b.id === id)?.slug)
                    .filter(Boolean)
                    .join(",")
                if (brandSlugs) params.append("brand", brandSlugs)
            }
            if (priceRange[0] > 0) {
                params.append("minPrice", priceRange[0].toString())
            }
            if (priceRange[1] < 10000) {
                params.append("maxPrice", priceRange[1].toString())
            }

            // Sorting
            if (sortBy === "price-asc") {
                params.append("sortBy", "price")
                params.append("sortOrder", "asc")
            } else if (sortBy === "price-desc") {
                params.append("sortBy", "price")
                params.append("sortOrder", "desc")
            } else if (sortBy === "name-asc") {
                params.append("sortBy", "name")
                params.append("sortOrder", "asc")
            } else if (sortBy === "name-desc") {
                params.append("sortBy", "name")
                params.append("sortOrder", "desc")
            } else {
                params.append("sortBy", "createdAt")
                params.append("sortOrder", "desc")
            }

            params.append("page", currentPage.toString())
            params.append("limit", "12")

            const response = await productService.getProducts(params.toString())

            if (response.success) {
                if (currentPage === 1) {
                    setProducts(response.data)
                } else {
                    setProducts(prev => [...prev, ...response.data])
                }
                setTotalPages(response.meta?.totalPage || 1)
            }
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }

    const observerTarget = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && currentPage < totalPages && !loading) {
                    setCurrentPage(prev => prev + 1)
                }
            },
            { threshold: 0.1 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current)
            }
        }
    }, [observerTarget, currentPage, totalPages, loading])

    const handleCategoryChange = (c: string[]) => { setSelectedCategories(c); setCurrentPage(1); }
    const handleBrandChange = (b: string[]) => { setSelectedBrands(b); setCurrentPage(1); }
    const handlePriceChange = (p: [number, number]) => { setPriceRange(p); setCurrentPage(1); }
    const handleSortChange = (s: string) => { setSortBy(s); setCurrentPage(1); }

    const handleClearFilters = () => {
        setSelectedCategories([])
        setSelectedBrands([])
        setPriceRange([0, 10000])
        setSortBy("latest")
        setCurrentPage(1)
        if (urlSearchTerm || urlCategorySlug) {
            router.push('/shop') // Clears URL parameters
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-2">
                        {urlSearchTerm ? `Search Results for "${urlSearchTerm}"` : 'Shop'}
                    </h1>
                    <p className="text-gray-600">
                        {urlSearchTerm ? 'Discover exactly what you are looking for.' : 'Discover our amazing collection of products'}
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex gap-8">
                    {/* Sidebar - Filters */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <FilterSidebar
                            categories={categories}
                            brands={brands}
                            selectedCategories={selectedCategories}
                            selectedBrands={selectedBrands}
                            minPrice={0}
                            maxPrice={10000}
                            priceRange={priceRange}
                            onCategoryChange={handleCategoryChange}
                            onBrandChange={handleBrandChange}
                            onPriceChange={handlePriceChange}
                            onClearFilters={handleClearFilters}
                        />
                    </aside>

                    {/* Products Section */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                {loading ? "Loading..." : `${products.length} products found`}
                            </p>
                            <SortDropdown value={sortBy} onChange={handleSortChange} />
                        </div>

                        {/* Product Grid */}
                        <ProductGrid products={products} loading={loading && currentPage === 1} />

                        {/* Infinite Scroll Observer */}
                        {currentPage < totalPages && (
                            <div ref={observerTarget} className="flex justify-center items-center py-8">
                                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
