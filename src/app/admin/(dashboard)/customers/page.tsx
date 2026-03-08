import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { addPoints, deductPoints, addOrderPoints } from "./actions";

async function getCustomers() {
    return prisma.customer.findMany({
        include: {
            pointHistory: { orderBy: { createdAt: "desc" }, take: 5 },
            _count: { select: { bookings: true } },
        },
        orderBy: { createdAt: "desc" },
    });
}

export default async function AdminCustomersPage() {
    const session = await getSession();
    if (!session) redirect("/admin");

    const customers = await getCustomers();
    const totalCustomers = customers.length;
    const totalPoints = customers.reduce((s, c) => s + c.points, 0);
    const subscribed = customers.filter((c) => c.isSubscribed).length;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                👥 Customers
            </h1>
            <p className="mb-8" style={{ color: "var(--color-text-muted)" }}>
                Manage loyalty points and view registered customers.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Registered", value: totalCustomers, emoji: "👥" },
                    { label: "Subscribed", value: subscribed, emoji: "📱" },
                    { label: "Total Points in Circulation", value: totalPoints.toLocaleString(), emoji: "⭐" },
                ].map((s) => (
                    <div key={s.label} className="clay-card p-5 text-center">
                        <div className="text-3xl mb-1">{s.emoji}</div>
                        <div className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>{s.value}</div>
                        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Customer List */}
            {customers.length === 0 ? (
                <div className="clay-card p-12 text-center">
                    <div className="text-5xl mb-3">👥</div>
                    <p className="font-bold mb-1">No customers yet</p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Share the registration link: <strong>/register</strong>
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {customers.map((customer) => (
                        <details key={customer.id} className="clay-card overflow-hidden">
                            <summary className="p-5 flex items-center gap-4 cursor-pointer list-none">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                                    style={{ background: "var(--color-primary)" }}>
                                    {customer.name[0].toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold">{customer.name}</p>
                                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                        {customer.email} · 📞 {customer.phone}
                                    </p>
                                    <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                                        Code: <strong>{customer.referralCode}</strong>
                                        {customer.referredBy ? ` · Referred by: ${customer.referredBy}` : ""}
                                        {` · ${customer._count.bookings} booking${customer._count.bookings !== 1 ? "s" : ""}`}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                                        {customer.points}
                                    </p>
                                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>points</p>
                                </div>
                                <span>{customer.isSubscribed ? "📱" : "🔕"}</span>
                            </summary>

                            {/* Expanded section */}
                            <div className="border-t px-5 pb-5 pt-4 space-y-4"
                                style={{ borderColor: "var(--color-accent-light)" }}>

                                {/* Point history */}
                                {customer.pointHistory.length > 0 && (
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Recent point activity</p>
                                        <div className="space-y-1">
                                            {customer.pointHistory.map((tx) => (
                                                <div key={tx.id} className="flex justify-between text-sm clay-card px-3 py-2">
                                                    <span style={{ color: "var(--color-text-muted)" }}>{tx.description}</span>
                                                    <span className="font-bold" style={{ color: tx.points > 0 ? "var(--color-success)" : "var(--color-error)" }}>
                                                        {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quick actions */}
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {/* Add order points */}
                                    <form action={async (fd) => {
                                        "use server";
                                        const amount = parseFloat(fd.get("amount") as string);
                                        if (amount > 0) await addOrderPoints(customer.id, amount);
                                    }} className="clay-card p-3">
                                        <p className="text-xs font-semibold mb-2">Add Order Points</p>
                                        <input name="amount" type="number" min="0.01" step="0.01" placeholder="Order amount (€)"
                                            className="clay-input w-full mb-2" />
                                        <button type="submit" className="clay-button clay-button-primary w-full text-xs py-1">
                                            + 10pts per €1
                                        </button>
                                    </form>

                                    {/* Add manual points */}
                                    <form action={async (fd) => {
                                        "use server";
                                        const pts = parseInt(fd.get("points") as string);
                                        const desc = fd.get("desc") as string;
                                        if (pts > 0) await addPoints(customer.id, pts, desc || "Manual bonus");
                                    }} className="clay-card p-3">
                                        <p className="text-xs font-semibold mb-2">Add Bonus Points</p>
                                        <input name="points" type="number" min="1" placeholder="Points"
                                            className="clay-input w-full mb-1" />
                                        <input name="desc" placeholder="Reason" className="clay-input w-full mb-2" />
                                        <button type="submit" className="clay-button clay-button-primary w-full text-xs py-1"
                                            style={{ background: "var(--color-success)20", color: "var(--color-success)" }}>
                                            + Add Points
                                        </button>
                                    </form>

                                    {/* Redeem points */}
                                    <form action={async (fd) => {
                                        "use server";
                                        const pts = parseInt(fd.get("points") as string);
                                        const desc = fd.get("desc") as string;
                                        if (pts > 0) await deductPoints(customer.id, pts, desc || "Points redeemed");
                                    }} className="clay-card p-3">
                                        <p className="text-xs font-semibold mb-2">Redeem Points</p>
                                        <input name="points" type="number" min="1" placeholder="Points to redeem"
                                            className="clay-input w-full mb-1" />
                                        <input name="desc" placeholder="Order reference" className="clay-input w-full mb-2" />
                                        <button type="submit" className="w-full text-xs py-1 rounded-lg font-semibold"
                                            style={{ background: "var(--color-error)20", color: "var(--color-error)" }}>
                                            − Redeem
                                        </button>
                                    </form>
                                </div>

                                {/* WhatsApp button */}
                                <a
                                    href={`https://wa.me/${customer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${customer.name}! 🍛 — Mama DD's`)}`}
                                    target="_blank"
                                    className="clay-button clay-button-outline text-sm px-4 py-2 inline-flex items-center gap-2"
                                >
                                    💬 Message on WhatsApp
                                </a>
                            </div>
                        </details>
                    ))}
                </div>
            )}
        </div>
    );
}
