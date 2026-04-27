"use client"

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import UserSidebar from "@/components/user/UserSidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isMenuPage = pathname === "/menu";

    const getPageTitle = (path: string) => {
        if (path === "/wishlist") return "Favorites";
        if (path === "/dashboard") return "Overview";
        if (path === "/billing") return "Billing Info";
        if (path === "/addresses") return "My Addresses";
        const lastPart = path.split("/").pop();
        if (!lastPart) return "Dashboard";
        return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace("-", " ");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 dark:bg-black pb-20 md:pb-0">
            <Navbar />
            
            <div className="flex-grow container mx-auto px-4 py-4 md:py-12">
                {/* Mobile Header with Back Arrow (Only on pages other than Menu on mobile) */}
                {!isMenuPage && (
                    <div className="flex items-center gap-4 mb-6 md:hidden">
                        <button 
                            onClick={() => router.push("/menu")}
                            className="p-2.5 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white active:scale-95 transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="text-xl font-bold font-display text-gray-950 dark:text-white">
                            {getPageTitle(pathname)}
                        </h1>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Sidebar - Hidden on mobile, shown on md+ */}
                    <div className="hidden md:block w-72 flex-shrink-0">
                        <UserSidebar />
                    </div>

                    {/* Main Content */}
                    <main className={`flex-1 ${isMenuPage ? "bg-transparent md:bg-white dark:md:bg-gray-900" : "bg-white dark:bg-gray-900"} rounded-3xl md:shadow-sm border-none md:border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[500px]`}>
                        {children}
                    </main>
                </div>
            </div>

            <BottomNav />

            <Footer />
        </div>
    );
}
