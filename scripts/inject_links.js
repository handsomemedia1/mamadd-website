const { Client } = require('pg');

const articles = [
    { slug: 'what-is-nigerian-food-a-beginner-s-guide', keywords: ['Nigerian food', 'Nigerian cuisine'] },
    { slug: 'what-is-jollof-rice-a-beginner-s-guide-to-nigeria-s-famous-dish', keywords: ['Jollof rice', 'Jollof', 'Nigerian Jollof'] },
    { slug: 'what-is-egusi-soup-taste-ingredients-and-how-nigerians-eat-it', keywords: ['Egusi soup', 'Egusi'] },
    { slug: 'what-is-fufu-nigerian-fufu-eba-amala-semo-and-poundo-explained', keywords: ['Fufu', 'swallow', 'swallows', 'Eba'] },
    { slug: 'what-does-nigerian-food-taste-like', keywords: ['taste of Nigerian food', 'Nigerian flavors'] },
    { slug: '10-nigerian-foods-to-try-if-you-ve-never-had-nigerian-food-before', keywords: ['foods to try', 'try Nigerian food'] },
    { slug: 'nigerian-food-in-enschede-where-to-start', keywords: ['Enschede', 'Nigerian food in Enschede', 'food in Enschede'] },
    { slug: 'african-food-in-enschede-a-guide-for-first-time-visitors', keywords: ['African food in Enschede'] },
    { slug: 'where-to-get-jollof-rice-in-enschede', keywords: ['Jollof rice in Enschede'] },
    { slug: 'nigerian-food-in-the-netherlands-dishes-to-try-and-how-to-find-them', keywords: ['Netherlands', 'Nigerian food in the Netherlands'] },
    { slug: 'nigerian-food-delivery-in-enschede-what-can-you-order', keywords: ['delivery', 'food delivery', 'order delivery'] },
    { slug: 'african-catering-in-enschede-nigerian-food-for-parties-and-events', keywords: ['catering', 'party food catering', 'caterer'] },
    { slug: 'what-is-amala-the-nigerian-swallow-explained', keywords: ['Amala'] },
    { slug: 'what-is-ogbono-soup-taste-texture-and-how-it-is-served', keywords: ['Ogbono', 'Ogbono soup'] },
    { slug: 'what-is-asun-the-nigerian-spicy-peppered-meat-explained', keywords: ['Asun', 'peppered meat', 'goat meat'] },
    { slug: 'nigerian-party-food-15-foods-you-might-find-at-a-nigerian-celebration', keywords: ['party food', 'celebration', 'parties'] },
    { slug: 'nigerian-jollof-rice-vs-ghanaian-jollof-what-s-the-difference', keywords: ['Ghanaian Jollof', 'Jollof wars'] },
    { slug: 'nigerian-food-for-dutch-people-10-dishes-to-try-first', keywords: ['Dutch', 'Dutch people'] },
];

async function run() {
    let retries = 5;
    while (retries > 0) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
        });
        try {
            await client.connect();
            const res = await client.query('SELECT id, slug, content FROM "BlogPost" WHERE published = true');
            
            for (let post of res.rows) {
                let content = post.content;
                let linksAdded = 0;
                let menuAdded = false;
                
                // Shuffle articles so we don't always link the same ones first
                const targets = [...articles].sort(() => 0.5 - Math.random());

                // Try to add a menu link
                const menuRegex = /\b(menu|order|Mama DD's)\b/i;
                if (menuRegex.test(content) && !content.includes('](/menu)')) {
                    const lines = content.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        let line = lines[i];
                        if (line.startsWith('#') || line.includes('](') || line.includes('<') || line.startsWith('!')) continue;
                        
                        const match = line.match(menuRegex);
                        if (match) {
                            lines[i] = line.replace(match[0], `[${match[0]}](/menu)`);
                            content = lines.join('\n');
                            menuAdded = true;
                            break;
                        }
                    }
                }

                for (const target of targets) {
                    if (linksAdded >= 5) break; // target 3-6 links total
                    if (target.slug === post.slug) continue; // no self link
                    
                    // Don't link if already linked
                    if (content.includes(target.slug)) continue;

                    let added = false;
                    for (const kw of target.keywords) {
                        if (added) break;
                        
                        // Strict word boundary, case insensitive
                        const regex = new RegExp(`\\b${kw}\\b`, 'i');
                        
                        const lines = content.split('\n');
                        for (let i = 0; i < lines.length; i++) {
                            let line = lines[i];
                            
                            // Skip headings, existing links, image tags, lists
                            if (line.startsWith('#') || line.includes('](') || line.includes('<') || line.startsWith('!')) continue;
                            
                            const match = line.match(regex);
                            if (match) {
                                // Prevent linking inside a word or existing link
                                lines[i] = line.replace(match[0], `[${match[0]}](/blog/${target.slug})`);
                                content = lines.join('\n');
                                linksAdded++;
                                added = true;
                                break;
                            }
                        }
                    }
                }
                
                await client.query('UPDATE "BlogPost" SET content = $1 WHERE id = $2', [content, post.id]);
                console.log(`Updated [${post.slug}] with ${linksAdded} internal links and menu: ${menuAdded}`);
            }
            
            await client.end();
            break;
        } catch (e) {
            console.error(e);
            retries--;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}
run();
