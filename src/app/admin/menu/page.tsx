import { prisma } from "@/lib/db";
import AdminMenuClient from "./MenuClient";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
    const categories = await prisma.category.findMany({
        orderBy: { order: "asc" },
        include: {
            menuItems: {
                orderBy: { name: "asc" },
            },
        },
    });

    return <AdminMenuClient categories={categories} />;
}
