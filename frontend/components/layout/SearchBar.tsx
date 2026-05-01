import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Loader2, Package, ChevronRight } from "lucide-react"
import Image from "next/image"
import { getImageUrl } from "@/src/lib/image-utils"

interface Product {
    id: string;
    name: string;
    price: number;
    images?: string[];
    category?: {
        name: string;
    };
}

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("q") || "")
    const [suggestions, setSuggestions] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true)
                try {
                    const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}&limit=6`)
                    const result = await res.json()
                    if (result.success) {
                        setSuggestions(result.data)
                        setShowSuggestions(true)
                    }
                } catch (error) {
                    console.error("Search error:", error)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setSuggestions([])
                setShowSuggestions(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (query.trim()) {
            setShowSuggestions(false)
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    const handleSuggestionClick = (productId: string) => {
        setShowSuggestions(false)
        router.push(`/products/${productId}`)
    }

    return (
        <div ref={dropdownRef} className="relative w-full">
            <form onSubmit={handleSearch} className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
                    placeholder="Search premium products..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-2.5 md:py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all duration-300 shadow-sm text-gray-900 placeholder-gray-400"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    {isLoading ? (
                        <Loader2 size={18} className="text-orange-500 animate-spin" />
                    ) : (
                        <Search size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    )}
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl z-[200] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-2">
                        {suggestions.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => handleSuggestionClick(product.id)}
                                className="w-full flex items-center p-2.5 hover:bg-orange-50 rounded-xl transition-all duration-200 group text-left"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100 relative">
                                    {product.images?.[0] ? (
                                        <Image src={getImageUrl(product.images[0])} alt={product.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Package size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="ml-3 flex-grow min-w-0">
                                    <div className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                                        {product.name}
                                    </div>
                                    <div className="flex items-center space-x-2 mt-0.5">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
                                            {product.category?.name || "General"}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400">
                                            ${product.price}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => handleSearch()}
                        className="w-full py-3 bg-gray-50/50 border-t border-gray-100 text-xs font-bold text-gray-500 hover:text-orange-600 flex items-center justify-center space-x-1.5 transition-colors"
                    >
                        <span>View all results for "{query}"</span>
                        <ChevronRight size={12} />
                    </button>
                </div>
            )}

            {/* No Results State */}
            {showSuggestions && query.trim().length >= 2 && suggestions.length === 0 && !isLoading && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-[200] p-8 text-center animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search size={20} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">No products found</p>
                    <p className="text-xs text-gray-400 mt-1">Try searching with different keywords</p>
                </div>
            )}
        </div>
    );
}
