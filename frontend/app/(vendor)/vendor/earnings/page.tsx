"use client"
import { TrendingUp } from "lucide-react"

export default function EarningsPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Earnings History</h1>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Earnings Module</h2>
                <p className="text-gray-500 max-w-sm">Detailed breakdown of your revenue and profit over time.</p>
            </div>
        </div>
    )
}
