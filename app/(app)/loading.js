"use client";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/feedback/LoadingScreen";
export default function Loading() {
  const path = usePathname();
  const variant = path === "/dashboard" ? "dashboard" : path === "/explore" || path === "/campaigns" ? "cards" : path.startsWith("/campaigns/") ? "detail" : "list";
  return <LoadingScreen variant={variant} />;
}
