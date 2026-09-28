"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function useCreatorProfile() {
  const [profile, setProfile] = useState({ id: null, name: "" });

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const metadata = user.user_metadata || {};
      const fallback = metadata.display_name || metadata.full_name || "";
      setProfile({ id: user.id, name: fallback });
      const { data } = await supabase.from("users")
        .select("display_name,full_name").eq("id", user.id).maybeSingle();
      if (!cancelled) {
        setProfile({ id: user.id, name: data?.display_name || data?.full_name || fallback });
      }
    }
    loadProfile().catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return profile;
}
