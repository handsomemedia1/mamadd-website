const { Client } = require('pg');
async function run() {
    const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });
    await client.connect();
    const cats = await client.query('SELECT c.id, c.name, COUNT(m.id) as item_count FROM "Category" c LEFT JOIN "MenuItem" m ON m."categoryId" = c.id GROUP BY c.id, c.name ORDER BY c."order"');
    console.log('CATEGORIES:');
    cats.rows.forEach(r => console.log(' -', r.name, ':', r.item_count, 'items'));
    const items = await client.query('SELECT name, price, "isAvailable" FROM "MenuItem" ORDER BY name');
    console.log('\nMENU ITEMS:');
    items.rows.forEach(r => console.log(' -', r.name, '- EUR', r.price, r.isAvailable ? '(available)' : '(unavailable)'));
    await client.end();
}
run();
