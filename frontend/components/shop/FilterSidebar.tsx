"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronDown, ChevronUp, Check } from "lucide-react"

interface Category {
    id: string
    name: string
}

interface Brand {
    id: string
    name: string
}

interface FilterSidebarProps {
    categories: Category[]
    brands: Brand[]
    selectedCategories: string[]
    selectedBrands: string[]
    minPrice: number
    maxPrice: number
    priceRange: [number, number]
    onCategoryChange: (categoryIds: string[]) => void
    onBrandChange: (brandIds: string[]) => void
    onPriceChange: (range: [number, number]) => void
    onClearFilters: () => void
}

export default function FilterSidebar({
    categories,
    brands,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    priceRange,
    onCategoryChange,
    onBrandChange,
    onPriceChange,
    onClearFilters,
}: FilterSidebarProps) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(true)
    const [isBrandOpen, setIsBrandOpen] = useState(true)
    const [isPriceOpen, setIsPriceOpen] = useState(true)
    const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange)

    useEffect(() => {
        setLocalPriceRange(priceRange)
    }, [priceRange])

    // Debounce price changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (localPriceRange[0] !== priceRange[0] || localPriceRange[1] !== priceRange[1]) {
                onPriceChange(localPriceRange)
            }
        }, 500)
        return () => clearTimeout(handler)
    }, [localPriceRange])

    const handleCategoryToggle = (categoryId: string) => {
        const newSelection = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId]
        onCategoryChange(newSelection)
    }

    const handleBrandToggle = (brandId: string) => {
        const newSelection = selectedBrands.includes(brandId)
            ? selectedBrands.filter(id => id !== brandId)
            : [...selectedBrands, brandId]
        onBrandChange(newSelection)
    }

    const handlePriceChange = (index: 0 | 1, value: number) => {
        const newRange: [number, number] = [...localPriceRange] as [number, number]
        newRange[index] = value
        setLocalPriceRange(newRange)
    }

    const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 ||
        (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                    >
                        <X size={16} />
                        Clear All
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center justify-between w-full mb-3 text-left"
                >
                    <h3 className="font-semibold text-gray-900">Categories</h3>
                    {isCategoryOpen ? (
                        <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                    )}
                </button>
                {isCategoryOpen && (
                    <div className="space-y-1 mt-4">
                        {categories.map(category => {
                            const isSelected = selectedCategories.includes(category.id);
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryToggle(category.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                                        isSelected 
                                            ? 'bg-orange-50 text-orange-600 font-bold' 
                                            : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900 font-medium'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                                        isSelected ? 'bg-orange-600 border-none text-white' : 'border-2 border-gray-300'
                                    }`}>
                                        {isSelected && <Check size={14} strokeWidth={4} />}
                                    </div>
                                    <span className="text-sm">{category.name}</span>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Brand Filter */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button
                    onClick={() => setIsBrandOpen(!isBrandOpen)}
                    className="flex items-center justify-between w-full mb-3 text-left"
                >
                    <h3 className="font-semibold text-gray-900">Brands</h3>
                    {isBrandOpen ? (
                        <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                    )}
                </button>
                {isBrandOpen && (
                    <div className="space-y-1 mt-4">
                        {brands.map(brand => {
                            const isSelected = selectedBrands.includes(brand.id);
                            return (
                                <button
                                    key={brand.id}
                                    onClick={() => handleBrandToggle(brand.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                                        isSelected 
                                            ? 'bg-orange-50 text-orange-600 font-bold' 
                                            : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900 font-medium'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                                        isSelected ? 'bg-orange-600 border-none text-white' : 'border-2 border-gray-300'
                                    }`}>
                                        {isSelected && <Check size={14} strokeWidth={4} />}
                                    </div>
                                    <span className="text-sm">{brand.name}</span>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Price Range Filter */}
            <div>
                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="flex items-center justify-between w-full mb-3 text-left"
                >
                    <h3 className="font-semibold text-gray-900">Price Range</h3>
                    {isPriceOpen ? (
                        <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                    )}
                </button>
                {isPriceOpen && (
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-gray-600 mb-1 block">Min</label>
                                <input
                                    type="number"
                                    value={localPriceRange[0]}
                                    onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                                    min={minPrice}
                                    max={localPriceRange[1]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-600 mb-1 block">Max</label>
                                <input
                                    type="number"
                                    value={localPriceRange[1]}
                                    onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                                    min={localPriceRange[0]}
                                    max={maxPrice}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="relative h-2 mt-6 mb-8">
                            <div className="absolute w-full h-1 bg-gray-100 rounded-full top-0.5"></div>
                            <div 
                                className="absolute h-2 bg-orange-500 rounded-full"
                                style={{ 
                                    left: `${(localPriceRange[0] / maxPrice) * 100}%`, 
                                    right: `${100 - (localPriceRange[1] / maxPrice) * 100}%` 
                                }}
                            ></div>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={localPriceRange[0]}
                                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:shadow-md"
                            />
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={localPriceRange[1]}
                                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:shadow-md"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
