export type Locale = "en" | "nl";

export const translations: Record<Locale, Record<string, string>> = {
    en: {
        // ── Navbar ──
        "nav.home": "Home",
        "nav.menu": "Menu",
        "nav.book": "Book",
        "nav.loyalty": "Loyalty ⭐",
        "nav.blog": "Blog",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.timetable": "Food Table",
        "nav.orderNow": "Order Now",

        // ── Homepage Hero ──
        "home.badge": "🍲 Authentic African Cuisine",
        "home.heroTitle1": "Taste the True",
        "home.heroTitle2": "Africa",
        "home.heroTitle3": "Made with",
        "home.heroTitle4": "Love",
        "home.heroDesc":
            "The first authentic homemade African food in Enschede. Experience Jollof Rice, Egusi, Fufu, and more — cooked fresh by Mama DD with traditional recipes.",
        "home.viewMenu": "View Menu",
        "home.orderWhatsApp": "💬 Order via WhatsApp",

        // ── How to Order ──
        "home.howTitle": "How to Order",
        "home.howSubtitle": "Three simple steps to enjoy authentic African food",
        "home.step": "Step",
        "home.step1Title": "Browse Menu",
        "home.step1Desc": "Explore our authentic African dishes and add your favorites to cart.",
        "home.step2Title": "Order via WhatsApp",
        "home.step2Desc":
            "Your order is sent directly to us via WhatsApp — quick and personal.",
        "home.step3Title": "Enjoy Your Meal",
        "home.step3Desc":
            "Pick up your freshly cooked homemade meal and enjoy the taste of Africa!",

        // ── Delivery ──
        "home.deliveryBadge": "🛵 We Deliver!",
        "home.deliveryTitle": "Fresh to Your Door",
        "home.deliveryDesc": "Can't make it to us? No problem. We deliver hot, freshly cooked African meals within a",
        "home.deliveryRadius": "10km radius",
        "home.deliveryDesc2": "of our kitchen in Enschede.",
        "home.deliveryPoint1": "10 km delivery radius from Waalstraat, Enschede",
        "home.deliveryPoint2": "Delivery charges quoted personally on WhatsApp",
        "home.deliveryPoint3": "Meals prepared fresh — never pre-made",
        "home.deliveryPoint4": "Delivery time confirmed at time of order",
        "home.deliveryCTA": "Ask About Delivery",
        "home.deliveryLabel": "10 km radius · Enschede",

        // ── About Snippet ──
        "home.aboutBadge": "🏠 Our Story",
        "home.aboutTitle1": "More Than Food,",
        "home.aboutTitle2": "It's Home",
        "home.aboutDesc": "Mama DD brings the authentic flavors of Africa to Enschede. Every dish is prepared with traditional recipes passed down through generations — the same way it's made at home, in Africa. When you eat with us, you're not just eating food — you're experiencing a culture.",
        "home.readStory": "Read Our Story",

        // ── Find Us ──
        "home.findTitle": "Find Us",
        "home.findSubtitle": "Visit us in the heart of Enschede",
        "home.address": "Address",
        "home.addressValue": "Waalstraat 134, 7523 RM Enschede, Netherlands",
        "home.openingHours": "Opening Hours",
        "home.tueThu": "Tue – Thu: 6:00 PM – 8:00 PM",
        "home.sat": "Saturday: 6:00 PM – 8:00 PM",
        "home.closed": "Closed: Mon, Fri, Sun",
        "home.contactLabel": "Contact",
        "home.chatWhatsApp": "Chat on WhatsApp →",

        // ── Reviews ──
        "home.reviewsBadge": "⭐ Verified Customer Reviews",
        "home.reviewsTitle": "What Our Customers Say",
        "home.leaveReview": "⭐ Leave Us a Google Review",

        // ── CTA Banner ──
        "home.ctaTitle": "Ready to Taste Africa?",
        "home.ctaDesc": "Order your favorite dishes now and experience authentic African flavors, made fresh just for you.",
        "home.ctaMenu": "View Our Menu",
        "home.ctaWhatsApp": "💬 WhatsApp Order",

        // ── About Page ──
        "about.badge": "🏠 Our Story",
        "about.title": "About Mama DD's",
        "about.subtitle": "A cultural gateway to African flavors, right here in Enschede",
        "about.storyTitle1": "About",
        "about.storyTitle2": "Mama DD's African Kitchen",
        "about.storyP1":
            "Mama DD's is a home-cooked West African kitchen based in Enschede, specialising in traditional Nigerian and other African cuisine. Behind every dish is a skilled and experienced chef whose passion for African flavours ensures each meal is crafted with authenticity and care.",
        "about.storyP2":
            "What started as a simple desire to share the rich tastes of West Africa with friends and family quickly grew into something much larger. Today, Mama DD's has become a go-to destination for anyone craving genuine African food in the Netherlands.",
        "about.menuTitle1": "The",
        "about.menuTitle2": "Menu",
        "about.menuP1":
            "Our menu features a vibrant selection of traditional staples, including Jollof rice, pounded yams, and various types of fufu, all served with richly flavoured soups like Ogbono and Egusi. Guests can choose from a range of combos and vegetarian options, often accompanied by beloved sides such as fried plantains or spicy asun meat. To complete the experience, we offer soft drinks and traditional non-alcoholic malt beverages that are cherished across African cultures.",
        "about.setsApartTitle1": "What Sets",
        "about.setsApartTitle2": "Us Apart",
        "about.val1Title": "Generous Portions",
        "about.val1Desc":
            "Our customers frequently praise Mama DD's for its generous portions and perfectly balanced spices.",
        "about.val2Title": "Reliable Delivery",
        "about.val2Desc":
            "Enjoy Mama DD's from the comfort of your home with our reliable delivery service.",
        "about.val3Title": "More Than Just Meals",
        "about.val3Desc":
            "In addition to individual meals, we offer catering services, referral programs, and subscription plans for our regular customers.",
        "about.footerText": "At Mama DD's, every dish is prepared using time-honoured recipes passed down through generations. When you dine with us, you're not just enjoying a meal—you're experiencing the warmth and taste of home.",
        "about.ctaTitle": "Come Taste the Difference",
        "about.ctaDesc":
            "Visit us at Waalstraat 134, Enschede — or order via WhatsApp and we'll have your meal ready for pickup.",
        "about.ctaMenu": "View Menu",
        "about.ctaWhatsApp": "💬 WhatsApp Us",

        // ── Contact Page ──
        "contact.badge": "📍 Get in Touch",
        "contact.title": "Contact Us",
        "contact.subtitle":
            "We'd love to hear from you! Reach out via WhatsApp, email, or phone.",
        "contact.waTitle": "WhatsApp (Fastest!)",
        "contact.waDesc": "The quickest way to order or ask questions",
        "contact.waCTA": "💬 Chat on WhatsApp",
        "contact.emailTitle": "Email",
        "contact.emailDesc": "Send us a message or place an order via email",
        "contact.phoneTitle": "Phone",
        "contact.phoneDesc": "Call us directly for urgent orders or questions",
        "contact.addressTitle": "Address",
        "contact.hoursTitle": "Opening Hours",
        "contact.tuesday": "Tuesday",
        "contact.wednesday": "Wednesday",
        "contact.thursday": "Thursday",
        "contact.saturday": "Saturday",
        "contact.closedDays": "Closed: Monday, Friday, Sunday",

        // ── Menu Page ──
        "menu.badge": "🍽️View Our Menu",
        "menu.title": "Menu",
        "menu.subtitle": "Authentic African dishes, made fresh daily with love",
        "menu.orderWA": "Order via WhatsApp",
        "menu.deliveryBadge": "🛵 Delivery available within 10 km — ask on WhatsApp",
        "menu.cateringBadge": "🎉 Catering for Parties & Events — Ask Us!",
        "menu.items": "items",
        "menu.noItems": "No items available in this category right now.",
        "menu.popular": "⭐ Popular",
        "menu.readyTitle": "Ready to Order?",
        "menu.readyDesc":
            "Send us your order via WhatsApp and we'll have it ready for pickup. It's that simple!",
        "menu.readyCTA": "💬 Order on WhatsApp",
        "menu.priceNote":
            "Prices may vary. Pickup & delivery available in Enschede.",
        "menu.cateringNote":
            "For catering and large party orders, contact us via WhatsApp or email.",

        // ── Footer ──
        "cart.title": "Your Order",
        "metadata.desc": "The first authentic homemade African food in Enschede. Experience the rich flavors of African cuisine, made with love by Mama DD.",
        "footer.brandDesc":
            "The first authentic homemade African food in Enschede. Experience the rich flavors of African cuisine, made with love by Mama DD.",
        "footer.quickLinks": "Quick Links",
        "footer.ourMenu": "Our Menu",
        "footer.blog": "Blog",
        "footer.aboutUs": "About Us",
        "footer.contact": "Contact",
        "footer.loyaltyProgramme": "Loyalty Programme",
        "footer.legalInfo": "Legal & Info",
        "footer.findUs": "Find Us",
        "footer.copyright": "Mama DD's African Kitchen. All rights reserved.",
        "footer.emailOrder": "✉️ Email Order",
        "footer.waOrder": "💬 WhatsApp Order",

        // ── Timetable Page ──
        "timetable.badge": "🗓️ Weekly Food Table",
        "timetable.title": "What's Cooking This Week",
        "timetable.subtitle": "See what Mama DD is preparing each day and order ahead via WhatsApp",
        "timetable.thisWeek": "This Week",
        "timetable.loading": "Loading this week's menu...",
        "timetable.today": "Today",
        "timetable.orderFor": "Order for",
        "timetable.emptyTitle": "Menu Not Set Yet",
        "timetable.emptyDesc": "The menu for this week hasn't been published yet. Check back soon or ask us directly!",
        "timetable.askWhatsApp": "💬 Ask on WhatsApp",
        "timetable.info": "Timetable updated weekly. Dishes are subject to availability.",
        "timetable.monday": "Monday",
        "timetable.tuesday": "Tuesday",
        "timetable.wednesday": "Wednesday",
        "timetable.thursday": "Thursday",
        "timetable.friday": "Friday",
        "timetable.saturday": "Saturday",
        "timetable.sunday": "Sunday",

        // ── Newsletter Popup ──
        "newsletter.title": "Never Miss a Recipe! 🍳",
        "newsletter.desc": "Subscribe to get notified when we publish new blog posts, recipes, and special offers from Mama DD's.",
        "newsletter.namePlaceholder": "Your name (optional)",
        "newsletter.emailPlaceholder": "Your email address",
        "newsletter.subscribe": "Subscribe",
        "newsletter.successTitle": "You're In! 🎉",
        "newsletter.successDesc": "Thanks for subscribing! You'll be the first to know when we publish new blog posts and recipes.",
        "newsletter.alreadyTitle": "Already Subscribed! 💛",
        "newsletter.alreadyDesc": "You're already on our list! We'll keep you updated with new posts.",
        "newsletter.gotIt": "Got it!",
        "newsletter.privacy": "We respect your privacy. Unsubscribe anytime.",

        // ── Language ──
        "lang.en": "English",
        "lang.nl": "Nederlands",
    },

    nl: {
        // ── Navbar ──
        "nav.home": "Home",
        "nav.menu": "Menu",
        "nav.book": "Boek",
        "nav.loyalty": "Loyaliteit ⭐",
        "nav.blog": "Blog",
        "nav.about": "Over Ons",
        "nav.contact": "Contact",
        "nav.timetable": "Eettafel",
        "nav.orderNow": "Bestel Nu",

        // ── Homepage Hero ──
        "home.badge": "🍲 Authentieke West-Afrikaanse Keuken",
        "home.heroTitle1": "Smaak van",
        "home.heroTitle2": "Afrika",
        "home.heroTitle3": "Gemaakt met",
        "home.heroTitle4": "Liefde",
        "home.heroDesc":
            "Het eerste authentieke huisgemaakte Afrikaanse eten in Enschede. Ervaar Jollof Rijst, Egusi, Fufu en meer — vers gekookt door Mama DD met traditionele recepten.",
        "home.viewMenu": "Bekijk Menu",
        "home.orderWhatsApp": "💬 Bestel via WhatsApp",

        // ── How to Order ──
        "home.howTitle": "Hoe te Bestellen",
        "home.howSubtitle":
            "Drie eenvoudige stappen om te genieten van authentiek Afrikaans eten",
        "home.step": "Stap",
        "home.step1Title": "Bekijk Menu",
        "home.step1Desc":
            "Ontdek onze authentieke West-Afrikaanse gerechten en voeg je favorieten toe aan de winkelwagen.",
        "home.step2Title": "Bestel via WhatsApp",
        "home.step2Desc":
            "Je bestelling wordt direct naar ons gestuurd via WhatsApp — snel en persoonlijk.",
        "home.step3Title": "Geniet van je Maaltijd",
        "home.step3Desc":
            "Haal je vers gekookte huisgemaakte maaltijd op en geniet van de smaak van Afrika!",

        // ── Delivery ──
        "home.deliveryBadge": "🛵 Wij Bezorgen!",
        "home.deliveryTitle": "Vers aan je Deur",
        "home.deliveryDesc":
            "Kun je niet naar ons toe? Geen probleem. Wij bezorgen warme, vers gekookte West-Afrikaanse maaltijden binnen een",
        "home.deliveryRadius": "straal van 10 km",
        "home.deliveryDesc2": "van onze keuken in Enschede.",
        "home.deliveryPoint1": "10 km bezorgradius vanaf Waalstraat, Enschede",
        "home.deliveryPoint2": "Bezorgkosten persoonlijk via WhatsApp",
        "home.deliveryPoint3": "Maaltijden vers bereid — nooit voorgemaakt",
        "home.deliveryPoint4": "Bezorgtijd bevestigd bij bestelling",
        "home.deliveryCTA": "Vraag over Bezorging",
        "home.deliveryLabel": "10 km straal · Enschede",

        // ── About Snippet ──
        "home.aboutBadge": "🏠 Ons Verhaal",
        "home.aboutTitle1": "Meer dan Eten,",
        "home.aboutTitle2": "Het is Thuis",
        "home.aboutDesc":
            "Mama DD brengt de authentieke smaken van West-Afrika naar Enschede. Elk gerecht wordt bereid met traditionele recepten die van generatie op generatie zijn doorgegeven — op dezelfde manier als thuis, in Afrika. Als je bij ons eet, eet je niet zomaar — je ervaart een cultuur.",
        "home.readStory": "Lees Ons Verhaal",

        // ── Find Us ──
        "home.findTitle": "Vind Ons",
        "home.findSubtitle": "Bezoek ons in het hart van Enschede",
        "home.address": "Adres",
        "home.addressValue": "Waalstraat 134, 7523 RM Enschede, Nederland",
        "home.openingHours": "Openingstijden",
        "home.tueThu": "Di – Do: 18:00 – 20:00",
        "home.sat": "Zaterdag: 18:00 – 20:00",
        "home.closed": "Gesloten: Ma, Vr, Zo",
        "home.contactLabel": "Contact",
        "home.chatWhatsApp": "Chat op WhatsApp →",

        // ── Reviews ──
        "home.reviewsBadge": "⭐ Geverifieerde Klantbeoordelingen",
        "home.reviewsTitle": "Wat Onze Klanten Zeggen",
        "home.leaveReview": "⭐ Laat een Google Review Achter",

        // ── CTA Banner ──
        "home.ctaTitle": "Klaar om Afrika te Proeven?",
        "home.ctaDesc":
            "Bestel nu je favoriete gerechten en ervaar authentieke West-Afrikaanse smaken, vers voor jou bereid.",
        "home.ctaMenu": "Bekijk Ons Menu",
        "home.ctaWhatsApp": "💬 WhatsApp Bestelling",

        // ── About Page ──
        "about.badge": "🏠 Ons Verhaal",
        "about.title": "Over Mama DD's",
        "about.subtitle":
            "Een culturele poort naar West-Afrikaanse smaken, hier in Enschede",
        "about.storyTitle1": "Over",
        "about.storyTitle2": "Mama DD's African Kitchen",
        "about.storyP1":
            "Mama DD's is een huisgemaakte West-Afrikaanse keuken gevestigd in Enschede, gespecialiseerd in traditionele Nigeriaanse en andere Afrikaanse gerechten. Achter elk gerecht staat een bekwame en ervaren chef-kok wiens passie voor Afrikaanse smaken ervoor zorgt dat elke maaltijd met authenticiteit en zorg wordt bereid.",
        "about.storyP2":
            "Wat begon als een eenvoudig verlangen om de rijke smaken van West-Afrika te delen met vrienden en familie, groeide snel uit tot iets veel groters. Vandaag de dag is Mama DD's dé bestemming geworden voor iedereen die verlangt naar echt Afrikaans eten in Nederland.",
        "about.menuTitle1": "Het",
        "about.menuTitle2": "Menu",
        "about.menuP1":
            "Ons menu biedt een levendige selectie van traditionele gerechten, waaronder Jollof rijst, pounded yams en verschillende soorten fufu, allemaal geserveerd met rijk smakende soepen zoals Ogbono en Egusi. Gasten kunnen kiezen uit een reeks combo's en vegetarische opties, vaak vergezeld van geliefde bijgerechten zoals gebakken bakbanaan of pittig asun-vlees. Om de ervaring compleet te maken, bieden wij frisdranken en traditionele alcoholvrije moutdranken aan die overal in Afrikaanse culturen worden gekoesterd.",
        "about.setsApartTitle1": "Wat Ons",
        "about.setsApartTitle2": "Onderscheidt",
        "about.val1Title": "Ruime Porties",
        "about.val1Desc":
            "Onze klanten prijzen Mama DD's regelmatig om de gulle porties en perfect uitgebalanceerde kruiden.",
        "about.val2Title": "Betrouwbare Bezorging",
        "about.val2Desc":
            "Geniet van Mama DD's vanuit het comfort van je eigen huis met onze betrouwbare bezorgservice.",
        "about.val3Title": "Meer Dan Alleen Maaltijden",
        "about.val3Desc":
            "Naast individuele maaltijden bieden wij cateringservices, verwijzingsprogramma's en abonnementen aan voor onze vaste klanten.",
        "about.footerText": "Bij Mama DD's wordt elk gerecht bereid volgens eeuwenoude recepten die van generatie op generatie zijn doorgegeven. Als je bij ons dineert, geniet je niet alleen van een maaltijd, je ervaart de warmte en smaak van thuis.",
        "about.ctaTitle": "Kom het Verschil Proeven",
        "about.ctaDesc":
            "Bezoek ons op Waalstraat 134, Enschede — of bestel via WhatsApp en we maken je maaltijd klaar voor afhalen.",
        "about.ctaMenu": "Bekijk Menu",
        "about.ctaWhatsApp": "💬 WhatsApp Ons",

        // ── Contact Page ──
        "contact.badge": "📍 Neem Contact Op",
        "contact.title": "Neem Contact Op",
        "contact.subtitle":
            "We horen graag van je! Neem contact op via WhatsApp, e-mail of telefoon.",
        "contact.waTitle": "WhatsApp (Snelst!)",
        "contact.waDesc": "De snelste manier om te bestellen of vragen te stellen",
        "contact.waCTA": "💬 Chat op WhatsApp",
        "contact.emailTitle": "E-mail",
        "contact.emailDesc":
            "Stuur ons een bericht of plaats een bestelling via e-mail",
        "contact.phoneTitle": "Telefoon",
        "contact.phoneDesc":
            "Bel ons direct voor dringende bestellingen of vragen",
        "contact.addressTitle": "Adres",
        "contact.hoursTitle": "Openingstijden",
        "contact.tuesday": "Dinsdag",
        "contact.wednesday": "Woensdag",
        "contact.thursday": "Donderdag",
        "contact.saturday": "Zaterdag",
        "contact.closedDays": "Gesloten: Maandag, Vrijdag, Zondag",

        // ── Menu Page ──
        "menu.badge": "🍽️ Ons Menu",
        "menu.title": "Wat er Kookt",
        "menu.subtitle":
            "Authentieke West-Afrikaanse gerechten, elke dag vers bereid met liefde",
        "menu.orderWA": "Bestel via WhatsApp",
        "menu.deliveryBadge":
            "🛵 Bezorging beschikbaar binnen 10 km — vraag via WhatsApp",
        "menu.cateringBadge": "🎉 Catering voor Feesten & Evenementen — Vraag Ons!",
        "menu.items": "gerechten",
        "menu.noItems": "Geen gerechten beschikbaar in deze categorie op dit moment.",
        "menu.popular": "⭐ Populair",
        "menu.readyTitle": "Klaar om te Bestellen?",
        "menu.readyDesc":
            "Stuur ons je bestelling via WhatsApp en we maken het klaar voor afhalen. Zo simpel is het!",
        "menu.readyCTA": "💬 Bestel op WhatsApp",
        "menu.priceNote":
            "Prijzen kunnen variëren. Afhalen & bezorgen beschikbaar in Enschede.",
        "menu.cateringNote":
            "Voor catering en grote feestbestellingen, neem contact op via WhatsApp of e-mail.",

        // ── Footer ──
        "footer.brandDesc":
            "Het eerste authentieke huisgemaakte Afrikaanse eten in Enschede. Ervaar de rijke smaken van de West-Afrikaanse keuken, met liefde gemaakt door Mama DD.",
        "footer.quickLinks": "Snelle Links",
        "footer.ourMenu": "Ons Menu",
        "footer.blog": "Blog",
        "footer.aboutUs": "Over Ons",
        "footer.contact": "Contact",
        "footer.loyaltyProgramme": "Loyaliteitsprogramma",
        "footer.legalInfo": "Juridisch & Info",
        "footer.findUs": "Vind Ons",
        "footer.copyright":
            "Mama DD's African Kitchen. Alle rechten voorbehouden.",
        "footer.emailOrder": "✉️ E-mail Bestelling",
        "footer.waOrder": "💬 WhatsApp Bestelling",

        // ── Timetable Page ──
        "timetable.badge": "🗓️ Weekmenu",
        "timetable.title": "Wat Kookt er Deze Week",
        "timetable.subtitle": "Bekijk wat Mama DD elke dag bereidt en bestel vooruit via WhatsApp",
        "timetable.thisWeek": "Deze Week",
        "timetable.loading": "Weekmenu laden...",
        "timetable.today": "Vandaag",
        "timetable.orderFor": "Bestel voor",
        "timetable.emptyTitle": "Menu Nog Niet Ingesteld",
        "timetable.emptyDesc": "Het menu voor deze week is nog niet gepubliceerd. Kom snel terug of vraag het ons direct!",
        "timetable.askWhatsApp": "💬 Vraag via WhatsApp",
        "timetable.info": "Weekmenu wordt wekelijks bijgewerkt. Gerechten zijn onder voorbehoud van beschikbaarheid.",
        "timetable.monday": "Maandag",
        "timetable.tuesday": "Dinsdag",
        "timetable.wednesday": "Woensdag",
        "timetable.thursday": "Donderdag",
        "timetable.friday": "Vrijdag",
        "timetable.saturday": "Zaterdag",
        "timetable.sunday": "Zondag",

        // ── Newsletter Popup ──
        "newsletter.title": "Mis Geen Recept! 🍳",
        "newsletter.desc": "Abonneer je om op de hoogte te blijven van nieuwe blogposts, recepten en speciale aanbiedingen van Mama DD's.",
        "newsletter.namePlaceholder": "Je naam (optioneel)",
        "newsletter.emailPlaceholder": "Je e-mailadres",
        "newsletter.subscribe": "Abonneren",
        "newsletter.successTitle": "Je Bent Erbij! 🎉",
        "newsletter.successDesc": "Bedankt voor je aanmelding! Je bent de eerste die het weet als we nieuwe blogposts en recepten publiceren.",
        "newsletter.alreadyTitle": "Al Geabonneerd! 💛",
        "newsletter.alreadyDesc": "Je staat al op onze lijst! We houden je op de hoogte van nieuwe berichten.",
        "newsletter.gotIt": "Begrepen!",
        "newsletter.privacy": "Wij respecteren je privacy. Je kunt je altijd afmelden.",

        // ── Language ──
        "lang.en": "English",
        "lang.nl": "Nederlands",
    },
};
