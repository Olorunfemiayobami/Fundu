import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

export function deletionClients() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !key) return null;
  const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
  return { admin: createClient(url, key, options), auth: createClient(url, anon, options), url, anon };
}

export async function requestUser(request, clients) {
  const match = request.headers.get("authorization")?.match(/^Bearer (\S+)$/);
  if (!match) return null;
  const { data, error } = await clients.auth.auth.getUser(match[1]);
  return error ? null : data?.user;
}

// These cookies contain temporary OAuth evidence, never the service-role key.
export function seal(value) {
  const key = createHash("sha256").update(process.env.SUPABASE_SERVICE_ROLE_KEY).digest();
  const iv = randomBytes(12), cipher = createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}
export function unseal(value) {
  try {
    const raw = Buffer.from(value || "", "base64url");
    const key = createHash("sha256").update(process.env.SUPABASE_SERVICE_ROLE_KEY).digest();
    const decipher = createDecipheriv("aes-256-gcm", key, raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const result = JSON.parse(Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString());
    return result.expires > Date.now() ? result : null;
  } catch { return null; }
}
export const proofCookie = "fundu-delete-proof";
export const challengeCookie = "fundu-delete-challenge";
export const cookieOptions = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/api/account", maxAge: 300 };
export function sameOrigin(request) { return request.headers.get("origin") === new URL(request.url).origin; }
