"use client";

import { useEffect, useRef } from "react";
import { Space_Grotesk, Rajdhani } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const accentFont = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/* ─────────────────────────────────────────
   Sponsors & Partners Data
───────────────────────────────────────── */

export interface Partner {
  id: string;
  name: string;
  logo: string;
  redirectUrl: string;
  logoClass?: string;
}

// 4 Sponsors: 2 in each row in desktop view
const SPONSORS: Partner[] = [
  {
    id: "unstop",
    name: "Unstop",
    logo: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/Unstop-Logo-Blue-Extra-Large.png",
    redirectUrl:
      "https://unstop.com/hackathons/orbion-8-hour-hackathon-institute-of-engineering-and-managemet-1756946?lb=I5srHPJQ&utm_medium=Share&utm_source=roshayad43718&utm_campaign=Online_coding_challenge",
    logoClass: "h-12 sm:h-14 md:h-16 max-w-[230px] sm:max-w-[260px]",
  },
  {
    id: "techfest",
    name: "Techfest | IIT Bombay",
    logo: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/Black_Techfest_Logo_and_Tagline.png",
    redirectUrl: "https://techfest.org/",
    logoClass: "h-12 sm:h-14 md:h-16 max-w-[240px] sm:max-w-[270px]",
  },
  {
    id: "ml-kolkata",
    name: "Machine Learning Kolkata",
    logo: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/ML_Kolkata_Torch_Logo.png",
    redirectUrl: "https://www.linkedin.com/company/mlkolkata/home/",
    logoClass: "h-14 sm:h-16 md:h-[76px] max-w-[230px] sm:max-w-[260px] scale-[1.25] -translate-y-1.5",
  },
  {
    id: "mercy-for-animals",
    name: "Mercy For Animals",
    logo: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/images_1.png",
    redirectUrl: "https://mercyforanimals.org/",
    logoClass: "h-12 sm:h-14 md:h-16 max-w-[230px] sm:max-w-[260px]",
  },
];

/* ─────────────────────────────────────────
   Compact Cuboidal Horizontal Box
   Clean format: No role/title labels
───────────────────────────────────────── */

function CuboidSponsorBox({ partner }: { partner: Partner }) {
  return (
    <a
      href={partner.redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${partner.name}`}
      className="group relative block w-full cursor-pointer select-none transition-all duration-300 ease-out hover:-translate-y-1 hover:-translate-x-0.5 active:translate-x-0.5 active:translate-y-0.5"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Cuboid Card Face & Extrusion */}
      <div
        className="relative flex flex-col items-center justify-center h-full min-h-[155px] sm:min-h-[170px] rounded-xl bg-gradient-to-br from-[#FFFFFF] via-[#FAF6EE] to-[#F3E8D6] p-3.5 sm:p-4 transition-all duration-300 border border-[#C4A882]/75"
        style={{
          boxShadow: `
            1px 1px 0px #B8966C,
            2px 2px 0px #B8966C,
            3px 3px 0px #A37F55,
            4px 4px 0px #A37F55,
            5px 5px 0px #7A5530,
            6px 6px 0px #523013,
            8px 10px 20px rgba(18, 16, 14, 0.22)
          `,
        }}
      >
        {/* Top/Left Specular highlight border for 3D bevel */}
        <div className="pointer-events-none absolute inset-0 rounded-xl border-t-[1.5px] border-l-[1.5px] border-white/95" />
        {/* Bottom/Right 3D bevel shadow edge */}
        <div className="pointer-events-none absolute inset-0 rounded-xl border-b-[1.5px] border-r-[1.5px] border-[#523013]/30" />

        {/* Technical crosshairs in corners */}
        <span className="pointer-events-none absolute top-2 left-2 text-[9px] font-mono text-[#8A623B]/35 select-none">
          +
        </span>
        <span className="pointer-events-none absolute bottom-2 left-2 text-[9px] font-mono text-[#8A623B]/35 select-none">
          +
        </span>
        <span className="pointer-events-none absolute bottom-2 right-2 text-[9px] font-mono text-[#8A623B]/35 select-none">
          +
        </span>

        {/* Top-Right Redirect Arrow */}
        <div className="absolute top-2.5 right-2.5 flex items-center text-[#8A623B]/70 transition-colors duration-200 group-hover:text-[#B8322C]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>

        {/* Logo Display */}
        <div className="relative flex w-full h-[88px] sm:h-[96px] md:h-[102px] items-center justify-center rounded-lg bg-white px-4 border border-[#E0D2C0] shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:border-[#B8322C]/40 group-hover:shadow-[inset_0_1px_6px_rgba(184,50,44,0.06),0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Subtle warm hover wash */}
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/[0.04] to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Logo */}
          <img
            src={partner.logo}
            alt={partner.name}
            className={`w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${partner.logoClass || "h-12 sm:h-14 md:h-16 max-w-[230px] sm:max-w-[260px]"}`}
            loading="eager"
          />
        </div>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Header animation */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: 32,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
            },
          }
        );
      }

      /* Partners Cuboid Box animation */
      if (partnersRef.current) {
        gsap.fromTo(
          partnersRef.current.querySelectorAll(".partner-cuboid-item"),
          {
            opacity: 0,
            scale: 0.94,
            y: 25,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: partnersRef.current,
              start: "top 82%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative w-full overflow-hidden py-24"
      style={{
        background: "#EFE2C7",
      }}
    >
      {/* Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(#8A623B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Paper Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm Centre Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse, rgba(184,50,44,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-14 text-center"
        >
          <p
            className={`${accentFont.className} mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#B8322C]`}
          >
            Shadow Protocol · Allies & Backers
          </p>

          <h2
            className="select-none uppercase leading-tight text-[#12100E]"
            style={{
              fontFamily: "var(--font-sketch)",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            }}
          >
            Sponsors & Partners
          </h2>

          <p
            className={`${bodyFont.className} mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#6A5040] sm:text-base`}
          >
            The organisations powering the mission. Interested in partnering?{" "}
            <a
              href="mailto:tech.kurukshetra@uem.edu.in"
              className="text-[#B8322C] underline underline-offset-2 transition-colors hover:text-[#E6392F]"
            >
              Get in touch.
            </a>
          </p>
        </div>

        {/* ═══════════════════════════════════
            PARTNERS SECTION (2x2 on desktop)
        ═══════════════════════════════════ */}
        <div
          ref={partnersRef}
          className="mb-16 mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-stretch"
        >
          {SPONSORS.map((partner) => (
            <div key={partner.id} className="partner-cuboid-item flex">
              <CuboidSponsorBox partner={partner} />
            </div>
          ))}
        </div>

        {/* ─────────────────────────────────
            CTA / Partner Invitation
        ───────────────────────────────── */}
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="h-[1px] w-full bg-[#C4A882]/50" />

          <p
            className={`${bodyFont.className} mt-6 text-sm text-[#6A5040]`}
          >
            Want to become a sponsor or media partner?
          </p>

          <a
            href="mailto:tech.kurukshetra@uem.edu.in"
            className={`
              ${accentFont.className}
              inline-flex items-center gap-2
              rounded-xl
              border border-[#B8322C]/40
              px-7 py-3
              text-sm font-bold
              uppercase tracking-[0.18em]
              text-[#B8322C]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-[#B8322C]
              hover:bg-[#B8322C]/8
            `}
          >
            Partner With Us
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
