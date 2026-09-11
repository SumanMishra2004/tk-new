"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once BOTH conditions are met:
 * 1. The hero background video has buffered enough to play (`canplaythrough`)
 * 2. The page `document.readyState` is `"complete"` (all sub-resources loaded)
 *
 * A 400 ms minimum display time is enforced so the loader never flashes away
 * instantly even on very fast connections.
 */
export function usePageReady(videoSelector = "video"): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const MIN_MS = 400; // loader is shown for at least this long
    const start = Date.now();

    let videoReady = false;
    let docReady = false;

    function tryFinish() {
      if (!videoReady || !docReady) return;
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setReady(true), remaining);
    }

    // ── 1. Document ready ──────────────────────────────────────────────────
    if (document.readyState === "complete") {
      docReady = true;
    } else {
      const onLoad = () => {
        docReady = true;
        tryFinish();
      };
      window.addEventListener("load", onLoad, { once: true });
    }

    // ── 2. Video ready ─────────────────────────────────────────────────────
    const video = document.querySelector<HTMLVideoElement>(videoSelector);

    if (!video) {
      // No video on the page — don't block loading.
      videoReady = true;
      tryFinish();
      return;
    }

    // `readyState >= 4` means HAVE_ENOUGH_DATA
    if (video.readyState >= 4) {
      videoReady = true;
      tryFinish();
    } else {
      const onCanPlay = () => {
        videoReady = true;
        tryFinish();
      };
      // Fallback: if video takes > 5 s, don't keep the user waiting forever
      const fallback = setTimeout(() => {
        videoReady = true;
        tryFinish();
      }, 5_000);

      video.addEventListener("canplaythrough", onCanPlay, { once: true });

      return () => {
        video.removeEventListener("canplaythrough", onCanPlay);
        clearTimeout(fallback);
      };
    }

    tryFinish();
  }, [videoSelector]);

  return ready;
}
