import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import MenuContent from "@/components/MenuContent";

export const metadata: Metadata = {
    title: "Menu",
    description:
        "Browse Mama DD's full menu — authentic West African dishes including Jollof Rice, Egusi Soup, Asun, Fried Plantain, and more. Order via WhatsApp for pickup in Enschede.",
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let categories: any[] = [];
    try {
        categories = await prisma.category.findMany({
            orderBy: { order: "asc" },
            include: {
                menuItems: {
                    where: { isAvailable: true },
                    orderBy: { name: "asc" },
                },
            },
        });
    } catch {
        // Retry once on cold-start / connection drop
        try {
            categories = await prisma.category.findMany({
                orderBy: { order: "asc" },
                include: {
                    menuItems: {
                        where: { isAvailable: true },
                        orderBy: { name: "asc" },
                    },
                },
            });
        } catch {
            categories = [];
        }
    }

    // Serialize for client component (Prisma Decimal → number)
    const serialized = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        order: cat.order,
        menuItems: cat.menuItems.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: Number(item.price),
            imageUrl: item.imageUrl,
            isFeatured: item.isFeatured,
            isAvailable: item.isAvailable,
        })),
    }));

    return <MenuContent categories={serialized} />;
}
