import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post || !post.published) return {};

    const postUrl = `https://mamadd.com/blog/${slug}`;

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || undefined,
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || undefined,
            images: post.coverImage ? [post.coverImage] : undefined,
            type: "article",
            publishedTime: post.createdAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            url: postUrl,
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



    const postUrl = `https://mamadd.com/blog/${slug}`;

    // Article structured data
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl
        },
        headline: post.title,
        url: postUrl,
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
                <div className="prose-mama">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-10 mb-4" style={{ fontFamily: "var(--font-heading)" }} {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }} {...props} />,
                            h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-6 mb-2" style={{ fontFamily: "var(--font-heading)" }} {...props} />,
                            p: ({ node, ...props }) => <p className="leading-relaxed my-4" style={{ color: "var(--color-text-light)" }} {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 my-4" style={{ color: "var(--color-text-light)" }} {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 my-4" style={{ color: "var(--color-text-light)" }} {...props} />,
                            li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                            a: ({ node, ...props }) => <a className="hover:underline" style={{ color: "var(--color-primary-light)" }} {...props} />,
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

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
