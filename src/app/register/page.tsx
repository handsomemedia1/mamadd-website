"use client";

import { useState, useTransition } from "react";
import { registerCustomer } from "./actions";

interface RegisterResult {
    success?: boolean;
    error?: string;
    referralCode?: string;
    points?: number;
    name?: string;
}

export default function RegisterPage() {
    const [result, setResult] = useState<RegisterResult | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await registerCustomer(formData);
            setResult(res);
        });
    }

    if (result?.success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 py-20">
                <div className="max-w-md w-full">
                    <div className="clay-card p-10 text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h1
                            className="text-2xl font-bold mb-2"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary-dark)" }}
                        >
                            Welcome, {result.name}!
                        </h1>
                        <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>
                            You're now a Mama DD's loyalty member.
                        </p>

                        {/* Referral Code */}
                        <div
                            className="clay-card p-5 mb-6"
                            style={{ background: "var(--color-accent-light)" }}
                        >
                            <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-secondary)" }}>
                                Your Referral Code
                            </p>
                            <p
                                className="text-3xl font-bold tracking-widest"
                                style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}
                            >
                                {result.referralCode}
                            </p>
                            <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                                Share it — earn 50 points when your friend orders €20+!
                            </p>
                        </div>

                        {/* Starting points */}
                        <div className="clay-card p-4 mb-6">
                            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Your current points</p>
                            <p className="text-4xl font-bold" style={{ color: "var(--color-primary)" }}>
                                {result.points ?? 0} pts
                            </p>
                            {(result.points ?? 0) > 0 && (
                                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                                    🎁 Referral signup bonus applied!
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <a href="/menu" className="clay-button clay-button-primary block text-center w-full py-3">
                                Browse the Menu 🍛
                            </a>
                            <a href="/book" className="clay-button clay-button-outline block text-center w-full py-3">
                                Book a Table 📅
                            </a>
                            <a href="/loyalty" className="block text-sm text-center mt-2" style={{ color: "var(--color-primary)" }}>
                                Learn how points work →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-6">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div
                        className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                        style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}
                    >
                        ⭐ Loyalty Programme
                    </div>
                    <h1
                        className="text-4xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Join the <span style={{ color: "var(--color-primary)" }}>Mama DD's</span> Family
                    </h1>
                    <p style={{ color: "var(--color-text-muted)" }}>
                        Earn points, get discounts, and be the first to know about specials!
                    </p>
                </div>

                {/* Benefits preview */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { emoji: "💶", label: "1 pt/€1", sub: "on every order" },
                        { emoji: "🎁", label: "100 pts", sub: "for using a referral" },
                        { emoji: "⭐", label: "50 pts", sub: "friend orders €20+" },
                    ].map((b) => (
                        <div key={b.label} className="clay-card p-4 text-center">
                            <div className="text-2xl mb-1">{b.emoji}</div>
                            <div className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>{b.label}</div>
                            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{b.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="clay-card p-8 space-y-5">
                    {result?.error && (
                        <div
                            className="clay-card p-4 text-sm"
                            style={{ background: "#fee2e2", color: "#dc2626" }}
                        >
                            ⚠️ {result.error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold mb-2">Full Name *</label>
                        <input
                            name="name"
                            required
                            placeholder="e.g. Amara Johnson"
                            className="clay-input w-full px-4 py-3 rounded-xl"
                            style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Email Address *</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="clay-input w-full px-4 py-3 rounded-xl"
                            style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            placeholder="+31 6 ..."
                            className="clay-input w-full px-4 py-3 rounded-xl"
                            style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            WhatsApp Number <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                            name="whatsappNumber"
                            type="tel"
                            placeholder="+31 6 ..."
                            className="clay-input w-full px-4 py-3 rounded-xl"
                            style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem" }}
                        />
                        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                            We&apos;ll send you order updates and promotions via WhatsApp!
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Referral Code <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                            name="referralCode"
                            placeholder="e.g. MAMA-AB12"
                            className="clay-input w-full px-4 py-3 rounded-xl uppercase"
                            style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white", fontSize: "1rem", letterSpacing: "0.05em" }}
                        />
                        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                            Get 100 bonus points when you use a friend&apos;s code!
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <input
                            name="isSubscribed"
                            type="checkbox"
                            defaultChecked
                            className="mt-1 w-4 h-4 accent-orange-500"
                            id="subscribe"
                        />
                        <label htmlFor="subscribe" className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                            Notify me when food is ready, about discounts, and specials via WhatsApp/phone
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="clay-button clay-button-primary w-full py-4 text-base font-bold"
                    >
                        {isPending ? "Registering..." : "Join & Get My Referral Code 🎉"}
                    </button>

                    <p className="text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
                        Already registered?{" "}
                        <a href="/loyalty" style={{ color: "var(--color-primary)" }}>
                            Check your points →
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
