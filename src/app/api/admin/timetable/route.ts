import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const UNAUTHORIZED = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// GET /api/admin/timetable?weekStart=2026-03-03
export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session) return UNAUTHORIZED();
    const { searchParams } = request.nextUrl;
    const weekStartStr = searchParams.get("weekStart");

    if (!weekStartStr) {
        return NextResponse.json({ error: "weekStart query param required (YYYY-MM-DD)" }, { status: 400 });
    }

    const weekStart = new Date(weekStartStr + "T00:00:00Z");
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const timetables = await prisma.foodTimetable.findMany({
        where: {
            date: { gte: weekStart, lt: weekEnd },
        },
        include: {
            items: {
                include: {
                    menuItem: true,
                },
            },
        },
        orderBy: { date: "asc" },
    });

    return NextResponse.json(timetables);
}

// POST /api/admin/timetable — create or update a day's timetable
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session) return UNAUTHORIZED();

    const body = await request.json();
    const { date, dayOfWeek, menuItemIds, note, isPublished } = body as {
        date: string;
        dayOfWeek: string;
        menuItemIds: string[];
        note?: string;
        isPublished?: boolean;
    };

    if (!date || !dayOfWeek || !menuItemIds) {
        return NextResponse.json({ error: "date, dayOfWeek, and menuItemIds are required" }, { status: 400 });
    }

    const dateObj = new Date(date + "T00:00:00Z");

    // Upsert the timetable for this date
    const timetable = await prisma.foodTimetable.upsert({
        where: { date: dateObj },
        create: {
            date: dateObj,
            dayOfWeek,
            note: note || null,
            isPublished: isPublished ?? false,
            items: {
                create: menuItemIds.map((id: string) => ({ menuItemId: id })),
            },
        },
        update: {
            dayOfWeek,
            note: note || null,
            isPublished: isPublished ?? false,
            items: {
                deleteMany: {},
                create: menuItemIds.map((id: string) => ({ menuItemId: id })),
            },
        },
        include: {
            items: { include: { menuItem: true } },
        },
    });

    return NextResponse.json(timetable);
}

// DELETE /api/admin/timetable?id=xxx
export async function DELETE(request: NextRequest) {
    const session = await getSession();
    if (!session) return UNAUTHORIZED();

    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "id query param required" }, { status: 400 });
    }

    await prisma.foodTimetable.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
