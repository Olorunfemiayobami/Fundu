import Link from "next/link";
import "@/styles/account-deleted.css";

export const metadata = { title: "Account deleted | Fundu", robots: { index: false, follow: false } };
export default function AccountDeletedPage() {
  return <main className="account-deleted"><div><span className="account-deleted-check" aria-hidden="true">✓</span><h1>Your account has been deleted</h1><p>Your profile, campaigns and payment methods are gone. Thanks for raising with Fundu.</p><nav aria-label="Next steps"><Link href="/">Go to homepage</Link><Link href="/signup">Start a new account</Link></nav></div></main>;
}
