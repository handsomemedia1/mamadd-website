"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");
    return session;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

// ─── Legal Pages ──────────────────────────────

export async function createLegalPage(formData: FormData) {
    await requireAdmin();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as string;
    const isActive = formData.get("isActive") === "on";

    if (!title?.trim()) return { error: "Title is required" };
    if (!content?.trim()) return { error: "Content is required" };
    if (!type) return { error: "Type is required" };

    let slug = slugify(title);
    const existing = await prisma.legalPage.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const maxOrder = await prisma.legalPage.aggregate({ _max: { order: true } });

    await prisma.legalPage.create({
        data: {
            title: title.trim(),
            slug,
            content: content.trim(),
            type,
            isActive,
            order: (maxOrder._max.order ?? 0) + 1,
        },
    });

    revalidatePath("/admin/legal");
    revalidatePath("/legal");
    return { success: true };
}

export async function updateLegalPage(id: string, formData: FormData) {
    await requireAdmin();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as string;
    const isActive = formData.get("isActive") === "on";

    if (!title?.trim()) return { error: "Title is required" };
    if (!content?.trim()) return { error: "Content is required" };

    await prisma.legalPage.update({
        where: { id },
        data: {
            title: title.trim(),
            slug: slug?.trim() || slugify(title),
            content: content.trim(),
            type,
            isActive,
        },
    });

    revalidatePath("/admin/legal");
    revalidatePath("/legal");
    revalidatePath(`/legal/${slug}`);
    return { success: true };
}

export async function deleteLegalPage(id: string) {
    await requireAdmin();
    await prisma.legalPage.delete({ where: { id } });
    revalidatePath("/admin/legal");
    revalidatePath("/legal");
    return { success: true };
}

// ─── Payment Methods ──────────────────────────

export async function createPaymentMethod(formData: FormData) {
    await requireAdmin();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const instructions = formData.get("instructions") as string;
    const isActive = formData.get("isActive") === "on";

    if (!name?.trim()) return { error: "Name is required" };

    const maxOrder = await prisma.paymentMethod.aggregate({ _max: { order: true } });

    await prisma.paymentMethod.create({
        data: {
            name: name.trim(),
            description: description?.trim() || null,
            icon: icon?.trim() || null,
            instructions: instructions?.trim() || null,
            isActive,
            order: (maxOrder._max.order ?? 0) + 1,
        },
    });

    revalidatePath("/admin/legal");
    revalidatePath("/legal");
    return { success: true };
}

export async function updatePaymentMethod(id: string, formData: FormData) {
    await requireAdmin();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const instructions = formData.get("instructions") as string;
    const isActive = formData.get("isActive") === "on";

    if (!name?.trim()) return { error: "Name is required" };

    await prisma.paymentMethod.update({
        where: { id },
        data: {
            name: name.trim(),
            description: description?.trim() || null,
            icon: icon?.trim() || null,
            instructions: instructions?.trim() || null,
            isActive,
        },
    });

    revalidatePath("/admin/legal");
    revalidatePath("/legal");
    return { success: true };
}

export async function deletePaymentMethod(id: string) {
    await requireAdmin();
    await prisma.paymentMethod.delete({ where: { id } });
    revalidatePath("/admin/legal");
    revalidatePath("/legal");
    return { success: true };
}
