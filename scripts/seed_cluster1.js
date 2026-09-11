const { Client } = require('pg');
const crypto = require('crypto');

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const articles = [
    {
        title: "What Is Nigerian Food? A Beginner's Guide",
        excerpt: "Discover the rich flavors, unique ingredients, and vibrant culture of Nigerian cuisine in this complete beginner's guide.",
        content: `If you're exploring West African cuisine for the first time, you might be wondering: what exactly is Nigerian food? Nigerian cuisine is a vibrant, deeply flavorful, and culturally rich collection of dishes that rely on bold spices, hearty stews, and unique textures. 

Whether you are in Lagos or looking for Nigerian food in Enschede, this guide will introduce you to the staples of Nigerian cooking.

## The Foundation of Nigerian Cuisine
Nigerian food is built on a few core pillars:
*   **Rich Tomato and Pepper Bases:** Many stews and rice dishes start with a blended mix of red bell peppers, tomatoes, onions, and scotch bonnet peppers (habaneros) for heat.
*   **Swallows (Starchy Accompaniments):** Instead of eating soup with a spoon, Nigerians use "swallows" like Fufu, Pounded Yam, or Eba. You take a small piece, roll it in your hand, dip it into the soup, and swallow it.
*   **Hearty Meats and Fish:** Beef, goat meat, tripe, stockfish, and smoked fish are heavily used to create deep, umami-rich broths.
*   **Earthy Flavors:** Ingredients like palm oil, locust beans (iru), and ground crayfish give Nigerian food its distinct, earthy, and savory taste.

## Famous Nigerian Dishes You Must Try

### 1. Jollof Rice
Arguably the most famous West African dish globally, Jollof rice is rice cooked in a rich, spicy tomato and pepper broth. It is the centerpiece of any Nigerian party or gathering.

### 2. Egusi Soup
A deeply comforting soup made from ground melon seeds, spinach or bitter leaf, and assorted meats. It is rich, nutty, and savory, usually eaten with pounded yam.

### 3. Suya
A popular street food made of thinly sliced beef or chicken, marinated in a complex, spicy peanut-based rub called Yaji, and grilled over an open flame.

## How Is It Served?
Nigerian meals are typically served communal-style or as large individual portions. A standard plate might include a mountain of Jollof rice, a piece of fried plantain (dodo), and a generously sized piece of fried or grilled chicken. Soups are served in bowls alongside a wrapped portion of hot swallow.

## Want to Try It Yourself?
If you're curious to experience these flavors firsthand and you're in the Netherlands, you don't have to travel far. Mama DD's African Kitchen in Enschede serves authentic, home-cooked Nigerian dishes just like you would find in Lagos. 

Check out our [Menu](/menu) to explore our Jollof rice, Egusi soup, and more!`,
        metaTitle: "What Is Nigerian Food? A Complete Beginner's Guide",
        metaDescription: "Curious about Nigerian food? Discover the flavors, spices, and famous dishes like Jollof and Egusi in this beginner's guide to Nigerian cuisine.",
        primaryKeyword: "nigerian food guide",
        secondaryKeywords: "what is nigerian cuisine, beginner african food",
        category: "Beginner Guides",
        tags: "nigerian food, beginner, guide",
        cluster: "Discover Nigerian Food",
        isPillar: true,
        targetPage: "/menu",
        relatedArticles: "what-is-jollof-rice,what-is-egusi-soup,what-is-fufu",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "A large feast of Nigerian food including jollof rice, plantains, and swallow."
    },
    {
        title: "What Is Jollof Rice? A Beginner's Guide to Nigeria's Famous Dish",
        excerpt: "Learn everything about Jollof Rice, the iconic, spicy, and smoky tomato-based rice dish that is the heart of West African celebrations.",
        content: `Jollof rice is without a doubt the most famous dish to come out of West Africa. If you have ever attended a Nigerian party or visited an African restaurant, you have likely seen this vibrant, reddish-orange rice dish. But what exactly is Jollof rice?

## The Basics of Jollof Rice
At its core, Jollof is a one-pot rice dish. However, calling it just "rice" is a massive understatement. The rice is parboiled and then cooked slowly in a rich, deeply seasoned broth made from a blended mix of:
*   Red bell peppers (tatashe)
*   Tomatoes
*   Onions
*   Scotch bonnet peppers (ata rodo) for heat

## The Secret to Authentic Nigerian Jollof
What separates Nigerian Jollof from other rice dishes is the "party flavor." Authentic Nigerian Jollof has a distinct smoky flavor, traditionally achieved by cooking it in large cast-iron pots over firewood. The rice at the bottom is deliberately allowed to burn slightly, creating a smoky, caramelized crust known as "bottom pot."

The dish is deeply seasoned with curry powder, dried thyme, bay leaves, and rich meat stock (usually beef or chicken).

## How Is Jollof Rice Served?
Jollof rice is rarely eaten on its own. A classic plate of Nigerian Jollof is accompanied by:
- **Fried Plantains (Dodo):** Sweet, caramelized slices of ripe plantain that perfectly balance the spicy rice.
- **Protein:** Usually a large piece of fried chicken, grilled turkey, or spicy fried beef.
- **Moi Moi:** A savory steamed bean pudding.
- **Coleslaw:** For a fresh, crunchy contrast.

## The Jollof Wars
You cannot talk about Jollof without mentioning the "Jollof Wars." This is a friendly, ongoing cultural rivalry primarily between Nigeria and Ghana over who makes the best version of the dish. While Ghanaian Jollof uses a different type of rice (often jasmine) and has a slightly different spice profile, Nigerians swear by the smoky, spicy perfection of their long-grain parboiled version.

## Try Authentic Jollof Rice
Reading about Jollof is one thing; tasting it is an entirely different experience. If you are looking for authentic Nigerian Jollof rice in Enschede, Mama DD's African Kitchen prepares it the traditional way—rich, smoky, and perfectly spiced.

Visit our [Menu](/menu) to order your first plate of Jollof rice today!`,
        metaTitle: "What Is Jollof Rice? The Famous Nigerian Dish Explained",
        metaDescription: "What is Jollof rice? Learn about the ingredients, the famous smoky flavor, and why this spicy tomato rice is the king of West African food.",
        primaryKeyword: "what is jollof rice",
        secondaryKeywords: "nigerian jollof ingredients, taste of jollof",
        category: "Dishes Explained",
        tags: "jollof rice, nigerian dishes",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-nigerian-food,what-does-nigerian-food-taste-like",
        coverImage: "/images/blog/jollof_rice_chicken_1789154745566.jpg",
        coverImageAlt: "A plate of Nigerian Jollof rice served with grilled chicken and fried plantains."
    },
    {
        title: "What Is Egusi Soup? Taste, Ingredients and How Nigerians Eat It",
        excerpt: "Egusi soup is one of Nigeria's most beloved dishes. Discover what it's made of, how it tastes, and the best way to enjoy it.",
        content: `If there is one soup that unites almost all the diverse ethnic groups in Nigeria, it is Egusi soup. Rich, nutty, and incredibly savory, Egusi is a staple in Nigerian households and a must-try for anyone exploring African cuisine.

But if you are new to Nigerian food, you might be asking: what exactly is Egusi soup?

## What Is Egusi Made Of?
The name "Egusi" refers to the protein-rich seeds of certain melon plants native to West Africa. These seeds are dried and ground into a coarse powder, which forms the base and thickener for the soup.

To make the soup, the ground melon seeds are cooked in a rich base of:
*   **Palm Oil:** Gives the soup its signature bright orange-red color and an earthy flavor.
*   **Leafy Greens:** Usually spinach, bitter leaf, or pumpkin leaves (ugu).
*   **Locust Beans (Iru):** A traditional fermented condiment that provides a deep, umami flavor.
*   **Ground Crayfish:** Adds a savory, seafood depth.

## The Meats (Assorted)
A true Nigerian soup is never made with just one type of meat. Egusi is typically loaded with "assorted meats," which can include beef, goat meat, cow tripe (shaki), and stockfish or dried smoked fish. The combination of these meats creates a rich, complex broth that flavors the entire pot.

## What Does Egusi Soup Taste Like?
Egusi soup has a unique, satisfying texture and flavor. The ground melon seeds give it a slightly nutty, scrambled-egg-like texture, while the palm oil and crayfish provide a savory, earthy, and rich umami taste. It is hearty, comforting, and packed with deep flavors.

## How Do You Eat Egusi Soup?
You do not eat Egusi soup with a spoon! Like most Nigerian soups, it is eaten with a "swallow"—a soft, doughy carbohydrate like Pounded Yam (Fufu), Eba, or Amala.

**The traditional way to eat it:**
1. Wash your hands.
2. Pinch off a small piece of the swallow.
3. Roll it into a smooth ball in your hand and make a small indentation with your thumb.
4. Use it to scoop up the Egusi soup and meat.
5. Swallow it without chewing the dough (though you do chew the meat!).

## Experience Egusi Soup
If you want to experience the rich, nutty comfort of Egusi, Mama DD's African Kitchen in Enschede serves authentic Egusi soup paired with your choice of swallow and tender meats. Check out our [Menu](/menu) to try it for yourself!`,
        metaTitle: "What Is Egusi Soup? Nigerian Melon Soup Explained",
        metaDescription: "Discover Egusi soup, Nigeria's favorite savory, nutty melon seed soup. Learn about the ingredients, taste, and how to eat it with fufu.",
        primaryKeyword: "what is egusi soup",
        secondaryKeywords: "egusi ingredients, what does egusi taste like",
        category: "Dishes Explained",
        tags: "egusi, soups, swallow",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-fufu,what-is-nigerian-food",
        coverImage: "/images/blog/egusi_soup_fufu_1789154766158.jpg",
        coverImageAlt: "A traditional clay bowl of Nigerian Egusi soup with assorted meats, served next to pounded yam."
    },
    {
        title: "What Is Fufu? Nigerian Fufu, Eba, Amala, Semo and Poundo Explained",
        excerpt: "Confused by the different types of Nigerian swallows? Learn the differences between Fufu, Pounded Yam, Eba, and Amala in this quick guide.",
        content: `When you watch videos of people eating Nigerian food, you will almost always see them eating a thick, dough-like food with their hands, dipping it into a rich bowl of soup. This category of food is broadly known as "Swallow," and Fufu is the most famous example.

But what exactly is Fufu, and what are all the other types of swallows?

## The Concept of "Swallow"
In Nigeria, soups (like Egusi, Ogbono, or Okra) are not eaten with a spoon. Instead, they are eaten with a starchy accompaniment. You pinch off a small piece of the dough, roll it, dip it into the soup to scoop it up, and literally swallow it. The soup provides the flavor, while the swallow provides the filling carbohydrate base.

## The Different Types of Nigerian Swallows

### 1. Fufu (Akpu or Water Fufu)
True traditional Fufu in Nigeria is made from cassava that has been fermented for several days, then mashed and cooked. It has a slightly sour, tangy taste (similar to sourdough) and a very smooth, stretchy texture. 

### 2. Pounded Yam (Poundo)
Considered the "king of swallows," traditional pounded yam is made by boiling actual yams (African yams, not sweet potatoes) and pounding them in a large wooden mortar and pestle until they become a smooth, stretchy dough. Today, many people use yam flour (Poundo Yam) mixed with boiling water. It has a mild, slightly sweet potato-like taste and is the perfect pairing for Egusi soup.

### 3. Eba (Garri)
Eba is made from Garri (dry roasted cassava flakes) mixed with hot water. It takes less than two minutes to make. Eba has a slightly grainy texture and a mild tartness. It is the most common everyday swallow in Nigeria.

### 4. Amala
Amala is deeply tied to the Yoruba culture of southwestern Nigeria. It is made from yam skins that have been peeled, dried, and ground into a fine flour, which gives it a distinct dark brown color. Amala is very soft, light, and earthy. It is traditionally eaten with Ewedu soup and a spicy tomato stew.

### 5. Semolina (Semo)
Made from wheat, Semo is smooth, white, and very filling. It has a neutral taste, making it a great vehicle for highly flavorful soups.

## Which One Should You Try First?
If you are a beginner trying Nigerian food for the first time, **Pounded Yam** is highly recommended. Its mild flavor and smooth texture make it universally loved and very approachable.

Ready to try your first swallow? Head over to our [Menu](/menu) at Mama DD's African Kitchen in Enschede and order Pounded Yam with a bowl of hearty Egusi or Ogbono soup!`,
        metaTitle: "What Is Fufu? Nigerian Swallows (Eba, Amala, Poundo) Explained",
        metaDescription: "What is Fufu? Learn about the different types of Nigerian swallows, including Pounded Yam, Eba, and Amala, and how to eat them with African soups.",
        primaryKeyword: "what is fufu",
        secondaryKeywords: "types of swallow, what is amala, nigerian swallow",
        category: "Beginner Guides",
        tags: "fufu, swallow, amala, eba",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-egusi-soup,what-is-nigerian-food",
        coverImage: "/images/blog/egusi_soup_fufu_1789154766158.jpg",
        coverImageAlt: "A portion of smooth white pounded yam next to a bowl of Nigerian soup."
    },
    {
        title: "What Does Nigerian Food Taste Like?",
        excerpt: "Is Nigerian food spicy? Is it sweet? Discover the deep, earthy, and bold flavor profiles that make West African cuisine so unique.",
        content: `If you have never tasted Nigerian food before, describing it can be difficult because the flavors are so bold and unique compared to European or Asian cuisines. 

So, what does Nigerian food actually taste like? The short answer: it is deeply savory, earthy, rich, and often spicy. Here is a breakdown of the core flavor profiles you will experience.

## 1. Deeply Savory and Umami
Nigerian food relies heavily on umami (the rich, savory taste found in meats and broths). Instead of relying on dairy or subtle herbs, Nigerian stews are built on highly reduced tomato and pepper bases mixed with rich meat stocks. 

Ingredients like **ground crayfish** (dried and blended shrimp) and **Iru (fermented locust beans)** act as natural flavor enhancers, giving dishes a deep, earthy, and almost mushroom-like savoriness that lingers on the palate.

## 2. Yes, It Is Usually Spicy
Heat is a central element of Nigerian cooking. The **Scotch Bonnet pepper** (Ata Rodo) is the pepper of choice. It brings a bright, fruity, and intense heat. However, the spice in Nigerian food is rarely just "hot for the sake of being hot." The heat is always balanced by the sweetness of onions, the acidity of tomatoes, and the savory meat broths.

*Note: If you are ordering from Mama DD's African Kitchen, you can often request milder versions of certain dishes if you are not accustomed to high heat!*

## 3. Earthy and Rich
**Palm oil** is a crucial ingredient in traditional soups like Egusi and Ogbono. Unrefined red palm oil has a distinct, rich, and earthy flavor that is impossible to replicate with vegetable oil. It coats the tongue and provides a hearty richness to the soups.

## 4. Smoky
If you eat authentic Nigerian Jollof rice, the first thing you will notice is the smoke. Traditional Jollof is cooked over firewood, and the bottom is allowed to catch and burn slightly. This infuses the entire pot of rice with a beautiful, barbecue-like smokiness that Nigerians absolutely love.

## 5. Texturally Diverse
Nigerian food is heavily focused on texture:
*   **Chewy:** Meats are often cooked until tender, then fried so they have a chewy, resilient crust.
*   **Smooth and Doughy:** "Swallows" like Fufu and Pounded Yam are smooth and meant to be swallowed without chewing.
*   **Viscous:** Soups like Ogbono and Ewedu have a thick, "draw" (mucilaginous) texture similar to okra, which helps the soup cling perfectly to the swallow.

## Ready for a Taste Test?
The best way to understand Nigerian food is to taste it. If you are in Enschede or the Twente region, Mama DD's African Kitchen offers an authentic taste of Nigeria. Explore our [Menu](/menu) and try the rich flavors of West Africa today!`,
        metaTitle: "What Does Nigerian Food Taste Like? Flavors Explained",
        metaDescription: "Is Nigerian food spicy? Discover the unique flavor profile of West African cuisine, from the smoky taste of Jollof to the rich, earthy umami of Nigerian soups.",
        primaryKeyword: "nigerian food taste",
        secondaryKeywords: "is nigerian food spicy, african food flavors",
        category: "Beginner Guides",
        tags: "flavors, taste, spicy",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-nigerian-food,10-nigerian-foods-to-try",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "A table full of richly spiced Nigerian dishes."
    },
    {
        title: "10 Nigerian Foods to Try If You've Never Had Nigerian Food Before",
        excerpt: "Ready to explore West African cuisine? Here are the top 10 Nigerian dishes you need to try as a beginner.",
        content: `Diving into a new cuisine can be overwhelming, especially one as diverse as Nigeria's. With hundreds of ethnic groups, Nigeria boasts a massive variety of dishes. 

If you are a beginner looking to explore Nigerian food—perhaps searching for Nigerian food in Enschede—here are the top 10 dishes you absolutely must try.

## 1. Jollof Rice
The undisputed king of West African food. This smoky, spicy, tomato-based rice dish is a staple at every party. Pair it with fried plantains and grilled chicken for the ultimate beginner meal.

## 2. Fried Plantains (Dodo)
Sweet, ripe plantains sliced and fried until golden and caramelized. They are soft, sweet, and the perfect side dish to balance out spicy meals.

## 3. Pounded Yam and Egusi Soup
The perfect introduction to Nigerian "swallow" and soups. Pounded yam is smooth and mild (like a dense mashed potato dough), while Egusi is a rich, savory, and nutty soup made from ground melon seeds and spinach.

## 4. Suya
A popular nighttime street food. Suya consists of thinly sliced beef or chicken coated in a spicy, peanut-based rub (Yaji) and roasted over an open flame. It is smoky, nutty, and highly addictive.

## 5. Meat Pie
A popular Nigerian pastry. It is a buttery, flaky shortcrust pastry filled with a savory, well-seasoned mixture of minced meat, potatoes, and carrots.

## 6. Puff-Puff
Nigeria's favorite sweet street snack. These are deep-fried dough balls that are slightly sweet, chewy on the inside, and golden brown on the outside. Similar to Dutch *oliebollen*, but smaller and without raisins!

## 7. Asun
For those who love heat! Asun is a spicy, roasted goat meat dish chopped into bite-sized pieces and tossed in a fiery mix of scotch bonnet peppers and onions.

## 8. Ewa Agoyin
A deeply comforting street food made of extremely soft, mashed beans served with a dark, gritty, and intensely flavorful caramelized pepper and palm oil sauce. Usually eaten with soft bread.

## 9. Pepper Soup
A light, watery, but intensely spicy broth made with traditional African spices and herbs, usually containing cuts of fish, goat meat, or assorted cow offal. It is the ultimate comfort food for cold days.

## 10. Ogbono Soup
A unique, savory soup made from wild mango seeds. It has a thick, viscous ("draw") texture similar to okra, which makes it perfect for eating with Fufu or Pounded Yam as it clings perfectly to the dough.

## Start Your Food Journey
Ready to check these items off your list? If you are in the Netherlands, Mama DD's African Kitchen in Enschede cooks these traditional dishes with absolute authenticity. Visit our [Menu](/menu) to start your Nigerian food journey today!`,
        metaTitle: "10 Nigerian Foods to Try for Beginners",
        metaDescription: "Never had Nigerian food? Start with these 10 delicious West African dishes, including Jollof rice, Egusi soup, Suya, and sweet fried plantains.",
        primaryKeyword: "nigerian food for beginners",
        secondaryKeywords: "best african dishes to try",
        category: "Beginner Guides",
        tags: "beginners, top 10, dishes",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-nigerian-food,what-does-nigerian-food-taste-like",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "A platter of various Nigerian dishes perfect for beginners."
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
