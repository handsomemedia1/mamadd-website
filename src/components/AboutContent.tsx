"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function AboutContent() {
    const { t } = useTranslation();

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in-up">
                <div
                    className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                    style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}
                >
                    {t("about.badge")}
                </div>
                <h1
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {t("about.title")}
                </h1>
                <p className="max-w-lg mx-auto text-lg" style={{ color: "var(--color-text-light)" }}>
                    {t("about.subtitle")}
                </p>
            </div>

            {/* Story Section */}
            <div className="clay-card p-8 md:p-12 mb-10 animate-fade-in-up stagger-1">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                    <div className="md:col-span-3">
                        <h2
                            className="text-2xl font-bold mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {t("about.storyTitle1")}{" "}
                            <span style={{ color: "var(--color-primary)" }}>{t("about.storyTitle2")}</span>
                        </h2>
                        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--color-text-light)" }}>
                            <p>{t("about.storyP1")}</p>
                            <p>{t("about.storyP2")}</p>
                        </div>

                        <h2
                            className="text-2xl font-bold mt-8 mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {t("about.menuTitle1")}{" "}
                            <span style={{ color: "var(--color-accent)" }}>{t("about.menuTitle2")}</span>
                        </h2>
                        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--color-text-light)" }}>
                            <p>{t("about.menuP1")}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <div className="clay-card-warm p-8 text-center">
                            <div className="text-7xl mb-4">👩🏾‍🍳</div>
                            <p
                                className="text-xl font-bold"
                                style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary-dark)" }}
                            >
                                Mama DD
                            </p>
                            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                                {t("about.founderRole")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Sets Us Apart */}
            <div className="text-center mb-8 animate-fade-in-up stagger-2">
                <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {t("about.setsApartTitle1")}{" "}
                    <span style={{ color: "var(--color-primary)" }}>{t("about.setsApartTitle2")}</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                    { emoji: "🍲", title: t("about.val1Title"), desc: t("about.val1Desc") },
                    { emoji: "🛵", title: t("about.val2Title"), desc: t("about.val2Desc") },
                    { emoji: "❤️", title: t("about.val3Title"), desc: t("about.val3Desc") },
                ].map((item, i) => (
                    <div key={item.title} className={`clay-card p-6 text-center animate-fade-in-up stagger-${i + 2}`}>
                        <div className="text-4xl mb-4">{item.emoji}</div>
                        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                            {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer Text */}
            <div className="clay-card-warm p-8 md:p-10 text-center mb-10 animate-fade-in-up stagger-5">
                <p className="text-lg leading-relaxed font-medium" style={{ color: "var(--color-text-light)", fontFamily: "var(--font-heading)" }}>
                    "{t("about.footerText")}"
                </p>
            </div>

            {/* CTA */}
            <div
                className="clay-card p-8 md:p-12 text-center"
                style={{
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                }}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {t("about.ctaTitle")}
                </h2>
                <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
                    {t("about.ctaDesc")}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/menu" className="clay-button text-sm" style={{ background: "white", color: "var(--color-primary-dark)" }}>
                        {t("about.ctaMenu")} <ChevronRight size={16} className="inline ml-1" />
                    </Link>
                    <a
                        href="https://wa.me/31612988455"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-button clay-button-whatsapp text-sm"
                    >
                        {t("about.ctaWhatsApp")}
                    </a>
                </div>
            </div>
        </div>
    );
}
