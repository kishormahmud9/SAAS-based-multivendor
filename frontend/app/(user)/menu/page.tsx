"use client"

import UserSidebar from "@/components/user/UserSidebar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MobileMenuPage() {
    const router = useRouter()

    // Redirect to dashboard on desktop if someone manually navigates to /menu
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                router.push("/dashboard")
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [router])

    return (
        <div className="md:hidden min-h-screen bg-gray-50/50 dark:bg-black p-4">
            <UserSidebar />
        </div>
    )
}
