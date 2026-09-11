const { Client } = require('pg');
const crypto = require('crypto');

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const articles = [
    {
        title: "Nigerian Food in Enschede: Where to Start",
        excerpt: "Looking for authentic Nigerian food in Enschede? Here is your complete guide to ordering the best Jollof rice, Egusi, and Swallow locally.",
        content: `If you live in or around Enschede (Twente) and are craving bold, rich, and spicy flavors, you might be searching for authentic Nigerian food. The good news? You don't have to travel to Amsterdam or Rotterdam to get a true taste of West Africa.

At **Mama DD's African Kitchen**, we bring the authentic taste of Lagos straight to Enschede. But if you are new to the cuisine, where should you start?

## Why Choose Nigerian Food?
Nigerian cuisine is deeply comforting. Unlike many European cuisines that rely on butter or cream, Nigerian food builds its rich flavors using earthy palm oil, spicy scotch bonnet peppers, and deeply savory meat broths. It is hearty, filling, and perfect for cold Dutch evenings.

## Top Recommendations for First-Timers in Enschede
If you are ordering from us for the first time, we highly recommend these staples:

### 1. The Classic: Jollof Rice & Plantain
You cannot order Nigerian food without trying Jollof rice. Our Jollof is cooked the traditional way—smoky, spicy, and perfectly seasoned. We serve it with sweet fried plantains (dodo) and your choice of grilled chicken, beef, or fish. 

### 2. The Comfort Bowl: Egusi Soup with Pounded Yam
If you want the true "swallow" experience, order our Egusi soup. It is a rich, nutty melon-seed soup packed with spinach and assorted meats. Pair it with smooth Pounded Yam, pinch a piece off with your fingers, and dive in.

### 3. The Spicy Snack: Asun (Peppered Goat Meat)
Looking for something to snack on with a cold drink? Asun is a spicy, roasted goat meat dish that is guaranteed to wake up your taste buds.

## How to Order in Enschede
Craving *Nigeriaans eten in Enschede*? We make it easy for you to enjoy our meals. 
*   **Menu:** Browse our full [Menu](/menu) to see what is cooking today.
*   **Delivery & Pickup:** We offer convenient pickup and local delivery in Enschede. 
*   **WhatsApp Ordering:** You can easily place your order by sending a WhatsApp message to **+31 6 12988455**.

Whether you are an international student missing home, or a local Dutch resident looking to explore new flavors, Mama DD's African Kitchen is your home for West African cuisine in Twente.`,
        metaTitle: "Nigerian Food in Enschede: Where to Order & What to Try",
        metaDescription: "Looking for authentic Nigerian food in Enschede? Order smoky Jollof rice, Egusi, and Fufu from Mama DD's African Kitchen. Local delivery available.",
        primaryKeyword: "nigerian food enschede",
        secondaryKeywords: "nigeriaans eten enschede, african food twente",
        category: "Local Guide",
        tags: "enschede, local, delivery, jollof",
        cluster: "Nigerian Food in Enschede",
        isPillar: true,
        targetPage: "/menu",
        relatedArticles: "where-to-get-jollof-rice-in-enschede,nigerian-food-delivery-in-enschede",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "A table setting with delicious Nigerian dishes."
    },
    {
        title: "African Food in Enschede: A Guide for First-Time Visitors",
        excerpt: "Exploring African food in Enschede for the first time? Discover the rich, vibrant flavors of West Africa right here in Twente.",
        content: `Enschede is a diverse, vibrant student city, and its food scene is slowly expanding to reflect that. While Italian, Asian, and Middle Eastern cuisines are easy to find, authentic African food—specifically West African and Nigerian cuisine—has historically been harder to come by in Twente.

Until now. 

If you are looking for authentic African food in Enschede, **Mama DD's African Kitchen** is here to introduce you to the bold, rich, and unforgettable flavors of the continent.

## What to Expect from West African Cuisine
If this is your first time trying African food, throw everything you know about European cooking out the window. West African food is:
*   **Boldly Spiced:** We use a lot of ginger, garlic, scotch bonnet peppers, and traditional spices like locust beans (iru) to create deep flavor profiles.
*   **Hearty:** Our meals are designed to fill you up. Expect large portions of rice, yams, and plantains.
*   **Textural:** From the stretchy, doughy texture of Fufu to the tender, chewy texture of our meats, every bite is an experience.

## Dishes You Must Try
If you are searching for *Afrikaans restaurant Enschede* or just want a great meal, here is what you should order from our [Menu](/menu):

1.  **Jollof Rice:** The pride of West Africa. A rich, tomato-based rice dish cooked in a savory meat broth.
2.  **Pounded Yam & Soup:** Experience eating with your hands! Try our smooth pounded yam paired with Egusi (melon seed) or Ogbono soup.
3.  **Fried Plantains:** Sweet, caramelized, and the perfect side to any spicy dish.

## Experience It Yourself
Ready to try something new tonight? You don't need to travel far to experience authentic African hospitality and flavor. 

Browse our [Menu](/menu) to see our current offerings, and place your order today via WhatsApp at **+31 6 12988455**.`,
        metaTitle: "African Food in Enschede: Your Guide to West African Cuisine",
        metaDescription: "Discover authentic African food in Enschede. From spicy Jollof rice to traditional Fufu, explore the rich flavors of West Africa at Mama DD's African Kitchen.",
        primaryKeyword: "african food enschede",
        secondaryKeywords: "afrikaans restaurant enschede, african food twente",
        category: "Local Guide",
        tags: "enschede, african food, beginners",
        cluster: "Nigerian Food in Enschede",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "nigerian-food-in-enschede-where-to-start,10-nigerian-foods-to-try-if-you-ve-never-had-nigerian-food-before",
        coverImage: "/images/blog/jollof_rice_chicken_1789154745566.jpg",
        coverImageAlt: "A plate of African Jollof rice with chicken and plantains."
    },
    {
        title: "Where to Get Jollof Rice in Enschede",
        excerpt: "Craving the smoky, spicy perfection of authentic Jollof rice? Here is how to order the best Jollof rice in Enschede.",
        content: `Jollof rice is more than just a meal; it is a cultural icon. If you have ever seen videos of West African weddings or parties, you have seen Jollof. But if you live in Twente, you might be wondering: *Where can I get authentic Jollof rice in Enschede?*

Look no further than **Mama DD's African Kitchen**.

## Why Our Jollof Rice Stands Out
Not all Jollof is created equal. There are many variations across West Africa, but Nigerian Jollof is famous worldwide for one specific reason: **the smoke.**

At Mama DD's, we prepare our Jollof rice authentically:
*   **The Base:** We use a rich, deeply reduced blend of fresh tomatoes, red bell peppers, and fiery scotch bonnets.
*   **The Stock:** Our rice is cooked slowly in a savory, spiced meat broth, absorbing all the rich flavors.
*   **The Smoky Finish:** We ensure our Jollof has that signature "party rice" smokiness that Nigerians love. 

## The Perfect Jollof Combo
Jollof rice is fantastic on its own, but it is meant to be eaten with sides. When you order from us, you can build the ultimate combo:
1.  **Protein:** Choose from our perfectly seasoned Grilled Chicken, Fried Beef, or spicy Asun (peppered goat meat).
2.  **Plantains (Dodo):** No plate of Jollof is complete without sweet, fried plantains to balance the spice.
3.  **Coleslaw:** For a cool, creamy crunch.

## Order Jollof Rice Today (Jollof Rijst Bestellen)
Whether you are a student at the University of Twente craving a taste of home, or a local looking to try *Jollof rijst* for the first time, we have you covered.

Visit our [Menu](/menu) to see our Jollof combos, and send us a WhatsApp message at **+31 6 12988455** to place your order for pickup or delivery in Enschede!`,
        metaTitle: "Where to Get Authentic Jollof Rice in Enschede",
        metaDescription: "Craving authentic, smoky Jollof rice? Mama DD's African Kitchen serves the best Nigerian Jollof rice in Enschede. Order now for pickup or delivery.",
        primaryKeyword: "jollof rice enschede",
        secondaryKeywords: "jollof rijst bestellen, african food enschede",
        category: "Local Guide",
        tags: "enschede, jollof, rice, delivery",
        cluster: "Nigerian Food in Enschede",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-jollof-rice-a-beginner-s-guide-to-nigeria-s-famous-dish,nigerian-food-delivery-in-enschede",
        coverImage: "/images/blog/jollof_rice_chicken_1789154745566.jpg",
        coverImageAlt: "A beautiful plate of smoky Nigerian Jollof rice."
    },
    {
        title: "Nigerian Food in the Netherlands: Dishes to Try and How to Find Them",
        excerpt: "Exploring the Nigerian food scene in the Netherlands? Discover the best dishes to try and how to find authentic West African cuisine.",
        content: `The culinary landscape of the Netherlands is incredibly diverse, heavily influenced by Surinamese, Indonesian, and Middle Eastern cuisines. However, over the past decade, West African food—particularly Nigerian cuisine—has exploded in popularity across the country.

If you are looking for authentic **Nigerian food in the Netherlands**, here is what you need to know.

## The Rise of Nigerian Cuisine in Holland
Historically, if you wanted authentic *Nigeriaans eten* in the Netherlands, you had to visit major cities like Amsterdam (specifically the Bijlmer area), Rotterdam, or The Hague. These cities host vibrant West African diaspora communities and excellent African grocery stores and restaurants.

But what if you live outside the Randstad? The demand for authentic Jollof rice, Egusi, and Suya has grown so much that independent caterers and local kitchens are popping up in cities across the country, including right here in Enschede.

## 3 Nigerian Dishes You Must Try in the Netherlands
If you are ordering Nigerian food for the first time, these are the absolute must-haves:

1.  **Jollof Rice & Plantain:** The ultimate gateway dish. It is a smoky, spicy tomato rice served with sweet fried plantains. It is universally loved and highly addictive.
2.  **Pounded Yam and Egusi Soup:** If you want a traditional, hearty meal, order this. Egusi is a savory melon-seed soup loaded with spinach and meats. You eat it by dipping smooth Pounded Yam (a dough-like swallow) into the soup with your hands.
3.  **Suya or Asun:** For meat lovers. Suya is thinly sliced, spicy peanut-rubbed beef grilled on skewers. Asun is fiery, peppered roasted goat meat. Both pair perfectly with a cold beer.

## Finding Nigerian Food Outside the Randstad
If you are in the eastern part of the Netherlands (Twente), you don't need to take a train to Amsterdam to satisfy your cravings. 

**Mama DD's African Kitchen** brings authentic Nigerian home cooking to Enschede. We prepare our meals using traditional recipes, authentic spices, and a whole lot of love. 

Whether you want to try Jollof rice for the first time, or you are missing the taste of home, check out our [Menu](/menu) and order today!`,
        metaTitle: "Nigerian Food in the Netherlands: What to Try & Where",
        metaDescription: "Discover the best Nigerian food in the Netherlands. From Amsterdam to Enschede, learn which West African dishes to try like Jollof and Egusi.",
        primaryKeyword: "nigerian food netherlands",
        secondaryKeywords: "nigeriaans eten nederland, african food holland",
        category: "Informational",
        tags: "netherlands, nigerian food, culture",
        cluster: "Nigerian Food in Enschede",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "nigerian-food-in-enschede-where-to-start,10-nigerian-foods-to-try-if-you-ve-never-had-nigerian-food-before",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "Various Nigerian dishes laid out on a table."
    },
    {
        title: "Nigerian Food Delivery in Enschede: What Can You Order?",
        excerpt: "Don't feel like cooking? Find out how to get hot, authentic Nigerian food delivered straight to your door in Enschede.",
        content: `There are days when you just don't want to cook, but you are also tired of the usual pizza, fries, or standard takeaway options. If you are craving something hearty, flavorful, and deeply comforting, why not try Nigerian food?

At **Mama DD's African Kitchen**, we offer authentic Nigerian food delivery and pickup in Enschede. Here is everything you need to know about getting West African food delivered to your door.

## What Can You Order? (Nigeriaans Eten Bestellen)

Our [Menu](/menu) is packed with traditional Nigerian favorites. Here are some of our most popular delivery items:

### 1. The Jollof Rice Combo
The perfect takeaway box. You get a generous portion of our signature smoky Jollof rice, served with sweet fried plantains (dodo) and your choice of protein (grilled chicken, peppered meat, or fish). 

### 2. Traditional Soups and Swallow
Yes, you can get Fufu delivered! We package our hot, freshly made swallows (like Pounded Yam or Eba) securely alongside a rich bowl of soup. Our top sellers are:
*   **Egusi Soup:** Rich, nutty, and packed with assorted meats.
*   **Ogbono Soup:** Savory and hearty with a unique, traditional texture.

### 3. Savory Snacks and Meats
Looking for something smaller? Order our **Meat Pies** (flaky pastry filled with seasoned minced meat) or a portion of **Asun** (fiery peppered goat meat) for a late-night snack.

## How Our Delivery Works
We operate as a premium local kitchen, meaning we prepare our food fresh to order. 

1.  **Check the Menu:** Visit our [Menu](/menu) page to see what is available today.
2.  **Send a WhatsApp:** Place your order directly by messaging us at **+31 6 12988455**.
3.  **Pickup or Delivery:** You can arrange to pick up your hot food locally in Enschede, or we can deliver it to your address (delivery fees may apply depending on distance).

Skip the standard fast food tonight. Treat yourself to the rich, spicy, and comforting flavors of West Africa with Mama DD's African Kitchen!`,
        metaTitle: "Nigerian Food Delivery in Enschede | Mama DD's",
        metaDescription: "Craving African food? Mama DD's African Kitchen offers authentic Nigerian food delivery in Enschede. Order Jollof rice, Egusi, and more via WhatsApp.",
        primaryKeyword: "nigerian food delivery enschede",
        secondaryKeywords: "nigeriaans eten bestellen, african food delivery",
        category: "Local Guide",
        tags: "delivery, enschede, order",
        cluster: "Nigerian Food in Enschede",
        isPillar: false,
        targetPage: "/contact",
        relatedArticles: "nigerian-food-in-enschede-where-to-start,where-to-get-jollof-rice-in-enschede",
        coverImage: "/images/blog/jollof_rice_chicken_1789154745566.jpg",
        coverImageAlt: "A takeaway portion of Jollof rice."
    },
    {
        title: "African Catering in Enschede: Nigerian Food for Parties and Events",
        excerpt: "Planning an event in Twente? Mama DD's offers professional Nigerian and West African catering in Enschede for weddings, birthdays, and corporate events.",
        content: `Are you hosting a party, wedding, or corporate event in Enschede and want to serve something unforgettable? 

Nothing brings people together quite like a West African feast. The bold flavors, vibrant colors, and generous portions of Nigerian cuisine make it the perfect food for celebrations. 

At **Mama DD's African Kitchen**, we provide professional, authentic **African catering in Enschede** and the surrounding Twente region.

## Why Choose Nigerian Food for Your Event?
Nigerian party food is legendary. In Nigerian culture, no celebration—whether it is a wedding, a naming ceremony, or a birthday—is complete without an abundance of rich, delicious food. 

When you choose Mama DD's for your *Nigeriaanse catering in Enschede*, you are giving your guests an experience. 

## Our Popular Catering Menu Items
We can customize a catering menu to suit your event's size and your guests' preferences. Our most requested party foods include:

*   **Party Jollof Rice:** The undisputed star of any African event. Smoky, spicy, and served in large chafing dishes.
*   **Fried Rice:** Nigerian-style fried rice, packed with vegetables, liver, and rich seasoning.
*   **Moi Moi:** Savory, steamed bean puddings wrapped in leaves—a classic party side dish.
*   **Assorted Meats & Fish:** Platters of grilled chicken, spicy fried beef, Asun (peppered goat meat), and fried fish.
*   **Small Chops (Appetizers):** We can provide classic Nigerian finger foods like Puff-Puff (sweet fried dough balls), Meat Pies, and Spring Rolls to welcome your guests.

## Accommodating Your Guests
We understand that not everyone may be used to West African spice levels. When planning your catering menu, we can adjust the heat of our dishes—providing milder options for beginners while keeping the fiery authentic options available for those who love the spice!

## Book Mama DD's for Your Next Event
Let us handle the cooking so you can enjoy your party. If you are looking for African catering in Enschede, Hengelo, or the broader Twente region, we would love to work with you.

Visit our [Contact](/contact) page or message us on WhatsApp at **+31 6 12988455** to discuss your event size, menu preferences, and get a custom catering quote.`,
        metaTitle: "African Catering in Enschede: Nigerian Party Food",
        metaDescription: "Host an unforgettable event with authentic African catering in Enschede. Mama DD's provides Jollof rice, small chops, and Nigerian food for parties.",
        primaryKeyword: "african catering enschede",
        secondaryKeywords: "nigeriaanse catering enschede, party food catering",
        category: "Catering",
        tags: "catering, enschede, events, party",
        cluster: "Nigerian Food in Enschede",
        isPillar: false,
        targetPage: "/contact",
        relatedArticles: "nigerian-party-food-15-foods-you-might-find-at-a-nigerian-celebration",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "Large chafing dishes and platters of Nigerian party food."
    }
];

async function insertArticle(article) {
    let retries = 10;
    while(retries > 0) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_0XroGJ3uHNbV@ep-royal-wave-ail6oc54-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
        });
        try {
            await client.connect();
            const slug = slugify(article.title);
            const res = await client.query('SELECT id FROM "BlogPost" WHERE slug = $1', [slug]);
            
            const query = res.rows.length > 0 ? 
                `UPDATE "BlogPost" SET 
                    title = $1, excerpt = $2, content = $3, "metaTitle" = $4, "metaDescription" = $5,
                    "primaryKeyword" = $6, "secondaryKeywords" = $7, category = $8, tags = $9, cluster = $10,
                    "isPillar" = $11, "targetPage" = $12, "relatedArticles" = $13, "coverImage" = $14, "coverImageAlt" = $15,
                    published = true, "updatedAt" = NOW()
                WHERE slug = $16` : 
                `INSERT INTO "BlogPost" (
                    id, title, excerpt, content, "metaTitle", "metaDescription", 
                    "primaryKeyword", "secondaryKeywords", category, tags, cluster, 
                    "isPillar", "targetPage", "relatedArticles", "coverImage", "coverImageAlt", 
                    published, slug, "updatedAt"
                ) VALUES (
                    $17, $1, $2, $3, $4, $5, 
                    $6, $7, $8, $9, $10, 
                    $11, $12, $13, $14, $15,
                    true, $16, NOW()
                )`;
            
            const values = [
                article.title, article.excerpt, article.content, article.metaTitle, article.metaDescription,
                article.primaryKeyword, article.secondaryKeywords, article.category, article.tags, article.cluster,
                article.isPillar, article.targetPage, article.relatedArticles, article.coverImage, article.coverImageAlt,
                slug
            ];

            if (res.rows.length === 0) {
                values.push("cl" + crypto.randomBytes(10).toString('hex')); 
            }
            
            await client.query(query, values);
            console.log("Saved:", article.title);
            await client.end();
            return;
        } catch (e) {
            console.error("Retrying...", e.message);
            retries--;
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}

async function seed() {
    for (const article of articles) {
        await insertArticle(article);
    }
}

seed();
