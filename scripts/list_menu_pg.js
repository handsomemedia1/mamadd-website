const { Client } = require('pg');

async function list() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
    });
    
    await client.connect();
    try {
        const { rows } = await client.query('SELECT id, name, "imageUrl" FROM "MenuItem"');
        console.log(JSON.stringify(rows, null, 2));
    } catch(e) { console.error(e); }
    finally { await client.end(); }
}
list();
