import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/ping
 *
 * Keep-alive endpoint for Neon Postgres.
 * Called by Vercel Cron every 4 minutes to prevent the database from
 * going cold (Neon free tier suspends after ~5 min of inactivity).
 *
 * Configure in vercel.json:
 * {
 *   "crons": [{ "path": "/api/ping", "schedule": "* /4 * * * *" }]
 * }
 *
 * Security: Only allows requests from Vercel Cron (checked via header)
 * or with the correct CRON_SECRET env var for manual calls.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    // Verify this is a legitimate Vercel Cron call or an authorized manual ping
    const authorization = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret) {
        const isVercelCron = req.headers.get("x-vercel-cron") === "1";
        const hasValidSecret = authorization === `Bearer ${cronSecret}`;

        if (!isVercelCron && !hasValidSecret) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    const start = Date.now();

    try {
        // Run a lightweight query to wake the database
        await prisma.$queryRaw`SELECT 1`;

        const elapsed = Date.now() - start;
        const timestamp = new Date().toISOString();

        console.log(`[/api/ping] Neon DB keep-alive ping OK — ${elapsed}ms — ${timestamp}`);

        return NextResponse.json({
            ok: true,
            message: "Database is awake",
            elapsed_ms: elapsed,
            timestamp,
        });
    } catch (err) {
        const elapsed = Date.now() - start;
        console.error("[/api/ping] Database ping failed:", err);

        return NextResponse.json(
            {
                ok: false,
                message: "Database ping failed",
                elapsed_ms: elapsed,
                timestamp: new Date().toISOString(),
                error: err instanceof Error ? err.message : "Unknown error",
            },
            { status: 503 }
        );
    }
}
