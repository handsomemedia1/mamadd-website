"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const navLinks = [
        { href: "/", label: t("nav.home") },
        { href: "/menu", label: t("nav.menu") },
        { href: "/timetable", label: t("nav.timetable") },
        { href: "/book", label: t("nav.book") },
        { href: "/loyalty", label: t("nav.loyalty") },
        { href: "/blog", label: t("nav.blog") },
        { href: "/about", label: t("nav.about") },
        { href: "/contact", label: t("nav.contact") },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div
                className="mx-4 mt-4 px-6 py-3 clay-card"
                style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Logo size="sm" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[var(--color-surface-warm)] hover:text-[var(--color-primary)]"
                                style={{ color: "var(--color-text-light)" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA + Language + Cart */}
                    <div className="hidden md:flex items-center gap-3">
                        <LanguageSwitcher />
                        <button
                            id="nav-cart-btn"
                            className="relative p-2 rounded-full transition-all hover:bg-[var(--color-surface-warm)]"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag size={22} style={{ color: "var(--color-text)" }} />
                            {/* Cart count badge - will be dynamic */}
                        </button>
                        <Link
                            href="/menu"
                            className="clay-button clay-button-primary text-sm px-5 py-2.5"
                        >
                            {t("nav.orderNow")}
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            id="nav-cart-mobile"
                            className="p-2 rounded-full"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag size={20} style={{ color: "var(--color-text)" }} />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <X size={24} style={{ color: "var(--color-text)" }} />
                            ) : (
                                <Menu size={24} style={{ color: "var(--color-text)" }} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-[var(--color-surface-warm)] pt-4 animate-fade-in-up">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 rounded-xl text-base font-medium transition-all hover:bg-[var(--color-surface-warm)]"
                                    style={{ color: "var(--color-text-light)" }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex items-center justify-center py-2">
                                <LanguageSwitcher />
                            </div>
                            <Link
                                href="/menu"
                                onClick={() => setIsOpen(false)}
                                className="clay-button clay-button-primary text-center mt-2"
                            >
                                {t("nav.orderNow")}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
