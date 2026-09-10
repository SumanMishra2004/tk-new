"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.2,
      smoothWheel: true,
    });

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", () => ScrollTrigger.update());

    // Use rAF loop exactly like the reference — NOT gsap.ticker
    const scrollFn = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };
    const rafId = requestAnimationFrame(scrollFn);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
