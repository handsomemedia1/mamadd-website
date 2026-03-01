"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const slotId = formData.get("slotId") as string;
    const partySize = parseInt(formData.get("partySize") as string) || 1;
    const notes = formData.get("notes") as string;

    if (!name || !email || !phone || !slotId) {
        return { error: "Please fill in all required fields." };
    }

    // Check slot still has space
    const slot = await prisma.availabilitySlot.findUnique({
        where: { id: slotId },
        include: { bookings: { where: { status: { not: "cancelled" } } } },
    });

    if (!slot || !slot.isOpen) {
        return { error: "This slot is no longer available. Please choose another." };
    }

    if (slot.bookings.length >= slot.maxBookings) {
        return { error: "This slot is fully booked. Please choose another time." };
    }

    // Get or create customer
    let customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
        // Auto-register a basic profile
        const code = `MAMA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        customer = await prisma.customer.create({
            data: { name, email, phone, referralCode: code, points: 0 },
        });
    }

    const booking = await prisma.booking.create({
        data: {
            customerId: customer.id,
            slotId,
            partySize,
            notes: notes || null,
            status: "pending",
        },
    });

    revalidatePath("/book");
    revalidatePath("/admin/bookings");

    return {
        success: true,
        bookingId: booking.id,
        name,
        slotDate: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        partySize,
    };
}

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
