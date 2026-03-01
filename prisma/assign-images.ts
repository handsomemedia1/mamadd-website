import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Map dish name → best matching local image
// Using the food images we generated earlier
const imageMap: Record<string, string> = {
    // Soups — use rich bowls image
    "Egusi Soup": "/food-bowls.png",
    "Ogbono Soup": "/food-bowls.png",
    "Fish Peppersoup": "/food-bowls.png",
    "Ewedu Soup": "/food-bowls.png",

    // Rice dishes — use main spread (shows Jollof prominently)
    "Jollof Rice": "/food-spread.png",
    "Jollof Spaghetti": "/food-spread.png",

    // Swallows & sides — second spread shows fufu/semolina balls + plantain
    "Eba (Garri)": "/food-spread2.png",
    "Amala": "/food-spread2.png",
    "Semolina (Semo)": "/food-spread2.png",
    "Fried Plantain": "/food-hero.png",
    "Boli (Roasted Plantain)": "/food-hero.png",

    // Proteins — spread shows suya/peppered meats
    "Asun (Peppered Goat)": "/food-spread3.png",
    "Peppered Meat": "/food-spread3.png",
    "Grilled Chicken": "/food-spread.png",

    // Combos — full feast spread
    "Jollof Combo": "/food-spread.png",
    "Plantain & Asun Combo": "/food-spread3.png",
};

async function main() {
    console.log("🍽️  Assigning food images to menu items...");

    const items = await prisma.menuItem.findMany({ select: { id: true, name: true } });

    let updated = 0;
    for (const item of items) {
        const imageUrl = imageMap[item.name];
        if (imageUrl) {
            await prisma.menuItem.update({
                where: { id: item.id },
                data: { imageUrl },
            });
            console.log(`  ✅ ${item.name} → ${imageUrl}`);
            updated++;
        } else {
            console.log(`  ⚠️  No image for: ${item.name}`);
        }
    }

    console.log(`\n🎉 Done! Updated ${updated}/${items.length} items.`);
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
