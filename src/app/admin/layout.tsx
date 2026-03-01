"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, FileText, Settings, LogOut, Shield, CalendarDays, Users } from "lucide-react";
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

    // Don't wrap login page
    if (pathname === "/admin/login") return <>{children}</>;

    return (
        <div className="flex min-h-screen" style={{ background: "var(--color-background)" }}>
            {/* Sidebar */}
            <aside
                className="fixed left-0 top-0 bottom-0 w-64 p-5 flex flex-col z-40 overflow-y-auto"
                style={{ background: "var(--color-text)" }}
            >
                <div className="mb-8">
                    <Logo size="sm" className="invert brightness-200" />
                    <p className="text-xs mt-2" style={{ color: "rgba(255,248,240,0.4)" }}>
                        Admin Panel
                    </p>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
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

                <div className="mt-auto pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
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
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
