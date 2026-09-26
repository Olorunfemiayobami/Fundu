"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const BUCKET = "campaign-images";
const SIGNED_URL_TTL_SECONDS = 300;
const SIGNED_URL_CACHE_MS = 4 * 60 * 1000;
const signedUrlCache = new Map();

function getCampaignObjectPath(source) {
  if (typeof source !== "string" || !source.trim()) return null;

  try {
    const url = new URL(source, "https://fundu.invalid");
    const markers = [
      `/storage/v1/object/public/${BUCKET}/`,
      `/storage/v1/object/sign/${BUCKET}/`,
      `/storage/v1/object/authenticated/${BUCKET}/`,
    ];

    const marker = markers.find((item) => url.pathname.includes(item));
    if (!marker) return null;

    const encodedPath = url.pathname.slice(
      url.pathname.indexOf(marker) + marker.length,
    );

    return encodedPath
      .split("/")
      .map((segment) => decodeURIComponent(segment))
      .join("/");
  } catch {
    return null;
  }
}

async function createCampaignImageUrl(path, originalUrl) {
  const cached = signedUrlCache.get(path);
  if (cached?.url && cached.expiresAt > Date.now()) return cached.url;
  if (cached?.promise) return cached.promise;

  const promise = supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS)
    .then(({ data, error }) => {
      if (error || !data?.signedUrl) {
        // Keep images visible while the bucket remains public. Once it is
        // private, a missing storage policy fails closed.
        signedUrlCache.delete(path);
        return originalUrl;
      }

      signedUrlCache.set(path, {
        url: data.signedUrl,
        expiresAt: Date.now() + SIGNED_URL_CACHE_MS,
      });
      return data.signedUrl;
    })
    .catch(() => {
      signedUrlCache.delete(path);
      return originalUrl;
    });

  signedUrlCache.set(path, { promise });
  return promise;
}

export default function CampaignStorageImage({ src, ...imageProps }) {
  const [signedImage, setSignedImage] = useState(null);
  const objectPath = getCampaignObjectPath(src);

  useEffect(() => {
    if (!objectPath) return undefined;

    let cancelled = false;
    let refreshTimer;

    const refreshSignedUrl = async () => {
      const url = await createCampaignImageUrl(objectPath, src);
      if (cancelled) return;

      setSignedImage({ source: src, url });
      const cached = signedUrlCache.get(objectPath);
      const refreshInMs = Math.max(
        1000,
        Math.min(
          SIGNED_URL_CACHE_MS,
          (cached?.expiresAt || Date.now() + SIGNED_URL_CACHE_MS) -
            Date.now() -
            10_000,
        ),
      );
      refreshTimer = window.setTimeout(refreshSignedUrl, refreshInMs);
    };

    refreshSignedUrl();

    return () => {
      cancelled = true;
      window.clearTimeout(refreshTimer);
    };
  }, [objectPath, src]);

  const resolvedSrc = objectPath
    ? signedImage?.source === src
      ? signedImage.url
      : undefined
    : src || undefined;

  return <img {...imageProps} alt={imageProps.alt ?? ""} src={resolvedSrc} />;
}
