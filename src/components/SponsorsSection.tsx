
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

   Keep these arrays empty when no sponsors
   have been confirmed.

   Once real sponsor data is added,
   the sponsor breakdown will automatically show.
───────────────────────────────────────── */

const TITLE_SPONSOR = {
  tier: "Title Sponsor",
  name: "Sponsor Name",
  tagline: "Powering Innovation · 2026",
};

const PLATINUM: {
  name: string;
  short: string;
}[] = [];

const GOLD: {
  name: string;
  short: string;
}[] = [];

const ASSOCIATES: {
  name: string;
  short: string;
}[] = [];

/* ─────────────────────────────────────────
   Coming Soon
───────────────────────────────────────── */

function SponsorComingSoon() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-6 py-20">
      {/* Label */}
      <div className="flex items-center gap-3">
        <span className="h-[1px] w-10 bg-[#B8322C]/50" />

        <span
          className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8322C]`}
        >
          Sponsors & Partners
        </span>

        <span className="h-[1px] w-10 bg-[#B8322C]/50" />
      </div>

      {/* Coming Soon */}
      <p
        className="select-none uppercase leading-tight tracking-tight text-[#12100E]/30"
        style={{
          fontFamily: "var(--font-sketch)",
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
        }}
      >
        Coming Soon
      </p>

      {/* Description */}
      <p
        className={`${bodyFont.className} max-w-md text-center text-sm leading-relaxed text-[#6A5040]`}
      >
        Our sponsors and partners will be announced shortly.
        <br />
        Want to collaborate with Tech Kurukshetra?
      </p>

      {/* Contact */}
      <a
        href="mailto:tech.kurukshetra.uem@gmail.com"
        className={`
          ${accentFont.className}
          inline-flex items-center gap-2
          text-sm font-bold uppercase
          tracking-[0.18em]
          text-[#B8322C]
          underline underline-offset-4
          transition-colors duration-300
          hover:text-[#E6392F]
        `}
      >
        Get in touch
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
  );
}

/* ─────────────────────────────────────────
   Placeholder Logo
───────────────────────────────────────── */

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
        flex items-center justify-center
        rounded-xl
        border border-[#C4A882]
        bg-white/50
        transition-all duration-300
        hover:border-[#B8322C]/50
        hover:bg-white/70
        hover:shadow-[0_4px_16px_rgba(184,50,44,0.12)]
        cursor-default select-none
      `}
    >
      <span
        className={`${accentFont.className} font-bold tracking-widest text-[#8A6040]`}
      >
        {short}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Tier Label
───────────────────────────────────────── */

function TierLabel({
  label,
  accent,
}: {
  label: string;
  accent: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div
        className="h-[1.5px] w-8"
        style={{ background: accent }}
      />

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

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleCardRef = useRef<HTMLDivElement>(null);
  const platRowRef = useRef<HTMLDivElement>(null);
  const goldRowRef = useRef<HTMLDivElement>(null);
  const assocRowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  /*
   * A sponsor section only exists when there
   * is actual sponsor data.
   */
  const hasSponsors =
    PLATINUM.length > 0 ||
    GOLD.length > 0 ||
    ASSOCIATES.length > 0;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Header */
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

      /*
       * Only animate sponsor cards when
       * sponsor data actually exists.
       */

      if (hasSponsors && titleCardRef.current) {
        gsap.fromTo(
          titleCardRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: 30,
          },
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
      }

      /* Platinum */
      if (hasSponsors && platRowRef.current) {
        gsap.fromTo(
          platRowRef.current.querySelectorAll(".sponsor-item"),
          {
            opacity: 0,
            y: 24,
          },
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

      /* Gold */
      if (hasSponsors && goldRowRef.current) {
        gsap.fromTo(
          goldRowRef.current.querySelectorAll(".sponsor-item"),
          {
            opacity: 0,
            y: 20,
          },
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

      /* Associates */
      if (hasSponsors && assocRowRef.current) {
        gsap.fromTo(
          assocRowRef.current.querySelectorAll(".sponsor-item"),
          {
            opacity: 0,
            y: 16,
          },
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
  }, [hasSponsors]);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative w-full overflow-hidden py-24"
      style={{
        background: "#EFE2C7",
      }}
    >
      {/* ─────────────────────────────────
          Dot Grid
      ───────────────────────────────── */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(#8A623B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ─────────────────────────────────
          Paper Noise
      ───────────────────────────────── */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─────────────────────────────────
          Warm Centre Glow
      ───────────────────────────────── */}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse, rgba(184,50,44,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ─────────────────────────────────
            Header
        ───────────────────────────────── */}

        <div
          ref={headerRef}
          className="mb-16 text-center"
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
            The organisations powering the mission. Interested in partnering?
            {" "}
            <a
              href="mailto:tech.kurukshetra.uem@gmail.com"
              className="text-[#B8322C] underline underline-offset-2 transition-colors hover:text-[#E6392F]"
            >
              Get in touch.
            </a>
          </p>
        </div>

        {/* ═══════════════════════════════════
            NO SPONSOR DATA
        ═══════════════════════════════════ */}

        {!hasSponsors && <SponsorComingSoon />}

        {/* ═══════════════════════════════════
            SPONSOR DATA
        ═══════════════════════════════════ */}

        {hasSponsors && (
          <>
            {/* TITLE SPONSOR */}

            <TierLabel
              label="Title Sponsor"
              accent="#E6C84A"
            />

            <div
              ref={titleCardRef}
              className="mb-16"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-[#B8A060]/40"
                style={{
                  background:
                    "linear-gradient(135deg, #FDF6E8 0%, #F5EAD2 60%, #EEE0C4 100%)",
                }}
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#B8960A]/50 to-transparent" />

                <div
                  className="pointer-events-none absolute left-0 top-0"
                  style={{
                    width: "300px",
                    height: "300px",
                    background:
                      "radial-gradient(ellipse at top left, rgba(184,150,10,0.06) 0%, transparent 60%)",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center justify-between gap-8 px-8 py-10 sm:flex-row sm:px-12">

                  {/* Logo */}

                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-56 items-center justify-center rounded-xl border border-[#B8960A]/40 bg-[#B8960A]/8">
                      <span
                        className={`${accentFont.className} text-2xl font-bold tracking-widest text-[#8A6A0A]/70`}
                      >
                        YOUR LOGO
                      </span>
                    </div>
                  </div>

                  {/* Info */}

                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-2 inline-flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#B8960A]" />

                      <span
                        className={`${accentFont.className} text-[9px] font-bold uppercase tracking-[0.28em] text-[#8A6A0A]`}
                      >
                        {TITLE_SPONSOR.tier}
                      </span>
                    </div>

                    <p
                      className={`${accentFont.className} mb-1 text-2xl font-bold uppercase tracking-wide text-[#12100E] sm:text-3xl`}
                    >
                      {TITLE_SPONSOR.name}
                    </p>

                    <p
                      className={`${bodyFont.className} text-sm text-[#6A5040]`}
                    >
                      {TITLE_SPONSOR.tagline}
                    </p>
                  </div>

                  {/* Badge */}

                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#B8960A]/40 bg-[#B8960A]/8">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B8960A"
                      strokeWidth="1.5"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#B8960A]/50 to-transparent" />
              </div>
            </div>

            {/* PLATINUM */}

            {PLATINUM.length > 0 && (
              <>
                <TierLabel
                  label="Platinum Partners"
                  accent="#C8D8E8"
                />

                <div
                  ref={platRowRef}
                  className="mb-16 flex flex-wrap justify-center gap-5"
                >
                  {PLATINUM.map((sponsor) => (
                    <div
                      key={sponsor.name}
                      className="sponsor-item"
                    >
                      <LogoBox
                        short={sponsor.short}
                        name={sponsor.name}
                        size="lg"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* GOLD */}

            {GOLD.length > 0 && (
              <>
                <TierLabel
                  label="Gold Partners"
                  accent="#D4A84A"
                />

                <div
                  ref={goldRowRef}
                  className="mb-16 flex flex-wrap justify-center gap-4"
                >
                  {GOLD.map((sponsor) => (
                    <div
                      key={sponsor.name}
                      className="sponsor-item"
                    >
                      <LogoBox
                        short={sponsor.short}
                        name={sponsor.name}
                        size="md"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ASSOCIATES */}

            {ASSOCIATES.length > 0 && (
              <>
                <TierLabel
                  label="Associates & Community Partners"
                  accent="#6A7A8A"
                />

                <div
                  ref={assocRowRef}
                  className="flex flex-wrap justify-center gap-3"
                >
                  {ASSOCIATES.map((sponsor) => (
                    <div
                      key={sponsor.name}
                      className="sponsor-item"
                    >
                      <LogoBox
                        short={sponsor.short}
                        name={sponsor.name}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ─────────────────────────────────
            CTA
        ───────────────────────────────── */}

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="h-[1px] w-full bg-[#C4A882]/50" />

          <p
            className={`${bodyFont.className} mt-6 text-sm text-[#6A5040]`}
          >
            Want to become a sponsor or media partner?
          </p>

          <a
            href="mailto:tech.kurukshetra.uem@gmail.com"
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
