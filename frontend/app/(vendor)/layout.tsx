import VendorSidebar from "@/components/vendor/VendorSidebar"
import VendorHeader from "@/components/vendor/VendorHeader"
import { SidebarProvider } from "@/lib/contexts/SidebarContext"

export default function VendorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="vendor-wrapper flex h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300 relative">
                <VendorSidebar />
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <VendorHeader />
                    <main className="flex-1 p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
