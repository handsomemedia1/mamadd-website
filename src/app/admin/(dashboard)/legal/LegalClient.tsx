"use client";

import { useState, useTransition } from "react";
import {
    createLegalPage,
    updateLegalPage,
    deleteLegalPage,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
} from "./actions";
import type { LegalPage, PaymentMethod } from "@/generated/prisma/client";
import {
    Plus,
    Pencil,
    Trash2,
    X,
    FileText,
    CreditCard,
    Shield,
    ScrollText,
    Award,
} from "lucide-react";

const PAGE_TYPES = [
    { value: "terms", label: "Terms & Conditions", icon: "📜" },
    { value: "privacy", label: "Privacy Policy", icon: "🔒" },
    { value: "legal-notice", label: "Legal Notice / Imprint", icon: "⚖️" },
    { value: "certificate", label: "Registration / Certificate", icon: "🏛️" },
    { value: "other", label: "Other", icon: "📄" },
];

// ─── Legal Page Form Modal ────────────────────

function LegalFormModal({
    page,
    onClose,
}: {
    page?: LegalPage;
    onClose: () => void;
}) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = page
                ? await updateLegalPage(page.id, fd)
                : await createLegalPage(fd);
            if (res.error) setError(res.error);
            else onClose();
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="clay-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                        {page ? "Edit Legal Page" : "New Legal Page"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:opacity-60"><X size={20} /></button>
                </div>

                {error && <div className="mb-3 p-2 rounded-xl text-sm text-red-700 bg-red-50">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Title *</label>
                        <input name="title" defaultValue={page?.title} required className="clay-input w-full" placeholder="e.g. Terms & Conditions" />
                    </div>
                    {page && (
                        <div>
                            <label className="text-sm font-medium mb-1 block">Slug</label>
                            <input name="slug" defaultValue={page?.slug} className="clay-input w-full" />
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-medium mb-1 block">Type *</label>
                        <select name="type" defaultValue={page?.type || "terms"} required className="clay-input w-full">
                            {PAGE_TYPES.map((t) => (
                                <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Content *</label>
                        <textarea name="content" defaultValue={page?.content} required className="clay-input w-full" rows={12} placeholder="Page content... (Markdown supported)" />
                    </div>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" name="isActive" defaultChecked={page?.isActive ?? true} className="rounded" />
                        Active (visible on website)
                    </label>
                    <button type="submit" disabled={isPending} className="clay-button clay-button-primary w-full text-sm">
                        {isPending ? "Saving..." : page ? "Update Page" : "Create Page"}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ─── Payment Method Form Modal ────────────────

function PaymentFormModal({
    method,
    onClose,
}: {
    method?: PaymentMethod;
    onClose: () => void;
}) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = method
                ? await updatePaymentMethod(method.id, fd)
                : await createPaymentMethod(fd);
            if (res.error) setError(res.error);
            else onClose();
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="clay-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                        {method ? "Edit Payment Method" : "Add Payment Method"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:opacity-60"><X size={20} /></button>
                </div>

                {error && <div className="mb-3 p-2 rounded-xl text-sm text-red-700 bg-red-50">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Name *</label>
                        <input name="name" defaultValue={method?.name} required className="clay-input w-full" placeholder="e.g. Cash on Pickup" />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Icon (emoji)</label>
                        <input name="icon" defaultValue={method?.icon ?? ""} className="clay-input w-full" placeholder="💵 or 💳" />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <input name="description" defaultValue={method?.description ?? ""} className="clay-input w-full" placeholder="Short description..." />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Instructions</label>
                        <textarea name="instructions" defaultValue={method?.instructions ?? ""} className="clay-input w-full" rows={3} placeholder="How to pay with this method..." />
                    </div>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" name="isActive" defaultChecked={method?.isActive ?? true} className="rounded" />
                        Active (shown on website)
                    </label>
                    <button type="submit" disabled={isPending} className="clay-button clay-button-primary w-full text-sm">
                        {isPending ? "Saving..." : method ? "Update" : "Add Method"}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────

export default function AdminLegalClient({
    legalPages,
    paymentMethods,
}: {
    legalPages: LegalPage[];
    paymentMethods: PaymentMethod[];
}) {
    const [showNewPage, setShowNewPage] = useState(false);
    const [editingPage, setEditingPage] = useState<LegalPage | undefined>();
    const [showNewPayment, setShowNewPayment] = useState(false);
    const [editingPayment, setEditingPayment] = useState<PaymentMethod | undefined>();
    const [isPending, startTransition] = useTransition();

    const handleDeletePage = (page: LegalPage) => {
        if (!confirm(`Delete "${page.title}"?`)) return;
        startTransition(async () => { await deleteLegalPage(page.id); });
    };

    const handleDeletePayment = (method: PaymentMethod) => {
        if (!confirm(`Delete "${method.name}"?`)) return;
        startTransition(async () => { await deletePaymentMethod(method.id); });
    };

    const getTypeInfo = (type: string) =>
        PAGE_TYPES.find((t) => t.value === type) || PAGE_TYPES[4];

    return (
        <div className="space-y-8">
            {/* ── Legal Pages ── */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                            Legal & Compliance
                        </h1>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                            Manage terms, policies, certificates, and legal notices
                        </p>
                    </div>
                    <button onClick={() => setShowNewPage(true)} className="clay-button clay-button-primary text-sm flex items-center gap-2">
                        <Plus size={16} /> New Page
                    </button>
                </div>

                {legalPages.length === 0 ? (
                    <div className="clay-card-warm p-8 text-center">
                        <Shield size={32} className="mx-auto mb-3 opacity-40" />
                        <h3 className="font-bold mb-1">No legal pages yet</h3>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                            Add terms, privacy policy, business certificates, and more
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {legalPages.map((page) => {
                            const typeInfo = getTypeInfo(page.type);
                            return (
                                <div key={page.id} className={`clay-card p-4 flex items-center gap-4 ${!page.isActive ? "opacity-50" : ""}`}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "var(--color-cream)" }}>
                                        {typeInfo.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm">{page.title}</h3>
                                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                            <span>{typeInfo.label}</span>
                                            <span>·</span>
                                            <span className={page.isActive ? "text-green-600" : "text-red-500"}>
                                                {page.isActive ? "Active" : "Hidden"}
                                            </span>
                                            <span>·</span>
                                            <span>/legal/{page.slug}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setEditingPage(page)} className="p-2 rounded-xl hover:bg-gray-100"><Pencil size={15} /></button>
                                    <button onClick={() => handleDeletePage(page)} className="p-2 rounded-xl hover:bg-gray-100 text-red-500"><Trash2 size={15} /></button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── Payment Methods ── */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                            Payment Methods
                        </h2>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                            Configure accepted payment methods shown to customers
                        </p>
                    </div>
                    <button onClick={() => setShowNewPayment(true)} className="clay-button clay-button-accent text-sm flex items-center gap-2">
                        <Plus size={16} /> Add Method
                    </button>
                </div>

                {paymentMethods.length === 0 ? (
                    <div className="clay-card-warm p-8 text-center">
                        <CreditCard size={32} className="mx-auto mb-3 opacity-40" />
                        <h3 className="font-bold mb-1">No payment methods</h3>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                            Add cash, bank transfer, iDEAL, or other payment options
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className={`clay-card p-4 ${!method.isActive ? "opacity-50" : ""}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{method.icon || "💳"}</span>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">{method.name}</h3>
                                        {method.description && (
                                            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{method.description}</p>
                                        )}
                                    </div>
                                    <span className={`text-xs font-bold ${method.isActive ? "text-green-600" : "text-red-500"}`}>
                                        {method.isActive ? "Active" : "Hidden"}
                                    </span>
                                </div>
                                {method.instructions && (
                                    <p className="text-xs p-2 rounded-xl" style={{ background: "var(--color-cream)", color: "var(--color-text-light)" }}>
                                        {method.instructions}
                                    </p>
                                )}
                                <div className="flex gap-1 mt-2 justify-end">
                                    <button onClick={() => setEditingPayment(method)} className="p-1.5 rounded-xl hover:bg-gray-100"><Pencil size={14} /></button>
                                    <button onClick={() => handleDeletePayment(method)} className="p-1.5 rounded-xl hover:bg-gray-100 text-red-500"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modals */}
            {showNewPage && <LegalFormModal onClose={() => setShowNewPage(false)} />}
            {editingPage && <LegalFormModal page={editingPage} onClose={() => setEditingPage(undefined)} />}
            {showNewPayment && <PaymentFormModal onClose={() => setShowNewPayment(false)} />}
            {editingPayment && <PaymentFormModal method={editingPayment} onClose={() => setEditingPayment(undefined)} />}
        </div>
    );
}
