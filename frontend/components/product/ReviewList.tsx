"use client"

import { Star, User, MessageSquare, Calendar } from "lucide-react"

interface Review {
    id: string
    rating: number
    comment: string | null
    createdAt: string
    user: {
        name: string | null
        email: string
        avatar?: string | null
    }
}

interface ReviewListProps {
    reviews: Review[]
}

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                />
            ))}
        </div>
    )
}

export default function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="bg-gray-50/50 rounded-[1.5rem] p-8 text-center border border-dashed border-gray-200">
                <MessageSquare className="text-gray-300 mx-auto mb-3" size={24} />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No reviews yet</p>
            </div>
        )
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

    return (
        <div className="space-y-6">
            {/* Summary Card - Compact */}
            <div className="bg-white rounded-[1.5rem] p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-black text-gray-900 tracking-tighter mb-1">
                            {averageRating.toFixed(1)}
                        </div>
                        <StarRating rating={Math.round(averageRating)} size={16} />
                    </div>
                    
                    <div className="flex-1 space-y-1.5 border-l border-gray-50 pl-6">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviews.filter(r => r.rating === star).length
                            const percentage = (count / reviews.length) * 100
                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="text-[9px] font-bold text-gray-400 w-2">{star}</span>
                                    <div className="flex-1 h-1 bg-gray-50 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-yellow-400 rounded-full" 
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-300 w-4">{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Individual Reviews - Compact */}
            <div className="space-y-3">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-200 transition-all group">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {review.user.avatar ? (
                                    <img src={review.user.avatar} alt={review.user.name || ''} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="text-gray-300" size={18} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-bold text-gray-900 text-xs truncate">
                                        {review.user.name || "Anonymous"}
                                    </p>
                                    <span className="text-[9px] font-bold text-gray-300 uppercase">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <StarRating rating={review.rating} size={10} />
                                {review.comment && (
                                    <p className="text-gray-500 text-xs mt-2 leading-relaxed font-medium">
                                        {review.comment}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
