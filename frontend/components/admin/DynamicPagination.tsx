"use client"

import React from "react"
import { ChevronLeft, ChevronRight, Layers } from "lucide-react"

interface DynamicPaginationProps {
    page: number
    totalPages: number
    limit: number
    totalItems?: number
    onPageChange: (page: number) => void
    onLimitChange: (limit: number) => void
}

export default function DynamicPagination({
    page,
    totalPages,
    limit,
    totalItems,
    onPageChange,
    onLimitChange
}: DynamicPaginationProps) {
    const limits = [10, 20, 50, 100]

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 gap-4">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center text-orange-600">
                        <Layers size={14} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Rows per page</span>
                    <select
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-3 py-1.5 text-xs font-black text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    >
                        {limits.map((l) => (
                            <option key={l} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                </div>
                {totalItems !== undefined && (
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Showing <span className="text-gray-900 dark:text-white">{(page - 1) * limit + 1}</span> to <span className="text-gray-900 dark:text-white">{Math.min(page * limit, totalItems)}</span> of <span className="text-gray-900 dark:text-white">{totalItems}</span> results
                    </p>
                )}
            </div>

            <div className="flex items-center gap-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Page <span className="text-gray-900 dark:text-white">{page}</span> of <span className="text-gray-900 dark:text-white">{totalPages}</span>
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:hover:border-gray-100"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:hover:border-gray-100"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}
