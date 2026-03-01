import { prisma } from "@/lib/db";
import { BookingForm } from "./BookingForm";
import Link from "next/link";

async function getOpenSlots() {
    try {
        const slots = await prisma.availabilitySlot.findMany({
            where: {
                isOpen: true,
                date: { gte: new Date() },
            },
            include: {
                _count: { select: { bookings: { where: { status: { not: "cancelled" } } } } },
            },
            orderBy: [{ date: "asc" }, { startTime: "asc" }],
        });
        return slots.filter((s) => s._count.bookings < s.maxBookings);
    } catch {
        return [];
    }
}

export default async function BookPage() {
    const slots = await getOpenSlots();

    return (
        <div className="min-h-screen py-20 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div
                        className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                        style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}
                    >
                        📅 Book a Table
                    </div>
                    <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                        Reserve Your <span style={{ color: "var(--color-primary)" }}>Spot</span>
                    </h1>
                    <p style={{ color: "var(--color-text-muted)" }}>
                        Pick a time when Mama DD is cooking. Or just order on WhatsApp anytime!
                    </p>
                </div>

                {/* WhatsApp CTA always available */}
                <div
                    className="clay-card p-5 mb-8 flex items-center gap-4"
                    style={{ background: "var(--color-accent-light)" }}
                >
                    <span className="text-4xl">💬</span>
                    <div className="flex-1">
                        <p className="font-bold">Don't want to book? That's fine!</p>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                            You can always order directly via WhatsApp — no reservation needed.
                        </p>
                    </div>
                    <Link
                        href={`https://wa.me/31612988455?text=${encodeURIComponent("Hi Mama DD! I'd like to place an order 🍛")}`}
                        target="_blank"
                        className="clay-button clay-button-primary px-4 py-2 text-sm font-bold whitespace-nowrap"
                    >
                        Order Now
                    </Link>
                </div>

                {/* Booking form */}
                <div className="clay-card p-8">
                    <BookingForm slots={slots as Parameters<typeof BookingForm>[0]["slots"]} />
                </div>
            </div>
        </div>
    );
}
