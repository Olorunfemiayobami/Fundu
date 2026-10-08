"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { runSiteScripts } from "./siteScripts";

export default function SiteScripts() {
  const pathname = usePathname();
  useEffect(() => runSiteScripts(), [pathname]);
  return null;
}
