import { Tag, Award, Package, Barcode, CheckCircle2, ShoppingBag, Ruler, Scale, Store, Star, Info } from "lucide-react"

interface ProductInfoProps {
    name: string
    price: string
    salePrice: string | null
    description: string
    shortDescription?: string | null
    stock: number
    category: { name: string }
    brand: { name: string } | null
    store?: { name: string; slug: string } | null
    sku?: string | null
    barcode?: string | null
    productType?: string
    taxRate?: number
    taxInclusive?: boolean
    weight?: string | null
    weightUnit?: string | null
    length?: string | null
    width?: string | null
    height?: string | null
    dimensionUnit?: string | null
    attributes?: { name: string; value: string }[]
    reviews?: any[]
}

export default function ProductInfo({
    name,
    price,
    salePrice,
    description,
    shortDescription,
    stock,
    category,
    brand,
    store,
    sku,
    barcode,
    productType,
    taxRate,
    taxInclusive,
    weight,
    weightUnit,
    length,
    width,
    height,
    dimensionUnit,
    attributes,
    reviews = []
}: ProductInfoProps) {
    const currentPrice = salePrice || price
    const hasDiscount = !!salePrice
    const discountPercentage = hasDiscount
        ? Math.round(((parseFloat(price) - parseFloat(salePrice)) / parseFloat(price)) * 100)
        : 0

    const inStock = stock > 0
    const averageRating = reviews.length > 0 
        ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
        : 0

    return (
        <div className="space-y-5 animate-in fade-in duration-500">
            {/* Header: Minimal Badges & Type */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[8px] font-bold uppercase tracking-widest rounded-md border border-gray-200">
                    {productType || 'SIMPLE'}
                </span>
                <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[8px] font-bold uppercase tracking-widest rounded-md border border-orange-100 flex items-center gap-1">
                    <Tag size={10} />
                    {category.name}
                </span>
                {brand && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-bold uppercase tracking-widest rounded-md border border-blue-100 flex items-center gap-1">
                        <Award size={10} />
                        {brand.name}
                    </span>
                )}
            </div>

            {/* Title, Rating & Short Description */}
            <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                        {name}
                    </h1>
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-[11px] font-black text-yellow-700">{averageRating.toFixed(1)}</span>
                            <span className="text-[9px] font-bold text-yellow-600/60 uppercase tracking-tighter">({reviews.length} reviews)</span>
                        </div>
                    )}
                </div>
                {shortDescription && (
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        {shortDescription}
                    </p>
                )}
            </div>

            {/* Minimal Pricing & Identifiers */}
            <div className="flex items-end justify-between pb-4 border-b border-gray-100">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl font-black text-orange-600 tracking-tighter">
                            ৳{parseFloat(currentPrice).toLocaleString()}
                        </div>
                        {hasDiscount && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-300 line-through">
                                    ৳{parseFloat(price).toLocaleString()}
                                </span>
                                <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                    -{discountPercentage}%
                                </span>
                            </div>
                        )}
                    </div>
                    {(taxRate !== undefined && taxRate !== null) && (
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <Info size={10} />
                            {taxInclusive ? 'Tax Included' : `+${taxRate}% Tax`}
                        </p>
                    )}
                </div>
                <div className="text-right space-y-1">
                    {sku && (
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                            SKU: <span className="text-gray-600">{sku}</span>
                        </div>
                    )}
                    {barcode && (
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-end gap-1">
                            <Barcode size={10} />
                            {barcode}
                        </div>
                    )}
                </div>
            </div>

            {/* Specifications Grid - Very Minimal */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-100">
                    <Package size={12} className={inStock ? "text-emerald-500" : "text-rose-500"} />
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${inStock ? "text-emerald-600" : "text-rose-600"}`}>
                        {inStock ? `${stock} In Stock` : "Out of Stock"}
                    </span>
                </div>
                {weight && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-100">
                        <Scale size={12} className="text-gray-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                            {weight} {weightUnit}
                        </span>
                    </div>
                )}
                {(length || width || height) && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-100 col-span-2">
                        <Ruler size={12} className="text-gray-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                            {length || 0} x {width || 0} x {height || 0} {dimensionUnit}
                        </span>
                    </div>
                )}
                {store && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50/30 rounded-xl border border-emerald-100 col-span-2">
                        <Store size={12} className="text-emerald-500" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">
                            Store: {store.name}
                        </span>
                    </div>
                )}
            </div>

            {/* Minimal Attributes */}
            {attributes && attributes.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {attributes.map((attr, idx) => (
                        <div key={idx} className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            <span className="text-[8px] font-bold text-gray-400 uppercase mr-2">{attr.name}:</span>
                            <span className="text-[9px] font-bold text-gray-700 uppercase tracking-tighter">{attr.value}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Compact Trust Badges */}
            <div className="flex items-center gap-5 pt-2">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    Authentic
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <ShoppingBag size={12} className="text-orange-400" />
                    Safe Delivery
                </div>
            </div>
        </div>
    )
}
