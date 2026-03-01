"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ─── Categories ───────────────────────────────

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    if (!name?.trim()) return { error: "Category name is required" };

    const maxOrder = await prisma.category.aggregate({ _max: { order: true } });
    await prisma.category.create({
        data: { name: name.trim(), order: (maxOrder._max.order ?? 0) + 1 },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    return { success: true };
}

export async function updateCategory(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    if (!name?.trim()) return { error: "Category name is required" };

    await prisma.category.update({ where: { id }, data: { name: name.trim() } });
    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    return { success: true };
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    return { success: true };
}

// ─── Menu Items ───────────────────────────────

export async function createMenuItem(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;
    const isFeatured = formData.get("isFeatured") === "on";
    const imageUrl = (formData.get("imageUrl") as string) || null;

    if (!name?.trim()) return { error: "Item name is required" };
    if (isNaN(price) || price < 0) return { error: "Valid price is required" };
    if (!categoryId) return { error: "Category is required" };

    await prisma.menuItem.create({
        data: {
            name: name.trim(),
            description: description?.trim() || null,
            price,
            categoryId,
            isFeatured,
            imageUrl,
            isAvailable: true,
        },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    return { success: true };
}

export async function updateMenuItem(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;
    const isFeatured = formData.get("isFeatured") === "on";
    const imageUrl = (formData.get("imageUrl") as string) || null;

    if (!name?.trim()) return { error: "Item name is required" };
    if (isNaN(price) || price < 0) return { error: "Valid price is required" };

    await prisma.menuItem.update({
        where: { id },
        data: {
            name: name.trim(),
            description: description?.trim() || null,
            price,
            categoryId,
            isFeatured,
            imageUrl,
        },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    return { success: true };
}

export async function toggleItemAvailability(id: string, isAvailable: boolean) {
    await prisma.menuItem.update({
        where: { id },
        data: { isAvailable },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    return { success: true };
}

export async function deleteMenuItem(id: string) {
    await prisma.menuItem.delete({ where: { id } });
    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    return { success: true };
}
