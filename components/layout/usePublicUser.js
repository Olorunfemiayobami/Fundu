"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Keep the shared public navigation in sync with sign-in and sign-out.
export function usePublicUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let mounted = true;
    let authChanged = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      authChanged = true;
      if (mounted) setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (mounted && !authChanged) setUser(data.session?.user ?? null);
    }).catch(() => { /* Public links stay available if the session cannot be read. */ });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);
  return user;
}
