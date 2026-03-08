"use client";

import { ShoppingBag } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import ShareButtons from "@/components/ShareButtons";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useCart } from "@/lib/cart";

interface MenuItem {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    isFeatured: boolean;
    isAvailable: boolean;
}

interface Category {
    id: string;
    name: string;
    order: number;
    menuItems: MenuItem[];
}

export default function MenuContent({ categories }: { categories: Category[] }) {
    const { t } = useTranslation();
    const { totalItems } = useCart();

    const handleBottomWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (totalItems === 0) {
            e.preventDefault();
            alert("Please pick from the Menu first.");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in-up">
                <div
                    className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2"
                    style={{
                        background: "var(--color-accent-light)",
                        color: "var(--color-secondary)",
                    }}
                >
                    {t("menu.badge")}
                </div>
                <h1
                    className="text-4xl md:text-5xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {t("menu.title")}
                </h1>
                <p
                    className="max-w-md mx-auto mb-6"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    {t("menu.subtitle")}
                </p>

                {/* Delivery info badge */}
                <div className="mt-3 flex items-center justify-center gap-2">
                    <a
                        href={`https://wa.me/31612988455?text=${encodeURIComponent(
                            "Hi Mama DD! 👋 I'd like to order for delivery. Can you let me know the delivery charge to my address? 🍛"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-2xl transition-all hover:opacity-80"
                        style={{
                            background: "#edfdf2",
                            color: "#15803d",
                            border: "1px solid #bbf7d0",
                            fontWeight: 600,
                        }}
                    >
                        {t("menu.deliveryBadge")}
                    </a>
                </div>

                {/* Share + Catering */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <ShareButtons
                        url="https://mamadd.com/menu"
                        title="Check out Mama DD's African Kitchen Menu!"
                        description="Authentic African dishes in Enschede — Jollof Rice, Egusi, Fufu, and more."
                        compact
                    />
                </div>
                <div className="mt-4">
                    <a
                        href={`https://wa.me/31612988455?text=${encodeURIComponent(
                            "Hi Mama DD's! 🎉 I'm interested in your catering services for a party/event. Can we discuss the menu and pricing?"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm px-5 py-2 rounded-2xl font-semibold transition-all hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, var(--color-accent-light), #fef3c7)",
                            color: "var(--color-secondary)",
                            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06), 3px 3px 8px rgba(0,0,0,0.06)",
                        }}
                    >
                        {t("menu.cateringBadge")}
                    </a>
                </div>
            </div>

            {/* Category Navigation */}
            <nav className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in-up stagger-1">
                {categories.map((cat) => (
                    <a
                        key={cat.id}
                        href={`#${cat.id}`}
                        className="clay-badge px-4 py-2 text-sm font-medium transition-all hover:scale-105"
                        style={{
                            background: "var(--color-cream)",
                            color: "var(--color-primary-dark)",
                        }}
                    >
                        {cat.name}
                    </a>
                ))}
            </nav>

            {/* Menu Categories & Items */}
            <div className="space-y-12">
                {categories.map((category, catIdx) => (
                    <section
                        key={category.id}
                        id={category.id}
                        className={`animate-fade-in-up stagger-${Math.min(catIdx + 2, 6)}`}
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <h2
                                className="text-2xl font-bold whitespace-nowrap"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {category.name}
                            </h2>
                            <div
                                className="flex-1 h-px"
                                style={{ background: "var(--color-border)" }}
                            />
                            <span
                                className="text-sm whitespace-nowrap"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                {category.menuItems.length} {t("menu.items")}
                            </span>
                        </div>

                        {/* Items Grid */}
                        {category.menuItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {category.menuItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="clay-card p-4 sm:p-5 flex flex-col sm:flex-row gap-4 group hover:scale-[1.01] transition-transform"
                                    >
                                        {/* Image placeholder / emoji */}
                                        {item.imageUrl ? (
                                            <div
                                                className="w-full sm:w-40 sm:h-40 h-56 rounded-2xl flex-shrink-0 overflow-hidden"
                                                style={{
                                                    boxShadow:
                                                        "inset 2px 2px 4px rgba(0,0,0,0.4), 3px 3px 6px rgba(0,0,0,0.5)",
                                                }}
                                            >
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="w-full sm:w-40 sm:h-40 h-56 rounded-2xl flex-shrink-0 flex items-center justify-center text-5xl sm:text-4xl"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg, var(--color-accent-light), var(--color-cream))",
                                                    boxShadow:
                                                        "inset 2px 2px 4px rgba(0,0,0,0.06), 3px 3px 6px rgba(0,0,0,0.06)",
                                                }}
                                            >
                                                🍲
                                            </div>
                                        )}

                                        {/* Item Details */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3
                                                    className="font-semibold text-lg sm:text-base leading-tight"
                                                    style={{ fontFamily: "var(--font-heading)" }}
                                                >
                                                    {item.name}
                                                    {item.isFeatured && (
                                                        <span
                                                            className="ml-2 text-xs px-2 py-0.5 rounded-full align-middle inline-block mt-1 sm:mt-0"
                                                            style={{
                                                                background: "var(--color-accent-light)",
                                                                color: "var(--color-accent)",
                                                                fontFamily: "var(--font-body)",
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {t("menu.popular")}
                                                        </span>
                                                    )}
                                                </h3>
                                                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                                                    <span
                                                        className="text-lg font-bold whitespace-nowrap"
                                                        style={{ color: "var(--color-primary)" }}
                                                    >
                                                        €{item.price.toFixed(2)}
                                                    </span>
                                                    <AddToCartButton id={item.id} name={item.name} price={item.price} />
                                                </div>
                                            </div>
                                            {item.description && (
                                                <p
                                                    className="text-sm leading-relaxed line-clamp-2"
                                                    style={{ color: "var(--color-text-muted)" }}
                                                >
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="clay-card-warm p-6 text-center text-sm"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                {t("menu.noItems")}
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* Bottom CTA */}
            <div
                className="clay-card p-8 md:p-10 text-center mt-14"
                style={{
                    background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                }}
            >
                <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {t("menu.readyTitle")}
                </h2>
                <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
                    {t("menu.readyDesc")}
                </p>
                <a
                    href={`https://wa.me/31612988455?text=${encodeURIComponent(
                        "Hi Mama DD's! I'd like to place an order:\n\n"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleBottomWhatsAppClick}
                    className="clay-button inline-flex items-center gap-2 text-sm"
                    style={{
                        background: "white",
                        color: "var(--color-primary-dark)",
                    }}
                >
                    {t("menu.readyCTA")}
                </a>
            </div>

            {/* Info Note */}
            <div className="text-center mt-8">
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {t("menu.priceNote")}
                    <br />
                    {t("menu.cateringNote")}
                    <br />
                    <a href="mailto:ddoptimistic@gmail.com" style={{ color: "var(--color-primary)" }}>ddoptimistic@gmail.com</a>
                </p>
            </div>
        </div>
    );
}
