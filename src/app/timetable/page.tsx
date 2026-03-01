import type { Metadata } from "next";
import TimetableContent from "@/components/TimetableContent";

export const metadata: Metadata = {
    title: "Weekly Food Table",
    description:
        "See what Mama DD's is cooking this week! Browse our weekly food timetable and order your favorite African dishes ahead via WhatsApp.",
};

export default function TimetablePage() {
    return <TimetableContent />;
}
