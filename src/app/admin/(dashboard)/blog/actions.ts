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
    
    // SEO fields
    const coverImageAlt = formData.get("coverImageAlt") as string;
    const primaryKeyword = formData.get("primaryKeyword") as string;
    const secondaryKeywords = formData.get("secondaryKeywords") as string;
    const category = formData.get("category") as string;
    const tags = formData.get("tags") as string;
    const cluster = formData.get("cluster") as string;
    const targetPage = formData.get("targetPage") as string;
    const relatedArticles = formData.get("relatedArticles") as string;
    const isPillar = formData.get("isPillar") === "on";

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
            
            coverImageAlt: coverImageAlt?.trim() || null,
            primaryKeyword: primaryKeyword?.trim() || null,
            secondaryKeywords: secondaryKeywords?.trim() || null,
            category: category?.trim() || null,
            tags: tags?.trim() || null,
            cluster: cluster?.trim() || null,
            targetPage: targetPage?.trim() || null,
            relatedArticles: relatedArticles?.trim() || null,
            isPillar,

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
    const slugInput = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const coverImage = formData.get("coverImage") as string;
    
    // SEO fields
    const coverImageAlt = formData.get("coverImageAlt") as string;
    const primaryKeyword = formData.get("primaryKeyword") as string;
    const secondaryKeywords = formData.get("secondaryKeywords") as string;
    const category = formData.get("category") as string;
    const tags = formData.get("tags") as string;
    const cluster = formData.get("cluster") as string;
    const targetPage = formData.get("targetPage") as string;
    const relatedArticles = formData.get("relatedArticles") as string;
    const isPillar = formData.get("isPillar") === "on";

    const published = formData.get("published") === "on";

    if (!title?.trim()) return { error: "Title is required" };
    if (!content?.trim()) return { error: "Content is required" };

    const oldPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!oldPost) return { error: "Post not found" };

    const newSlug = slugInput?.trim() || slugify(title);

    // Create redirect if published slug changes
    if (oldPost.slug !== newSlug && oldPost.published) {
        await prisma.redirect.upsert({
            where: { source: `/blog/${oldPost.slug}` },
            update: { destination: `/blog/${newSlug}` },
            create: {
                source: `/blog/${oldPost.slug}`,
                destination: `/blog/${newSlug}`,
                permanent: true,
            }
        });
    }

    await prisma.blogPost.update({
        where: { id },
        data: {
            title: title.trim(),
            slug: newSlug,
            excerpt: excerpt?.trim() || null,
            content: content.trim(),
            metaTitle: metaTitle?.trim() || null,
            metaDescription: metaDescription?.trim() || null,
            coverImage: coverImage?.trim() || null,
            
            coverImageAlt: coverImageAlt?.trim() || null,
            primaryKeyword: primaryKeyword?.trim() || null,
            secondaryKeywords: secondaryKeywords?.trim() || null,
            category: category?.trim() || null,
            tags: tags?.trim() || null,
            cluster: cluster?.trim() || null,
            targetPage: targetPage?.trim() || null,
            relatedArticles: relatedArticles?.trim() || null,
            isPillar,

            published,
        },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${oldPost.slug}`);
    revalidatePath(`/blog/${newSlug}`);
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
