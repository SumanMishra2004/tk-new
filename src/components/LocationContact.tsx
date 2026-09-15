"use client";

import { useEffect, useRef } from "react";
import { Space_Grotesk, Rajdhani } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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

const CONTACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Email",
    value: "tech.kurukshetra@uem.edu.in",
    href: "mailto:tech.kurukshetra@uem.edu.in",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.95 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.87 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 1744-233208",
    href: "tel:+911744233208",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    value: "Dept. of CSE (IoT, CS, BT), UEM Kolkata, Plot III-B/5, Block–III, Action Area III, New Town, Kolkata – 700 160",
    href: "https://maps.google.com/?q=University+of+Engineering+and+Management+Kolkata+New+Town",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Event Hours",
    value: "September 2026 · Boarding from 10:00 AM",
    href: "#boarding-pass",
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tech_kurukshetra",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tech-kurukshetra",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function LocationContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Header */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
        }
      );

      /* Map */
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 82%" },
        }
      );

      /* Cards stagger */
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".contact-card"),
          { opacity: 0, x: 24 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "expo.out", stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
  <section
  ref={sectionRef}
  id="contact"
  className="relative w-full py-24 overflow-hidden"
  style={{ background: "#EFE2C7" }}
>
  {/* =========================================================
      BACKGROUND — DOT GRID
  ========================================================= */}
  <div
    className="absolute inset-0 z-0 pointer-events-none opacity-[0.14]"
    style={{
      backgroundImage:
        "radial-gradient(#8A623B 1.5px, transparent 1.5px)",
      backgroundSize: "26px 26px",
    }}
  />

  {/* =========================================================
      BACKGROUND — PAPER NOISE
  ========================================================= */}
  <div
    className="absolute inset-0 z-0 pointer-events-none opacity-[0.10] mix-blend-multiply"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />

  {/* =========================================================
      BACKGROUND — SHADOW PROTOCOL NINJA DECORATIONS
  ========================================================= */}

  {/* Large shuriken — top-left */}
  <svg
    aria-hidden="true"
    className="absolute top-12 left-10 z-[1] pointer-events-none opacity-[0.08] select-none"
    width="130" height="130" viewBox="0 0 100 100"
    fill="#7A4F2E"
  >
    <g transform="translate(50,50)">
      {[0,45,90,135].map((deg) => (
        <polygon
          key={deg}
          points="0,-40 7,-7 0,40 -7,-7"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="6" fill="#C4916A" />
    </g>
  </svg>

  {/* Katana — top-right, angled */}
  <svg
    aria-hidden="true"
    className="absolute top-16 right-12 z-[1] pointer-events-none opacity-[0.07] select-none"
    width="180" height="36" viewBox="0 0 180 36"
    style={{ transform: "rotate(-12deg)" }}
    fill="none"
  >
    <polygon points="0,16 155,13 175,18 155,23" fill="#8A5C3A" />
    <ellipse cx="22" cy="18" rx="5" ry="11" fill="#6B4228" />
    <line x1="5" y1="15" x2="5" y2="21" stroke="#5A3420" strokeWidth="1.5"/>
    <line x1="11" y1="14" x2="11" y2="22" stroke="#5A3420" strokeWidth="1.5"/>
    <line x1="17" y1="14" x2="17" y2="22" stroke="#5A3420" strokeWidth="1.5"/>
  </svg>

  {/* Torii gate — bottom-left */}
  <svg
    aria-hidden="true"
    className="absolute bottom-12 left-10 z-[1] pointer-events-none opacity-[0.07] select-none"
    width="100" height="120" viewBox="0 0 90 110"
    fill="none" stroke="#8A5232" strokeWidth="4" strokeLinecap="round"
  >
    <line x1="18" y1="30" x2="18" y2="108" />
    <line x1="72" y1="30" x2="72" y2="108" />
    <path d="M4,22 Q45,10 86,22" strokeWidth="5" />
    <line x1="14" y1="38" x2="76" y2="38" strokeWidth="3.5" />
    <line x1="10" y1="18" x2="80" y2="18" strokeWidth="6" />
  </svg>

  {/* Kunai — right edge, vertical */}
  <svg
    aria-hidden="true"
    className="absolute top-1/3 right-6 z-[1] pointer-events-none opacity-[0.08] select-none"
    width="26" height="140" viewBox="0 0 24 130"
    fill="#7A4A2A"
  >
    <polygon points="12,0 16,20 12,18 8,20" />
    <rect x="10" y="18" width="4" height="55" rx="2"/>
    <ellipse cx="12" cy="78" rx="9" ry="4" fill="#9A6A42"/>
    <rect x="10" y="82" width="4" height="30" rx="2"/>
    <line x1="9" y1="86" x2="15" y2="88" stroke="#5A3020" strokeWidth="1.2"/>
    <line x1="9" y1="92" x2="15" y2="94" stroke="#5A3020" strokeWidth="1.2"/>
    <line x1="9" y1="98" x2="15" y2="100" stroke="#5A3020" strokeWidth="1.2"/>
    <circle cx="12" cy="120" r="8" fill="none" stroke="#9A6A42" strokeWidth="2.5"/>
  </svg>

  {/* Small shuriken — bottom-right */}
  <svg
    aria-hidden="true"
    className="absolute bottom-16 right-16 z-[1] pointer-events-none opacity-[0.07] select-none"
    width="70" height="70" viewBox="0 0 100 100"
    fill="#7A4F2E"
    style={{ transform: "rotate(22.5deg)" }}
  >
    <g transform="translate(50,50)">
      {[0,45,90,135].map((deg) => (
        <polygon
          key={deg}
          points="0,-34 5,-5 0,34 -5,-5"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="4.5" fill="#C4916A" />
    </g>
  </svg>

  {/* Vertical kanji seal — left edge */}
  <svg
    aria-hidden="true"
    className="absolute top-1/2 left-4 -translate-y-1/2 z-[1] pointer-events-none opacity-[0.07] select-none"
    width="28" height="140" viewBox="0 0 28 140"
    fill="#6B3E24"
  >
    <rect x="10" y="4" width="8" height="3" rx="1"/>
    <rect x="4" y="10" width="20" height="2.5" rx="1"/>
    <rect x="12" y="4" width="2.5" height="22" rx="1"/>
    <rect x="6" y="18" width="7" height="2" rx="1"/>
    <rect x="15" y="18" width="7" height="2" rx="1"/>
    <rect x="8" y="36" width="12" height="2.5" rx="1"/>
    <rect x="13" y="36" width="2.5" height="18" rx="1"/>
    <rect x="6" y="46" width="16" height="2" rx="1"/>
    <rect x="8" y="52" width="5" height="8" rx="1"/>
    <rect x="15" y="52" width="5" height="8" rx="1"/>
    <rect x="9" y="72" width="10" height="2.5" rx="1"/>
    <rect x="13" y="72" width="2" height="14" rx="1"/>
    <rect x="6" y="80" width="16" height="2" rx="1"/>
    <rect x="7" y="86" width="6" height="2" rx="1"/>
    <rect x="15" y="86" width="6" height="2" rx="1"/>
    <rect x="8" y="106" width="12" height="2.5" rx="1"/>
    <rect x="13" y="106" width="2" height="16" rx="1"/>
    <rect x="6" y="116" width="7" height="2" rx="1"/>
    <rect x="15" y="116" width="7" height="2" rx="1"/>
    <rect x="6" y="122" width="16" height="2.5" rx="1"/>
  </svg>

  {/* =========================================================
      HILL — BOTTOM RIGHT
  ========================================================= */}
 <div
  className="absolute right-0 bottom-0 z-[2] pointer-events-none
             w-[520px] h-[420px]
             sm:w-[600px] sm:h-[480px]
             lg:w-[700px] lg:h-[560px] "
>
  <Image
    src="/fish.png"
    alt=""
    fill
    priority
    sizes="(max-width: 640px) 520px, (max-width: 1024px) 600px, 700px "
    className="object-contain object-bottom-right"
  />
</div>

  {/* =========================================================
      TOP ACCENT LINE
  ========================================================= */}
  <div
    className="
      absolute
      top-0
      left-0
      right-0
      z-[3]
      h-[1px]
      bg-gradient-to-r
      from-transparent
      via-[#B8322C]/30
      to-transparent
    "
  />

  {/* =========================================================
      CONTENT
  ========================================================= */}
  <div
    className="
      relative
      z-10
      max-w-5xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
    "
  >
    {/* =======================================================
        HEADER
    ======================================================= */}
    <div
      ref={headerRef}
      className="mb-14 text-center"
    >
      <p
        className={`
          ${accentFont.className}
          text-[11px]
          font-bold
          uppercase
          tracking-[0.3em]
          text-[#B8322C]
          mb-3
        `}
      >
        Shadow Protocol · Rendezvous Point
      </p>

      <h2
        className="
          text-[#12100E]
          uppercase
          leading-tight
          select-none
        "
        style={{
          fontFamily: "var(--font-sketch)",
          fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
        }}
      >
        Location & Contact
      </h2>

      <p
        className={`
          ${bodyFont.className}
          mt-4
          text-[#6A5040]
          text-sm
          sm:text-base
          max-w-lg
          mx-auto
          leading-relaxed
        `}
      >
        The mission headquarters. Find us, follow us, or reach out directly.
      </p>
    </div>

    {/* =======================================================
        TWO COLUMN LAYOUT
    ======================================================= */}
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-[1fr_420px]
        gap-8
        lg:gap-12
      "
    >
      {/* =====================================================
          LEFT — MAP
      ===================================================== */}
      <div
        ref={mapRef}
        className="flex flex-col gap-5"
      >
        {/* MAP */}
        <div
          className="
            relative
            rounded-2xl
            overflow-hidden
            border
            border-[#C4A882]/60
          "
          style={{ height: "340px" }}
        >
          {/* Red top accent */}
          <div
            className="
              absolute
              top-0
              left-0
              right-0
              h-1
              bg-gradient-to-r
              from-transparent
              via-[#B8322C]
              to-transparent
              z-10
            "
          />
       
          <iframe
            title="UEM Kolkata — Tech Kurukshetra venue"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.275159607267!2d88.4912531535669!3d22.55972122785963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b2612ee95b3%3A0x88a96dc0195a23b!2sUniversity%20Of%20Engineering%20%26%20Management%2C%20New%20Town%2C%20Newtown%2C%20West%20Bengal%20743502!5e0!3m2!1sen!2sin!4v1789462240431!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{
              border: 0,
              
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Venue badge */}
          <div
            className="
              absolute
              bottom-4
              left-4
              z-10
              flex
              items-center
              gap-2
              bg-white/80
              backdrop-blur-sm
              border
              border-[#C4A882]/60
              rounded-xl
              px-4
              py-2.5
              shadow-lg
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#B8322C]
                animate-pulse
                flex-shrink-0
              "
            />

            <div>
              <p
                className={`
                  ${accentFont.className}
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#B8322C]
                `}
              >
                Venue
              </p>

              <p
                className={`
                  ${bodyFont.className}
                  text-xs
                  text-[#3A2E22]
                  font-medium
                `}
              >
                UEM Kolkata · New Town
              </p>
            </div>
          </div>

          {/* Directions */}
          <div className="absolute top-4 right-4 z-10">
            <a
              href="https://maps.google.com/?q=University+of+Engineering+and+Management+Kolkata+New+Town"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${accentFont.className}
                flex
                items-center
                gap-1.5
                bg-white/80
                backdrop-blur-sm
                border
                border-[#C4A882]/60
                rounded-lg
                px-3
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#6A5040]
                hover:text-[#B8322C]
                hover:border-[#B8322C]/40
                transition-all
              `}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>

              Directions
            </a>
          </div>
        </div>

        {/* QUICK INFO */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "City",
              value: "Kolkata, WB",
            },
            {
              label: "Date",
              value: "26 Sept 2026",
            },
            {
              label: "Boarding",
              value: "09:00 AM",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="
                rounded-xl
                border
                border-[#C4A882]/60
                bg-white/40
                px-4
                py-3
                text-center
              "
            >
              <p
                className={`
                  ${accentFont.className}
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#8A6040]
                  mb-1
                `}
              >
                {label}
              </p>

              <p
                className={`
                  ${accentFont.className}
                  text-sm
                  font-bold
                  text-[#12100E]
                  tracking-wide
                `}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          RIGHT — CONTACT
      ===================================================== */}
      <div
        ref={cardsRef}
        className="flex flex-col gap-4"
      >
        <div className="h-0.5 w-10 bg-[#B8322C] mb-2" />

        <p
          className={`
            ${accentFont.className}
            text-base
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#12100E]
            mb-2
          `}
        >
          Get in Touch
        </p>

        {CONTACTS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={
              c.label === "Address"
                ? "_blank"
                : undefined
            }
            rel={
              c.label === "Address"
                ? "noopener noreferrer"
                : undefined
            }
            className="
              contact-card
              flex
              items-start
              gap-4
              rounded-xl
              border
              border-[#C4A882]/55
              bg-white/35
              p-4
              transition-all
              duration-300
              hover:border-[#B8322C]/35
              hover:bg-white/55
              group
            "
          >
            <div
              className="
                flex-shrink-0
                w-9
                h-9
                rounded-lg
                bg-[#B8322C]/10
                border
                border-[#B8322C]/20
                flex
                items-center
                justify-center
                text-[#B8322C]
                group-hover:bg-[#B8322C]/18
                transition-colors
              "
            >
              {c.icon}
            </div>

            <div className="min-w-0">
              <p
                className={`
                  ${accentFont.className}
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#8A6040]
                  mb-0.5
                `}
              >
                {c.label}
              </p>

              <p
                className={`
                  ${bodyFont.className}
                  text-sm
                  text-[#3A2E22]
                  leading-relaxed
                  break-words
                `}
              >
                {c.value}
              </p>
            </div>
          </a>
        ))}

        {/* SOCIALS */}
        <div className="flex items-center gap-3 mt-2">
          <p
            className={`
              ${accentFont.className}
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#8A6040]
            `}
          >
            Follow
          </p>

          <div className="h-[1px] flex-1 bg-[#C4A882]/50" />

          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="
                w-10
                h-10
                rounded-xl
                border
                border-[#C4A882]/55
                bg-white/35
                flex
                items-center
                justify-center
                text-[#8A6040]
                transition-all
                duration-300
                hover:border-[#B8322C]/45
                hover:text-[#B8322C]
                hover:bg-white/55
              "
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
