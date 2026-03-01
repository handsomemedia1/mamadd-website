"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Plus, Check } from "lucide-react";

export default function AddToCartButton({
    id,
    name,
    price,
}: {
    id: string;
    name: string;
    price: number;
}) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem({ id, name, price });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <button
            onClick={handleAdd}
            className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${added ? "animate-add-pop" : "hover:scale-110"
                }`}
            style={{
                background: added
                    ? "var(--color-success)"
                    : "var(--color-primary)",
                color: "white",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.12), inset 1px 1px 2px rgba(255,255,255,0.2)",
            }}
            title={`Add ${name} to cart`}
        >
            {added ? <Check size={16} /> : <Plus size={16} />}
        </button>
    );
}
