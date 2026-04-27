"use client"

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* Main Content - cleanly taking the full screen without dashboard wrappers */}
            <main className="flex-grow">
                {children}
            </main>

            <BottomNav />
            <Footer />
        </div>
    );
}
