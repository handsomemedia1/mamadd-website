/**
 * neon-ping.mjs
 * ─────────────────────────────────────────────────────────────────
 * Keep-alive script for Neon Postgres (free tier).
 *
 * Neon suspends the database after ~5 minutes of inactivity.
 * This script pings the database every 4 minutes to prevent suspension.
 *
 * USAGE:
 *   node scripts/neon-ping.mjs            # runs a one-off ping
 *   node scripts/neon-ping.mjs --watch    # runs continuously every 4 min
 *
 * SCHEDULING OPTIONS (pick one):
 *   A) Vercel Cron (recommended for production) — see vercel.json section below
 *   B) Neon's own scheduled queries (Neon Console → Scheduled queries)
 *   C) A free cron job service like cron-job.org pointing at /api/ping
 *   D) Local: node scripts/neon-ping.mjs --watch  (only while PC is on)
 * ─────────────────────────────────────────────────────────────────
 */

import { createRequire } from "module";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// ─── Load .env ────────────────────────────────────────────────────
const envPath = resolve(__dirname, "../.env");
if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, "utf8");
    for (const line of envContent.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        let value = trimmed.slice(eqIdx + 1).trim();
        // Strip surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
    }
}

// ─── Config ────────────────────────────────────────────────────────
const DATABASE_URL = process.env.DATABASE_URL;
const PING_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes (Neon suspends at 5 min)
const watchMode = process.argv.includes("--watch");

if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set. Check your .env file.");
    process.exit(1);
}

// ─── Ping function ─────────────────────────────────────────────────
async function pingDatabase() {
    const timestamp = new Date().toISOString();
    try {
        // Dynamically import pg (works with both pg and @prisma/adapter-pg)
        const { default: pg } = await import("pg");
        const { Pool } = pg;

        const pool = new Pool({
            connectionString: DATABASE_URL,
            max: 1,
            idleTimeoutMillis: 5000,
            connectionTimeoutMillis: 10000,
            ssl: { rejectUnauthorized: false },
        });

        const result = await pool.query("SELECT 1 AS ping");
        await pool.end();

        const pingValue = result.rows[0]?.ping;
        if (pingValue === 1) {
            console.log(`✅ [${timestamp}] Neon DB ping successful — database is awake.`);
            return true;
        } else {
            console.warn(`⚠️  [${timestamp}] Unexpected ping response:`, result.rows);
            return false;
        }
    } catch (err) {
        console.error(`❌ [${timestamp}] Neon DB ping failed:`, err.message);
        return false;
    }
}

// ─── Main ──────────────────────────────────────────────────────────
console.log("🟢 Neon DB Keep-Alive Script");
console.log(`   Mode: ${watchMode ? `Watch (every ${PING_INTERVAL_MS / 60000} minutes)` : "One-shot"}`);
console.log(`   DB:   ${DATABASE_URL.replace(/:([^@]+)@/, ":***@")}`); // mask password
console.log("");

// Run immediately
await pingDatabase();

if (watchMode) {
    console.log(`⏱  Scheduling pings every ${PING_INTERVAL_MS / 60000} minutes. Press Ctrl+C to stop.\n`);
    setInterval(pingDatabase, PING_INTERVAL_MS);
}
