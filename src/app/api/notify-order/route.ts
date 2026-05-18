import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/notify-order
 *
 * Sends a WhatsApp notification to the restaurant owner via CallMeBot
 * when a customer places an email order.
 */
export async function POST(request: NextRequest) {
    try {
        const { items, total, orderType, customerEmail, customerPhone } =
            await request.json();

        const apiKey = process.env.CALLMEBOT_API_KEY;
        const ownerPhone = process.env.OWNER_PHONE;

        if (!apiKey || !ownerPhone) {
            console.warn("[notify-order] CALLMEBOT_API_KEY or OWNER_PHONE not set");
            return NextResponse.json(
                { ok: false, message: "Notification not configured" },
                { status: 200 } // Don't error out — the email still goes through
            );
        }

        // Build notification message
        const typeLabel =
            orderType === "catering" ? "🎉 Catering Order" : "🛍️ Pickup Order";
        const itemCount =
            Array.isArray(items) ? items.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0) : 0;

        let message = `📧 *New Email Order Incoming!*\n\n`;
        message += `${typeLabel}\n`;
        message += `📦 ${itemCount} item${itemCount !== 1 ? "s" : ""} · €${Number(total).toFixed(2)}\n\n`;

        // List items
        if (Array.isArray(items)) {
            items.forEach((item: { name: string; quantity: number; price: number }) => {
                message += `• ${item.name} x${item.quantity} — €${(item.price * item.quantity).toFixed(2)}\n`;
            });
            message += `\n`;
        }

        if (customerEmail) message += `📧 ${customerEmail}\n`;
        if (customerPhone) message += `📞 ${customerPhone}\n`;

        message += `\n👉 Check your inbox and reply quickly!`;

        // Send via CallMeBot
        const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(ownerPhone)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apiKey)}`;

        const res = await fetch(url, { method: "GET" });

        if (!res.ok) {
            console.error("[notify-order] CallMeBot error:", res.status, await res.text());
            return NextResponse.json({ ok: false, message: "Notification failed" });
        }

        console.log("[notify-order] WhatsApp notification sent successfully");
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[notify-order] Error:", error);
        return NextResponse.json({ ok: false, message: "Internal error" }, { status: 500 });
    }
}
