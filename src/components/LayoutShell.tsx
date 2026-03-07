"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer, { FloatingCartButton } from "@/components/CartDrawer";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24">{children}</main>
            <Footer />
            <CartDrawer />
            <FloatingCartButton />
            <NewsletterPopup />
        </>
    );
}
