import { prisma } from "@/lib/db";

async function lookupCustomer(email: string | null) {
    if (!email) return null;
    try {
        const customer = await prisma.customer.findUnique({
            where: { email },
            include: { pointHistory: { orderBy: { createdAt: "desc" }, take: 10 } },
        });
        return customer;
    } catch {
        return null;
    }
}

export default async function LoyaltyPage({
    searchParams,
}: {
    searchParams: Promise<{ email?: string }>;
}) {
    const { email } = await searchParams;
    const customer = await lookupCustomer(email || null);

    const tiers = [
        { pts: 50, reward: "€5 off your order", emoji: "🥉" },
        { pts: 100, reward: "€10 off your order", emoji: "🥈" },
        { pts: 200, reward: "€20 off your order", emoji: "🥇" },
        { pts: 500, reward: "€50 off your order", emoji: "👑" },
    ];

    return (
        <div className="min-h-screen py-20 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div
                        className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                        style={{ background: "rgba(46,125,50,0.15)", color: "#4CAF50", border: "1px solid rgba(46,125,50,0.2)" }}
                    >
                        ⭐ Loyalty Programme
                    </div>
                    <h1
                        className="text-4xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Points = <span style={{ color: "var(--color-primary)" }}>Free Food</span>
                    </h1>
                    <p style={{ color: "var(--color-text-muted)" }}>
                        Every euro you spend earns you points. Refer friends and earn even more!
                    </p>
                </div>

                {/* How to earn */}
                <div className="clay-card p-8 mb-8">
                    <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                        How to Earn Points
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { emoji: "🛍️", label: "Order food", pts: "1 point per €1 spent", color: "rgba(211,47,47,0.15)" },
                            { emoji: "🎁", label: "Sign up with a referral code", pts: "+100 pts bonus", color: "rgba(245,124,0,0.15)" },
                            { emoji: "🤝", label: "Refer a friend", pts: "+50 pts when they order €20+", color: "rgba(46,125,50,0.15)" },
                            { emoji: "🎉", label: "Special promotions", pts: "Bonus pts from time to time", color: "rgba(156,39,176,0.15)" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="clay-card p-4 flex items-center gap-4"
                                style={{ background: item.color }}
                            >
                                <span className="text-3xl">{item.emoji}</span>
                                <div>
                                    <p className="font-semibold text-sm">{item.label}</p>
                                    <p className="text-xs font-bold" style={{ color: "#FF8A80" }}>
                                        {item.pts}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Referral info box */}
                    <div
                        className="clay-card p-4 mt-4 text-sm"
                        style={{ background: "rgba(46,125,50,0.12)", color: "#A5D6A7", border: "1px solid rgba(46,125,50,0.2)" }}
                    >
                        🤝 <strong>Referral Rule:</strong> Your friend must complete an order of at least <strong>€20</strong> before you receive your referral bonus points. So share your code and encourage them to order big!
                    </div>
                </div>

                {/* Reward tiers */}
                <div className="clay-card p-8 mb-8">
                    <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                        Redeem Your Points
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {tiers.map((tier) => (
                            <div
                                key={tier.pts}
                                className="clay-card p-5 flex items-center gap-4"
                            >
                                <span className="text-4xl">{tier.emoji}</span>
                                <div>
                                    <p className="font-bold text-lg" style={{ color: "var(--color-primary)" }}>
                                        {tier.pts.toLocaleString()} pts
                                    </p>
                                    <p className="font-semibold">{tier.reward}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="clay-card p-4 mt-4 text-sm"
                        style={{ background: "rgba(245,124,0,0.12)", color: "#FFB74D", border: "1px solid rgba(245,124,0,0.2)" }}
                    >
                        💡 <strong>How to redeem:</strong> When ordering via WhatsApp or Email, mention your referral code and how many points
                        you want to use. Mama DD will apply the discount to your total!
                    </div>
                </div>

                {/* Balance lookup */}
                <div className="clay-card p-8">
                    <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                        Check Your Balance
                    </h2>
                    <form method="get" className="flex gap-3 mb-6">
                        <input
                            name="email"
                            type="email"
                            defaultValue={email || ""}
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-xl"
                            style={{ border: "2px solid rgba(255,255,255,0.15)", outline: "none", background: "rgba(255,255,255,0.08)", color: "#F5F5F5", fontSize: "1rem" }}
                        />
                        <button
                            type="submit"
                            className="clay-button clay-button-primary px-6 py-3 font-bold"
                        >
                            Look Up
                        </button>
                    </form>

                    {email && !customer && (
                        <div
                            className="clay-card p-4 text-sm"
                            style={{ background: "rgba(220,38,38,0.15)", color: "#EF9A9A", border: "1px solid rgba(220,38,38,0.2)" }}
                        >
                            No account found for <strong>{email}</strong>.{" "}
                            <a href="/register" style={{ textDecoration: "underline" }}>
                                Register here →
                            </a>
                        </div>
                    )}

                    {customer && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="font-bold text-lg">{customer.name}</p>
                                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                        Referral code:{" "}
                                        <span
                                            className="font-bold tracking-widest"
                                            style={{ color: "var(--color-primary)" }}
                                        >
                                            {customer.referralCode}
                                        </span>
                                    </p>
                                </div>
                                <div className="clay-card px-5 py-3 text-center" style={{ background: "rgba(211,47,47,0.15)", border: "1px solid rgba(211,47,47,0.2)" }}>
                                    <p className="text-3xl font-bold" style={{ color: "var(--color-primary)" }}>
                                        {customer.points}
                                    </p>
                                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>points</p>
                                </div>
                            </div>

                            {/* Progress to next tier */}
                            {(() => {
                                const next = tiers.find((t) => t.pts > customer.points);
                                if (!next) return null;
                                const pct = Math.min(100, (customer.points / next.pts) * 100);
                                return (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>{customer.points} pts</span>
                                            <span>{next.pts} pts — {next.reward}</span>
                                        </div>
                                        <div className="rounded-full h-3" style={{ background: "rgba(255,255,255,0.1)" }}>
                                            <div
                                                className="h-3 rounded-full transition-all"
                                                style={{ width: `${pct}%`, background: "var(--color-primary)" }}
                                            />
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Point history */}
                            {customer.pointHistory.length > 0 && (
                                <div>
                                    <p className="font-semibold text-sm mb-2">Recent Activity</p>
                                    <div className="space-y-2">
                                        {customer.pointHistory.map((tx) => (
                                            <div
                                                key={tx.id}
                                                className="flex justify-between items-center text-sm clay-card px-4 py-2"
                                            >
                                                <span style={{ color: "var(--color-text-muted)" }}>{tx.description}</span>
                                                <span
                                                    className="font-bold"
                                                    style={{ color: tx.points > 0 ? "var(--color-primary)" : "#dc2626" }}
                                                >
                                                    {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!email && (
                        <p className="text-sm text-center" style={{ color: "var(--color-text-muted)" }}>
                            Not registered yet?{" "}
                            <a href="/register" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                                Join for free →
                            </a>
                        </p>
                    )}
                </div>

                {/* Contact for support */}
                <div className="clay-card p-6 mt-8 text-center">
                    <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Questions about your points?
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                        Reach out to us via WhatsApp, email, or phone!
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href="https://wa.me/31612988455?text=Hi%20Mama%20DD%27s%2C%20I%20have%20a%20question%20about%20my%20loyalty%20points."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="clay-button clay-button-whatsapp text-sm px-5 py-2"
                        >
                            💬 WhatsApp
                        </a>
                        <a
                            href="mailto:ddoptimistic@gmail.com?subject=Loyalty%20Points%20Question"
                            className="clay-button clay-button-outline text-sm px-5 py-2"
                        >
                            ✉️ Email Us
                        </a>
                        <a
                            href="tel:+31612988455"
                            className="clay-button clay-button-outline text-sm px-5 py-2"
                        >
                            📞 Call Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
