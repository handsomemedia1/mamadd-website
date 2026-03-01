import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";

const SALT_ROUNDS = 12;
const SESSION_COOKIE = "mama-dds-session";
const SESSION_SECRET = process.env.SESSION_SECRET || "mama-dds-secret-key-change-in-production";

export async function hashPassword(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
}

export async function createSession(userId: string): Promise<void> {
    const cookieStore = await cookies();
    // Simple session: store user ID encoded in base64
    // In production, use JWT or encrypted session tokens
    const sessionData = Buffer.from(
        JSON.stringify({ userId, createdAt: Date.now() })
    ).toString("base64");

    cookieStore.set(SESSION_COOKIE, sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });
}

export async function getSession(): Promise<{ userId: string } | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);

    if (!session?.value) return null;

    try {
        const data = JSON.parse(Buffer.from(session.value, "base64").toString());

        // Check if session is expired (7 days)
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - data.createdAt > sevenDays) {
            await destroySession();
            return null;
        }

        return { userId: data.userId };
    } catch {
        return null;
    }
}

export async function destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}
