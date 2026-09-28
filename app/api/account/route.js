import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deletionClients, requestUser, sameOrigin, unseal, proofCookie, cookieOptions } from "@/lib/accountDeletionServer";

export const runtime = "nodejs";
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET(request) {
  const clients = deletionClients();
  if (!clients) return reply({ ready: false, message: "Account deletion is not configured yet." });
  const user = await requestUser(request, clients);
  if (!user) return reply({ message: "Please sign in again." }, 401);
  const { data: ready, error } = await clients.admin.rpc("fundu_account_deletion_ready");
  const proof = unseal((await cookies()).get(proofCookie)?.value);
  return reply({ ready: !error && ready === true, googleConfirmed: proof?.id === user.id, message: error || ready !== true ? "Account deletion setup is incomplete." : "" });
}

export async function POST(request) {
  if (!sameOrigin(request)) return reply({ message: "Request not allowed." }, 403);
  const clients = deletionClients();
  if (!clients) return reply({ message: "Account deletion is not configured yet. Nothing has been deleted." }, 503);
  const user = await requestUser(request, clients);
  if (!user) return reply({ message: "Please sign in again." }, 401);
  let body;
  try { body = await request.json(); } catch { return reply({ message: "Invalid request." }, 400); }
  if (body.confirmation !== "DELETE" || body.acknowledged !== true) return reply({ message: "Confirm that you understand and type DELETE exactly." }, 400);
  const proof = unseal((await cookies()).get(proofCookie)?.value);
  const googleConfirmed = proof?.id === user.id;
  if (!googleConfirmed) {
    if (typeof body.password !== "string" || !body.password || body.password.length > 1024) return reply({ message: "Confirm your identity first." }, 400);
    const { data, error } = await clients.auth.auth.signInWithPassword({ email: user.email, password: body.password });
    if (error || data?.user?.id !== user.id) return reply({ message: "That password isn’t right, or we couldn’t verify it. Please try again." }, 401);
    // Revoke the temporary verification session, leaving the browser session alone.
    await clients.auth.auth.signOut({ scope: "local" });
  }
  try {
    const { data: ready, error: setupError } = await clients.admin.rpc("fundu_account_deletion_ready");
    if (setupError || ready !== true) return reply({ message: "Account deletion setup is incomplete. Nothing has been deleted." }, 503);
    const { data: files, error: manifestError } = await clients.admin.rpc("fundu_account_deletion_files", { account_id: user.id });
    if (manifestError) return reply({ message: "Account deletion setup is incomplete. Nothing has been deleted." }, 503);
    const groups = new Map();
    for (const file of files || []) {
      if (!groups.has(file.bucket_id)) groups.set(file.bucket_id, []);
      groups.get(file.bucket_id).push(file.name);
    }
    // Storage ownership prevents auth deletion. Repeatable removal comes first;
    // campaign/history cleanup is transactional. Auth deletion then cascades
    // through the remaining relations in its own transaction.
    for (const [bucket, paths] of groups) for (let i = 0; i < paths.length; i += 100) {
      const { error } = await clients.admin.storage.from(bucket).remove(paths.slice(i, i + 100));
      if (error) throw error;
    }
    const { error: cleanupError } = await clients.admin.rpc("fundu_delete_account_data", { account_id: user.id });
    if (cleanupError) throw cleanupError;
    const { error } = await clients.admin.auth.admin.deleteUser(user.id);
    if (error) throw error;
    const response = reply({ deleted: true });
    response.cookies.set(proofCookie, "", { ...cookieOptions, maxAge: 0 });
    return response;
  } catch {
    return reply({ message: "Deletion couldn’t finish. Some cleanup may already be complete. Please retry; your account is only marked deleted after every step succeeds." }, 500);
  }
}
