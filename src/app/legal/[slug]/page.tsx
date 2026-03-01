import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Shield } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = await prisma.legalPage.findUnique({ where: { slug } });
    if (!page || !page.isActive) return {};

    return {
        title: page.title,
        description: `${page.title} — Legal information for Mama DD's African Kitchen.`,
    };
}

export default async function LegalDetailPage({ params }: Props) {
    const { slug } = await params;
    const page = await prisma.legalPage.findUnique({ where: { slug } });

    if (!page || !page.isActive) notFound();

    // Simple markdown renderer
    const renderContent = (content: string) => {
        return content.split("\n\n").map((block, i) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("### "))
                return (
                    <h3 key={i} className="text-xl font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                        {trimmed.slice(4)}
                    </h3>
                );
            if (trimmed.startsWith("## "))
                return (
                    <h2 key={i} className="text-2xl font-bold mt-10 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                        {trimmed.slice(3)}
                    </h2>
                );
            if (trimmed.startsWith("# "))
                return (
                    <h2 key={i} className="text-2xl font-bold mt-10 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                        {trimmed.slice(2)}
                    </h2>
                );

            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s*/, ""));
                return (
                    <ul key={i} className="list-disc list-inside space-y-1 my-4" style={{ color: "var(--color-text-light)" }}>
                        {items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                );
            }

            return (
                <p key={i} className="leading-relaxed my-4" style={{ color: "var(--color-text-light)" }}>
                    {trimmed}
                </p>
            );
        });
    };

    const typeLabels: Record<string, string> = {
        terms: "Terms & Conditions",
        privacy: "Privacy Policy",
        "legal-notice": "Legal Notice",
        certificate: "Business Certificate",
        other: "Information",
    };

    return (
        <article className="max-w-3xl mx-auto px-6 py-12">
            {/* Back link */}
            <Link
                href="/legal"
                className="inline-flex items-center gap-2 text-sm mb-8 hover:gap-3 transition-all"
                style={{ color: "var(--color-primary)" }}
            >
                <ArrowLeft size={16} />
                All Legal Documents
            </Link>

            {/* Header */}
            <header className="mb-8">
                <div
                    className="clay-badge inline-flex items-center gap-2 mb-4 px-3 py-1.5"
                    style={{ background: "var(--color-cream)", color: "var(--color-secondary)" }}
                >
                    <Shield size={12} /> {typeLabels[page.type] || "Information"}
                </div>
                <h1
                    className="text-3xl md:text-4xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {page.title}
                </h1>
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                    <Calendar size={14} />
                    Last updated:{" "}
                    {new Date(page.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </div>
            </header>

            {/* Divider */}
            <div className="h-px w-16 mb-8" style={{ background: "var(--color-primary)" }} />

            {/* Content */}
            <div className="prose-mama">{renderContent(page.content)}</div>

            {/* Footer */}
            <div className="clay-card-warm p-6 mt-12 text-center" style={{ background: "var(--color-surface-warm)" }}>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    Questions about this document? Contact us at{" "}
                    <a href="mailto:info@mamadd.com" className="underline" style={{ color: "var(--color-primary)" }}>
                        info@mamadd.com
                    </a>
                </p>
            </div>
        </article>
    );
}
