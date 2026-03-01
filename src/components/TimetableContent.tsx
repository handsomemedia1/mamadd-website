"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface TimetableMenuItem {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
}

interface TimetableDayItem {
    id: string;
    specialPrice: number | null;
    note: string | null;
    menuItem: TimetableMenuItem;
}

interface TimetableDay {
    id: string;
    date: string;
    dayOfWeek: string;
    note: string | null;
    items: TimetableDayItem[];
}

interface WeekData {
    weekStart: string;
    weekEnd: string;
    days: TimetableDay[];
}

const DAY_EMOJIS: Record<string, string> = {
    Monday: "🌙",
    Tuesday: "🔥",
    Wednesday: "💧",
    Thursday: "⚡",
    Friday: "🌟",
    Saturday: "🎉",
    Sunday: "☀️",
};

function getMonday(d: Date): Date {
    const date = new Date(d);
    const day = date.getUTCDay();
    const diff = day === 0 ? -6 : 1 - day;
    date.setUTCDate(date.getUTCDate() + diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

function formatDate(d: Date): string {
    return d.toISOString().split("T")[0];
}

export default function TimetableContent() {
    const { t } = useTranslation();
    const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
    const [weekData, setWeekData] = useState<WeekData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchWeek = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/timetable?weekStart=${formatDate(weekStart)}`);
            const data = await res.json();
            setWeekData(data);
        } catch (e) {
            console.error("Failed to fetch timetable", e);
        }
        setLoading(false);
    }, [weekStart]);

    useEffect(() => {
        fetchWeek();
    }, [fetchWeek]);

    const prevWeek = () => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() - 7);
        setWeekStart(d);
    };
    const nextWeek = () => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + 7);
        setWeekStart(d);
    };
    const thisWeek = () => setWeekStart(getMonday(new Date()));

    const weekEndDate = new Date(weekStart);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    const today = formatDate(new Date());

    const buildWhatsAppMsg = (day: TimetableDay) => {
        const dateLabel = new Date(day.date).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
        const dishes = day.items.map((i) => `• ${i.menuItem.name} (€${(i.specialPrice ?? i.menuItem.price).toFixed(2)})`).join("\n");
        return encodeURIComponent(
            `Hi Mama DD's! 👋\nI'd like to order for ${dateLabel}:\n\n${dishes}\n\nPlease confirm availability! 🍛`
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in-up">
                <div
                    className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                    style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}
                >
                    {t("timetable.badge")}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {t("timetable.title")}
                </h1>
                <p className="max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
                    {t("timetable.subtitle")}
                </p>
            </div>

            {/* Week navigation */}
            <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up stagger-1">
                <button onClick={prevWeek} className="clay-button px-3 py-2">
                    <ChevronLeft size={18} />
                </button>
                <div className="text-center min-w-[220px]">
                    <p className="font-bold text-lg">
                        {weekStart.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} –{" "}
                        {weekEndDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {weekEndDate.getFullYear()}
                    </p>
                </div>
                <button onClick={nextWeek} className="clay-button px-3 py-2">
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Today button */}
            <div className="text-center mb-8">
                <button onClick={thisWeek} className="clay-button clay-button-outline text-sm px-5 py-2">
                    {t("timetable.thisWeek")}
                </button>
            </div>

            {/* Timetable grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div
                        className="animate-spin w-8 h-8 border-4 border-t-transparent rounded-full mx-auto mb-4"
                        style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }}
                    />
                    <p style={{ color: "var(--color-text-muted)" }}>{t("timetable.loading")}</p>
                </div>
            ) : weekData && weekData.days.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weekData.days.map((day, idx) => {
                        const isToday = day.date.startsWith(today);
                        const displayDate = new Date(day.date).toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                        });
                        return (
                            <div
                                key={day.id}
                                className={`clay-card p-6 animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
                                style={{
                                    borderLeft: isToday ? "4px solid var(--color-primary)" : undefined,
                                }}
                            >
                                {/* Day header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{DAY_EMOJIS[day.dayOfWeek] || "📅"}</span>
                                        <div>
                                            <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                                                {t(`timetable.${day.dayOfWeek.toLowerCase()}`) || day.dayOfWeek}
                                            </h3>
                                            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                                {displayDate}
                                            </p>
                                        </div>
                                    </div>
                                    {isToday && (
                                        <span
                                            className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                                            style={{ background: "var(--color-primary)", color: "white" }}
                                        >
                                            {t("timetable.today")}
                                        </span>
                                    )}
                                </div>

                                {/* Day note */}
                                {day.note && (
                                    <div
                                        className="text-xs px-3 py-2 rounded-xl mb-4"
                                        style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}
                                    >
                                        📝 {day.note}
                                    </div>
                                )}

                                {/* Dishes */}
                                <div className="space-y-3 mb-5">
                                    {day.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 p-3 rounded-2xl"
                                            style={{ background: "var(--color-surface-warm)" }}
                                        >
                                            {item.menuItem.imageUrl ? (
                                                <img
                                                    src={item.menuItem.imageUrl}
                                                    alt={item.menuItem.name}
                                                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                                                    style={{ boxShadow: "2px 2px 6px rgba(0,0,0,0.1)" }}
                                                />
                                            ) : (
                                                <div
                                                    className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
                                                    style={{ background: "var(--color-accent-light)" }}
                                                >
                                                    🍲
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm">{item.menuItem.name}</p>
                                                {item.menuItem.description && (
                                                    <p className="text-xs line-clamp-1" style={{ color: "var(--color-text-muted)" }}>
                                                        {item.menuItem.description}
                                                    </p>
                                                )}
                                                {item.note && (
                                                    <p className="text-[10px] font-medium mt-0.5" style={{ color: "var(--color-accent)" }}>
                                                        {item.note}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-sm font-bold whitespace-nowrap" style={{ color: "var(--color-primary)" }}>
                                                €{(item.specialPrice ?? item.menuItem.price).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order button */}
                                <a
                                    href={`https://wa.me/31612988455?text=${buildWhatsAppMsg(day)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="clay-button clay-button-whatsapp w-full text-sm py-2.5 flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={16} />
                                    {t("timetable.orderFor")} {t(`timetable.${day.dayOfWeek.toLowerCase()}`) || day.dayOfWeek}
                                </a>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="clay-card-warm p-12 text-center">
                    <div className="text-5xl mb-4">📋</div>
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        {t("timetable.emptyTitle")}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                        {t("timetable.emptyDesc")}
                    </p>
                    <a
                        href="https://wa.me/31612988455?text=Hi%20Mama%20DD's!%20What's%20on%20the%20menu%20this%20week?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-button clay-button-whatsapp text-sm inline-flex items-center gap-2"
                    >
                        {t("timetable.askWhatsApp")}
                    </a>
                </div>
            )}

            {/* Bottom info */}
            <div className="text-center mt-10">
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {t("timetable.info")}
                </p>
            </div>
        </div>
    );
}
