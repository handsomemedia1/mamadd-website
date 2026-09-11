const { Client } = require('pg');

async function run() {
    let retries = 5;
    while(retries > 0) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
        });
        try {
            await client.connect();
            const res = await client.query('SELECT title, slug, "coverImage", "primaryKeyword", "relatedArticles" FROM "BlogPost"');
            console.log(JSON.stringify(res.rows, null, 2));
            await client.end();
            return;
        } catch (e) {
            console.error(e.message);
            retries--;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}
run();
