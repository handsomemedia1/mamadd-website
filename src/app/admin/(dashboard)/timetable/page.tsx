"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Save, Eye, EyeOff, Trash2 } from "lucide-react";

interface MenuItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    categoryId: string;
}

interface TimetableItem {
    id: string;
    menuItem: MenuItem;
    specialPrice: number | null;
    note: string | null;
}

interface DayTimetable {
    id: string;
    date: string;
    dayOfWeek: string;
    note: string | null;
    isPublished: boolean;
    items: TimetableItem[];
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

function formatDisplayDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function AdminTimetablePage() {
    const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
    const [timetables, setTimetables] = useState<DayTimetable[]>([]);
    const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [showPicker, setShowPicker] = useState<string | null>(null);
    const [editNote, setEditNote] = useState<{ date: string; note: string } | null>(null);

    // Fetch week data
    const fetchWeek = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/timetable?weekStart=${formatDate(weekStart)}`);
            const data = await res.json();
            setTimetables(data);
        } catch (e) {
            console.error("Failed to fetch timetable", e);
        }
        setLoading(false);
    }, [weekStart]);

    // Fetch all menu items for the picker
    useEffect(() => {
        fetch("/api/admin/timetable/menu-items")
            .then((r) => r.json())
            .then(setAllMenuItems)
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetchWeek();
    }, [fetchWeek]);

    const getDayDate = (dayIndex: number): string => {
        const d = new Date(weekStart);
        d.setUTCDate(d.getUTCDate() + dayIndex);
        return formatDate(d);
    };

    const getDayData = (dayIndex: number): DayTimetable | undefined => {
        const dateStr = getDayDate(dayIndex);
        return timetables.find((t) => t.date.startsWith(dateStr));
    };

    const saveDay = async (dayIndex: number, menuItemIds: string[], note?: string | null, isPublished?: boolean) => {
        const date = getDayDate(dayIndex);
        const dayName = DAYS[dayIndex];
        setSaving(date);
        try {
            const existing = getDayData(dayIndex);
            await fetch("/api/admin/timetable", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date,
                    dayOfWeek: dayName,
                    menuItemIds,
                    note: note !== undefined ? note : existing?.note || null,
                    isPublished: isPublished !== undefined ? isPublished : existing?.isPublished ?? false,
                }),
            });
            await fetchWeek();
        } catch (e) {
            console.error("Failed to save", e);
        }
        setSaving(null);
    };

    const addItemToDay = (dayIndex: number, menuItemId: string) => {
        const existing = getDayData(dayIndex);
        const currentIds = existing?.items.map((i) => i.menuItem.id) || [];
        if (!currentIds.includes(menuItemId)) {
            saveDay(dayIndex, [...currentIds, menuItemId]);
        }
        setShowPicker(null);
    };

    const removeItemFromDay = (dayIndex: number, menuItemId: string) => {
        const existing = getDayData(dayIndex);
        const newIds = existing?.items.filter((i) => i.menuItem.id !== menuItemId).map((i) => i.menuItem.id) || [];
        saveDay(dayIndex, newIds);
    };

    const togglePublish = (dayIndex: number) => {
        const existing = getDayData(dayIndex);
        if (!existing) return;
        const currentIds = existing.items.map((i) => i.menuItem.id);
        saveDay(dayIndex, currentIds, undefined, !existing.isPublished);
    };

    const deleteDay = async (dayIndex: number) => {
        const existing = getDayData(dayIndex);
        if (!existing) return;
        setSaving(getDayDate(dayIndex));
        await fetch(`/api/admin/timetable?id=${existing.id}`, { method: "DELETE" });
        await fetchWeek();
        setSaving(null);
    };

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

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                        🗓️ Food Timetable
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                        Set which dishes are available each day of the week
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={prevWeek} className="clay-button px-3 py-2">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={thisWeek} className="clay-button clay-button-outline px-4 py-2 text-sm font-semibold">
                        This Week
                    </button>
                    <button onClick={nextWeek} className="clay-button px-3 py-2">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Week label */}
            <div className="text-center mb-6">
                <p className="text-lg font-bold">
                    {weekStart.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} –{" "}
                    {weekEndDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin w-8 h-8 border-4 border-t-transparent rounded-full mx-auto mb-4" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
                    <p style={{ color: "var(--color-text-muted)" }}>Loading timetable...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {DAYS.map((day, i) => {
                        const dayData = getDayData(i);
                        const dateStr = getDayDate(i);
                        const isToday = formatDate(new Date()) === dateStr;
                        const isSaving = saving === dateStr;

                        return (
                            <div
                                key={day}
                                className="clay-card p-5 flex flex-col"
                                style={{
                                    borderLeft: isToday ? "4px solid var(--color-primary)" : undefined,
                                    opacity: isSaving ? 0.6 : 1,
                                }}
                            >
                                {/* Day header */}
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-base" style={{ fontFamily: "var(--font-heading)" }}>
                                            {day}
                                        </h3>
                                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                            {formatDisplayDate(dateStr + "T00:00:00Z")}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        {dayData && (
                                            <>
                                                <button
                                                    onClick={() => togglePublish(i)}
                                                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                                    title={dayData.isPublished ? "Unpublish" : "Publish"}
                                                >
                                                    {dayData.isPublished ? (
                                                        <Eye size={16} style={{ color: "var(--color-success)" }} />
                                                    ) : (
                                                        <EyeOff size={16} style={{ color: "var(--color-text-muted)" }} />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => deleteDay(i)}
                                                    className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                                                    title="Clear day"
                                                >
                                                    <Trash2 size={16} style={{ color: "var(--color-error)" }} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Status badge */}
                                {dayData && (
                                    <div className="mb-3">
                                        <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                                            style={{
                                                background: dayData.isPublished ? "var(--color-success)20" : "var(--color-accent)20",
                                                color: dayData.isPublished ? "var(--color-success)" : "var(--color-accent)",
                                            }}
                                        >
                                            {dayData.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </div>
                                )}

                                {/* Note */}
                                {dayData?.note && (
                                    <div className="text-xs px-3 py-2 rounded-xl mb-3" style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}>
                                        📝 {dayData.note}
                                    </div>
                                )}

                                {/* Menu items */}
                                <div className="flex-1 space-y-2 mb-3">
                                    {dayData?.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm group"
                                            style={{ background: "var(--color-surface-warm)" }}
                                        >
                                            {item.menuItem.imageUrl ? (
                                                <img src={item.menuItem.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                                            ) : (
                                                <span className="text-lg flex-shrink-0">🍲</span>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-xs truncate">{item.menuItem.name}</p>
                                                <p className="text-[10px]" style={{ color: "var(--color-primary)" }}>
                                                    €{(item.specialPrice ?? item.menuItem.price).toFixed(2)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItemFromDay(i, item.menuItem.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                                            >
                                                <X size={12} style={{ color: "var(--color-error)" }} />
                                            </button>
                                        </div>
                                    )) || (
                                            <p className="text-xs text-center py-4" style={{ color: "var(--color-text-muted)" }}>
                                                No dishes set yet
                                            </p>
                                        )}
                                </div>

                                {/* Add button */}
                                <button
                                    onClick={() => setShowPicker(showPicker === dateStr ? null : dateStr)}
                                    className="clay-button clay-button-outline text-xs w-full py-2 flex items-center justify-center gap-1"
                                >
                                    <Plus size={14} /> Add Dish
                                </button>

                                {/* Picker dropdown */}
                                {showPicker === dateStr && (
                                    <div className="mt-2 clay-card p-3 max-h-60 overflow-y-auto space-y-1" style={{ background: "var(--color-surface)" }}>
                                        <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>
                                            Select a dish
                                        </p>
                                        {allMenuItems.map((mi) => {
                                            const alreadyAdded = dayData?.items.some((i) => i.menuItem.id === mi.id);
                                            return (
                                                <button
                                                    key={mi.id}
                                                    onClick={() => !alreadyAdded && addItemToDay(i, mi.id)}
                                                    disabled={alreadyAdded}
                                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left hover:bg-white/10 transition-colors disabled:opacity-40"
                                                >
                                                    {mi.imageUrl ? (
                                                        <img src={mi.imageUrl} alt="" className="w-6 h-6 rounded object-cover flex-shrink-0" />
                                                    ) : (
                                                        <span className="text-sm">🍲</span>
                                                    )}
                                                    <span className="flex-1 truncate font-medium">{mi.name}</span>
                                                    <span style={{ color: "var(--color-primary)" }}>€{mi.price.toFixed(2)}</span>
                                                    {alreadyAdded && <span className="text-[10px]">✓</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
