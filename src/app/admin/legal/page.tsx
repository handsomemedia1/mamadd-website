import { prisma } from "@/lib/db";
import AdminLegalClient from "./LegalClient";

export const dynamic = "force-dynamic";

export default async function AdminLegalPage() {
    const [legalPages, paymentMethods] = await Promise.all([
        prisma.legalPage.findMany({ orderBy: { order: "asc" } }),
        prisma.paymentMethod.findMany({ orderBy: { order: "asc" } }),
    ]);

    return <AdminLegalClient legalPages={legalPages} paymentMethods={paymentMethods} />;
}
