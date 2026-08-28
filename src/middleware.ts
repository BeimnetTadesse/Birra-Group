import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

// Duplicated from lib/admin-auth.ts rather than imported: that module pulls
// in node:crypto at the top level, which the Edge runtime (what middleware
// runs on) can't bundle, even though this file only needs the cookie name.
const ADMIN_SESSION_COOKIE = "birra_admin_session";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.toLowerCase().includes("ar")) return "ar";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin is locale-agnostic and has its own auth, not the locale-prefix
  // redirect below. Middleware runs on the Edge runtime, which can't verify
  // the HMAC-signed session (that needs Node's crypto module) — this is only
  // a fast redirect for the common "no cookie at all" case. The actual
  // signature/expiry check happens in the page itself, in the Node runtime.
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return;
    const hasSessionCookie = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
    if (!hasSessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  const locale = getPreferredLocale(request);
  const newUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
    request.url
  );
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|videos|images|fonts|.*\\..*).*)",
  ],
};
