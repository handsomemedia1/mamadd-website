import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SALT_ROUNDS = 12;
const SESSION_COOKIE = "mama-dds-session";

function getSecret(): string {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.includes("change-in-production") || secret.includes("change-this")) {
        throw new Error(
            "SESSION_SECRET environment variable is not set or is using a default value. Set a strong, unique secret in your .env / Vercel environment variables."
        );
    }
    return secret;
}

export async function hashPassword(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
}

export async function createSession(userId: string): Promise<void> {
    const cookieStore = await cookies();
    const token = jwt.sign({ userId }, getSecret(), { expiresIn: "7d" });

    cookieStore.set(SESSION_COOKIE, token, {
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
        const decoded = jwt.verify(session.value, getSecret()) as { userId: string };
        return { userId: decoded.userId };
    } catch {
        // Token invalid or expired — destroy it
        await destroySession();
        return null;
    }
}

export async function destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}
