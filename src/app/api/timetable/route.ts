import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/timetable?weekStart=2026-03-03  (public — only published days)
export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const weekStartStr = searchParams.get("weekStart");

    // Default to current week's Monday
    let weekStart: Date;
    if (weekStartStr) {
        weekStart = new Date(weekStartStr + "T00:00:00Z");
    } else {
        const now = new Date();
        const dayOfWeek = now.getUTCDay(); // 0=Sun, 1=Mon...
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        weekStart = new Date(now);
        weekStart.setUTCDate(now.getUTCDate() + diff);
        weekStart.setUTCHours(0, 0, 0, 0);
    }

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const timetables = await prisma.foodTimetable.findMany({
        where: {
            date: { gte: weekStart, lt: weekEnd },
            isPublished: true,
        },
        include: {
            items: {
                include: {
                    menuItem: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            imageUrl: true,
                        },
                    },
                },
            },
        },
        orderBy: { date: "asc" },
    });

    // Serialize prices (Prisma Float → number)
    const serialized = timetables.map((t) => ({
        id: t.id,
        date: t.date.toISOString(),
        dayOfWeek: t.dayOfWeek,
        note: t.note,
        items: t.items.map((item) => ({
            id: item.id,
            specialPrice: item.specialPrice ? Number(item.specialPrice) : null,
            note: item.note,
            menuItem: {
                ...item.menuItem,
                price: Number(item.menuItem.price),
            },
        })),
    }));

    return NextResponse.json({
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
        days: serialized,
    });
}
