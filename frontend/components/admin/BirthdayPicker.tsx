"use client"

import React, { useState, useEffect } from "react"
import { Calendar } from "lucide-react"

interface BirthdayPickerProps {
    value?: string | null
    onChange: (date: string) => void
    error?: string
    label: string
}

const BirthdayPicker: React.FC<BirthdayPickerProps> = ({ value, onChange, error, label }) => {
    // Parse initial value (YYYY-MM-DD)
    const initialDate = value ? new Date(value) : null
    const [day, setDay] = useState(initialDate ? initialDate.getDate().toString() : "")
    const [month, setMonth] = useState(initialDate ? (initialDate.getMonth() + 1).toString() : "")
    const [year, setYear] = useState(initialDate ? initialDate.getFullYear().toString() : "")

    // Sync state changes to parent
    useEffect(() => {
        if (day && month && year) {
            const formattedMonth = month.padStart(2, '0')
            const formattedDay = day.padStart(2, '0')
            onChange(`${year}-${formattedMonth}-${formattedDay}`)
        } else if (!day && !month && !year) {
            onChange("")
        }
    }, [day, month, year, onChange])

    // Generate options
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
    const months = [
        { val: "1", label: "January" }, { val: "2", label: "February" }, { val: "3", label: "March" },
        { val: "4", label: "April" }, { val: "5", label: "May" }, { val: "6", label: "June" },
        { val: "7", label: "July" }, { val: "8", label: "August" }, { val: "9", label: "September" },
        { val: "10", label: "October" }, { val: "11", label: "November" }, { val: "12", label: "December" }
    ]
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString())

    const selectClass = `w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 transition-all rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium appearance-none text-gray-900 dark:text-white ${
        error ? 'border-rose-500 bg-rose-50/30' : 'border-gray-100 dark:border-gray-800'
    }`

    return (
        <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                {label}
            </label>
            
            <div className="grid grid-cols-3 gap-3">
                {/* Month */}
                <div className="relative group">
                    <select 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                        className={selectClass}
                    >
                        <option value="">Month</option>
                        {months.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                    </select>
                </div>

                {/* Day */}
                <div className="relative group">
                    <select 
                        value={day} 
                        onChange={(e) => setDay(e.target.value)}
                        className={selectClass}
                    >
                        <option value="">Day</option>
                        {days.map(d => <option key={d} value={d}>{d.padStart(2, '0')}</option>)}
                    </select>
                </div>

                {/* Year */}
                <div className="relative group">
                    <select 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        className={selectClass}
                    >
                        <option value="">Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-1.5 mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest leading-none">
                        {error}
                    </p>
                </div>
            )}
        </div>
    )
}

export default BirthdayPicker
