import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const hashedPassword = await hash("mamadds2024", 12);
    const admin = await prisma.adminUser.upsert({
        where: { email: "admin@mamadd.com" },
        update: {},
        create: {
            email: "admin@mamadd.com",
            password: hashedPassword,
        },
    });
    console.log("✅ Admin user created:", admin.email);

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { id: "cat-soups" },
            update: {},
            create: { id: "cat-soups", name: "Soups", order: 1 },
        }),
        prisma.category.upsert({
            where: { id: "cat-rice" },
            update: {},
            create: { id: "cat-rice", name: "Rice & Pasta", order: 2 },
        }),
        prisma.category.upsert({
            where: { id: "cat-swallow" },
            update: {},
            create: { id: "cat-swallow", name: "Swallows & Sides", order: 3 },
        }),
        prisma.category.upsert({
            where: { id: "cat-proteins" },
            update: {},
            create: { id: "cat-proteins", name: "Proteins & Extras", order: 4 },
        }),
        prisma.category.upsert({
            where: { id: "cat-combos" },
            update: {},
            create: { id: "cat-combos", name: "Combo Deals", order: 5 },
        }),
    ]);
    console.log("✅ Categories created:", categories.length);

    // Create menu items
    const menuItems = [
        { name: "Egusi Soup", description: "Traditional African soup made with ground melon seeds, enriched with assorted meats and vegetables.", price: 14.50, categoryId: "cat-soups", isFeatured: true },
        { name: "Ogbono Soup", description: "A rich, hearty soup with a unique texture, packed with flavors from the motherland. Served with assorted meat.", price: 14.50, categoryId: "cat-soups", isFeatured: false },
        { name: "Fish Peppersoup", description: "Spicy and savory broth with bold aromatics, fresh fish, and traditional African spices.", price: 15.00, categoryId: "cat-soups", isFeatured: true },
        { name: "Ewedu Soup", description: "Traditional Yoruba jute leaf soup, smooth and silky, perfect with any swallow.", price: 12.50, categoryId: "cat-soups" },
        { name: "Jollof Rice", description: "Our signature one-pot African classic — vibrant, spicy, and smoky. Served with your choice of protein.", price: 12.50, categoryId: "cat-rice", isFeatured: true },
        { name: "Fried Rice", description: "A colorful medley of rice and fresh vegetables, stir-fried to perfection with homemade spices.", price: 12.50, categoryId: "cat-rice", isFeatured: false },
        { name: "Eba (Garri)", description: "Classic Nigerian swallow made from cassava flakes. Perfect companion for any soup.", price: 5.00, categoryId: "cat-swallow" },
        { name: "Amala", description: "Smooth, dark yam flour swallow — a Yoruba favorite.", price: 5.00, categoryId: "cat-swallow" },
        { name: "Semolina (Semo)", description: "Light and fluffy wheat-based swallow, pairs beautifully with any soup.", price: 5.00, categoryId: "cat-swallow" },
        { name: "Fried Plantain", description: "Sweet, caramelized plantain slices fried to golden perfection.", price: 5.00, categoryId: "cat-swallow", isFeatured: true },
        { name: "Boli (Roasted Plantain)", description: "Street-food style roasted plantain with crispy exterior and sweet interior.", price: 6.00, categoryId: "cat-swallow" },
        { name: "Asun (Peppered Goat)", description: "Spicy, smoky peppered goat meat — a Nigerian party favorite.", price: 8.50, categoryId: "cat-proteins", isFeatured: true },
        { name: "Peppered Meat", description: "Tender beef seasoned with bold African spices and peppers.", price: 7.50, categoryId: "cat-proteins" },
        { name: "Grilled Chicken", description: "Juicy, perfectly seasoned chicken grilled to perfection.", price: 7.00, categoryId: "cat-proteins" },
        { name: "Jollof Combo", description: "Jollof Rice + Grilled Chicken + Fried Plantain + Drink. The complete experience!", price: 18.50, categoryId: "cat-combos", isFeatured: true },
        { name: "Plantain & Asun Combo", description: "Fried Plantain + Asun (Peppered Goat) + Drink. A crowd favorite.", price: 16.50, categoryId: "cat-combos" },
    ];

    for (const item of menuItems) {
        await prisma.menuItem.create({
            data: {
                name: item.name,
                description: item.description,
                price: item.price,
                categoryId: item.categoryId,
                isFeatured: item.isFeatured || false,
                isAvailable: true,
            },
        });
    }
    console.log("✅ Menu items created:", menuItems.length);

    // Create default settings
    const settings = [
        { key: "businessName", value: "Mama DD's African Kitchen" },
        { key: "whatsappNumber", value: "+31612988455" },
        { key: "address", value: "Waalstraat 134, 7523 RM Enschede, Netherlands" },
        { key: "phone", value: "+31 6 12988455" },
        { key: "instagram", value: "https://instagram.com/mamadds" },
        { key: "deliveryNote", value: "Pickup only. Please order at least 1 hour before closing time." },
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: { value: setting.value },
            create: setting,
        });
    }
    console.log("✅ Settings created:", settings.length);

    console.log("🎉 Seeding complete!");
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
