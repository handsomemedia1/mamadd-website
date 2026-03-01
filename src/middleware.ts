import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes (except login)
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        const session = request.cookies.get("mama-dds-session");

        if (!session?.value) {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Validate the session cookie (basic check)
        try {
            const data = JSON.parse(Buffer.from(session.value, "base64").toString());
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (!data.userId || Date.now() - data.createdAt > sevenDays) {
                const loginUrl = new URL("/admin/login", request.url);
                return NextResponse.redirect(loginUrl);
            }
        } catch {
            const loginUrl = new URL("/admin/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
