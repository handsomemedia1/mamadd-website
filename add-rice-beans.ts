import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Connecting to database...");
    
    // Find Rice and Beans and update, or create if not found
    const items = await prisma.menuItem.findMany({ where: { name: { contains: "Rice and Beans" } } });
    if (items.length > 0) {
        for (const item of items) {
            await prisma.menuItem.update({
                where: { id: item.id },
                data: { imageUrl: "/menu/rice-and-beans.png" }
            });
            console.log("Updated existing Rice and Beans item:", item.name);
        }
    } else {
        await prisma.menuItem.create({
            data: {
                name: "Rice and Beans",
                description: "Rice and beans is a simple and nourishing dish made by cooking rice with sweet beans. The meal is prepared in a rich sauce with onions, peppers, and spices, giving the meal a deep, savoury taste. Serve with either beef, chicken or fish.",
                price: 16.95,
                categoryId: "cat-rice",
                imageUrl: "/menu/rice-and-beans.png",
                isFeatured: true,
                isAvailable: true
            }
        });
        console.log("Created new Rice and Beans item");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
