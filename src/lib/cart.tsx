"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export type OrderType = "pickup" | "catering";

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    customerEmail: string;
    setCustomerEmail: (email: string) => void;
    customerPhone: string;
    setCustomerPhone: (phone: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "mamadds-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [orderType, setOrderType] = useState<OrderType>("pickup");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setItems(JSON.parse(stored));
        } catch { }
        setHydrated(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, hydrated]);

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((i) => i.id !== id));
        } else {
            setItems((prev) =>
                prev.map((i) => (i.id === id ? { ...i, quantity } : i))
            );
        }
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        setIsOpen(false);
        setOrderType("pickup");
        setCustomerEmail("");
        setCustomerPhone("");
    }, []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isOpen,
                setIsOpen,
                orderType,
                setOrderType,
                customerEmail,
                setCustomerEmail,
                customerPhone,
                setCustomerPhone,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}

export function generateWhatsAppMessage(
    items: CartItem[],
    total: number,
    orderType: OrderType = "pickup",
    customerEmail?: string,
    customerPhone?: string
): string {
    const typeLabel = orderType === "catering" ? "🎉 CATERING / BIG ORDER" : "🛍️ PICKUP ORDER";
    let msg = `Hi Mama DD's! 🍲\n\n${typeLabel}\nI'd like to place an order:\n\n`;
    items.forEach((item) => {
        msg += `• ${item.name} x${item.quantity} — €${(item.price * item.quantity).toFixed(2)}\n`;
    });
    msg += `\n💰 Total: €${total.toFixed(2)}`;

    if (customerEmail) {
        msg += `\n📧 Email: ${customerEmail}`;
    }
    if (customerPhone) {
        msg += `\n📞 Phone: ${customerPhone}`;
    }

    if (orderType === "catering") {
        msg += `\n\nThis is a catering / party order. Please let me know about availability and pricing for large orders. Thank you! 🙏`;
    } else {
        msg += `\n\nPlease let me know when it will be ready for pickup. Thank you! 🙏`;
    }
    return msg;
}

export function generateEmailBody(
    items: CartItem[],
    total: number,
    orderType: OrderType = "pickup",
    customerPhone?: string
): string {
    const typeLabel = orderType === "catering" ? "CATERING / BIG ORDER" : "PICKUP ORDER";
    let msg = `${typeLabel}\n\nItems:\n`;
    items.forEach((item) => {
        msg += `• ${item.name} x${item.quantity} — €${(item.price * item.quantity).toFixed(2)}\n`;
    });
    msg += `\nTotal: €${total.toFixed(2)}`;
    if (customerPhone) {
        msg += `\nPhone: ${customerPhone}`;
    }
    if (orderType === "catering") {
        msg += `\n\nThis is a catering / party order. Please let me know about availability and pricing.`;
    } else {
        msg += `\n\nPlease let me know when it will be ready for pickup.`;
    }
    return msg;
}

export function getWhatsAppUrl(
    items: CartItem[],
    total: number,
    orderType: OrderType = "pickup",
    customerEmail?: string,
    customerPhone?: string
): string {
    const message = generateWhatsAppMessage(items, total, orderType, customerEmail, customerPhone);
    return `https://wa.me/31612988455?text=${encodeURIComponent(message)}`;
}

export function getEmailUrl(
    items: CartItem[],
    total: number,
    orderType: OrderType = "pickup",
    customerPhone?: string
): string {
    const subject = orderType === "catering"
        ? "Catering Order — Mama DD's African Kitchen"
        : "Pickup Order — Mama DD's African Kitchen";
    const body = generateEmailBody(items, total, orderType, customerPhone);
    return `mailto:ddoptimistic@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
