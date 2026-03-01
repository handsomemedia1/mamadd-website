import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE_MB = 5;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Only JPEG, PNG, WebP, GIF and AVIF images are allowed" },
                { status: 400 }
            );
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            return NextResponse.json(
                { error: `Image must be under ${MAX_SIZE_MB}MB` },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitise filename
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });

        const filePath = path.join(uploadsDir, safeName);
        await writeFile(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${safeName}` });
    } catch (err) {
        console.error("[upload] error:", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
