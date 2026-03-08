import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updateBookingStatus, createSlot, toggleSlot, deleteSlot } from "./actions";

async function getData() {
    const [bookings, slots] = await Promise.all([
        prisma.booking.findMany({
            include: { customer: true, slot: true },
            orderBy: { createdAt: "desc" },
        }),
        prisma.availabilitySlot.findMany({
            include: { _count: { select: { bookings: { where: { status: { not: "cancelled" } } } } } },
            orderBy: [{ date: "asc" }, { startTime: "asc" }],
        }),
    ]);
    return { bookings, slots };
}

export default async function AdminBookingsPage() {
    const session = await getSession();
    if (!session) redirect("/admin");

    let bookings: Awaited<ReturnType<typeof getData>>["bookings"] = [];
    let slots: Awaited<ReturnType<typeof getData>>["slots"] = [];
    try {
        const data = await getData();
        bookings = data.bookings;
        slots = data.slots;
    } catch {
        // DB may be waking up — the admin error.tsx boundary will catch hard fails
    }

    const statusColor: Record<string, string> = {
        pending: "var(--color-accent)20",
        confirmed: "var(--color-success)20",
        cancelled: "var(--color-error)20",
    };
    const statusText: Record<string, string> = {
        pending: "⏳ Pending",
        confirmed: "✅ Confirmed",
        cancelled: "❌ Cancelled",
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                📅 Bookings
            </h1>
            <p className="mb-8" style={{ color: "var(--color-text-muted)" }}>
                Manage reservations and set your available time slots.
            </p>

            {/* === AVAILABILITY MANAGER === */}
            <div className="clay-card p-6 mb-8">
                <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Add Availability Slot
                </h2>
                <form action={createSlot} className="grid sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Date *</label>
                        <input name="date" type="date" required className="clay-input w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Start Time *</label>
                        <input name="startTime" type="time" required defaultValue="18:00" className="clay-input w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">End Time *</label>
                        <input name="endTime" type="time" required defaultValue="20:00" className="clay-input w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Max Bookings</label>
                        <input name="maxBookings" type="number" defaultValue="10" min="1" max="100" className="clay-input w-full" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold mb-1">Note (optional)</label>
                        <input name="note" placeholder="e.g. Special menu available" className="clay-input w-full" />
                    </div>
                    <div className="sm:col-span-3 flex justify-end">
                        <button type="submit" className="clay-button clay-button-primary px-6 py-2 font-bold">
                            + Add Slot
                        </button>
                    </div>
                </form>

                {/* Slot list */}
                {slots.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>All Slots</h3>
                        <div className="space-y-2">
                            {slots.map((slot) => (
                                <div key={slot.id} className="clay-card px-4 py-3 flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">
                                            {new Date(slot.date).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" })}{" "}
                                            · {slot.startTime}–{slot.endTime}
                                        </p>
                                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                            {slot._count.bookings}/{slot.maxBookings} booked
                                            {slot.note ? ` · ${slot.note}` : ""}
                                        </p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full font-semibold"
                                        style={{ background: slot.isOpen ? "var(--color-success)30" : "var(--color-error)30", color: slot.isOpen ? "var(--color-success)" : "var(--color-error)" }}>
                                        {slot.isOpen ? "Open" : "Closed"}
                                    </span>
                                    <form action={toggleSlot.bind(null, slot.id, slot.isOpen)}>
                                        <button type="submit" className="clay-button clay-button-outline text-xs px-3 py-1">
                                            {slot.isOpen ? "Close" : "Open"}
                                        </button>
                                    </form>
                                    <form action={deleteSlot.bind(null, slot.id)}>
                                        <button type="submit" className="text-xs px-3 py-1 rounded-xl" style={{ background: "var(--color-error)20", color: "var(--color-error)" }}>
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* === BOOKINGS LIST === */}
            <div className="clay-card p-6">
                <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Reservations ({bookings.length})
                </h2>
                {bookings.length === 0 ? (
                    <p className="text-center py-10" style={{ color: "var(--color-text-muted)" }}>No bookings yet.</p>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="clay-card p-5"
                                style={{ background: statusColor[booking.status] ?? "var(--color-surface)" }}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="font-bold">{booking.customer.name}</p>
                                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                            📞 {booking.customer.phone} · ✉️ {booking.customer.email}
                                        </p>
                                        <p className="text-sm mt-1">
                                            📅{" "}
                                            {new Date(booking.slot.date).toLocaleDateString("nl-NL", {
                                                weekday: "long", day: "numeric", month: "long",
                                            })}{" "}
                                            · {booking.slot.startTime}–{booking.slot.endTime}
                                        </p>
                                        <p className="text-sm">👥 {booking.partySize} {booking.partySize === 1 ? "person" : "people"}</p>
                                        {booking.notes && <p className="text-sm mt-1 italic">💬 "{booking.notes}"</p>}
                                    </div>
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <span className="text-xs px-2 py-1 rounded-full font-semibold text-center"
                                            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                                            {statusText[booking.status]}
                                        </span>
                                        {booking.status === "pending" && (
                                            <>
                                                <form action={updateBookingStatus.bind(null, booking.id, "confirmed")}>
                                                    <button type="submit" className="clay-button clay-button-primary text-xs px-3 py-1 w-full">
                                                        Confirm
                                                    </button>
                                                </form>
                                                <form action={updateBookingStatus.bind(null, booking.id, "cancelled")}>
                                                    <button type="submit" className="text-xs px-3 py-1 rounded-xl w-full"
                                                        style={{ background: "var(--color-error)20", color: "var(--color-error)" }}>
                                                        Cancel
                                                    </button>
                                                </form>
                                            </>
                                        )}
                                        <a
                                            href={`https://wa.me/${booking.customer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${booking.customer.name}! Your booking for ${new Date(booking.slot.date).toLocaleDateString("nl-NL")} at ${booking.slot.startTime} has been confirmed. See you soon! 🍛 — Mama DD's`)}`}
                                            target="_blank"
                                            className="clay-button clay-button-outline text-xs px-3 py-1 text-center"
                                        >
                                            💬 WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
