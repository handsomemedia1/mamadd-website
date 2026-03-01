"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon } from "lucide-react";

interface ImageUploaderProps {
    /** The form field name that holds the final image URL */
    name: string;
    /** Initial value (e.g. when editing an existing record) */
    defaultValue?: string;
    label?: string;
}

/**
 * Dual-mode image input:
 *  - Click to browse a file from local storage → uploads via /api/upload
 *  - Or paste a URL directly
 * Stores the resolved URL in a hidden <input> so it's included in FormData.
 */
export default function ImageUploader({
    name,
    defaultValue = "",
    label = "Image",
}: ImageUploaderProps) {
    const [url, setUrl] = useState(defaultValue);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState<"file" | "url">("file");
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setError("");
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error ?? "Upload failed");
            setUrl(json.url);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
            // reset so same file can be picked again
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">{label}</label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setMode("file")}
                        className={`text-xs px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${mode === "file" ? "font-bold" : "opacity-50"
                            }`}
                        style={{ background: mode === "file" ? "var(--color-accent-light)" : "transparent" }}
                    >
                        <Upload size={11} /> Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("url")}
                        className={`text-xs px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${mode === "url" ? "font-bold" : "opacity-50"
                            }`}
                        style={{ background: mode === "url" ? "var(--color-accent-light)" : "transparent" }}
                    >
                        <LinkIcon size={11} /> URL
                    </button>
                </div>
            </div>

            {/* Hidden field that goes into FormData */}
            <input type="hidden" name={name} value={url} />

            {/* Preview */}
            {url && (
                <div className="relative mb-2 rounded-2xl overflow-hidden" style={{ height: "150px" }}>
                    <Image
                        src={url}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized={url.startsWith("http")}
                    />
                    <button
                        type="button"
                        onClick={() => setUrl("")}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* File picker */}
            {mode === "file" ? (
                <div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                        className="hidden"
                        onChange={handleFilePick}
                        id={`file-pick-${name}`}
                    />
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="clay-button clay-button-outline w-full text-sm py-3 flex items-center justify-center gap-2"
                        style={{ borderStyle: "dashed" }}
                    >
                        {uploading ? (
                            <>
                                <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                                Uploading…
                            </>
                        ) : (
                            <>
                                <Upload size={16} />
                                {url ? "Replace image" : "Choose from device"}
                            </>
                        )}
                    </button>
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                        JPEG, PNG, WebP · max 5 MB
                    </p>
                </div>
            ) : (
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="clay-input w-full"
                    placeholder="https://example.com/image.jpg"
                />
            )}

            {error && (
                <p className="text-xs text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
}
