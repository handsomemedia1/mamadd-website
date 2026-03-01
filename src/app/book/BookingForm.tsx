"use client";

import { useState, useTransition } from "react";
import { createBooking } from "./actions";

interface Slot {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    maxBookings: number;
    note: string | null;
    _count: { bookings: number };
}

interface BookingResult {
    success?: boolean;
    error?: string;
    name?: string;
    slotDate?: Date;
    startTime?: string;
    endTime?: string;
    partySize?: number;
}

export function BookingForm({ slots }: { slots: Slot[] }) {
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [result, setResult] = useState<BookingResult | null>(null);
    const [isPending, startTransition] = useTransition();

    const groupedSlots: Record<string, Slot[]> = {};
    for (const slot of slots) {
        const dateKey = new Date(slot.date).toLocaleDateString("nl-NL", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
        });
        if (!groupedSlots[dateKey]) groupedSlots[dateKey] = [];
        groupedSlots[dateKey].push(slot);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await createBooking(formData);
            setResult(res);
        });
    }

    if (result?.success) {
        const d = result.slotDate ? new Date(result.slotDate) : null;
        return (
            <div className="clay-card p-10 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary-dark)" }}>
                    Booking Received!
                </h2>
                <p className="mb-1" style={{ color: "var(--color-text-muted)" }}>Thank you, <strong>{result.name}</strong>!</p>
                {d && (
                    <p className="mb-6 font-semibold">
                        {d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}{" "}
                        — {result.startTime} to {result.endTime}
                        {result.partySize && result.partySize > 1 && ` · ${result.partySize} people`}
                    </p>
                )}
                <div className="clay-card p-4 mb-6" style={{ background: "var(--color-accent-light)" }}>
                    <p className="text-sm">Mama DD will confirm your booking via WhatsApp or phone. You can also always order directly on WhatsApp!</p>
                </div>
                <div className="flex gap-3 justify-center">
                    <a href="/menu" className="clay-button clay-button-primary px-6 py-3">Browse Menu 🍛</a>
                    <button onClick={() => setResult(null)} className="clay-button clay-button-outline px-6 py-3">Book Another</button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {result?.error && (
                <div className="clay-card p-4 text-sm" style={{ background: "#fee2e2", color: "#dc2626" }}>
                    ⚠️ {result.error}
                </div>
            )}

            {/* Slot selection */}
            {slots.length === 0 ? (
                <div className="clay-card p-8 text-center">
                    <div className="text-5xl mb-3">📅</div>
                    <p className="font-bold mb-1">No slots open right now</p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Check back soon — or order directly on WhatsApp anytime!
                    </p>
                </div>
            ) : (
                <div>
                    <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                        1. Pick a time slot
                    </h3>
                    {Object.entries(groupedSlots).map(([date, daySlots]) => (
                        <div key={date} className="mb-5">
                            <p className="font-semibold text-sm mb-2 capitalize" style={{ color: "var(--color-text-muted)" }}>{date}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {daySlots.map((slot) => {
                                    const available = slot.maxBookings - (slot._count?.bookings ?? 0);
                                    const full = available <= 0;
                                    return (
                                        <button
                                            key={slot.id}
                                            type="button"
                                            disabled={full}
                                            onClick={() => setSelectedSlot(slot.id)}
                                            className="clay-card p-4 text-center text-sm transition-all"
                                            style={{
                                                outline: selectedSlot === slot.id ? "3px solid var(--color-primary)" : "none",
                                                opacity: full ? 0.5 : 1,
                                                cursor: full ? "not-allowed" : "pointer",
                                                background: selectedSlot === slot.id ? "var(--color-accent-light)" : "white",
                                            }}
                                        >
                                            <p className="font-bold" style={{ color: "var(--color-primary)" }}>
                                                {slot.startTime} – {slot.endTime}
                                            </p>
                                            <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
                                                {full ? "Full" : `${available} spot${available !== 1 ? "s" : ""} left`}
                                            </p>
                                            {slot.note && <p className="text-xs mt-1" style={{ color: "var(--color-secondary)" }}>{slot.note}</p>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    <input type="hidden" name="slotId" value={selectedSlot} />
                </div>
            )}

            {slots.length > 0 && (
                <>
                    {/* Contact details */}
                    <div>
                        <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading)" }}>2. Your details</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                                <input name="name" required placeholder="Your name" className="w-full px-4 py-3 rounded-xl"
                                    style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Phone *</label>
                                <input name="phone" type="tel" required placeholder="+31 6 ..." className="w-full px-4 py-3 rounded-xl"
                                    style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email *</label>
                                <input name="email" type="email" required placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl"
                                    style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Party size</label>
                                <select name="partySize" className="w-full px-4 py-3 rounded-xl"
                                    style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-semibold mb-2">Special requests <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>(optional)</span></label>
                            <textarea name="notes" rows={3} placeholder="Allergies, dietary needs, special occasions..."
                                className="w-full px-4 py-3 rounded-xl"
                                style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem", resize: "vertical" }} />
                        </div>
                    </div>

                    <button type="submit" disabled={isPending || !selectedSlot}
                        className="clay-button clay-button-primary w-full py-4 text-base font-bold">
                        {isPending ? "Booking..." : "Confirm Booking 📅"}
                    </button>
                </>
            )}
        </form>
    );
}
