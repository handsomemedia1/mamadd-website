"use client";

import { useState, useTransition } from "react";
import ImageUploader from "@/components/ImageUploader";
import {
    createCategory,
    updateCategory,
    deleteCategory,
    createMenuItem,
    updateMenuItem,
    toggleItemAvailability,
    deleteMenuItem,
} from "./actions";
import type { Category, MenuItem } from "@/generated/prisma/client";
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    Star,
    ChevronDown,
    ChevronUp,
    X,
} from "lucide-react";

type CategoryWithItems = Category & { menuItems: MenuItem[] };

// ─── Item Form Modal ──────────────────────────

function ItemFormModal({
    item,
    categories,
    onClose,
}: {
    item?: MenuItem;
    categories: Category[];
    onClose: () => void;
}) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = item
                ? await updateMenuItem(item.id, fd)
                : await createMenuItem(fd);
            if (res.error) setError(res.error);
            else onClose();
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="clay-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                        {item ? "Edit Item" : "Add Item"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:opacity-60">
                        <X size={20} />
                    </button>
                </div>

                {error && (
                    <div className="mb-3 p-2 rounded-xl text-sm text-red-700 bg-red-50">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Name *</label>
                        <input
                            name="name"
                            defaultValue={item?.name}
                            required
                            className="clay-input w-full"
                            placeholder="e.g. Jollof Rice"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <textarea
                            name="description"
                            defaultValue={item?.description ?? ""}
                            className="clay-input w-full"
                            rows={2}
                            placeholder="Short description..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Price (€) *</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={item?.price}
                                required
                                className="clay-input w-full"
                                placeholder="12.50"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Category *</label>
                            <select
                                name="categoryId"
                                defaultValue={item?.categoryId}
                                required
                                className="clay-input w-full"
                            >
                                <option value="">Select...</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <ImageUploader
                        name="imageUrl"
                        defaultValue={item?.imageUrl ?? ""}
                        label="Item Image"
                    />
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            defaultChecked={item?.isFeatured}
                            className="rounded"
                        />
                        <Star size={14} style={{ color: "var(--color-accent)" }} />
                        Featured / Popular item
                    </label>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="clay-button clay-button-primary w-full text-sm"
                    >
                        {isPending ? "Saving..." : item ? "Update Item" : "Add Item"}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ─── Category Row ─────────────────────────────

function CategoryRow({
    category,
    allCategories,
    onRefresh,
}: {
    category: CategoryWithItems;
    allCategories: Category[];
    onRefresh: () => void;
}) {
    const [isOpen, setIsOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | undefined>();
    const [showAddItem, setShowAddItem] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleCategoryUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            await updateCategory(category.id, fd);
            setIsEditing(false);
        });
    };

    const handleDelete = () => {
        if (!confirm(`Delete "${category.name}" and all its items?`)) return;
        startTransition(async () => {
            await deleteCategory(category.id);
        });
    };

    const handleToggle = (item: MenuItem) => {
        startTransition(async () => {
            await toggleItemAvailability(item.id, !item.isAvailable);
        });
    };

    const handleDeleteItem = (item: MenuItem) => {
        if (!confirm(`Delete "${item.name}"?`)) return;
        startTransition(async () => {
            await deleteMenuItem(item.id);
        });
    };

    return (
        <div className="clay-card overflow-hidden">
            {/* Category Header */}
            <div
                className="flex items-center gap-3 p-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                style={{ background: "var(--color-cream)" }}
            >
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}

                {isEditing ? (
                    <form onSubmit={handleCategoryUpdate} className="flex-1 flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <input
                            name="name"
                            defaultValue={category.name}
                            className="clay-input flex-1 text-sm py-1"
                            autoFocus
                        />
                        <button type="submit" className="clay-button text-xs px-3 py-1">
                            Save
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="text-xs opacity-60">
                            Cancel
                        </button>
                    </form>
                ) : (
                    <>
                        <h3 className="flex-1 font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                            {category.name}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--color-primary)15", color: "var(--color-primary)" }}>
                            {category.menuItems.length} items
                        </span>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            className="p-1.5 hover:opacity-60"
                            title="Edit category"
                        >
                            <Pencil size={14} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                            className="p-1.5 hover:opacity-60 text-red-500"
                            title="Delete category"
                        >
                            <Trash2 size={14} />
                        </button>
                    </>
                )}
            </div>

            {/* Items */}
            {isOpen && (
                <div className="p-4 space-y-2">
                    {category.menuItems.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${!item.isAvailable ? "opacity-50" : ""
                                }`}
                            style={{
                                background: item.isAvailable ? "white" : "var(--color-cream)",
                                boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.04), 2px 2px 4px rgba(0,0,0,0.04)",
                            }}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{item.name}</span>
                                    {item.isFeatured && <Star size={12} style={{ color: "var(--color-accent)" }} fill="var(--color-accent)" />}
                                    {!item.isAvailable && (
                                        <span className="text-xs text-red-500 font-medium">Unavailable</span>
                                    )}
                                </div>
                                {item.description && (
                                    <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                                        {item.description}
                                    </p>
                                )}
                            </div>
                            <span className="font-bold text-sm whitespace-nowrap" style={{ color: "var(--color-primary)" }}>
                                €{item.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleToggle(item)}
                                    className="p-1.5 rounded-xl hover:bg-gray-100"
                                    title={item.isAvailable ? "Mark unavailable" : "Mark available"}
                                >
                                    {item.isAvailable ? <Eye size={14} /> : <EyeOff size={14} />}
                                </button>
                                <button
                                    onClick={() => setEditingItem(item)}
                                    className="p-1.5 rounded-xl hover:bg-gray-100"
                                    title="Edit"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item)}
                                    className="p-1.5 rounded-xl hover:bg-gray-100 text-red-500"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add Item */}
                    <button
                        onClick={() => setShowAddItem(true)}
                        className="w-full p-3 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-medium hover:border-solid transition-all"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
                    >
                        <Plus size={16} />
                        Add item to {category.name}
                    </button>

                    {/* Add Item Modal */}
                    {showAddItem && (
                        <ItemFormModal
                            categories={allCategories}
                            onClose={() => setShowAddItem(false)}
                        />
                    )}

                    {/* Edit Item Modal */}
                    {editingItem && (
                        <ItemFormModal
                            item={editingItem}
                            categories={allCategories}
                            onClose={() => setEditingItem(undefined)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Main Component ───────────────────────────

export default function AdminMenuClient({
    categories,
}: {
    categories: CategoryWithItems[];
}) {
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await createCategory(fd);
            if (res.success) {
                setShowNewCategory(false);
                (e.target as HTMLFormElement).reset();
            }
        });
    };

    const allCategories = categories.map(({ menuItems, ...rest }) => rest);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                        Menu Management
                    </h1>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        {categories.reduce((sum, c) => sum + c.menuItems.length, 0)} items across{" "}
                        {categories.length} categories
                    </p>
                </div>
                <button
                    onClick={() => setShowNewCategory(!showNewCategory)}
                    className="clay-button clay-button-primary text-sm flex items-center gap-2"
                >
                    <Plus size={16} />
                    New Category
                </button>
            </div>

            {/* New Category Form */}
            {showNewCategory && (
                <form onSubmit={handleNewCategory} className="clay-card p-4 flex gap-3 items-end">
                    <div className="flex-1">
                        <label className="text-sm font-medium mb-1 block">Category Name</label>
                        <input
                            name="name"
                            required
                            className="clay-input w-full"
                            placeholder="e.g. Drinks"
                            autoFocus
                        />
                    </div>
                    <button type="submit" disabled={isPending} className="clay-button clay-button-primary text-sm">
                        {isPending ? "Adding..." : "Add Category"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowNewCategory(false)}
                        className="clay-button clay-button-outline text-sm"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {/* Categories */}
            {categories.map((category) => (
                <CategoryRow
                    key={category.id}
                    category={category}
                    allCategories={allCategories}
                    onRefresh={() => { }}
                />
            ))}

            {categories.length === 0 && (
                <div className="clay-card-warm p-10 text-center">
                    <div className="text-4xl mb-3">🍽️</div>
                    <h3 className="font-bold mb-1">No categories yet</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Create your first category to start adding menu items
                    </p>
                </div>
            )}
        </div>
    );
}
