import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, name } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
        }

        // Check if already subscribed
        const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (existing) {
            if (existing.isActive) {
                return NextResponse.json({ message: "already_subscribed" });
            }
            // Re-activate
            await prisma.newsletterSubscriber.update({
                where: { id: existing.id },
                data: { isActive: true, name: name || existing.name },
            });
            return NextResponse.json({ message: "resubscribed" });
        }

        await prisma.newsletterSubscriber.create({
            data: {
                email: email.toLowerCase().trim(),
                name: name || null,
            },
        });

        return NextResponse.json({ message: "subscribed" });
    } catch (error: any) {
        console.error("Newsletter subscribe error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
