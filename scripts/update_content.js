const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const clusters = [
    'content/cluster1',
    'content/cluster2',
    'content/cluster3'
];

async function run() {
    for (const clusterDir of clusters) {
        const fullDir = path.join(process.cwd(), clusterDir);
        const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.md'));
        
        for (const file of files) {
            const slug = file.replace('.md', '');
            const contentPath = path.join(fullDir, file);
            let content = fs.readFileSync(contentPath, 'utf8');
            
            // Remove the title from the markdown since it's already in the DB
            // usually it starts with "# Title"
            content = content.replace(/^#\s+.*?\n+/m, '');
            
            let retries = 5;
            while(retries > 0) {
                const client = new Client({
                    connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
                });
                try {
                    await client.connect();
                    await client.query('UPDATE "BlogPost" SET content = $1 WHERE slug = $2', [content, slug]);
                    console.log("Successfully updated content for:", slug);
                    await client.end();
                    break;
                } catch (e) {
                    console.error("Retry...", slug, e.message);
                    retries--;
                    await new Promise(r => setTimeout(r, 2000));
                }
            }
        }
    }
}
run();
