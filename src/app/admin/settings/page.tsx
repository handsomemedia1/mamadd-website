import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Settings — Admin",
    robots: "noindex",
};

export default async function AdminSettingsPage() {
    const session = await getSession();
    if (!session) redirect("/admin/login");

    let adminUser = null;
    try {
        adminUser = await prisma.adminUser.findUnique({
            where: { id: session.userId },
            select: { email: true },
        });
    } catch {
        // DB may be sleeping — page still renders gracefully
    }

    return (
        <div>
            <div className="mb-8">
                <h1
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    ⚙️ Settings
                </h1>
                <p style={{ color: "var(--color-text-muted)" }}>
                    Site configuration and admin preferences
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Restaurant Info */}
                <div className="clay-card p-6">
                    <h2
                        className="text-lg font-bold mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        🏪 Restaurant Info
                    </h2>
                    <div className="space-y-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        {[
                            { label: "Name", value: "Mama DD's African Kitchen" },
                            { label: "Address", value: "Waalstraat 134, Enschede, NL" },
                            { label: "Phone", value: "+31 6 12988455" },
                            { label: "Hours", value: "Tue–Thu, Sat: 18:00–20:00" },
                            { label: "KvK / COC", value: "Add via Legal section" },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between gap-4">
                                <span className="font-medium flex-shrink-0">{label}</span>
                                <span className="text-right">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin Account */}
                <div className="clay-card p-6">
                    <h2
                        className="text-lg font-bold mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        👤 Admin Account
                    </h2>
                    <div className="space-y-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        <div className="flex justify-between">
                            <span className="font-medium">Email</span>
                            <span>{adminUser?.email ?? "—"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Role</span>
                            <span
                                className="clay-badge px-2 py-0.5 text-xs"
                                style={{ background: "var(--color-accent-light)" }}
                            >
                                Admin
                            </span>
                        </div>
                    </div>
                </div>

                {/* SEO Status */}
                <div className="clay-card p-6">
                    <h2
                        className="text-lg font-bold mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        🔍 SEO Status
                    </h2>
                    <div className="space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        {[
                            { label: "Sitemap at /sitemap.xml", ok: true },
                            { label: "robots.txt at /robots.txt", ok: true },
                            { label: "JSON-LD schema on homepage", ok: true },
                            { label: "OpenGraph meta on all pages", ok: true },
                            { label: "Blog post structured data", ok: true },
                        ].map(({ label, ok }) => (
                            <div key={label} className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ok ? "bg-green-500" : "bg-red-400"}`} />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Status */}
                <div className="clay-card p-6">
                    <h2
                        className="text-lg font-bold mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        🔒 Security Status
                    </h2>
                    <div className="space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        {[
                            "Content-Security-Policy",
                            "HSTS (Strict-Transport-Security)",
                            "X-Frame-Options: DENY",
                            "X-Content-Type-Options",
                            "Permissions-Policy",
                            "Admin routes protected by session auth",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Deployment Info */}
            <div className="mt-6 clay-card p-6">
                <h2
                    className="text-lg font-bold mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    🚀 Deployment
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {[
                        { label: "Platform", value: "Vercel (Next.js)" },
                        { label: "Database", value: "Neon PostgreSQL" },
                        { label: "Region", value: "us-east-1 (iad1)" },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <p className="font-medium mb-1">{label}</p>
                            <p style={{ color: "var(--color-text-muted)" }}>{value}</p>
                        </div>
                    ))}
                    <div>
                        <p className="font-medium mb-1">Live URL</p>
                        <a
                            href="https://mamadd.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            style={{ color: "var(--color-primary)" }}
                        >
                            mamadd.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
