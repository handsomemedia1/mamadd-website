import type { Metadata } from "next";

import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import LayoutShell from "@/components/LayoutShell";

const poppins = {
  variable: "--font-poppins",
};

export const metadata: Metadata = {
  title: "Mama DD's African Kitchen | Authentic Food in Enschede, Netherlands",
  description:
    "The first authentic homemade African food in Enschede, Netherlands. Order Jollof Rice, Egusi, Fufu, and more traditional African dishes. Proudly serving the local community and visitors from the UK and Europe. Order via WhatsApp!",
  keywords: [
    "African Food",
    "Enschede",
    "Netherlands",
    "Europe",
    "UK",
    "Nigerian Cuisine",
    "Jollof Rice",
    "Fufu",
    "Egusi",
    "Enschede Food",
    "African Restaurant Netherlands",
    "Delivery",
    "Homemade Meals",
    "Nigerian Food Netherlands",
    "African Food Europe",
  ],
  authors: [{ name: "Mama DD's African Kitchen" }],
  openGraph: {
    type: "website",
    locale: "en_NL",
    siteName: "Mama DD's African Kitchen",
    title: "Mama DD's | Authentic African Food in Enschede, Netherlands",
    description:
      "The first authentic homemade African food in Enschede, Netherlands. Serving authentic Nigerian cuisine to the local community and visitors from across Europe and the UK.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "lXterEFBi6yAp0XXr9epiRbjMkNVq5mFLcDo5ImNPVg",
    other: {
      "msvalidate.01": "8967B07B23704F7994FA081CCEC551B5",
    },
  },
};

// Restaurant structured data
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Mama DD's African Kitchen",
  image: "",
  servesCuisine: ["African", "Nigerian"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Waalstraat",
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
            <LayoutShell>{children}</LayoutShell>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

