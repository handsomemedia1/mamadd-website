"use client";

import { MapPin, Phone, Clock, MessageCircle, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ContactContent() {
    const { t } = useTranslation();

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-14 animate-fade-in-up">
                <div
                    className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                    style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}
                >
                    {t("contact.badge")}
                </div>
                <h1
                    className="text-4xl md:text-5xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {t("contact.title")}
                </h1>
                <p className="max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
                    {t("contact.subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Cards */}
                <div className="flex flex-col gap-5">
                    <div className="clay-card p-6 flex items-start gap-4 animate-fade-in-up stagger-1">
                        <div
                            className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                            style={{ background: "#25D36615" }}
                        >
                            <MessageCircle size={22} style={{ color: "var(--color-whatsapp-dark)" }} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                {t("contact.waTitle")}
                            </h3>
                            <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
                                {t("contact.waDesc")}
                            </p>
                            <a
                                href="https://wa.me/31612988455?text=Hi%20Mama%20DD%27s!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="clay-button clay-button-whatsapp text-sm px-5 py-2"
                            >
                                {t("contact.waCTA")}
                            </a>
                        </div>
                    </div>

                    <div className="clay-card p-6 flex items-start gap-4 animate-fade-in-up stagger-2">
                        <div
                            className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                            style={{ background: "#EA433515" }}
                        >
                            <Mail size={22} style={{ color: "#EA4335" }} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{t("contact.emailTitle")}</h3>
                            <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
                                {t("contact.emailDesc")}
                            </p>
                            <a
                                href="mailto:ddoptimistic@gmail.com?subject=Order%20%2F%20Inquiry%20-%20Mama%20DD%27s"
                                className="clay-button clay-button-outline text-sm px-5 py-2"
                            >
                                ✉️ ddoptimistic@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="clay-card p-6 flex items-start gap-4 animate-fade-in-up stagger-3">
                        <div
                            className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                            style={{ background: "var(--color-primary)15" }}
                        >
                            <Phone size={22} style={{ color: "var(--color-primary)" }} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{t("contact.phoneTitle")}</h3>
                            <p className="text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>
                                {t("contact.phoneDesc")}
                            </p>
                            <a
                                href="tel:+31612988455"
                                className="text-sm font-bold hover:underline"
                                style={{ color: "var(--color-primary)" }}
                            >
                                📞 +31 6 12988455
                            </a>
                        </div>
                    </div>

                    <div className="clay-card p-6 flex items-start gap-4 animate-fade-in-up stagger-4">
                        <div
                            className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                            style={{ background: "var(--color-accent)15" }}
                        >
                            <MapPin size={22} style={{ color: "var(--color-accent)" }} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{t("contact.addressTitle")}</h3>
                            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                Waalstraat 134<br />
                                7523 RM Enschede<br />
                                Netherlands
                            </p>
                        </div>
                    </div>

                    <div className="clay-card p-6 flex items-start gap-4 animate-fade-in-up stagger-4">
                        <div
                            className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                            style={{ background: "var(--color-secondary)15" }}
                        >
                            <Clock size={22} style={{ color: "var(--color-secondary)" }} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{t("contact.hoursTitle")}</h3>
                            <div className="text-sm space-y-1" style={{ color: "var(--color-text-muted)" }}>
                                <div className="flex justify-between gap-8">
                                    <span>{t("contact.tuesday")}</span><span className="font-medium">6:00 – 8:00 PM</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span>{t("contact.wednesday")}</span><span className="font-medium">6:00 – 8:00 PM</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span>{t("contact.thursday")}</span><span className="font-medium">6:00 – 8:00 PM</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span>{t("contact.saturday")}</span><span className="font-medium">6:00 – 8:00 PM</span>
                                </div>
                                <p className="text-xs pt-1 opacity-60">{t("contact.closedDays")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="clay-card overflow-hidden animate-fade-in-up stagger-2" style={{ minHeight: "500px" }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.5!2d6.88!3d52.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDEzJzEyLjAiTiA2wrA1MicxMi4wIkU!5e0!3m2!1sen!2snl!4v1"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: "var(--radius-clay)", minHeight: "500px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mama DD's Location"
                    />
                </div>
            </div>
        </div>
    );
}
