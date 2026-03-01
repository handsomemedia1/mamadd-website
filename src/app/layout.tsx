import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer, { FloatingCartButton } from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import NewsletterPopup from "@/components/NewsletterPopup";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mama DD's | Authentic African Food in Enschede",
    template: "%s | Mama DD's African Kitchen",
  },
  description:
    "The first authentic homemade African food in Enschede. Order Jollof Rice, Egusi, Fufu, and more traditional West African dishes. Order via WhatsApp!",
  keywords: [
    "African Food",
    "Enschede",
    "Nigerian Cuisine",
    "Jollof Rice",
    "Fufu",
    "Egusi",
    "African Restaurant",
    "West African Food",
    "Homemade Meals",
    "Nigerian Food Netherlands",
  ],
  authors: [{ name: "Mama DD's African Kitchen" }],
  openGraph: {
    type: "website",
    locale: "en_NL",
    siteName: "Mama DD's African Kitchen",
    title: "Mama DD's | Authentic African Food in Enschede",
    description:
      "The first authentic homemade African food in Enschede. Order Jollof Rice, Egusi, Fufu, and more!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Restaurant structured data
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Mama DD's African Kitchen",
  image: "",
  servesCuisine: ["African", "Nigerian", "West African"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Waalstraat 134",
    addressLocality: "Enschede",
    postalCode: "7523 RM",
    addressCountry: "NL",
  },
  telephone: "+31612988455",
  url: "https://mamadd.com",
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
      opens: "18:00",
      closes: "20:00",
    },
  ],
  menu: "https://mamadd.com/menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen pt-24">{children}</main>
            <Footer />
            <CartDrawer />
            <FloatingCartButton />
            <NewsletterPopup />
          </CartProvider>
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
