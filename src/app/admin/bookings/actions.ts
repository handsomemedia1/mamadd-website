"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(bookingId: string, status: "confirmed" | "cancelled") {
    await prisma.booking.update({
        where: { id: bookingId },
        data: { status },
    });
    revalidatePath("/admin/bookings");
}

export async function createSlot(formData: FormData) {
    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const maxBookings = parseInt(formData.get("maxBookings") as string) || 10;
    const note = formData.get("note") as string;

    await prisma.availabilitySlot.create({
        data: {
            date: new Date(date),
            startTime,
            endTime,
            maxBookings,
            note: note || null,
            isOpen: true,
        },
    });
    revalidatePath("/admin/bookings");
    revalidatePath("/book");
}

export async function toggleSlot(slotId: string, isOpen: boolean) {
    await prisma.availabilitySlot.update({
        where: { id: slotId },
        data: { isOpen: !isOpen },
    });
    revalidatePath("/admin/bookings");
    revalidatePath("/book");
}

export async function deleteSlot(slotId: string) {
    await prisma.availabilitySlot.delete({ where: { id: slotId } });
    revalidatePath("/admin/bookings");
    revalidatePath("/book");
}
