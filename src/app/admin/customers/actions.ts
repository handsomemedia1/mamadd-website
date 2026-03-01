"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addPoints(customerId: string, points: number, description: string) {
    await prisma.customer.update({
        where: { id: customerId },
        data: { points: { increment: points } },
    });
    await prisma.pointTransaction.create({
        data: { customerId, points, type: "manual", description },
    });
    revalidatePath("/admin/customers");
}

export async function deductPoints(customerId: string, points: number, description: string) {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer || customer.points < points) {
        return { error: "Insufficient points" };
    }
    await prisma.customer.update({
        where: { id: customerId },
        data: { points: { decrement: points } },
    });
    await prisma.pointTransaction.create({
        data: { customerId, points: -points, type: "redemption", description },
    });
    revalidatePath("/admin/customers");
}

export async function addOrderPoints(customerId: string, orderAmountEuros: number) {
    const points = Math.floor(orderAmountEuros * 10);
    await prisma.customer.update({
        where: { id: customerId },
        data: { points: { increment: points } },
    });
    await prisma.pointTransaction.create({
        data: {
            customerId,
            points,
            type: "order",
            description: `Order of €${orderAmountEuros.toFixed(2)} — ${points} points earned`,
        },
    });
    revalidatePath("/admin/customers");
}
