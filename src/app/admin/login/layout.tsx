import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin",
    robots: { index: false, follow: false },
};

export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Login page has its own minimal layout (no navbar/footer from parent is handled by conditional)
    return <>{children}</>;
}
