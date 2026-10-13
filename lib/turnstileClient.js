export function turnstileReady(token) {
  return !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || Boolean(token);
}
