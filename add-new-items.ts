import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Connecting to database...");
    
    // Find Banku and update, or create if not found
    const bankuItems = await prisma.menuItem.findMany({ where: { name: { contains: "Banku" } } });
    if (bankuItems.length > 0) {
        for (const item of bankuItems) {
            await prisma.menuItem.update({
                where: { id: item.id },
                data: { imageUrl: "/menu/banku-soup.png" }
            });
            console.log("Updated existing Banku item:", item.name);
        }
    } else {
        await prisma.menuItem.create({
            data: {
                name: "Banku (Ghanaian Fufu) + Soup + Beef/Chicken/Fish",
                description: "Banku is a traditional Ghanaian staple made from fermented corn and cassava dough. Banku will be served with your choice of soup and protein (chicken/beef/fish) and soft drink",
                price: 17.99,
                categoryId: "cat-swallow",
                imageUrl: "/menu/banku-soup.png",
                isFeatured: true,
                isAvailable: true
            }
        });
        console.log("Created new Banku item");
    }

    // Find Poundo and update, or create if not found
    const poundoItems = await prisma.menuItem.findMany({ where: { name: { contains: "Poundo" } } });
    if (poundoItems.length > 0) {
        for (const item of poundoItems) {
            await prisma.menuItem.update({
                where: { id: item.id },
                data: { imageUrl: "/menu/poundo-yam-soup.png" }
            });
            console.log("Updated existing Poundo item:", item.name);
        }
    } else {
        await prisma.menuItem.create({
            data: {
                name: "Poundo Yam (Fufu) + Soup + Beef/Chicken/Fish",
                description: "Poundo Yam is a modern twist on traditional pounded yam, offering the same smooth, elastic texture with a faster preparation method. Serve with any soups and protein (chicken/beef/fish) of choice.",
                price: 21.99,
                categoryId: "cat-swallow",
                imageUrl: "/menu/poundo-yam-soup.png",
                isFeatured: true,
                isAvailable: true
            }
        });
        console.log("Created new Poundo item");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
