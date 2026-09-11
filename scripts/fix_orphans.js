const { Client } = require('pg');

async function appendLink(client, sourceSlug, appendText) {
    const res = await client.query('SELECT id, content FROM "BlogPost" WHERE slug = $1', [sourceSlug]);
    if (res.rows.length > 0) {
        let content = res.rows[0].content;
        // append the sentence to the end of the content
        content += `\n\n${appendText}`;
        await client.query('UPDATE "BlogPost" SET content = $1 WHERE id = $2', [content, res.rows[0].id]);
        console.log(`Updated ${sourceSlug}`);
    }
}

async function run() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
    });
    
    await client.connect();
    
    await appendLink(client, 'what-is-jollof-rice-a-beginner-s-guide-to-nigeria-s-famous-dish', "If you are in the Netherlands, you might be wondering [where to get Jollof rice in Enschede](/blog/where-to-get-jollof-rice-in-enschede).");
    await appendLink(client, 'nigerian-food-in-the-netherlands-dishes-to-try-and-how-to-find-them', "For a deeper dive into local spots, check out this [African food in Enschede](/blog/african-food-in-enschede-a-guide-for-first-time-visitors) guide, or learn more about [Nigerian food delivery in Enschede](/blog/nigerian-food-delivery-in-enschede-what-can-you-order).");
    await appendLink(client, 'nigerian-party-food-15-foods-you-might-find-at-a-nigerian-celebration', "If you're hosting an event locally, explore our services for [African catering in Enschede](/blog/african-catering-in-enschede-nigerian-food-for-parties-and-events).");
    await appendLink(client, '10-nigerian-foods-to-try-if-you-ve-never-had-nigerian-food-before', "Curious about the flavor profiles? Read our detailed breakdown of [what Nigerian food tastes like](/blog/what-does-nigerian-food-taste-like).");
    
    await client.end();
}
run();
