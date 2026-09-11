const { Client } = require('pg');
const crypto = require('crypto');

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const articles = [
    {
        title: "What Is Amala? The Nigerian Swallow Explained",
        excerpt: "Discover the deep, earthy flavors of Amala, the iconic dark brown swallow from southwestern Nigeria, and learn the best soups to pair it with.",
        content: `If you have ever explored traditional Nigerian cuisine, particularly from the Yoruba culture in the southwest, you have likely seen a distinct, dark brown dough being served alongside vibrant soups. This is **Amala**.

But what exactly is Amala, and why is it so beloved?

## What Is Amala Made From?
Unlike Fufu or Pounded Yam which are white and made from fresh cassava or yam, Amala gets its signature dark color from its preparation process. 

It is made from **Elubo** (yam flour). The process involves:
1. Slicing raw yams.
2. Peeling and parboiling them.
3. Drying them in the sun until they turn brown.
4. Grinding them into a fine, light powder.

When this yam flour is mixed with boiling water and stirred vigorously, it forms a soft, smooth, and stretchy dough.

*(Note: There is also Amala Lafun, made from cassava flour, and Amala Ogede, made from plantain flour, but yam flour is the most common and iconic.)*

## What Does Amala Taste Like?
Amala is famous for its texture more than its taste. It is incredibly soft and light—much lighter on the stomach than Pounded Yam or Eba. 

Flavor-wise, it has a subtle, earthy, slightly roasted taste that perfectly complements spicy, savory soups. Because it is so mild and soft, it acts as the perfect canvas for rich Nigerian broths.

## How Is Amala Served?
Amala is almost exclusively eaten with a combination of soups known as **"Abula."**
A classic plate of Abula consists of:
*   **Amala:** The base.
*   **Ewedu:** A green, slightly viscous soup made from jute leaves. It is very mild.
*   **Gbegiri:** A rich, savory yellow soup made from black-eyed peas.
*   **Obe Ata (Buka Stew):** A fiery red, palm-oil-based tomato and pepper stew loaded with assorted meats (beef, goat, tripe, and cow skin).

When you combine the soft Amala, the smooth Ewedu, the savory Gbegiri, and the spicy meat stew, you get an explosion of contrasting flavors and textures.

## Try Authentic Amala in Enschede
If you are looking for an authentic traditional Nigerian dining experience, Amala is a must-try. At Mama DD's African Kitchen, we serve traditional Amala with Ewedu and rich meat stews just like you would find in a Lagos "Buka" (local restaurant). 

Visit our [Menu](/menu) to order your first plate of Amala today!`,
        metaTitle: "What Is Amala? The Yoruba Yam Flour Swallow Explained",
        metaDescription: "Learn everything about Amala, the iconic dark brown Nigerian swallow. Discover its earthy flavor, how it's made, and why it's perfectly paired with Ewedu soup.",
        primaryKeyword: "what is amala",
        secondaryKeywords: "amala swallow, how to eat amala",
        category: "Dishes Explained",
        tags: "amala, swallow, yoruba, yam",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-fufu,what-is-egusi-soup",
        coverImage: "/images/blog/nigerian_fufu_swallow_1789155947282.jpg", 
        coverImageAlt: "A portion of Nigerian swallow served with rich soup."
    },
    {
        title: "What Is Ogbono Soup? Taste, Texture and How It Is Served",
        excerpt: "Explore the rich, savory, and unique world of Ogbono soup, Nigeria's famous 'draw' soup made from wild mango seeds.",
        content: `Nigerian cuisine is famous for its rich, hearty soups. While Egusi might be the most famous globally, **Ogbono soup** is arguably one of the most unique and beloved soups across West Africa.

If you are a beginner exploring African food, the texture of Ogbono might surprise you. Here is everything you need to know about this classic dish.

## What Is Ogbono Made Of?
Ogbono soup is made from the dried, ground seeds of the African wild mango tree (*Irvingia gabonensis*). 

When these ground seeds are cooked in a hot broth of palm oil, meat stock, and spices, they undergo a fascinating transformation. The seeds act as a powerful natural thickener, giving the soup a distinct, viscous, mucilaginous texture—similar to cooked okra, but much richer. In Nigeria, this is lovingly referred to as a **"draw soup."**

Alongside the Ogbono seeds, the soup is heavily seasoned with:
*   Palm oil
*   Ground crayfish
*   Locust beans (Iru) for umami
*   Bitter leaf or spinach
*   A massive variety of assorted meats and dried fish

## What Does Ogbono Taste Like?
Ogbono has a very deep, earthy, and intensely savory flavor. Because it is usually cooked with stockfish (dried cod) and smoked fish, it carries a rich, smoky seafood undertone that perfectly complements the spicy scotch bonnet peppers. 

## The "Draw" Texture: Why It Matters
For beginners, the viscous "draw" texture can be surprising, but it serves a very practical purpose. 

In Nigeria, soups are eaten with your hands using a starchy "swallow" like Pounded Yam or Fufu. The slippery, viscous nature of Ogbono allows it to coat the dough perfectly, making it incredibly easy to swallow without chewing. It is the ultimate comfort food.

## Try Ogbono Soup Today
If you love rich, earthy flavors and want to experience a truly authentic Nigerian dish, Ogbono is a fantastic choice. 

At Mama DD's African Kitchen in Enschede, we prepare our Ogbono soup with generous cuts of assorted meat, stockfish, and traditional spices. Pair it with a hot portion of Pounded Yam from our [Menu](/menu) and experience the comfort of West Africa!`,
        metaTitle: "What Is Ogbono Soup? Nigerian Draw Soup Explained",
        metaDescription: "Curious about Ogbono soup? Learn about this savory Nigerian draw soup made from wild mango seeds, its unique texture, and how to eat it.",
        primaryKeyword: "what is ogbono soup",
        secondaryKeywords: "ogbono taste, nigerian draw soup",
        category: "Dishes Explained",
        tags: "ogbono, soups, swallow",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-egusi-soup,what-is-fufu",
        coverImage: "/images/blog/nigerian_fufu_swallow_1789155947282.jpg",
        coverImageAlt: "A bowl of rich Nigerian draw soup served with pounded yam."
    },
    {
        title: "What Is Asun? The Nigerian Spicy Peppered Meat Explained",
        excerpt: "Love spicy food? Learn about Asun, the fiery, smoky, peppered roasted goat meat that is the ultimate Nigerian party snack.",
        content: `If there is one thing Nigerians love as much as Jollof rice, it is heavily spiced, perfectly roasted meat. And when it comes to spicy meats, **Asun** reigns supreme.

If you are browsing the menu at an African restaurant or attending a Nigerian party, you will almost certainly see Asun on the list. But what exactly is it, and just how spicy is it?

## What Is Asun?
Asun (pronounced *ah-soon*) is a popular Nigerian dish made from **roasted, smoked goat meat** that is chopped into bite-sized pieces and tossed in a fiery, onion-and-pepper sauce.

It originated with the Ondo people in southwestern Nigeria but has become a staple "small chop" (appetizer/snack) across the entire country. 

## How Is It Made?
The secret to authentic Asun is the preparation:
1.  **The Meat:** The goat meat is traditionally roasted over an open wood fire with the skin still on. This gives it a chewy, resilient texture and a deep smoky flavor.
2.  **The Spice:** The roasted meat is chopped and then stir-fried or tossed in a coarse blend of onions and **Ata Rodo** (Scotch Bonnet / Habanero peppers). 
3.  **No Tomatoes!** Unlike typical Nigerian stews, authentic Asun does not use tomatoes. The sauce is pure pepper, onion, and meat juices, making it intensely flavorful and very spicy.

## What Does Asun Taste Like?
Asun is not for the faint of heart. It is fiery, smoky, savory, and slightly chewy. The combination of the smoky goat skin, the sweet crunch of raw onions, and the intense heat of the scotch bonnets makes it incredibly addictive. 

It is traditionally served as finger food at parties, often paired with a cold beer or a sweet malt drink to balance the heat.

## How to Eat Asun
While you can eat Asun on its own as a snack, it also pairs beautifully with side dishes. At Mama DD's African Kitchen, we highly recommend our **Plantain & Asun Combo**. The sweetness of the fried plantains (dodo) perfectly cuts through the intense heat of the peppered goat meat.

## Order Asun in Enschede
Ready to test your spice tolerance? You don't need an invitation to a Nigerian party to enjoy Asun. Check out our [Menu](/menu) and order a portion of authentic, fiery Asun for delivery or pickup from Mama DD's African Kitchen today!`,
        metaTitle: "What Is Asun? The Spicy Nigerian Peppered Goat Meat",
        metaDescription: "Love spicy food? Discover Asun, the smoky, fiery roasted goat meat dish that is a staple at every Nigerian party. Learn what makes it so special.",
        primaryKeyword: "what is asun",
        secondaryKeywords: "spicy goat meat nigerian, peppered meat",
        category: "Dishes Explained",
        tags: "asun, meat, spicy, snacks",
        cluster: "Discover Nigerian Food",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-does-nigerian-food-taste-like,10-nigerian-foods-to-try-if-you-ve-never-had-nigerian-food-before",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "A platter featuring spicy roasted meats."
    },
    {
        title: "Nigerian Party Food: 15 Foods You Might Find at a Nigerian Celebration",
        excerpt: "From Smoky Jollof to Puff-Puff, explore the rich, extravagant, and delicious menu you will find at any traditional Nigerian wedding or party.",
        content: `In Nigerian culture, a party without an abundance of food is not a party at all. Whether it is a wedding (Owambe), a naming ceremony, a birthday, or a simple weekend gathering, the food is always the main event. 

Nigerian party food is extravagant, flavorful, and deeply comforting. If you are attending your first Nigerian event, or if you are planning to book [African catering in Enschede](/contact), here are 15 classic foods you will almost certainly find on the menu.

## The Main Courses (The Heavyweights)

1. **Party Jollof Rice:** The undisputed king of the event. It is smokier and richer than home-cooked Jollof because it is cooked in massive cast-iron pots over firewood.
2. **Fried Rice:** Nigerian fried rice is unique—loaded with sweet corn, green beans, carrots, and often small pieces of fried liver.
3. **Pounded Yam and Egusi:** A prestigious dish usually reserved for VIP guests or older attendees. Smooth pounded yam served with rich melon-seed soup.
4. **Amala and Ewedu:** A staple at Yoruba parties, this light, dark swallow is served with a mix of jute leaf soup and spicy meat stew.
5. **Ofada Rice and Ayamase:** Locally grown, unpolished rice served with a fiery, dark green pepper sauce (Ayamase) made with bleached palm oil and locust beans.

## The Proteins (Assorted Meats)

6. **Fried Beef:** Boiled in rich spices, then deep-fried until chewy and resilient.
7. **Grilled or Fried Chicken:** Usually coated in a light, spicy tomato sauce.
8. **Asun:** Fiery, peppered roasted goat meat chopped into bite-sized pieces.
9. **Fried Fish:** Large cuts of croaker or tilapia, deep-fried and covered in a spicy pepper sauce.
10. **Moi Moi:** Not a meat, but a crucial protein side. A savory, steamed bean pudding cooked with eggs, fish, or corned beef inside.

## The Small Chops (Appetizers & Snacks)

Before the main meal is served, trays of "small chops" circulate the room. 

11. **Puff-Puff:** Deep-fried, sweet, chewy dough balls. Highly addictive.
12. **Meat Pies:** Buttery pastry filled with seasoned minced meat and potatoes.
13. **Spring Rolls:** A nod to Asian influence, but heavily adapted for Nigerian palates.
14. **Samosas:** Usually filled with spicy beef or chicken.
15. **Suya:** Spicy, peanut-rubbed grilled beef skewers, often served late into the night.

## Bring the Party to Your Event
You don't have to fly to Lagos to experience a true Nigerian feast. If you are planning an event in Twente, **Mama DD's African Kitchen** provides professional, authentic African catering in Enschede. 

Whether you want massive trays of smoky Jollof or a full selection of Small Chops, we can customize the perfect menu for your guests. Visit our [Contact](/contact) page to request a catering quote today!`,
        metaTitle: "Nigerian Party Food: 15 Foods Served at African Weddings",
        metaDescription: "Discover the ultimate Nigerian party food menu. From smoky Jollof rice to Puff-Puff and Asun, explore the dishes that make African weddings unforgettable.",
        primaryKeyword: "nigerian party food",
        secondaryKeywords: "african party catering menu",
        category: "Culture",
        tags: "party, catering, weddings, owambe",
        cluster: "Culture & Curiosity",
        isPillar: false,
        targetPage: "/contact",
        relatedArticles: "african-catering-in-enschede-nigerian-food-for-parties-and-events,what-is-jollof-rice-a-beginner-s-guide-to-nigeria-s-famous-dish",
        coverImage: "/images/blog/nigerian_food_feast_1789155947282.jpg",
        coverImageAlt: "A large spread of Nigerian party food."
    },
    {
        title: "Nigerian Jollof Rice vs Ghanaian Jollof: What's the Difference?",
        excerpt: "The Jollof Wars explained. Discover the real differences in ingredients, rice type, and flavor between Nigerian and Ghanaian Jollof rice.",
        content: `If there is one culinary debate that unites and divides West Africa simultaneously, it is the legendary **"Jollof Wars."** 

For decades, Nigerians and Ghanaians have engaged in a passionate, mostly friendly rivalry over who makes the best Jollof rice. While Senegal is the historical birthplace of the dish (known there as *Thiéboudienne*), the Nigeria vs. Ghana debate dominates the internet.

But politics and patriotism aside—what is the actual culinary difference between Nigerian and Ghanaian Jollof?

## 1. The Type of Rice
This is the most significant difference between the two dishes.
*   **Nigerian Jollof:** Traditionally uses **long-grain parboiled rice**. This type of rice holds its shape well under long cooking times, allowing it to absorb massive amounts of rich broth without turning mushy.
*   **Ghanaian Jollof:** Typically uses **Jasmine or Basmati rice**. Jasmine rice is highly aromatic and contains more starch, making Ghanaian Jollof slightly softer and stickier, with a naturally fragrant profile.

## 2. The Tomato and Pepper Base
Both countries use a base of blended tomatoes, onions, and peppers, but the ratios and preparations differ.
*   **Nigerian Jollof:** Relies heavily on **Red Bell Peppers (Tatashe)** and Scotch Bonnets (Ata Rodo). The base is often boiled down to a thick paste before frying, resulting in a deeper, redder color and a slightly sweeter pepper profile.
*   **Ghanaian Jollof:** Uses more tomato puree/paste and fresh tomatoes, often incorporating ginger and garlic directly into the blend. The result is a slightly more tomato-forward flavor with a sharp, aromatic ginger kick.

## 3. The Smoke Factor (Party Flavor)
*   **Nigerian Jollof:** The holy grail of Nigerian Jollof is the "party flavor." This is achieved by intentionally letting the rice at the bottom of the pot burn slightly, infusing the entire dish with a distinct, barbecue-like smokiness. 
*   **Ghanaian Jollof:** While some smoke can occur, Ghanaian Jollof generally focuses on the rich, aromatic spices and the tender texture of the Jasmine rice rather than achieving a deliberate smoky crust.

## 4. The Meat and Broth
Both use rich meat stock (usually beef or chicken). However, Ghanaians often use more complex, heavily spiced marinades for their meats, which then flavor the stock used for the rice. 

## So, Which Is Better?
As a Nigerian kitchen, you know where our loyalty lies! The smoky, fiery, rich perfection of Nigerian long-grain Jollof is unbeatable in our eyes. But the truth is, both dishes are incredible representations of West African culinary brilliance.

Want to judge for yourself? If you are in Enschede, order a plate of authentic, smoky Nigerian Jollof from **Mama DD's African Kitchen**. Check out our [Menu](/menu) and taste the winner of the Jollof Wars today!`,
        metaTitle: "Nigerian vs Ghanaian Jollof Rice: What Is the Difference?",
        metaDescription: "The Jollof Wars explained. Learn the real culinary differences between Nigerian and Ghanaian Jollof rice, from the type of rice used to the smoky flavor.",
        primaryKeyword: "nigerian vs ghanaian jollof",
        secondaryKeywords: "difference between jollof",
        category: "Culture",
        tags: "jollof wars, ghana, nigeria, rice",
        cluster: "Culture & Curiosity",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-jollof-rice-a-beginner-s-guide-to-nigeria-s-famous-dish,where-to-get-jollof-rice-in-enschede",
        coverImage: "/images/blog/jollof_rice_chicken_1789154745566.jpg",
        coverImageAlt: "A steaming plate of Nigerian Jollof rice."
    },
    {
        title: "Nigerian Food for Dutch People: 10 Dishes to Try First",
        excerpt: "Curious about West African food? We bridge the gap between Dutch tastes and Nigerian flavors with these 10 highly recommended dishes.",
        content: `As Nigerian cuisine becomes more popular across the Netherlands, many Dutch locals are eager to try it but aren't sure where to start. If your regular diet consists of *stamppot*, *broodjes*, and mild European flavors, jumping straight into fiery West African cuisine can seem intimidating.

But don't worry! Nigerian food is deeply comforting, hearty, and full of incredible flavors that appeal to everyone. If you are looking for *Nigeriaans eten in Enschede*, here are 10 dishes perfectly suited for a Dutch palate trying African food for the first time.

## 1. Jollof Rice (Jollof Rijst)
**Why you will love it:** It is the ultimate comfort food. Think of it as a much richer, smokier, and spicier version of Spanish Paella or Nasi Goreng. It is rice cooked in a savory tomato and pepper broth.
**Spice level:** Medium to High (but can often be adjusted).

## 2. Fried Plantains (Bakbanaan / Dodo)
**Why you will love it:** If you enjoy sweet and savory combinations, you will adore plantains. They are soft, caramelized, and slightly sweet—acting as the perfect side dish to cool down spicy meats.
**Spice level:** Zero.

## 3. Meat Pies
**Why you will love it:** Do you like *saucijzenbroodjes* or empanadas? Nigerian meat pies are very similar! They are buttery pastries filled with seasoned minced meat, potatoes, and carrots.
**Spice level:** Very mild.

## 4. Grilled Chicken with Jollof
**Why you will love it:** Nigerian grilled chicken is marinated in a rich blend of thyme, curry powder, and bouillon, then roasted until tender. It is universally delicious.
**Spice level:** Mild.

## 5. Pounded Yam and Egusi Soup
**Why you will love it:** This is for the adventurous eater ready to try eating with their hands! Pounded Yam has the smooth, comforting texture of very dense mashed potatoes (*aardappelpuree*). Egusi is a savory, nutty soup made from melon seeds.
**Spice level:** Medium.

## 6. Puff-Puff
**Why you will love it:** Puff-Puff is essentially the Nigerian version of *Oliebollen*! They are deep-fried, sweet, chewy dough balls. They don't have raisins or apple chunks, just pure, sweet doughy perfection.
**Spice level:** Zero.

## 7. Suya
**Why you will love it:** If you like Indonesian *Saté*, you need to try Suya. It is thinly sliced beef grilled on a skewer, but instead of peanut sauce, it is coated in a dry, spicy, roasted peanut rub.
**Spice level:** High!

## 8. Fried Rice
**Why you will love it:** Nigerian fried rice is totally different from Asian fried rice. It is deeply seasoned with curry powder and thyme, loaded with vegetables (peas, sweet corn, carrots), and often contains small pieces of liver.
**Spice level:** Mild.

## 9. Beans and Sweet Corn
**Why you will love it:** A very comforting, earthy dish. Nigerian honey beans (Ewa Oloyin) are naturally sweet and cooked until incredibly soft, mixed with sweet corn and a rich palm oil sauce.
**Spice level:** Mild to Medium.

## 10. Asun (For the Brave)
**Why you will love it:** If you are someone who always asks for extra sambal or chili, Asun is for you. It is roasted goat meat tossed in fiery scotch bonnet peppers. It is intense, smoky, and delicious with a cold beer.
**Spice level:** Very High!

## Ready to Taste?
You don't need to fly to Lagos to expand your culinary horizons. **Mama DD's African Kitchen** serves authentic, home-cooked Nigerian meals right here in Enschede. 

Check out our [Menu](/menu) and order your first taste of West Africa today!`,
        metaTitle: "Nigerian Food for Dutch People: 10 Dishes to Try First",
        metaDescription: "Never had African food? We explain Nigerian food for a Dutch palate. Try Jollof rice, plantains, and Puff-Puff (the Nigerian Oliebollen) in Enschede.",
        primaryKeyword: "nigerian food for dutch people",
        secondaryKeywords: "afrikaans eten voor beginners, nigeriaans eten proberen",
        category: "Local Guide",
        tags: "dutch, beginners, guide, enschede",
        cluster: "Culture & Curiosity",
        isPillar: false,
        targetPage: "/menu",
        relatedArticles: "what-is-jollof-rice-a-beginner-s-guide-to-nigeria-s-famous-dish,nigerian-food-in-the-netherlands-dishes-to-try-and-how-to-find-them",
        coverImage: "/images/blog/jollof_rice_chicken_1789154745566.jpg",
        coverImageAlt: "A comforting plate of Jollof rice and chicken, perfect for beginners."
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
