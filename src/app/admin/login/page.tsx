"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ background: "var(--color-background)" }}
        >
            <div className="clay-card p-8 w-full max-w-md animate-scale-in">
                <div className="flex flex-col items-center mb-8">
                    <Logo size="lg" />
                    <h1
                        className="mt-6 text-xl font-semibold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
                    >
                        Admin Dashboard
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Sign in to manage your restaurant
                    </p>
                </div>

                <form action={formAction} className="flex flex-col gap-4">
                    {state?.error && (
                        <div
                            className="clay-badge px-4 py-3 w-full text-sm justify-center"
                            style={{ background: "#FEE2E2", color: "var(--color-error)" }}
                        >
                            {state.error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--color-text-light)" }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="clay-input w-full"
                            placeholder="admin@mamadd.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--color-text-light)" }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="clay-input w-full"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="clay-button clay-button-primary w-full mt-2 text-center disabled:opacity-60"
                    >
                        {isPending ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
