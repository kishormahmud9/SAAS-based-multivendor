import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import CustomerChatbot from "@/components/public/CustomerChatbot";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <BottomNav />
            <Footer />
            
            {/* Customer Support AI */}
            <CustomerChatbot />
        </div>
    );
}
