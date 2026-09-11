const { Client } = require('pg');

async function run() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
    });
    
    await client.connect();
    
    const res = await client.query('SELECT slug, title, cluster, content FROM "BlogPost" WHERE published = true');
    const posts = res.rows;
    
    const validSlugs = new Set(posts.map(p => `/blog/${p.slug}`));
    validSlugs.add('/menu');
    
    console.log(`\n### 18-article audit\n`);
    console.log(`| Article | Cluster | Contextual Links | Menu Link | Status |`);
    console.log(`| ------- | ------- | ---------------: | --------: | ------ |`);
    
    let totalBroken = 0;
    let totalSelfLinks = 0;
    
    const incomingMap = {};
    posts.forEach(p => incomingMap[`/blog/${p.slug}`] = 0);
    
    for (let post of posts) {
        // Find all links: [text](/path)
        const regex = /\]\((.*?)\)/g;
        let match;
        let links = [];
        let hasMenu = false;
        
        while ((match = regex.exec(post.content)) !== null) {
            const url = match[1];
            if (url.startsWith('/blog/')) {
                links.push(url);
                if (!validSlugs.has(url)) {
                    totalBroken++;
                    console.log(`BROKEN LINK IN ${post.slug}: ${url}`);
                }
                if (url === `/blog/${post.slug}`) {
                    totalSelfLinks++;
                }
                if (incomingMap[url] !== undefined) {
                    incomingMap[url]++;
                }
            } else if (url === '/menu') {
                hasMenu = true;
            }
        }
        
        // Count unique internal article links
        const uniqueLinks = new Set(links).size;
        const status = uniqueLinks >= 3 ? "PASS" : "WARN";
        
        console.log(`| ${post.slug} | ${post.cluster} | ${uniqueLinks} | ${hasMenu ? 'Yes' : 'No'} | ${status} |`);
    }
    
    console.log(`\n### Link integrity`);
    console.log(`* broken internal links: ${totalBroken}`);
    console.log(`* self-links: ${totalSelfLinks}`);
    
    let orphans = 0;
    for (const [url, count] of Object.entries(incomingMap)) {
        if (count === 0) orphans++;
    }
    console.log(`* orphan articles: ${orphans}`);
    for (const [url, count] of Object.entries(incomingMap)) {
        if (count === 0) console.log(`  - ${url}`);
    }
    
    await client.end();
}
run();
