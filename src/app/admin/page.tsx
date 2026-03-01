import { prisma } from "@/lib/db";
import { UtensilsCrossed, FileText, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const [menuItemCount, categoryCount, blogCount, publishedBlogCount] =
        await Promise.all([
            prisma.menuItem.count(),
            prisma.category.count(),
            prisma.blogPost.count(),
            prisma.blogPost.count({ where: { published: true } }),
        ]);

    const stats = [
        {
            label: "Menu Items",
            value: menuItemCount,
            icon: UtensilsCrossed,
            color: "var(--color-primary)",
        },
        {
            label: "Categories",
            value: categoryCount,
            icon: UtensilsCrossed,
            color: "var(--color-accent)",
        },
        {
            label: "Blog Posts",
            value: blogCount,
            icon: FileText,
            color: "var(--color-secondary)",
        },
        {
            label: "Published",
            value: publishedBlogCount,
            icon: Eye,
            color: "var(--color-success)",
        },
    ];

    return (
        <div>
            <h1
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                Dashboard
            </h1>
            <p className="mb-8" style={{ color: "var(--color-text-muted)" }}>
                Welcome back, Mama DD! Here&apos;s your restaurant overview.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="clay-card p-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ background: `${stat.color}15` }}
                                >
                                    <Icon size={22} style={{ color: stat.color }} />
                                </div>
                                <div>
                                    <p
                                        className="text-2xl font-bold"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick actions */}
            <div className="clay-card p-6">
                <h2
                    className="text-lg font-semibold mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                    <a href="/admin/menu" className="clay-button clay-button-primary text-sm">
                        + Add Menu Item
                    </a>
                    <a href="/admin/blog" className="clay-button clay-button-accent text-sm">
                        + Write Blog Post
                    </a>
                    <a href="/admin/settings" className="clay-button clay-button-outline text-sm">
                        Update Settings
                    </a>
                </div>
            </div>
        </div>
    );
}
