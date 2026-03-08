import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact Mama DD's African Kitchen — WhatsApp, email, or visit us at Waalstraat 134, Enschede. Order authentic African food today!",
};

export default function ContactPage() {
    return <ContactContent />;
}
