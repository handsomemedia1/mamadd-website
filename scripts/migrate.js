const { Client } = require('pg');

async function migrate() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
    });
    
    await client.connect();
    
    console.log("Connected to DB, running migrations...");
    try {
        await client.query(`ALTER TABLE "MenuItem" ADD COLUMN IF NOT EXISTS "altText" TEXT;`);
        console.log("MenuItem altText added.");
        
        await client.query(`
            ALTER TABLE "BlogPost" 
            ADD COLUMN IF NOT EXISTS "coverImageAlt" TEXT,
            ADD COLUMN IF NOT EXISTS "primaryKeyword" TEXT,
            ADD COLUMN IF NOT EXISTS "secondaryKeywords" TEXT,
            ADD COLUMN IF NOT EXISTS "category" TEXT,
            ADD COLUMN IF NOT EXISTS "tags" TEXT,
            ADD COLUMN IF NOT EXISTS "cluster" TEXT,
            ADD COLUMN IF NOT EXISTS "isPillar" BOOLEAN NOT NULL DEFAULT false,
            ADD COLUMN IF NOT EXISTS "targetPage" TEXT,
            ADD COLUMN IF NOT EXISTS "relatedArticles" TEXT;
        `);
        console.log("BlogPost SEO fields added.");
        
        await client.query(`
            CREATE TABLE IF NOT EXISTS "Redirect" (
                "id" TEXT NOT NULL,
                "source" TEXT NOT NULL,
                "destination" TEXT NOT NULL,
                "permanent" BOOLEAN NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
            );
            
            -- Create unique index only if it doesn't exist
            CREATE UNIQUE INDEX IF NOT EXISTS "Redirect_source_key" ON "Redirect"("source");
        `);
        console.log("Redirect table created.");
        
    } catch (e) {
        console.error("Migration failed:", e);
    } finally {
        await client.end();
    }
}

migrate();
