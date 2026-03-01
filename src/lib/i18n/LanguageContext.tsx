"use client";

import {
    createContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import { translations, type Locale } from "./translations";

interface LanguageContextValue {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
    language: "en",
    setLanguage: () => { },
    t: (key: string) => key,
});

const STORAGE_KEY = "mama-dds-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Locale>("en");
    const [mounted, setMounted] = useState(false);

    // Read saved preference on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
            if (saved && (saved === "en" || saved === "nl")) {
                setLanguageState(saved);
            }
        } catch {
            // localStorage not available
        }
        setMounted(true);
    }, []);

    const setLanguage = useCallback((lang: Locale) => {
        setLanguageState(lang);
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // localStorage not available
        }
        // Update the html lang attribute
        document.documentElement.lang = lang;
    }, []);

    const t = useCallback(
        (key: string): string => {
            return translations[language]?.[key] ?? translations.en[key] ?? key;
        },
        [language]
    );

    // Update html lang on mount
    useEffect(() => {
        if (mounted) {
            document.documentElement.lang = language;
        }
    }, [language, mounted]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}
