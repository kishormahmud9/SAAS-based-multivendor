"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"

interface Option {
    id: string
    name: string
}

interface SearchableSelectProps {
    options: Option[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

export default function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    className = ""
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((opt) => opt.id === value)

    const filteredOptions = options.filter((opt) =>
        opt.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={dropdownRef} className={`relative w-full ${className}`}>
            <button
                type="button"
                className={`w-full flex items-center justify-between px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                    disabled 
                        ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed" 
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm"
                }`}
                onClick={(e) => {
                    e.preventDefault();
                    if (!disabled) setIsOpen(!isOpen);
                }}
                disabled={disabled}
            >
                <span className={`block truncate ${!selectedOption && "text-gray-400 dark:text-gray-500"}`}>
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute z-[100] w-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="relative flex items-center">
                            <Search size={16} className="absolute left-3 text-gray-400" />
                            <input
                                type="text"
                                className="w-full bg-gray-50 dark:bg-gray-950 border-none rounded-lg pl-9 pr-8 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when focusing
                                autoFocus
                            />
                            {searchQuery && (
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSearchQuery("")
                                    }}
                                    className="absolute right-3 p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                                    title="Clear search"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                    <ul className="max-h-60 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                        {/* Optional unselect button for entirely optional fields */}
                        {options.length > 0 && !filteredOptions.length ? null : (
                            <li className="mb-1">
                                <button
                                    type="button"
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                                        !value
                                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold"
                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onChange("")
                                        setIsOpen(false)
                                        setSearchQuery("")
                                    }}
                                >
                                    <span className="truncate italic">{placeholder}</span>
                                    {!value && <Check size={16} className="text-gray-700 dark:text-gray-300 flex-shrink-0" />}
                                </button>
                            </li>
                        )}
                        
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li key={option.id}>
                                    <button
                                        type="button"
                                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                                            value === option.id
                                                ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 font-bold tracking-tight"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onChange(option.id)
                                            setIsOpen(false)
                                            setSearchQuery("")
                                        }}
                                    >
                                        <span className="truncate">{option.name}</span>
                                        {value === option.id && <Check size={16} className="text-orange-600 flex-shrink-0" />}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                No results found for "{searchQuery}"
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
