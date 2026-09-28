import { supabase } from "@/lib/supabase";

export async function legalAcceptanceRequest(method, body) {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.access_token) throw new Error("Please sign in again.");
  const response = await fetch("/api/legal/acceptance", {
    method,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Could not save Terms acceptance.");
  return result;
}
