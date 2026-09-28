import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { deletionClients, requestUser, sameOrigin } from "@/lib/accountDeletionServer";

export const runtime = "nodejs";
const reasons = new Set(["Misleading or false information", "Fraud or scam", "Impersonation", "Inappropriate content", "Receiving information issue", "Other"]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const reply = (body, status) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request) {
  if (!sameOrigin(request)) return reply({ message: "Request not allowed." }, 403);
  const clients = deletionClients();
  if (!clients) return reply({ message: "Reports are unavailable right now." }, 503);
  let body;
  try { body = await request.json(); } catch { return reply({ message: "Invalid report." }, 400); }
  const campaignId = body?.campaignId;
  const reason = body?.reason;
  const details = typeof body?.details === "string" ? body.details.trim() : "";
  if (!uuid.test(campaignId || "") || !reasons.has(reason) || details.length > 2000) return reply({ message: "Check the report and try again." }, 400);
  const { data: campaign, error: campaignError } = await clients.admin.from("campaigns").select("id,title,status").eq("id", campaignId).in("status", ["active", "ended"]).maybeSingle();
  if (campaignError || !campaign) return reply({ message: "This campaign is not available to report." }, 404);
  const user = await requestUser(request, clients);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const agent = request.headers.get("user-agent") || "unknown";
  const fingerprint = createHash("sha256").update(`${process.env.SUPABASE_SERVICE_ROLE_KEY}:${user?.id || "guest"}:${ip}:${agent}`).digest("hex");
  const windowStart = new Date(Math.floor(Date.now() / 900000) * 900000).toISOString();
  const { error } = await clients.admin.from("campaign_reports").insert({ campaign_id: campaignId, campaign_title: campaign.title || "Untitled campaign", reporter_user_id: user?.id || null, reason, details, reporter_fingerprint: fingerprint, rate_window_start: windowStart });
  if (error?.code === "23505") return reply({ submitted: true }, 200);
  if (error) { console.error("Could not store campaign report:", error); return reply({ message: "We couldn't send your report. Try again." }, 503); }
  return reply({ submitted: true }, 201);
}
