import { prisma } from "@/lib/db";
import AdminBlogClient from "./BlogClient";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <AdminBlogClient posts={posts} />;
}
