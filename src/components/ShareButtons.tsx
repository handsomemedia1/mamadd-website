"use client";

import { useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
    compact?: boolean;
}

export default function ShareButtons({ url, title, description, compact = false }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description || "");

    const shareLinks = [
        {
            name: "WhatsApp",
            icon: "💬",
            color: "#25D366",
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        },
        {
            name: "Facebook",
            icon: "📘",
            color: "#1877F2",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: "Twitter",
            icon: "🐦",
            color: "#1DA1F2",
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        },
        {
            name: "LinkedIn",
            icon: "💼",
            color: "#0A66C2",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: "Email",
            icon: "✉️",
            color: "#EA4335",
            href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
        },
    ];

    async function handleCopyLink() {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = url;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    function handleLike() {
        setLiked(!liked);
        setLikeCount((c) => (liked ? c - 1 : c + 1));
    }

    async function handleNativeShare() {
        if (navigator.share) {
            try {
                await navigator.share({ title, text: description, url });
            } catch {
                // User cancelled
            }
        }
    }

    if (compact) {
        return (
            <div className="flex items-center gap-2 flex-wrap">
                {/* Like button */}
                <button
                    onClick={handleLike}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                    style={{
                        background: liked ? "#fee2e2" : "var(--color-cream)",
                        color: liked ? "#dc2626" : "var(--color-text-muted)",
                        boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                    }}
                >
                    {liked ? "❤️" : "🤍"} {likeCount > 0 ? likeCount : "Like"}
                </button>

                {/* Quick share icons */}
                {shareLinks.slice(0, 3).map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Share on ${link.name}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm transition-all hover:scale-110"
                        style={{
                            background: "var(--color-cream)",
                            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                        }}
                    >
                        {link.icon}
                    </a>
                ))}

                {/* Copy link */}
                <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm transition-all hover:scale-110"
                    style={{
                        background: copied ? "#dcfce7" : "var(--color-cream)",
                        boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                    }}
                    title="Copy link"
                >
                    {copied ? "✅" : "🔗"}
                </button>

                {/* Native share (mobile) */}
                {typeof navigator !== "undefined" && "share" in navigator && (
                    <button
                        onClick={handleNativeShare}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm transition-all hover:scale-110"
                        style={{
                            background: "var(--color-cream)",
                            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                        }}
                        title="Share"
                    >
                        📤
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="clay-card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Share this
                </h3>
                {/* Like button */}
                <button
                    onClick={handleLike}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={{
                        background: liked ? "#fee2e2" : "var(--color-cream)",
                        color: liked ? "#dc2626" : "var(--color-text-muted)",
                        boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                    }}
                >
                    {liked ? "❤️" : "🤍"} {likeCount > 0 ? likeCount : "Like"}
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                        style={{
                            background: "var(--color-cream)",
                            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                        }}
                    >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                    </a>
                ))}

                {/* Copy link button */}
                <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                    style={{
                        background: copied ? "#dcfce7" : "var(--color-cream)",
                        boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                    }}
                >
                    {copied ? "✅ Copied!" : "🔗 Copy Link"}
                </button>
            </div>
        </div>
    );
}
