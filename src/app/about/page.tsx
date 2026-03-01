import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Mama DD's African Kitchen — the first authentic homemade African food in Enschede. Our story, values, and passion for West African cuisine.",
};

export default function AboutPage() {
    return <AboutContent />;
}
