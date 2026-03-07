import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes (except login)
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        const session = request.cookies.get("mama-dds-session");

        if (!session?.value) {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Verify JWT token
        try {
            const secret = process.env.SESSION_SECRET;
            if (!secret) {
                const loginUrl = new URL("/admin/login", request.url);
                return NextResponse.redirect(loginUrl);
            }

            const { payload } = await jwtVerify(
                session.value,
                new TextEncoder().encode(secret)
            );
            if (!payload.userId) {
                const loginUrl = new URL("/admin/login", request.url);
                return NextResponse.redirect(loginUrl);
            }
        } catch {
            // Invalid or expired token
            const loginUrl = new URL("/admin/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

