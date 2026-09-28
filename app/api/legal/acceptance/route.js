import { NextResponse } from "next/server";
import { deletionClients, requestUser, sameOrigin } from "@/lib/accountDeletionServer";
import { TERMS_VERSION } from "@/lib/legalVersion";

export const runtime = "nodejs";
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET(request) {
  const clients = deletionClients();
  if (!clients) return reply({ message: "Legal acceptance is not configured." }, 503);
  const user = await requestUser(request, clients);
  if (!user) return reply({ message: "Please sign in again." }, 401);
  const { data, error } = await clients.admin.from("legal_acceptances")
    .select("id").eq("user_id", user.id).eq("terms_version", TERMS_VERSION)
    .eq("acceptance_context", "signup").limit(1);
  if (error) return reply({ message: "Could not check Terms acceptance." }, 503);
  return reply({ accepted: Boolean(data?.length), version: TERMS_VERSION });
}

export async function POST(request) {
  if (!sameOrigin(request)) return reply({ message: "Request not allowed." }, 403);
  const clients = deletionClients();
  if (!clients) return reply({ message: "Legal acceptance is not configured." }, 503);
  const user = await requestUser(request, clients);
  if (!user) return reply({ message: "Please sign in again." }, 401);

  let body;
  try { body = await request.json(); } catch { return reply({ message: "Invalid request." }, 400); }
  const context = body?.context;
  if (context !== "signup" && context !== "campaign_publish") return reply({ message: "Invalid acceptance context." }, 400);

  let campaignId = null;
  if (context === "campaign_publish") {
    if (typeof body.campaignId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.campaignId)) return reply({ message: "Save your draft before publishing." }, 400);
    const { data: campaign, error } = await clients.admin.from("campaigns")
      .select("id, creator_id, status").eq("id", body.campaignId).maybeSingle();
    if (error || !campaign || campaign.creator_id !== user.id) {
      return reply({ message: "This draft could not be verified." }, 403);
    }
    campaignId = campaign.id;
  } else {
    const { data, error } = await clients.admin.from("legal_acceptances")
      .select("id").eq("user_id", user.id).eq("terms_version", TERMS_VERSION)
      .eq("acceptance_context", "signup").limit(1);
    if (error) return reply({ message: "Could not check Terms acceptance." }, 503);
    if (data?.length) return reply({ accepted: true, version: TERMS_VERSION });
  }

  const { error } = await clients.admin.from("legal_acceptances").insert({
    user_id: user.id,
    campaign_id: campaignId,
    terms_version: TERMS_VERSION,
    acceptance_context: context,
  });
  if (error) return reply({ message: "Could not save Terms acceptance. Please try again." }, 503);
  return reply({ accepted: true, version: TERMS_VERSION });
}
