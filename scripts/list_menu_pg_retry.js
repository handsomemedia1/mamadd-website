const { Client } = require('pg');

async function list() {
    let retries = 5;
    while(retries > 0) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
        });
        try {
            await client.connect();
            const { rows } = await client.query('SELECT id, name, "imageUrl" FROM "MenuItem"');
            require('fs').writeFileSync('db_output_final.json', JSON.stringify(rows, null, 2));
            console.log("SUCCESS");
            await client.end();
            return;
        } catch(e) {
            console.error("Retrying...", e.message);
            retries--;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}
list();
