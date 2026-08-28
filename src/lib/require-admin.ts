import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isSessionValid } from "@/lib/admin-auth";

/** Returns an unauthorized response if the request has no valid admin session, else null. */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isSessionValid(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
