"use client";

import { useCart } from "@/lib/cart";
import { Plus, Minus } from "lucide-react";

export default function AddToCartButton({ id, name, price }: { id: string; name: string; price: number }) {
    const { items, addItem, updateQuantity, removeItem } = useCart();
    
    // Check if the item is already in the cart
    const cartItem = items.find((item) => item.id === id);
    const quantity = cartItem?.quantity || 0;

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity === 0) {
            addItem({ id, name, price });
        } else {
            updateQuantity(id, quantity + 1);
        }
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity === 1) {
            removeItem(id);
        } else if (quantity > 1) {
            updateQuantity(id, quantity - 1);
        }
    };

    if (quantity > 0) {
        return (
            <div className="flex items-center rounded-xl bg-[var(--color-cream)] shadow-sm" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleDecrement}
                    className="w-8 h-9 flex items-center justify-center text-gray-700 hover:bg-[var(--color-accent-light)] rounded-l-xl transition-colors"
                >
                    <Minus size={14} />
                </button>
                <span className="w-6 text-center font-bold text-sm text-[var(--color-primary-dark)]">{quantity}</span>
                <button
                    onClick={handleIncrement}
                    className="w-8 h-9 flex items-center justify-center text-gray-700 hover:bg-[var(--color-accent-light)] rounded-r-xl transition-colors"
                >
                    <Plus size={14} />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleIncrement}
            className="flex-shrink-0 px-3 py-1.5 h-9 rounded-xl flex items-center justify-center gap-1 transition-all hover:scale-105"
            style={{
                background: "var(--color-primary)",
                color: "white",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.12), inset 1px 1px 2px rgba(255,255,255,0.2)",
            }}
            title={`Add ${name} to cart`}
        >
            <Plus size={14} />
            <span className="text-sm font-semibold">Add</span>
        </button>
    );
}
