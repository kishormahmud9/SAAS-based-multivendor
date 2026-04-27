import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminChatbot from "@/components/admin/AdminChatbot"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="admin-wrapper flex h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300 relative">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminHeader />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
            
            {/* Global Chatbot */}
            <AdminChatbot />
        </div>
    )
}
