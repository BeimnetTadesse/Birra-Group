import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_SESSION_COOKIE = "birra_admin_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

/** Checks a submitted password against ADMIN_PASSWORD using a constant-time compare. */
export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  // Constant-time compare needs equal-length buffers; a length mismatch is
  // already a safe "no" without touching timingSafeEqual.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Builds the signed cookie value for a fresh admin session. */
export function createSessionValue(): string {
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${expires}`;
  return `${payload}.${sign(payload)}`;
}

/** Verifies a session cookie value: correct signature and not expired. */
export function isSessionValid(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const [payload, signature] = cookieValue.split(".");
  if (!payload || !signature) return false;

  const expectedSig = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

export const SESSION_COOKIE_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000;

/**
 * For admin Server Components: redirects to /admin/login if the session
 * cookie is missing, tampered with, or expired. Middleware only checks that
 * the cookie exists (it runs on the Edge runtime, which can't verify the
 * HMAC signature) — this is the real check.
 */
export function requireAdminPage(): void {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!isSessionValid(session)) {
    redirect("/admin/login");
  }
}

