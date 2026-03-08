import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Calendar, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Stories, recipes, and updates from Mama DD's African Kitchen in Enschede. Learn about African cuisine, cooking tips, and our journey.",
};

export const dynamic = "force-dynamic";

function estimateReadTime(content: string): number {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

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
                    📖 Our Blog
                </div>
                <h1
                    className="text-4xl md:text-5xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Stories & Recipes
                </h1>
                <p
                    className="max-w-md mx-auto"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    From our kitchen to your table — discover the flavours and stories
                    behind every dish
                </p>
            </div>

            {/* Posts */}
            {posts.length === 0 ? (
                <div className="clay-card-warm p-12 text-center animate-fade-in-up stagger-1">
                    <div className="text-5xl mb-4">📝</div>
                    <h2
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Coming Soon
                    </h2>
                    <p
                        className="max-w-sm mx-auto mb-6"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        We&apos;re cooking up some great stories and recipes. Check back
                        soon!
                    </p>
                    <Link
                        href="/menu"
                        className="clay-button clay-button-primary inline-flex items-center gap-2 text-sm"
                    >
                        Browse our menu
                        <ArrowRight size={16} />
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {posts.map((post, idx) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className={`clay-card p-6 flex flex-col md:flex-row gap-5 group animate-fade-in-up stagger-${Math.min(
                                idx + 1,
                                6
                            )}`}
                        >
                            {/* Cover Image */}
                            {post.coverImage ? (
                                <div
                                    className="w-full md:w-48 h-40 md:h-auto rounded-2xl flex-shrink-0 overflow-hidden"
                                    style={{
                                        boxShadow:
                                            "inset 2px 2px 4px rgba(0,0,0,0.08), 3px 3px 6px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="w-full md:w-48 h-40 md:h-auto rounded-2xl flex-shrink-0 flex items-center justify-center text-5xl"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, var(--color-accent-light), var(--color-cream))",
                                        boxShadow:
                                            "inset 2px 2px 4px rgba(0,0,0,0.06), 3px 3px 6px rgba(0,0,0,0.06)",
                                    }}
                                >
                                    📖
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h2
                                    className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {post.title}
                                </h2>
                                {post.excerpt && (
                                    <p
                                        className="text-sm leading-relaxed line-clamp-3 mb-3"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {post.excerpt}
                                    </p>
                                )}
                                <div
                                    className="flex items-center gap-4 text-xs"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {estimateReadTime(post.content)} min read
                                    </span>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex items-center">
                                <ArrowRight
                                    size={20}
                                    className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                    style={{ color: "var(--color-primary)" }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
