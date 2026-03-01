import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/admin/timetable/menu-items — returns all menu items for the admin picker
export async function GET() {
    const items = await prisma.menuItem.findMany({
        where: { isAvailable: true },
        select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            categoryId: true,
        },
        orderBy: { name: "asc" },
    });

    return NextResponse.json(
        items.map((i) => ({ ...i, price: Number(i.price) }))
    );
}
