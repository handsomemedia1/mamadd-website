"use client";

import { useState, useTransition } from "react";
import {
    createBlogPost,
    updateBlogPost,
    togglePublished,
    deleteBlogPost,
} from "./actions";
import type { BlogPost } from "@/generated/prisma/client";
import ImageUploader from "@/components/ImageUploader";
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    X,
    FileText,
    Calendar,
} from "lucide-react";

// ─── Post Form Modal ──────────────────────────

function PostFormModal({
    post,
    onClose,
}: {
    post?: BlogPost;
    onClose: () => void;
}) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = post
                ? await updateBlogPost(post.id, fd)
                : await createBlogPost(fd);
            if (res.error) setError(res.error);
            else onClose();
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="clay-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-5">
                    <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {post ? "Edit Post" : "New Post"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:opacity-60">
                        <X size={20} />
                    </button>
                </div>

                {error && (
                    <div className="mb-3 p-2 rounded-xl text-sm text-red-700 bg-red-50">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Title *</label>
                        <input
                            name="title"
                            defaultValue={post?.title}
                            required
                            className="clay-input w-full"
                            placeholder="e.g. The Secret Behind Mama DD's Jollof Rice"
                        />
                    </div>

                    {post && (
                        <div>
                            <label className="text-sm font-medium mb-1 block">Slug</label>
                            <input
                                name="slug"
                                defaultValue={post?.slug}
                                className="clay-input w-full"
                                placeholder="auto-generated-from-title"
                            />
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium mb-1 block">
                            Excerpt (short summary)
                        </label>
                        <textarea
                            name="excerpt"
                            defaultValue={post?.excerpt ?? ""}
                            className="clay-input w-full"
                            rows={2}
                            placeholder="A brief preview shown on the blog listing..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Content *</label>
                        <textarea
                            name="content"
                            defaultValue={post?.content}
                            required
                            className="clay-input w-full"
                            rows={10}
                            placeholder="Write your blog post content here... (Markdown supported)"
                        />
                    </div>

                    <ImageUploader
                        name="coverImage"
                        defaultValue={post?.coverImage ?? ""}
                        label="Cover Image"
                    />

                    <div
                        className="clay-section p-4"
                        style={{ background: "var(--color-cream)" }}
                    >
                        <details>
                            <summary className="text-sm font-bold cursor-pointer">Advanced SEO & Content Cluster</summary>
                            <div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
                                <div>
                                    <label className="text-xs font-medium mb-1 block">Meta Title</label>
                                    <input name="metaTitle" defaultValue={post?.metaTitle ?? ""} className="clay-input w-full text-sm" placeholder="Custom SEO title" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium mb-1 block">Meta Description</label>
                                    <textarea name="metaDescription" defaultValue={post?.metaDescription ?? ""} className="clay-input w-full text-sm" rows={2} placeholder="Custom SEO description" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium mb-1 block">Cover Image Alt Text</label>
                                    <input name="coverImageAlt" defaultValue={(post as any)?.coverImageAlt ?? ""} className="clay-input w-full text-sm" placeholder="Describe the image for accessibility" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Primary Keyword</label>
                                        <input name="primaryKeyword" defaultValue={(post as any)?.primaryKeyword ?? ""} className="clay-input w-full text-sm" placeholder="e.g. Nigerian food Enschede" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Secondary Keywords (comma separated)</label>
                                        <input name="secondaryKeywords" defaultValue={(post as any)?.secondaryKeywords ?? ""} className="clay-input w-full text-sm" placeholder="e.g. african restaurant, jollof" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Category</label>
                                        <input name="category" defaultValue={(post as any)?.category ?? ""} className="clay-input w-full text-sm" placeholder="e.g. Nigerian Food Guide" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Tags (comma separated)</label>
                                        <input name="tags" defaultValue={(post as any)?.tags ?? ""} className="clay-input w-full text-sm" placeholder="e.g. jollof, rice, spicy" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Content Cluster</label>
                                        <input name="cluster" defaultValue={(post as any)?.cluster ?? ""} className="clay-input w-full text-sm" placeholder="e.g. Discover Nigerian Food" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Target URL</label>
                                        <input name="targetPage" defaultValue={(post as any)?.targetPage ?? ""} className="clay-input w-full text-sm" placeholder="e.g. /menu/jollof" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium mb-1 block">Related Articles (comma separated slugs)</label>
                                    <input name="relatedArticles" defaultValue={(post as any)?.relatedArticles ?? ""} className="clay-input w-full text-sm" placeholder="e.g. what-is-egusi, what-is-amala" />
                                </div>
                                <label className="flex items-center gap-2 text-xs cursor-pointer mt-2">
                                    <input type="checkbox" name="isPillar" defaultChecked={(post as any)?.isPillar} className="rounded" />
                                    This is a Pillar Article
                                </label>
                            </div>
                        </details>
                    </div>

                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            name="published"
                            defaultChecked={post?.published}
                            className="rounded"
                        />
                        <Eye size={14} style={{ color: "var(--color-success)" }} />
                        Publish immediately
                    </label>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="clay-button clay-button-primary w-full text-sm"
                    >
                        {isPending
                            ? "Saving..."
                            : post
                                ? "Update Post"
                                : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────

export default function AdminBlogClient({ posts }: { posts: BlogPost[] }) {
    const [showNew, setShowNew] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
    const [isPending, startTransition] = useTransition();

    const handleToggle = (post: BlogPost) => {
        startTransition(async () => {
            await togglePublished(post.id, !post.published);
        });
    };

    const handleDelete = (post: BlogPost) => {
        if (!confirm(`Delete "${post.title}"?`)) return;
        startTransition(async () => {
            await deleteBlogPost(post.id);
        });
    };

    const published = posts.filter((p) => p.published);
    const drafts = posts.filter((p) => !p.published);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Blog Posts
                    </h1>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        {published.length} published · {drafts.length} drafts
                    </p>
                </div>
                <button
                    onClick={() => setShowNew(true)}
                    className="clay-button clay-button-primary text-sm flex items-center gap-2"
                >
                    <Plus size={16} />
                    New Post
                </button>
            </div>

            {/* Posts */}
            {posts.length === 0 ? (
                <div className="clay-card-warm p-10 text-center">
                    <div className="text-4xl mb-3">📝</div>
                    <h3 className="font-bold mb-1">No blog posts yet</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Create your first post to share recipes, stories, and updates
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className={`clay-card p-5 flex items-center gap-4 ${!post.published ? "opacity-70" : ""
                                }`}
                        >
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: post.published
                                        ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))"
                                        : "var(--color-cream)",
                                    color: post.published ? "white" : "var(--color-text-muted)",
                                    boxShadow:
                                        "inset 1px 1px 3px rgba(255,255,255,0.2), 2px 2px 6px rgba(0,0,0,0.08)",
                                }}
                            >
                                <FileText size={20} />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                                <div
                                    className="flex items-center gap-3 text-xs mt-1"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    <span className="flex items-center gap-1">
                                        <Calendar size={11} />
                                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <span
                                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                                        style={{
                                            background: post.published
                                                ? "var(--color-success)20"
                                                : "var(--color-surface)",
                                            color: post.published
                                                ? "var(--color-success)"
                                                : "var(--color-text-muted)",
                                        }}
                                    >
                                        {post.published ? "Published" : "Draft"}
                                    </span>
                                </div>
                                {post.excerpt && (
                                    <p
                                        className="text-xs truncate mt-1"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {post.excerpt}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleToggle(post)}
                                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                                    title={post.published ? "Unpublish" : "Publish"}
                                >
                                    {post.published ? (
                                        <EyeOff size={15} />
                                    ) : (
                                        <Eye size={15} />
                                    )}
                                </button>
                                <button
                                    onClick={() => setEditingPost(post)}
                                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                                    title="Edit"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post)}
                                    className="p-2 rounded-xl hover:bg-red-500/20 text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modals */}
            {showNew && <PostFormModal onClose={() => setShowNew(false)} />}
            {editingPost && (
                <PostFormModal
                    post={editingPost}
                    onClose={() => setEditingPost(undefined)}
                />
            )}
        </div>
    );
}
