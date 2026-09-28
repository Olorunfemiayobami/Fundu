import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { deletionClients, requestUser, sameOrigin, seal, challengeCookie, cookieOptions } from "@/lib/accountDeletionServer";

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ message: "Request not allowed." }, { status: 403 });
  const clients = deletionClients();
  if (!clients) return NextResponse.json({ message: "Account deletion is not configured yet." }, { status: 503 });
  const user = await requestUser(request, clients);
  if (!user?.identities?.some((identity) => identity.provider === "google")) return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
  const storage = new Map();
  const auth = createClient(clients.url, clients.anon, { auth: { flowType: "pkce", persistSession: true, autoRefreshToken: false, detectSessionInUrl: false, storage: { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) } } });
  const { data, error } = await auth.auth.signInWithOAuth({ provider: "google", options: { skipBrowserRedirect: true, redirectTo: `${new URL(request.url).origin}/api/account/google/callback`, queryParams: { prompt: "select_account" } } });
  const verifier = [...storage.entries()].find(([key]) => key.endsWith("-code-verifier"));
  if (error || !data?.url || !verifier) return NextResponse.json({ message: "Google confirmation couldn’t start. Please retry." }, { status: 500 });
  const response = NextResponse.json({ url: data.url }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(challengeCookie, seal({ id: user.id, verifier, expires: Date.now() + 300000 }), cookieOptions);
  return response;
}
