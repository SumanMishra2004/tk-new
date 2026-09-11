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
   Sponsor / Partner data
   Replace `logo` path with actual assets.
   Using placeholder SVG monograms for now.
───────────────────────────────────────── */
const TITLE_SPONSOR = {
  tier: "Title Sponsor",
  name: "Sponsor Name",
  tagline: "Powering Innovation · 2026",
  color: "#E6C84A",
};

const PLATINUM = [
  { name: "Platinum Co. A", short: "PCA" },
  { name: "Platinum Co. B", short: "PCB" },
  { name: "Platinum Co. C", short: "PCC" },
];

const GOLD = [
  { name: "Gold Partner A", short: "GPA" },
  { name: "Gold Partner B", short: "GPB" },
  { name: "Gold Partner C", short: "GPC" },
  { name: "Gold Partner D", short: "GPD" },
];

const ASSOCIATES = [
  { name: "Associate A", short: "AA" },
  { name: "Associate B", short: "AB" },
  { name: "Associate C", short: "AC" },
  { name: "Associate D", short: "AD" },
  { name: "Associate E", short: "AE" },
  { name: "Associate F", short: "AF" },
];

/* ─── coming soon ─── */
function SponsorComingSoon() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-6 py-20">
      <div className="flex items-center gap-3">
        <span className="h-[1px] w-10 bg-[#B8322C]/50" />
        <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8322C]`}>
          Sponsors & Partners
        </span>
        <span className="h-[1px] w-10 bg-[#B8322C]/50" />
      </div>
      <p
        className="select-none uppercase leading-tight tracking-tight text-[#12100E]/30"
        style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
      >
        Coming Soon
      </p>
      <p className={`${bodyFont.className} text-center text-sm text-[#6A5040]`}>
        Sponsorship details will be announced shortly.{" "}
        <a href="mailto:tech.kurukshetra.uem@gmail.com" className="text-[#B8322C] underline underline-offset-2">
          Reach out
        </a>{" "}
        if you want to partner with us.
      </p>
    </div>
  );
}

/* ─── placeholder logo box ─── */
function LogoBox({
  short,
  name,
  size = "md",
}: {
  short: string;
  name: string;
  size?: "xl" | "lg" | "md" | "sm";
}) {
  const sizeMap = {
    xl: "h-24 w-44 text-xl",
    lg: "h-20 w-36 text-lg",
    md: "h-16 w-28 text-base",
    sm: "h-12 w-24 text-sm",
  };
  return (
    <div
      title={name}
      className={`
        ${sizeMap[size]}
        flex items-center justify-center rounded-xl
        border border-[#C4A882] bg-white/50
        transition-all duration-300
        hover:border-[#B8322C]/50 hover:bg-white/70
        hover:shadow-[0_4px_16px_rgba(184,50,44,0.12)]
        cursor-default select-none
      `}
    >
      <span className={`${accentFont.className} font-bold text-[#8A6040] tracking-widest`}>
        {short}
      </span>
    </div>
  );
}

/* ─── tier label ─── */
function TierLabel({
  label,
  accent,
}: {
  label: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="h-[1.5px] w-8" style={{ background: accent }} />
      <span
        className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.3em]`}
        style={{ color: accent }}
      >
        {label}
      </span>
      <div className="h-[1px] flex-1 bg-[#C4A882]/40" />
    </div>
  );
}

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleCardRef = useRef<HTMLDivElement>(null);
  const platRowRef = useRef<HTMLDivElement>(null);
  const goldRowRef = useRef<HTMLDivElement>(null);
  const assocRowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  /* If all tiers are empty, show coming-soon state */
  const hasSponsors =
    PLATINUM.length > 0 || GOLD.length > 0 || ASSOCIATES.length > 0;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Header */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32 },
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

      /* Title sponsor card */
      gsap.fromTo(
        titleCardRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleCardRef.current,
            start: "top 80%",
          },
        }
      );

      /* Platinum row — stagger */
      if (platRowRef.current) {
        gsap.fromTo(
          platRowRef.current.querySelectorAll(".sponsor-item"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: platRowRef.current,
              start: "top 82%",
            },
          }
        );
      }

      /* Gold row — stagger */
      if (goldRowRef.current) {
        gsap.fromTo(
          goldRowRef.current.querySelectorAll(".sponsor-item"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: goldRowRef.current,
              start: "top 84%",
            },
          }
        );
      }

      /* Associates row — stagger */
      if (assocRowRef.current) {
        gsap.fromTo(
          assocRowRef.current.querySelectorAll(".sponsor-item"),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: assocRowRef.current,
              start: "top 85%",
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
      className="relative w-full py-24 overflow-hidden"
      style={{ background: "#EFE2C7" }}
    >
      {/* ── dot grid bg ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(#8A623B 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* ── paper noise ── */}
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* ── warm centre glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(ellipse, rgba(184,50,44,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className={`${accentFont.className} text-[11px] font-bold uppercase tracking-[0.3em] text-[#B8322C] mb-3`}>
            Shadow Protocol · Allies & Backers
          </p>
          <h2
            className="text-[#12100E] uppercase leading-tight select-none"
            style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
          >
            Sponsors & Partners
          </h2>
          <p className={`${bodyFont.className} mt-4 text-[#6A5040] text-sm sm:text-base max-w-lg mx-auto leading-relaxed`}>
            The organisations powering the mission. Interested in partnering?{" "}
            <a
              href="mailto:tech.kurukshetra.uem@gmail.com"
              className="text-[#B8322C] underline underline-offset-2 hover:text-[#E6392F]"
            >
              Get in touch.
            </a>
          </p>
        </div>

        {/* ════════════════ TITLE SPONSOR ════════════════ */}
        {hasSponsors ? (
          <>
        <TierLabel label="Title Sponsor" accent="#E6C84A" />
        <div ref={titleCardRef} className="mb-16">
          <div
            className="relative rounded-2xl overflow-hidden border border-[#B8A060]/40"
            style={{ background: "linear-gradient(135deg, #FDF6E8 0%, #F5EAD2 60%, #EEE0C4 100%)" }}
          >
            {/* gold top bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#B8960A]/50 to-transparent" />
            {/* corner glow */}
            <div
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                width: "300px",
                height: "300px",
                background: "radial-gradient(ellipse at top left, rgba(184,150,10,0.06) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 px-8 py-10 sm:px-12">
              {/* Logo placeholder */}
              <div className="flex-shrink-0">
                <div className="h-20 w-56 rounded-xl border border-[#B8960A]/40 bg-[#B8960A]/8 flex items-center justify-center">
                  <span className={`${accentFont.className} text-2xl font-bold tracking-widest text-[#8A6A0A]/70`}>
                    YOUR LOGO
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8960A]" />
                  <span className={`${accentFont.className} text-[9px] font-bold uppercase tracking-[0.28em] text-[#8A6A0A]`}>
                    {TITLE_SPONSOR.tier}
                  </span>
                </div>
                <p className={`${accentFont.className} text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#12100E] mb-1`}>
                  {TITLE_SPONSOR.name}
                </p>
                <p className={`${bodyFont.className} text-sm text-[#6A5040]`}>
                  {TITLE_SPONSOR.tagline}
                </p>
              </div>

              {/* Badge */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#B8960A]/40 flex items-center justify-center bg-[#B8960A]/8">
                <svg viewBox="0 0 24 24" fill="none" stroke="#B8960A" strokeWidth="1.5" className="w-7 h-7" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>

            {/* gold bottom bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#B8960A]/50 to-transparent" />
          </div>
        </div>

        {/* ════════════════ PLATINUM ════════════════ */}
        <TierLabel label="Platinum Partners" accent="#C8D8E8" />
        <div ref={platRowRef} className="flex flex-wrap justify-center gap-5 mb-16">
          {PLATINUM.map((s) => (
            <div key={s.name} className="sponsor-item">
              <LogoBox short={s.short} name={s.name} size="lg" />
            </div>
          ))}
        </div>

        {/* ════════════════ GOLD ════════════════ */}
        <TierLabel label="Gold Partners" accent="#D4A84A" />
        <div ref={goldRowRef} className="flex flex-wrap justify-center gap-4 mb-16">
          {GOLD.map((s) => (
            <div key={s.name} className="sponsor-item">
              <LogoBox short={s.short} name={s.name} size="md" />
            </div>
          ))}
        </div>

        {/* ════════════════ ASSOCIATES ════════════════ */}
        <TierLabel label="Associates & Community Partners" accent="#6A7A8A" />
        <div ref={assocRowRef} className="flex flex-wrap justify-center gap-3">
          {ASSOCIATES.map((s) => (
            <div key={s.name} className="sponsor-item">
              <LogoBox short={s.short} name={s.name} size="sm" />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
          </>
        ) : (
          <SponsorComingSoon />
        )}

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="h-[1px] w-full bg-[#C4A882]/50" />
          <p className={`${bodyFont.className} text-sm text-[#6A5040] mt-6`}>
            Want to become a sponsor or media partner?
          </p>
          <a
            href="mailto:tech.kurukshetra.uem@gmail.com"
            className={`
              ${accentFont.className}
              inline-flex items-center gap-2
              rounded-xl border border-[#B8322C]/40
              px-7 py-3 text-sm font-bold
              uppercase tracking-[0.18em]
              text-[#B8322C] transition-all duration-300
              hover:bg-[#B8322C]/8 hover:border-[#B8322C]
              hover:-translate-y-0.5
            `}
          >
            Partner With Us
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
