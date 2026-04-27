"use client"

import { useEffect, useState } from "react"

export default function ReadingProgressBar() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windisplay = window.innerHeight
            const winScroll = window.scrollY
            const docHeight = document.body.offsetHeight
            const totalDocScrollLength = docHeight - windisplay
            const scrollPostion = totalDocScrollLength > 0 
                ? Math.floor((winScroll / totalDocScrollLength) * 100) 
                : 0
            setScrollProgress(scrollPostion)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <div 
                className="h-full bg-orange-600 transition-all duration-300 ease-out" 
                style={{ width: `${scrollProgress}%` }}
            ></div>
        </div>
    )
}
