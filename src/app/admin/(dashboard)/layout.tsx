"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    UtensilsCrossed,
    FileText,
    Settings,
    LogOut,
    Shield,
    CalendarDays,
    Users,
    Menu,
    X,
} from "lucide-react";
import Logo from "@/components/Logo";

const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/legal", label: "Legal & Payments", icon: Shield },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar on route change for mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Prevent scrolling when sidebar is open on mobile
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (isSidebarOpen && window.innerWidth < 768) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [isSidebarOpen]);

    return (
        <div className="flex min-h-screen" style={{ background: "var(--color-background)" }}>
            
            {/* Mobile Sidebar Overlay Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 bottom-0 w-64 p-5 flex flex-col z-50 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ background: "#111111" }}
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Logo size="sm" />
                        <p className="text-xs mt-2" style={{ color: "rgba(255,248,240,0.4)" }}>
                            Admin Panel
                        </p>
                    </div>
                    {/* Close button for mobile inside sidebar */}
                    <button
                        className="md:hidden text-white/50 hover:text-white"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    isActive
                                        ? "text-white"
                                        : "hover:translate-x-1"
                                }`}
                                style={{
                                    background: isActive ? "var(--color-primary)" : "transparent",
                                    color: isActive ? "white" : "rgba(255,248,240,0.6)",
                                }}
                            >
                                <Icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-4 border-t flex flex-col gap-2" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                     <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all hover:translate-x-1"
                        style={{ color: "rgba(255,248,240,0.5)" }}
                    >
                        <LogOut size={18} />
                        Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 w-full md:ml-64 flex flex-col min-h-screen">
                {/* Mobile Top Nav Bar for toggling sidebar */}
                <div className="md:hidden flex items-center p-4 border-b shrink-0" style={{ background: "#111111", borderColor: "var(--color-border)" }}>
                     <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-white hover:opacity-80 transition-opacity mr-4"
                    >
                        <Menu size={24} />
                    </button>
                    <Logo size="sm" />
                </div>
                
                {/* Scrollable Content Area */}
                <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}
