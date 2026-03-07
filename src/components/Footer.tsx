"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, Instagram, Mail, Shield } from "lucide-react";
import Logo from "./Logo";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="relative mt-20" style={{ background: "#111111" }}>
            {/* Wave top */}
            <div className="absolute -top-12 left-0 right-0 h-12 overflow-hidden">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
                    <path
                        d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
                        fill="#111111"
                    />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Logo size="md" className="mb-4" />
                        <p className="text-sm leading-relaxed mt-4" style={{ color: "rgba(255,248,240,0.7)" }}>
                            {t("footer.brandDesc")}
                        </p>
                        <div className="flex gap-3 mt-5">
                            <a
                                href="https://instagram.com/mamadds"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                style={{ background: "rgba(255,255,255,0.1)" }}
                                aria-label="Instagram"
                            >
                                <Instagram size={18} color="#FFF8F0" />
                            </a>
                            <a
                                href="https://wa.me/31612988455"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                style={{ background: "rgba(255,255,255,0.1)" }}
                                aria-label="WhatsApp"
                            >
                                <Phone size={18} color="#FFF8F0" />
                            </a>
                            <a
                                href="mailto:ddoptimistic@gmail.com"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                style={{ background: "rgba(255,255,255,0.1)" }}
                                aria-label="Email"
                            >
                                <Mail size={18} color="#FFF8F0" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4
                            className="text-base font-semibold mb-5 tracking-wide"
                            style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)" }}
                        >
                            {t("footer.quickLinks")}
                        </h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { href: "/menu", label: t("footer.ourMenu") },
                                { href: "/blog", label: t("footer.blog") },
                                { href: "/about", label: t("footer.aboutUs") },
                                { href: "/contact", label: t("footer.contact") },
                                { href: "/loyalty", label: t("footer.loyaltyProgramme") },
                                { href: "/legal", label: t("footer.legalInfo") },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm transition-all hover:translate-x-1 hover:text-[var(--color-primary-light)]"
                                    style={{ color: "rgba(255,248,240,0.7)" }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4
                            className="text-base font-semibold mb-5 tracking-wide"
                            style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)" }}
                        >
                            {t("footer.findUs")}
                        </h4>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary-light)" }} />
                                <span className="text-sm" style={{ color: "rgba(255,248,240,0.7)" }}>
                                    Waalstraat 134, 7523 RM<br />Enschede, Netherlands
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary-light)" }} />
                                <a
                                    href="tel:+31612988455"
                                    className="text-sm hover:text-[var(--color-primary-light)] transition-colors"
                                    style={{ color: "rgba(255,248,240,0.7)" }}
                                >
                                    +31 6 12988455
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary-light)" }} />
                                <a
                                    href="mailto:ddoptimistic@gmail.com"
                                    className="text-sm hover:text-[var(--color-primary-light)] transition-colors"
                                    style={{ color: "rgba(255,248,240,0.7)" }}
                                >
                                    ddoptimistic@gmail.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary-light)" }} />
                                <div className="text-sm" style={{ color: "rgba(255,248,240,0.7)" }}>
                                    <p>{t("home.tueThu")}</p>
                                    <p>{t("home.sat")}</p>
                                    <p className="mt-1 text-xs" style={{ color: "rgba(255,248,240,0.4)" }}>
                                        {t("home.closed")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <p className="text-xs" style={{ color: "rgba(255,248,240,0.4)" }}>
                            © {new Date().getFullYear()} {t("footer.copyright")}
                        </p>
                        {/* ── Elitech Hub Badge ── */}
                        <a
                            href="https://elitechub.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="elitech-badge"
                        >
                            <Shield size={16} className="elitech-badge-icon" />
                            <div className="elitech-badge-text">
                                <span className="elitech-badge-label">BUILT & SECURED BY</span>
                                <span className="elitech-badge-name">ELITECH HUB</span>
                            </div>
                            <span className="elitech-badge-year">2026 AUDITED</span>
                        </a>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="mailto:ddoptimistic@gmail.com?subject=Order%20-%20Mama%20DD%27s"
                            className="clay-button text-xs px-5 py-2 inline-flex items-center gap-2"
                            style={{ background: "rgba(255,255,255,0.1)", color: "#F5F5F5", fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)" }}
                        >
                            {t("footer.emailOrder")}
                        </a>
                        <a
                            href="https://wa.me/31612988455?text=Hi%20Mama%20DD%27s%2C%20I%20would%20like%20to%20place%20an%20order!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="clay-button clay-button-whatsapp text-xs px-5 py-2"
                        >
                            {t("footer.waOrder")}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
