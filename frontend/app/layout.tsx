import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { CartProvider } from "@/lib/contexts/CartContext";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ReadyMart - Your Premium Shopping Destination",
  description: "Shop premium products with fast delivery and secure payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${ubuntu.variable} ${ubuntuMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--foreground)',
                color: 'var(--background)',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: 'var(--background)',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'var(--background)',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}


