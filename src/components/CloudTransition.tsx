"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CloudTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cloudLeftRef = useRef<HTMLDivElement>(null);
  const cloudRightRef = useRef<HTMLDivElement>(null);
  const cloudCenterRef = useRef<HTMLDivElement>(null);
  const cloudLeft2Ref = useRef<HTMLDivElement>(null);
  const cloudRight2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ── clouds drift in from sides as section enters viewport ── */
      gsap.fromTo(
        cloudLeftRef.current,
        { x: "-35%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 1.4,
          },
        }
      );

      gsap.fromTo(
        cloudRightRef.current,
        { x: "35%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 1.4,
          },
        }
      );

      gsap.fromTo(
        cloudCenterRef.current,
        { y: "18%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: 1.8,
          },
        }
      );

      gsap.fromTo(
        cloudLeft2Ref.current,
        { x: "-25%", y: "10%", opacity: 0 },
        {
          x: "0%",
          y: "0%",
          opacity: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 10%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        cloudRight2Ref.current,
        { x: "25%", y: "10%", opacity: 0 },
        {
          x: "0%",
          y: "0%",
          opacity: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 10%",
            scrub: 2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{
        /* gradient from black (team section bg) to skin (#EFE2C7) */
        background:
          "linear-gradient(to bottom, #000000 0%, #0D0B09 12%, #1A1410 28%, #7A5A3A 55%, #C4A882 72%, #DFD0B0 85%, #EFE2C7 100%)",
        height: "clamp(260px, 35vw, 500px)",
        marginBottom: "-2px", /* avoid 1px gap */
      }}
    >
      {/* ── Layer 1: back clouds (left) ── */}
      <div
        ref={cloudLeft2Ref}
        className="absolute"
        style={{
          bottom: "10%",
          left: "-8%",
          width: "55%",
          opacity: 0,
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          className="w-full h-auto"
          style={{
            filter: "brightness(0.92) sepia(0.15)",
            transform: "scaleX(-1)",
          }}
          draggable={false}
        />
      </div>

      {/* ── Layer 1: back clouds (right) ── */}
      <div
        ref={cloudRight2Ref}
        className="absolute"
        style={{
          bottom: "10%",
          right: "-8%",
          width: "55%",
          opacity: 0,
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          className="w-full h-auto"
          style={{ filter: "brightness(0.92) sepia(0.15)" }}
          draggable={false}
        />
      </div>

      {/* ── Layer 2: mid-left cloud ── */}
      <div
        ref={cloudLeftRef}
        className="absolute"
        style={{
          bottom: "20%",
          left: "-5%",
          width: "52%",
          opacity: 0,
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          className="w-full h-auto"
          style={{
            filter: "brightness(0.97) sepia(0.08)",
            transform: "scaleX(-1) scaleY(0.9)",
          }}
          draggable={false}
        />
      </div>

      {/* ── Layer 2: mid-right cloud ── */}
      <div
        ref={cloudRightRef}
        className="absolute"
        style={{
          bottom: "20%",
          right: "-5%",
          width: "52%",
          opacity: 0,
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          className="w-full h-auto"
          style={{
            filter: "brightness(0.97) sepia(0.08)",
            transform: "scaleY(0.9)",
          }}
          draggable={false}
        />
      </div>

      {/* ── Layer 3: foreground centre cloud ── */}
      <div
        ref={cloudCenterRef}
        className="absolute"
        style={{
          bottom: "-2%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          minWidth: "900px",
          opacity: 0,
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          className="w-full h-auto"
          style={{ filter: "brightness(1.05)" }}
          draggable={false}
        />
      </div>

      {/* ── Skin fade overlay at bottom so next section blends ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #EFE2C7 100%)",
        }}
      />
    </div>
  );
}
