import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post || !post.published) return {};

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || undefined,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || undefined,
            images: post.coverImage ? [post.coverImage] : undefined,
            type: "article",
            publishedTime: post.createdAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
        },
    };
}

function estimateReadTime(content: string): number {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post || !post.published) notFound();

    // Simple markdown-ish rendering: paragraphs, headings, bold, italic, lists
    const renderContent = (content: string) => {
        return content.split("\n\n").map((block, i) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            // Heading
            if (trimmed.startsWith("### "))
                return (
                    <h3
                        key={i}
                        className="text-xl font-bold mt-8 mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {trimmed.slice(4)}
                    </h3>
                );
            if (trimmed.startsWith("## "))
                return (
                    <h2
                        key={i}
                        className="text-2xl font-bold mt-10 mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {trimmed.slice(3)}
                    </h2>
                );
            if (trimmed.startsWith("# "))
                return (
                    <h2
                        key={i}
                        className="text-2xl font-bold mt-10 mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {trimmed.slice(2)}
                    </h2>
                );

            // Unordered list
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s*/, ""));
                return (
                    <ul key={i} className="list-disc list-inside space-y-1 my-4" style={{ color: "var(--color-text-light)" }}>
                        {items.map((item, j) => (
                            <li key={j}>{item}</li>
                        ))}
                    </ul>
                );
            }

            // Paragraph
            return (
                <p
                    key={i}
                    className="leading-relaxed my-4"
                    style={{ color: "var(--color-text-light)" }}
                >
                    {trimmed}
                </p>
            );
        });
    };

    // Article structured data
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            "@type": "Organization",
            name: "Mama DD's African Kitchen",
        },
        publisher: {
            "@type": "Organization",
            name: "Mama DD's African Kitchen",
        },
        description: post.excerpt || undefined,
        image: post.coverImage || undefined,
    };

    const postUrl = `https://mamadd.com/blog/${slug}`;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <article className="max-w-3xl mx-auto px-6 py-12">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm mb-8 hover:gap-3 transition-all"
                    style={{ color: "var(--color-primary)" }}
                >
                    <ArrowLeft size={16} />
                    Back to Blog
                </Link>

                {/* Cover Image */}
                {post.coverImage && (
                    <div
                        className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8"
                        style={{
                            boxShadow:
                                "8px 8px 16px rgba(45,27,14,0.08), -4px -4px 12px rgba(255,255,255,0.9)",
                        }}
                    >
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Title & Meta */}
                <header className="mb-8">
                    <h1
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {post.title}
                    </h1>
                    <div
                        className="flex items-center gap-4 text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {estimateReadTime(post.content)} min read
                        </span>
                    </div>
                </header>

                {/* Divider */}
                <div
                    className="h-px w-16 mb-8"
                    style={{ background: "var(--color-primary)" }}
                />

                {/* Content */}
                <div className="prose-mama">{renderContent(post.content)}</div>

                {/* Share Buttons */}
                <div className="mt-8 mb-8">
                    <ShareButtons
                        url={postUrl}
                        title={post.title}
                        description={post.excerpt || "Check out this post from Mama DD's African Kitchen!"}
                    />
                </div>

                {/* Footer CTA */}
                <div
                    className="clay-card-warm p-8 text-center mt-12"
                    style={{ background: "var(--color-surface-warm)" }}
                >
                    <h3
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Hungry yet? 🍲
                    </h3>
                    <p
                        className="text-sm mb-4"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Order your favourite African dishes via WhatsApp
                    </p>
                    <Link
                        href="/menu"
                        className="clay-button clay-button-primary inline-flex items-center gap-2 text-sm"
                    >
                        View Our Menu
                    </Link>
                </div>
            </article>
        </>
    );
}
