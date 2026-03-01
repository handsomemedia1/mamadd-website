import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Shield, ScrollText, FileText, CreditCard, Award } from "lucide-react";

export const metadata: Metadata = {
    title: "Legal & Information",
    description:
        "Legal information, terms & conditions, privacy policy, business certificates, and payment methods for Mama DD's African Kitchen.",
};

export const dynamic = "force-dynamic";

const typeIcons: Record<string, string> = {
    terms: "📜",
    privacy: "🔒",
    "legal-notice": "⚖️",
    certificate: "🏛️",
    other: "📄",
};

export default async function LegalIndexPage() {
    const [legalPages, paymentMethods] = await Promise.all([
        prisma.legalPage.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        }),
        prisma.paymentMethod.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        }),
    ]);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
                <div
                    className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                    style={{
                        background: "var(--color-accent-light)",
                        color: "var(--color-secondary)",
                    }}
                >
                    <Shield size={14} /> Legal & Info
                </div>
                <h1
                    className="text-4xl md:text-5xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Legal Information
                </h1>
                <p
                    className="max-w-md mx-auto"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    Transparency matters to us. Here you&apos;ll find our policies,
                    certificates, and payment information.
                </p>
            </div>

            {/* Legal Pages */}
            {legalPages.length > 0 && (
                <section className="mb-12 animate-fade-in-up stagger-1">
                    <h2
                        className="text-xl font-bold mb-5 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <ScrollText size={20} style={{ color: "var(--color-primary)" }} />
                        Documents & Policies
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {legalPages.map((page) => (
                            <Link
                                key={page.id}
                                href={`/legal/${page.slug}`}
                                className="clay-card p-5 flex items-center gap-4 group hover:scale-[1.01] transition-transform"
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, var(--color-accent-light), var(--color-cream))",
                                        boxShadow:
                                            "inset 2px 2px 4px rgba(255,255,255,0.5), 2px 2px 6px rgba(0,0,0,0.06)",
                                    }}
                                >
                                    {typeIcons[page.type] || "📄"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition-colors"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {page.title}
                                    </h3>
                                    <p
                                        className="text-xs mt-0.5"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {page.type === "terms"
                                            ? "Our terms of service"
                                            : page.type === "privacy"
                                                ? "How we handle your data"
                                                : page.type === "legal-notice"
                                                    ? "Legal & compliance info"
                                                    : page.type === "certificate"
                                                        ? "Official registration document"
                                                        : "Additional information"}
                                    </p>
                                </div>
                                <span
                                    className="text-sm opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
                <section className="animate-fade-in-up stagger-2">
                    <h2
                        className="text-xl font-bold mb-5 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <CreditCard size={20} style={{ color: "var(--color-primary)" }} />
                        Payment Methods
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="clay-card p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{method.icon || "💳"}</span>
                                    <h3
                                        className="font-semibold"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {method.name}
                                    </h3>
                                </div>
                                {method.description && (
                                    <p
                                        className="text-sm mb-2"
                                        style={{ color: "var(--color-text-light)" }}
                                    >
                                        {method.description}
                                    </p>
                                )}
                                {method.instructions && (
                                    <div
                                        className="text-xs p-3 rounded-xl"
                                        style={{
                                            background: "var(--color-cream)",
                                            color: "var(--color-text-muted)",
                                        }}
                                    >
                                        {method.instructions}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty state */}
            {legalPages.length === 0 && paymentMethods.length === 0 && (
                <div className="clay-card-warm p-12 text-center animate-fade-in-up">
                    <Shield
                        size={40}
                        className="mx-auto mb-4 opacity-30"
                    />
                    <h2
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Information Coming Soon
                    </h2>
                    <p style={{ color: "var(--color-text-muted)" }}>
                        Our legal information and payment methods will be available soon.
                    </p>
                </div>
            )}
        </div>
    );
}
