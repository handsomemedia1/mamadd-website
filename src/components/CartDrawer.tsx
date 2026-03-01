"use client";

import { useCart, getWhatsAppUrl, getEmailUrl } from "@/lib/cart";
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, Mail } from "lucide-react";
import type { OrderType } from "@/lib/cart";

export default function CartDrawer() {
    const {
        items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart,
        totalItems, totalPrice, orderType, setOrderType,
        customerEmail, setCustomerEmail, customerPhone, setCustomerPhone,
    } = useCart();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-50 animate-fade-in"
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div
                className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col animate-slide-in-right"
                style={{ background: "var(--color-background)" }}
            >
                {/* Header */}
                <div className="p-5 flex items-center justify-between border-b" style={{ borderColor: "var(--color-border)" }}>
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={20} style={{ color: "var(--color-primary)" }} />
                        <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                            Your Order
                        </h2>
                        {totalItems > 0 && (
                            <span
                                className="text-xs px-2 py-0.5 rounded-full font-bold"
                                style={{ background: "var(--color-primary)", color: "white" }}
                            >
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">🛒</div>
                            <h3 className="font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                Your cart is empty
                            </h3>
                            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                Add items from the menu to get started
                            </p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="clay-card p-4 flex items-center gap-3"
                            >
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                                    <p className="text-sm" style={{ color: "var(--color-primary)" }}>
                                        €{item.price.toFixed(2)}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                                        style={{
                                            background: "var(--color-cream)",
                                            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                                        style={{
                                            background: "var(--color-cream)",
                                            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                {/* Subtotal + Remove */}
                                <div className="text-right">
                                    <p className="font-bold text-sm" style={{ color: "var(--color-primary-dark)" }}>
                                        €{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-400 hover:text-red-600 transition-colors mt-0.5"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-5 border-t space-y-4" style={{ borderColor: "var(--color-border)" }}>
                        {/* Order Type Toggle */}
                        <div>
                            <p className="text-xs font-semibold mb-2" style={{ color: "var(--color-text-muted)" }}>
                                Order Type
                            </p>
                            <div className="flex gap-2">
                                {([
                                    { value: "pickup" as OrderType, label: "🛍️ Pickup", desc: "Collect from our kitchen" },
                                    { value: "catering" as OrderType, label: "🎉 Catering", desc: "Parties & big orders" },
                                ]).map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setOrderType(opt.value)}
                                        className="flex-1 p-3 rounded-xl text-left transition-all text-sm"
                                        style={{
                                            background: orderType === opt.value ? "var(--color-primary)" : "var(--color-cream)",
                                            color: orderType === opt.value ? "white" : "var(--color-text)",
                                            boxShadow: orderType === opt.value
                                                ? "0 4px 12px rgba(213,94,23,0.3)"
                                                : "inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 4px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        <div className="font-bold">{opt.label}</div>
                                        <div className="text-xs opacity-80">{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact details */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
                                Your Contact (optional)
                            </p>
                            <input
                                type="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                placeholder="Your email address"
                                className="w-full px-3 py-2 rounded-xl text-sm"
                                style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white" }}
                            />
                            <input
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="Your phone number"
                                className="w-full px-3 py-2 rounded-xl text-sm"
                                style={{ border: "2px solid var(--color-accent-light)", outline: "none", background: "white" }}
                            />
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Total</span>
                            <span
                                className="text-2xl font-bold"
                                style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary-dark)" }}
                            >
                                €{totalPrice.toFixed(2)}
                            </span>
                        </div>

                        {/* Send buttons */}
                        <div className="space-y-2">
                            {/* WhatsApp Button */}
                            <a
                                href={getWhatsAppUrl(items, totalPrice, orderType, customerEmail, customerPhone)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="clay-button clay-button-whatsapp w-full flex items-center justify-center gap-2 text-base py-4"
                                onClick={() => {
                                    clearCart();
                                    setIsOpen(false);
                                }}
                            >
                                <MessageCircle size={20} />
                                Send via WhatsApp
                            </a>

                            {/* Email Button */}
                            <a
                                href={getEmailUrl(items, totalPrice, orderType, customerPhone)}
                                className="clay-button clay-button-outline w-full flex items-center justify-center gap-2 text-sm py-3"
                                onClick={() => {
                                    clearCart();
                                    setIsOpen(false);
                                }}
                            >
                                <Mail size={18} />
                                Send via Email
                            </a>
                        </div>

                        {/* Clear Cart */}
                        <button
                            onClick={clearCart}
                            className="w-full text-center text-xs py-2 hover:underline"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            Clear Cart
                        </button>

                        <p className="text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
                            {orderType === "catering"
                                ? "Your catering inquiry will be sent to Mama DD's. We'll get back to you with pricing!"
                                : "Your order will be sent to Mama DD's. Pickup from our kitchen in Enschede."}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

// ─── Floating Cart Button ─────────────────────

export function FloatingCartButton() {
    const { totalItems, setIsOpen } = useCart();

    if (totalItems === 0) return null;

    return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 animate-bounce-in"
            style={{
                background: "var(--color-primary)",
                color: "white",
                boxShadow: "0 8px 30px rgba(213, 94, 23, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
        >
            <ShoppingBag size={20} />
            <span className="font-bold text-sm">{totalItems}</span>
            <span className="text-xs opacity-80">items</span>
        </button>
    );
}
