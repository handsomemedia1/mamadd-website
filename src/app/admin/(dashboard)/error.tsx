"use client";

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center p-8">
            <div className="clay-card p-10 text-center max-w-md">
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Something went wrong
                </h2>
                <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                    The database may be waking up from sleep (Neon cold start). This usually takes 5–10 seconds.
                    Please try again.
                </p>
                {error.digest && (
                    <p className="text-xs mb-4 font-mono" style={{ color: "var(--color-text-muted)" }}>
                        Error code: {error.digest}
                    </p>
                )}
                <button
                    onClick={reset}
                    className="clay-button clay-button-primary px-6 py-3 font-bold"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
