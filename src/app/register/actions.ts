"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

function generateReferralCode(name: string): string {
    const prefix = "MAMA";
    const namePart = name.slice(0, 2).toUpperCase().replace(/[^A-Z]/g, "X");
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${namePart}${randomPart}`;
}

export async function registerCustomer(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const whatsappNumber = (formData.get("whatsappNumber") as string) || null;
    const referralCode = formData.get("referralCode") as string;
    const isSubscribed = formData.get("isSubscribed") === "on";

    if (!name || !email || !phone) {
        return { error: "Please fill in all required fields." };
    }

    // Check if already registered
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
        return { error: "This email is already registered. Check your loyalty points below!" };
    }

    // Validate referral code if provided
    let referrer = null;
    if (referralCode && referralCode.trim()) {
        referrer = await prisma.customer.findUnique({
            where: { referralCode: referralCode.trim().toUpperCase() },
        });
        if (!referrer) {
            return { error: "Invalid referral code. Leave it blank if you don't have one." };
        }
    }

    // Generate unique referral code for new customer
    let newCode = generateReferralCode(name);
    let attempts = 0;
    while (attempts < 10) {
        const taken = await prisma.customer.findUnique({ where: { referralCode: newCode } });
        if (!taken) break;
        newCode = generateReferralCode(name);
        attempts++;
    }

    // Create customer (referee gets 100 pts if they used a code)
    const startingPoints = referrer ? 100 : 0;
    const customer = await prisma.customer.create({
        data: {
            name,
            email,
            phone,
            whatsappNumber,
            referralCode: newCode,
            referredBy: referrer ? referralCode.trim().toUpperCase() : null,
            points: startingPoints,
            isSubscribed,
        },
    });

    // Log the signup bonus for the new customer
    if (referrer) {
        await prisma.pointTransaction.create({
            data: {
                customerId: customer.id,
                points: 100,
                type: "referral_signup",
                description: `Referral signup bonus — used code ${referralCode.toUpperCase()}`,
            },
        });

        // Give referrer their 50 bonus points
        await prisma.customer.update({
            where: { id: referrer.id },
            data: { points: { increment: 50 } },
        });
        await prisma.pointTransaction.create({
            data: {
                customerId: referrer.id,
                points: 50,
                type: "referral_bonus",
                description: `${name} joined using your referral code`,
            },
        });
    }

    revalidatePath("/register");
    return { success: true, referralCode: newCode, points: startingPoints, name };
}
