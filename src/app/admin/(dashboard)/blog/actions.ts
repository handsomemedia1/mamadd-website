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

export async function createBlogPost(formData: FormData) {
    await requireAdmin();
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const coverImage = formData.get("coverImage") as string;
    const published = formData.get("published") === "on";

    if (!title?.trim()) return { error: "Title is required" };
    if (!content?.trim()) return { error: "Content is required" };

    let slug = slugify(title);
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    await prisma.blogPost.create({
        data: {
            title: title.trim(),
            slug,
            excerpt: excerpt?.trim() || null,
            content: content.trim(),
            metaTitle: metaTitle?.trim() || null,
            metaDescription: metaDescription?.trim() || null,
            coverImage: coverImage?.trim() || null,
            published,
        },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
}

export async function updateBlogPost(id: string, formData: FormData) {
    await requireAdmin();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const coverImage = formData.get("coverImage") as string;
    const published = formData.get("published") === "on";

    if (!title?.trim()) return { error: "Title is required" };
    if (!content?.trim()) return { error: "Content is required" };

    await prisma.blogPost.update({
        where: { id },
        data: {
            title: title.trim(),
            slug: slug?.trim() || slugify(title),
            excerpt: excerpt?.trim() || null,
            content: content.trim(),
            metaTitle: metaTitle?.trim() || null,
            metaDescription: metaDescription?.trim() || null,
            coverImage: coverImage?.trim() || null,
            published,
        },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    return { success: true };
}

export async function togglePublished(id: string, published: boolean) {
    await requireAdmin();
    await prisma.blogPost.update({
        where: { id },
        data: { published },
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
}

export async function deleteBlogPost(id: string) {
    await requireAdmin();
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
}
