"use client";

import { useState, useEffect } from "react";
import { X, Mail, Bell, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";

type PopupState = "form" | "submitting" | "success" | "already";

export default function NewsletterPopup() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [state, setState] = useState<PopupState>("form");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        // Don't show if user already dismissed or subscribed
        const dismissed = localStorage.getItem("newsletter_dismissed");
        const subscribed = localStorage.getItem("newsletter_subscribed");
        if (dismissed || subscribed) return;

        // Show after 15 seconds
        const timer = setTimeout(() => setShow(true), 15000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShow(false);
        localStorage.setItem("newsletter_dismissed", Date.now().toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setState("submitting");
        try {
            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });
            const data = await res.json();

            if (data.message === "already_subscribed") {
                setState("already");
            } else {
                setState("success");
                localStorage.setItem("newsletter_subscribed", "true");
            }
        } catch {
            setState("form");
        }
    };

    if (!show) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm animate-fade-in"
                onClick={handleClose}
            />

            {/* Popup */}
            <div
                className="fixed z-[9999] inset-0 flex items-center justify-center p-4 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="clay-card w-full max-w-md overflow-hidden relative"
                    style={{ background: "var(--color-surface)" }}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
                        aria-label="Close"
                    >
                        <X size={18} style={{ color: "var(--color-text-muted)" }} />
                    </button>

                    {/* Top accent strip */}
                    <div
                        className="h-1.5 w-full"
                        style={{
                            background: "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary))",
                        }}
                    />

                    <div className="p-8">
                        {state === "success" || state === "already" ? (
                            /* Success / Already subscribed state */
                            <div className="text-center py-4">
                                <div
                                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                                    style={{ background: state === "success" ? "#dcfce7" : "var(--color-accent-light)" }}
                                >
                                    <CheckCircle
                                        size={32}
                                        style={{ color: state === "success" ? "#16a34a" : "var(--color-accent)" }}
                                    />
                                </div>
                                <h3
                                    className="text-xl font-bold mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {state === "success" ? t("newsletter.successTitle") : t("newsletter.alreadyTitle")}
                                </h3>
                                <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                                    {state === "success" ? t("newsletter.successDesc") : t("newsletter.alreadyDesc")}
                                </p>
                                <button onClick={handleClose} className="clay-button clay-button-primary text-sm px-6 py-2">
                                    {t("newsletter.gotIt")}
                                </button>
                            </div>
                        ) : (
                            /* Subscription form */
                            <>
                                <div className="text-center mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                        style={{ background: "var(--color-accent-light)" }}
                                    >
                                        <Bell size={28} style={{ color: "var(--color-accent)" }} />
                                    </div>
                                    <h3
                                        className="text-xl font-bold mb-2"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {t("newsletter.title")}
                                    </h3>
                                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                        {t("newsletter.desc")}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder={t("newsletter.namePlaceholder")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="clay-input w-full"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail
                                            size={16}
                                            className="absolute left-4 top-1/2 -translate-y-1/2"
                                            style={{ color: "var(--color-text-muted)" }}
                                        />
                                        <input
                                            type="email"
                                            required
                                            placeholder={t("newsletter.emailPlaceholder")}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="clay-input w-full pl-11"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={state === "submitting"}
                                        className="clay-button clay-button-primary w-full text-sm py-3 flex items-center justify-center gap-2"
                                    >
                                        {state === "submitting" ? (
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                            />
                                        ) : (
                                            <>
                                                <Bell size={16} />
                                                {t("newsletter.subscribe")}
                                            </>
                                        )}
                                    </button>
                                </form>

                                <p className="text-[11px] text-center mt-4" style={{ color: "var(--color-text-muted)" }}>
                                    {t("newsletter.privacy")}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
