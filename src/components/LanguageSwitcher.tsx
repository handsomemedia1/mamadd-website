"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { Locale } from "@/lib/i18n/translations";

const languages: { code: Locale; flag: string; label: string }[] = [
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "nl", flag: "🇳🇱", label: "Nederlands" },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = languages.find((l) => l.code === language) ?? languages[0];

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                    background: "var(--color-surface-warm, #FFF3E8)",
                    color: "var(--color-text, #2D1B0E)",
                    boxShadow:
                        "inset 1px 1px 2px rgba(255,255,255,0.6), 2px 2px 4px rgba(0,0,0,0.06)",
                }}
                aria-label="Change language"
                aria-expanded={open}
            >
                <span className="text-base leading-none">{current.flag}</span>
                <span className="hidden sm:inline text-xs">{current.code.toUpperCase()}</span>
                <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="absolute right-0 top-full mt-2 min-w-[150px] rounded-2xl overflow-hidden z-50"
                    style={{
                        background: "var(--color-surface, #fff)",
                        boxShadow:
                            "8px 8px 16px rgba(45,27,14,0.1), -4px -4px 12px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)",
                        animation: "fadeInUp 0.15s ease-out forwards",
                    }}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors"
                            style={{
                                background:
                                    lang.code === language
                                        ? "var(--color-surface-warm, #FFF3E8)"
                                        : "transparent",
                                color: "var(--color-text, #2D1B0E)",
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                                "var(--color-surface-warm, #FFF3E8)")
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                                lang.code === language
                                    ? "var(--color-surface-warm, #FFF3E8)"
                                    : "transparent")
                            }
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.label}</span>
                            {lang.code === language && (
                                <span className="ml-auto text-xs" style={{ color: "var(--color-primary)" }}>
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
