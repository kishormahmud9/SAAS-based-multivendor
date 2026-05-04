"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
    min?: number
    max: number
    value: number
    onChange: (value: number) => void
    disabled?: boolean
}

export default function QuantitySelector({
    min = 1,
    max,
    value,
    onChange,
    disabled = false,
}: QuantitySelectorProps) {
    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1)
        }
    }

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value) || min
        if (newValue >= min && newValue <= max) {
            onChange(newValue)
        }
    }

    return (
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-100">
            <button
                onClick={handleDecrement}
                disabled={disabled || value <= min}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                aria-label="Decrease quantity"
            >
                <Minus size={14} />
            </button>

            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
                className="w-10 h-7 text-center font-bold text-xs bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
                onClick={handleIncrement}
                disabled={disabled || value >= max}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                aria-label="Increase quantity"
            >
                <Plus size={14} />
            </button>
        </div>
    )
}
