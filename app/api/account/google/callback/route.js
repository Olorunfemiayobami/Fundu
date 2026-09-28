import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deletionClients, unseal, seal, challengeCookie, proofCookie, cookieOptions } from "@/lib/accountDeletionServer";

export async function GET(request) {
  const clients = deletionClients(), url = new URL(request.url);
  const challenge = unseal((await cookies()).get(challengeCookie)?.value);
  const response = NextResponse.redirect(new URL("/settings/security?deleteAccount=confirm", url.origin));
  response.cookies.set(challengeCookie, "", { ...cookieOptions, maxAge: 0 });
  response.cookies.set(proofCookie, "", { ...cookieOptions, maxAge: 0 });
  if (!clients || !challenge || !url.searchParams.get("code")) return response;
  const storage = new Map([challenge.verifier]);
  const auth = createClient(clients.url, clients.anon, { auth: { flowType: "pkce", persistSession: true, autoRefreshToken: false, detectSessionInUrl: false, storage: { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) } } });
  try {
    const { data, error } = await auth.auth.exchangeCodeForSession(url.searchParams.get("code"));
    if (!error && data?.user?.id === challenge.id && data.user.identities?.some((identity) => identity.provider === "google")) {
      response.cookies.set(proofCookie, seal({ id: challenge.id, expires: Date.now() + 300000 }), cookieOptions);
    }
    await auth.auth.signOut({ scope: "local" });
  } catch { /* The screen offers confirmation again; no credentials are logged. */ }
  return response;
}
