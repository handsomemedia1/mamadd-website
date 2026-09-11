const { Client } = require('pg');

async function run() {
    let retries = 5;
    while(retries > 0) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
        });
        try {
            await client.connect();
            const res = await client.query('SELECT title, slug, content, "coverImage", "coverImageAlt", "primaryKeyword", published, "createdAt", "updatedAt" FROM "BlogPost" WHERE published = true');
            
            const articles = res.rows;
            for(let article of articles) {
                const wordCount = article.content.split(/\s+/).filter(w => w.length > 0).length;
                console.log(`[SLUG] ${article.slug}`);
                console.log(`[WORDS] ${wordCount}`);
                console.log(`[IMAGE] ${article.coverImage} | Alt: ${article.coverImageAlt}`);
                console.log('---');
            }
            
            await client.end();
            break;
        } catch (e) {
            console.error("Retry...", e.message);
            retries--;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}
run();
