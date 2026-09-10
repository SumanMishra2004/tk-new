"use client";

import { useEffect, useRef } from "react";
import { Space_Grotesk, Rajdhani } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const accentFont = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="
        relative z-0 isolate
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* ═══════════════════════════════════════════════
          VIDEO BACKGROUND
      ═══════════════════════════════════════════════ */}

      <video
        className="
          absolute inset-0 -z-30
          h-full w-full
          object-cover object-center
          max-sm:object-[72%_center]
          brightness-110
          contrast-105
        "
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/herosection/hero-drive-background.webm"
          type="video/webm"
        />
      </video>

      {/* ═══════════════════════════════════════════════
          GRADIENT 1 — LEFT → RIGHT
      ═══════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
        "
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(0,0,0,0.96) 0%,
              rgba(0,0,0,0.90) 16%,
              rgba(0,0,0,0.70) 36%,
              rgba(0,0,0,0.38) 58%,
              rgba(0,0,0,0.12) 78%,
              transparent 100%
            )
          `,
        }}
      />

      {/* ═══════════════════════════════════════════════
          GRADIENT 2 — BOTTOM-RIGHT → TOP-LEFT
      ═══════════════════════════════════════════════ */}

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            linear-gradient(
              to top left,
              rgba(0,0,0,0.80) 0%,
              rgba(0,0,0,0.70) 15%,
              rgba(0,0,0,0.40) 35%,
              rgba(0,0,0,0.22) 55%,
              rgba(0,0,0,0.06) 75%,
              transparent 100%
            )
          `,
        }}
      />

      {/* ═══════════════════════════════════════════════
          BOTTOM BLACK → TRANSPARENT
      ═══════════════════════════════════════════════ */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 8%, rgba(0,0,0,0.3) 15%, transparent 20%)",
        }}
      />

      {/* ═══════════════════════════════════════════════
          HERO CONTENT
      ═══════════════════════════════════════════════ */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          w-full
          items-center
          px-6
          sm:px-10
          md:px-14
          lg:px-20
          xl:px-28
        "
      >
        <div
          className="
            w-full
            max-w-[760px]
            pt-16
            sm:pt-10
            lg:pt-0
            max-sm:pb-16
          "
        >
          {/* ═══════════════════════════════════════════
              UNIVERSITY / DEPARTMENT
          ═══════════════════════════════════════════ */}

          <p
            className={`
              ${accentFont.className}
              mb-3
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#F05A47]
              sm:text-xs
              md:text-sm
            `}
          >
            UEM Kolkata · Dept. of CSE{" "}
            <span className="text-[#A8A8A8]">
              (IOT, CS, BT)
            </span>
          </p>

          {/* ═══════════════════════════════════════════
              DECORATIVE LINE
          ═══════════════════════════════════════════ */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#E6392F] sm:w-14" />

            <span
              className={`
                ${accentFont.className}
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#D6D6D6]
              `}
            >
              EST. 2026
            </span>
          </div>

          {/* ═══════════════════════════════════════════
              MAIN TITLE
          ═══════════════════════════════════════════ */}

          <h1
            className="
              select-none
              uppercase
              text-[#F5F1E8]
              leading-[0.85]
              tracking-[0.02em]
            "
            style={{
              fontFamily: "var(--font-sketch)",
            }}
          >
            {/* TECH */}

            <span
              className="block pb-5"
              style={{
                fontSize: "clamp(3.2rem, 9vw, 8rem)",
              }}
            >
              Tech
            </span>

            {/* KURUKSHETRA */}

            <span
              className="
                block
                text-[#E6392F]
              "
              style={{
                fontSize: "clamp(2.2rem, 7.5vw, 6.6rem)",
                transform: "scaleY(1.15)",
                transformOrigin: "left center",
              }}
            >
              Kurukshetra
            </span>
          </h1>

          {/* ═══════════════════════════════════════════
              TAGLINE + DESCRIPTION
          ═══════════════════════════════════════════ */}

          <div className="mt-6 sm:mt-7">
            <h2
              className={`
                ${accentFont.className}
                text-xl
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF705F]
                sm:text-2xl
                md:text-3xl
              `}
            >
              Shadow Protocol
            </h2>

            <p
              className={`
                ${bodyFont.className}
                mt-3
                max-w-[590px]
                text-sm
                font-normal
                leading-6
                text-[#D1D1D1]
                sm:text-base
                sm:leading-7
                md:text-lg
              `}
            >
              Enter a world where technology meets strategy,
              innovation meets competition, and every idea
              has the power to change the game.
            </p>
          </div>

          {/* ═══════════════════════════════════════════
              DIVIDER
          ═══════════════════════════════════════════ */}

          <div className="my-6 flex items-center gap-3 sm:my-7">
            <div className="h-[1px] w-20 bg-[#E6392F] sm:w-28" />

            <div className="h-1.5 w-1.5 rounded-full bg-[#E6392F]" />

            <div className="h-[1px] w-8 bg-white/30" />
          </div>

          {/* ═══════════════════════════════════════════
              DATE + LOCATION
          ═══════════════════════════════════════════ */}

          <div className="mb-7 sm:mb-8">
            <p
              className={`
                ${accentFont.className}
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#F0E6D2]
                sm:text-sm
                md:text-base
              `}
            >
              February 2026

              <span className="mx-2 text-[#E6392F]">
                •
              </span>

              Kolkata, India
            </p>
          </div>

          {/* ═══════════════════════════════════════════
              CTA BUTTONS
          ═══════════════════════════════════════════ */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
              sm:gap-4
            "
          >
            {/* PRIMARY CTA */}

            <a
              href="#events"
              className={`
                group
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-2
                rounded-md
                bg-[#E6392F]
                px-6
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
                shadow-[0_0_25px_rgba(230,57,47,0.35)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#F04A3D]
                hover:shadow-[0_0_40px_rgba(230,57,47,0.55)]
                sm:px-7
                ${accentFont.className}
              `}
            >
              Explore Events

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* SECONDARY CTA */}

            <a
              href="#countdown"
              className={`
                ${accentFont.className}
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                rounded-md
                border
                border-white/25
                bg-black/30
                px-6
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#F5F1E8]
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-[#E6392F]
                hover:bg-[#E6392F]/10
                hover:text-white
                sm:px-7
              `}
            >
              Register Now
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BOTTOM VIGNETTE
      ═══════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-0
          h-64
          bg-gradient-to-t
          from-black
          via-black/70
          to-transparent
        "
      />

      {/* Accessibility */}

      <h2 className="sr-only">
        Tech Kurukshetra Shadow Protocol — UEM Kolkata
      </h2>
    </section>
  );
}