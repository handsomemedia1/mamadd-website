const { Client } = require('pg');

const updates = [
    { slug: "what-is-jollof-rice-a-beginner-s-guide-to-nigeria-s-famous-dish", coverImage: "/menu/jollof-rice.png", alt: "A plate of authentic Nigerian Jollof rice" },
    { slug: "what-is-egusi-soup-taste-ingredients-and-how-nigerians-eat-it", coverImage: "/menu/egusi-soup.png", alt: "Nigerian Egusi soup with assorted meats" },
    { slug: "what-is-fufu-nigerian-fufu-eba-amala-semo-and-poundo-explained", coverImage: "/menu/fufu.png", alt: "Nigerian swallow (Fufu)" },
    { slug: "where-to-get-jollof-rice-in-enschede", coverImage: "/menu/jollof-combo.png", alt: "Jollof rice combo available in Enschede" },
    { slug: "nigerian-food-delivery-in-enschede-what-can-you-order", coverImage: "/menu/jollof-combo.png", alt: "Nigerian food takeaway box for delivery" },
    { slug: "what-is-amala-the-nigerian-swallow-explained", coverImage: "/menu/amala.png", alt: "Dark brown Amala swallow" },
    { slug: "what-is-ogbono-soup-taste-texture-and-how-it-is-served", coverImage: "/menu/ogbono-soup.png", alt: "Rich and viscous Ogbono draw soup" },
    { slug: "what-is-asun-the-nigerian-spicy-peppered-meat-explained", coverImage: "/menu/asun-peppered-goat.png", alt: "Spicy roasted peppered goat meat (Asun)" },
    { slug: "nigerian-jollof-rice-vs-ghanaian-jollof-what-s-the-difference", coverImage: "/menu/jollof-combo.png", alt: "Nigerian style Jollof rice" },
    { slug: "what-is-nigerian-food-a-beginner-s-guide", coverImage: "/food-spread.png", alt: "A spread of authentic Nigerian food" },
    { slug: "what-does-nigerian-food-taste-like", coverImage: "/food-bowls.png", alt: "Bowls of richly flavored Nigerian soups and stews" },
    { slug: "10-nigerian-foods-to-try-if-you-ve-never-had-nigerian-food-before", coverImage: "/food-spread2.png", alt: "Various Nigerian dishes perfect for beginners" },
    { slug: "nigerian-food-in-enschede-where-to-start", coverImage: "/food-spread3.png", alt: "Nigerian food available in Enschede" },
    { slug: "nigerian-food-in-the-netherlands-dishes-to-try-and-how-to-find-them", coverImage: "/food-hero.png", alt: "Beautiful presentation of Nigerian cuisine in the Netherlands" },
    { slug: "nigerian-food-for-dutch-people-10-dishes-to-try-first", coverImage: "/food-spread2.png", alt: "Nigerian food that appeals to Dutch palates" }
];

async function run() {
    for (const update of updates) {
        let retries = 5;
        while(retries > 0) {
            const client = new Client({
                connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
            });
            try {
                await client.connect();
                await client.query('UPDATE "BlogPost" SET "coverImage" = $1, "coverImageAlt" = $2 WHERE slug = $3', [update.coverImage, update.alt, update.slug]);
                console.log("Updated", update.slug);
                await client.end();
                break;
            } catch (e) {
                console.error("Retry...", e.message);
                retries--;
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }
}
run();
