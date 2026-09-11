const { Client } = require('pg');

async function fixClaims() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
    });
    
    await client.connect();
    
    try {
        const { rows } = await client.query('SELECT id, description FROM "MenuItem" WHERE description ILIKE \'%slimming%\' OR description ILIKE \'%weight loss%\' OR description ILIKE \'%detox%\'');
        
        for (const row of rows) {
            console.log("Fixing item:", row.id);
            const newDesc = row.description
                .replace(/great for slimming down/gi, "")
                .replace(/helps with weight loss/gi, "")
                .replace(/perfect for detox/gi, "");
                
            await client.query('UPDATE "MenuItem" SET description = $1 WHERE id = $2', [newDesc, row.id]);
        }
        console.log(`Fixed ${rows.length} claims.`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

fixClaims();
