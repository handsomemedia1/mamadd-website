"use server";

import { prisma } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

// Simple in-memory rate limiter
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function loginAction(
    _prevState: { error?: string } | null,
    formData: FormData
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Rate limiting
    const now = Date.now();
    const attempts = loginAttempts.get(email);
    if (attempts) {
        const timeSinceLastAttempt = now - attempts.lastAttempt;
        if (attempts.count >= 5 && timeSinceLastAttempt < 15 * 60 * 1000) {
            return { error: "Too many login attempts. Please try again in 15 minutes." };
        }
        if (timeSinceLastAttempt > 15 * 60 * 1000) {
            loginAttempts.delete(email);
        }
    }

    // Validate
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    // Find user
    const user = await prisma.adminUser.findUnique({
        where: { email: result.data.email },
    });

    if (!user) {
        const current = loginAttempts.get(email) || { count: 0, lastAttempt: now };
        loginAttempts.set(email, { count: current.count + 1, lastAttempt: now });
        return { error: "Invalid email or password" };
    }

    // Verify password
    const isValid = await verifyPassword(result.data.password, user.password);
    if (!isValid) {
        const current = loginAttempts.get(email) || { count: 0, lastAttempt: now };
        loginAttempts.set(email, { count: current.count + 1, lastAttempt: now });
        return { error: "Invalid email or password" };
    }

    // Create session
    loginAttempts.delete(email);
    await createSession(user.id);

    redirect("/admin");
}
