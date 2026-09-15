"use client";

import { useState, useRef, useEffect } from "react";
import { Space_Grotesk, Rajdhani } from "next/font/google";
import gsap from "gsap";
import Image from "next/image";

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

const DOMAINS = [
  "Web Development",
  "AI / Machine Learning",
  "Cybersecurity",
  "Robotics & IoT",
  "Blockchain",
  "Cloud Computing",
  "Game Development",
  "Data Science",
  "App Development",
  "Open Innovation",
];

/* ─────────────────────────────────────────────
   Deterministic seat
───────────────────────────────────────────── */

function genSeat(name: string) {
  const row = ((name.charCodeAt(0) || 65) % 30) + 10;
  const col = String.fromCharCode(
    65 + ((name.charCodeAt(1) || 66) % 6)
  );

  return `${row}${col}`;
}

/* ─────────────────────────────────────────────
   Deterministic pass ID
───────────────────────────────────────────── */

function genPassId(name: string) {
  const hash = name
    .toUpperCase()
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);

  return (
    "TK" +
    (hash * 7919)
      .toString(36)
      .toUpperCase()
      .slice(0, 6)
  );
}

/* ─────────────────────────────────────────────
   Tiny barcode SVG
───────────────────────────────────────────── */

function Barcode({ seed }: { seed: string }) {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const w =
      ((seed.charCodeAt(i % seed.length) * (i + 3)) % 4) + 1;

    return w;
  });

  let x = 0;

  const rects: {
    x: number;
    w: number;
    fill: string;
  }[] = [];

  bars.forEach((w, i) => {
    if (i % 2 === 0) {
      rects.push({
        x,
        w,
        fill: "#12100E",
      });
    }

    x += w + 1;
  });

  const totalW = x;

  return (
    <svg
      viewBox={`0 0 ${totalW} 40`}
      className="w-full h-8"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {rects.map((r, i) => (
        <rect
          key={i}
          x={r.x}
          y={0}
          width={r.w}
          height={40}
          fill={r.fill}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function BoardingPassSection() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [college, setCollege] = useState("");
  const [generated, setGenerated] = useState(false);

  const passRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const passId = generated ? genPassId(name) : "";
  const seat = generated ? genSeat(name) : "";

  /* ─────────────────────────────────────────────
     Animate pass entry
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (generated && passRef.current) {
      gsap.fromTo(
        passRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "expo.out",
        }
      );
    }
  }, [generated]);

  /* ─────────────────────────────────────────────
     Section header animation
  ───────────────────────────────────────────── */

  useEffect(() => {
    const el =
      sectionRef.current?.querySelector(".bp-header");

    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  /* ─────────────────────────────────────────────
     Generate pass
  ───────────────────────────────────────────── */

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      name.trim() &&
      domain &&
      college.trim()
    ) {
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => setGenerated(true),
        });
      } else {
        setGenerated(true);
      }
    }
  };

  /* ─────────────────────────────────────────────
     Reset
  ───────────────────────────────────────────── */

  const handleReset = () => {
    if (passRef.current) {
      gsap.to(passRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setGenerated(false),
      });
    } else {
      setGenerated(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="boarding-pass"
      className="relative w-full py-24 overflow-hidden"
      style={{
        background: "#EFE2C7",
      }}
    >
      {/* ═══════════════════════════════════════════
          DOT GRID
      ═══════════════════════════════════════════ */}

      <div
        className="absolute inset-0 z-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#8A623B 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* ═══════════════════════════════════════════
          TREE BACKGROUND — TOP RIGHT
      ═══════════════════════════════════════════ */}

      <div
        className="
          absolute
          top-0
          right-0
          z-0
          pointer-events-none
          select-none

          w-[420px]
          h-[420px]

          sm:w-[520px]
          sm:h-[520px]

          md:w-[620px]
          md:h-[620px]

          lg:w-[720px]
          lg:h-[720px]

          xl:w-[800px]
          xl:h-[800px]
        "
        aria-hidden="true"
      >
        <Image
          src="/tree.png"
          alt=""
          fill
          priority
          sizes="
            (max-width: 640px) 420px,
            (max-width: 768px) 520px,
            (max-width: 1024px) 620px,
            (max-width: 1280px) 720px,
            800px
          "
          className="
            object-contain
            object-right-top
            opacity-90
          "
        />
      </div>

      {/* ═══════════════════════════════════════════
          PAPER NOISE
      ═══════════════════════════════════════════ */}

      <div
        className="
          absolute
          inset-0
          z-[1]
          opacity-[0.12]
          mix-blend-multiply
          pointer-events-none
        "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ═══════════════════════════════════════════
          WARM RADIAL ACCENT
      ═══════════════════════════════════════════ */}

      <div
        className="
          absolute
          z-[1]
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          pointer-events-none
        "
        style={{
          width: "80vw",
          height: "80vw",
          background:
            "radial-gradient(ellipse, rgba(184,50,44,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════ */}

      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ═════════════════════════════════════════
            HEADER
        ═════════════════════════════════════════ */}

        <div className="bp-header mb-14 text-center">
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
            Shadow Protocol · Tech Kurukshetra 2026
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
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
            }}
          >
            Your Boarding Pass
          </h2>

          <p
            className={`
              ${bodyFont.className}
              mt-4
              text-[#6A5040]
              text-sm
              sm:text-base
              max-w-md
              mx-auto
              leading-relaxed
            `}
          >
            Fill in your details and receive a personalised
            Shadow Protocol boarding pass for the mission.
          </p>
        </div>

        {/* ═════════════════════════════════════════
            LAYOUT
        ═════════════════════════════════════════ */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-start
            justify-center
            gap-10
            lg:gap-14
          "
        >
          {/* ═══════════════════════════════════════
              FORM
          ═══════════════════════════════════════ */}

          {!generated && (
            <div
              ref={formRef}
              className="w-full max-w-sm"
            >
              <form
                onSubmit={handleGenerate}
                className="space-y-5"
              >
                {/* Name + College */}

                {[
                  {
                    id: "bp-name",
                    label: "Full Name",
                    value: name,
                    setter: setName,
                    placeholder: "e.g. Arjun Sharma",
                    max: 40,
                    type: "text",
                  },
                  {
                    id: "bp-college",
                    label: "College / Institution",
                    value: college,
                    setter: setCollege,
                    placeholder: "e.g. UEM Kolkata",
                    max: 60,
                    type: "text",
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className={`
                        ${accentFont.className}
                        block
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.22em]
                        text-[#8A6040]
                        mb-2
                      `}
                    >
                      {field.label}
                    </label>

                    <input
                      id={field.id}
                      type={field.type}
                      value={field.value}
                      onChange={(e) =>
                        field.setter(e.target.value)
                      }
                      placeholder={field.placeholder}
                      maxLength={field.max}
                      required
                      className={`
                        ${bodyFont.className}
                        w-full
                        rounded-xl
                        border
                        border-[#C4A882]
                        bg-white/60
                        px-4
                        py-3
                        text-[#12100E]
                        placeholder:text-[#B8A080]
                        text-sm
                        focus:outline-none
                        focus:border-[#B8322C]/60
                        focus:ring-1
                        focus:ring-[#B8322C]/20
                        transition-all
                        duration-200
                      `}
                    />
                  </div>
                ))}

                {/* Domain */}

                <div>
                  <label
                    htmlFor="bp-domain"
                    className={`
                      ${accentFont.className}
                      block
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-[#8A6040]
                      mb-2
                    `}
                  >
                    Domain / Track
                  </label>

                  <select
                    id="bp-domain"
                    value={domain}
                    onChange={(e) =>
                      setDomain(e.target.value)
                    }
                    required
                    className={`
                      ${bodyFont.className}
                      w-full
                      rounded-xl
                      border
                      border-[#C4A882]
                      bg-white/60
                      px-4
                      py-3
                      text-sm
                      focus:outline-none
                      focus:border-[#B8322C]/60
                      focus:ring-1
                      focus:ring-[#B8322C]/20
                      transition-all
                      duration-200
                      ${
                        domain
                          ? "text-[#12100E]"
                          : "text-[#B8A080]"
                      }
                    `}
                  >
                    <option
                      value=""
                      disabled
                    >
                      Select your domain
                    </option>

                    {DOMAINS.map((d) => (
                      <option
                        key={d}
                        value={d}
                        className="bg-white text-[#12100E]"
                      >
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  className={`
                    ${accentFont.className}
                    w-full
                    mt-1
                    rounded-xl
                    bg-[#E6392F]
                    py-3.5
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white
                    shadow-[0_0_30px_rgba(230,57,47,0.3)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#F04A3D]
                    hover:shadow-[0_0_45px_rgba(230,57,47,0.5)]
                    active:translate-y-0
                  `}
                >
                  Issue Boarding Pass →
                </button>
              </form>
            </div>
          )}

          {/* ═══════════════════════════════════════
              GENERATED PASS
          ═══════════════════════════════════════ */}

          {generated && (
          
<div
  ref={passRef}
  className="
    w-full
    flex
    flex-col
    items-center
    gap-6
  "
>
  {/* Pass wrapper */}
  <div
    className="w-full max-w-[680px]"
    style={{
      filter:
        "drop-shadow(0 8px 50px rgba(184,50,44,0.28))",
    }}
  >
    {/* Main ticket */}
    <div
      className="
        relative
        rounded-3xl
        overflow-hidden
      "
      style={{
        background:
          "linear-gradient(160deg, #F2E8D5 0%, #E8D8BC 30%, #D8C8A8 60%, #C8B898 100%)",
      }}
    >
      {/* Paper grain */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.18]
          mix-blend-multiply
        "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ticket content */}
      <div
        className="
          relative
          z-10
          px-6
          pt-6
          pb-6
          sm:px-8
          sm:pt-7
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-start
            justify-between
            mb-5
          "
        >
          {/* Brand */}
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                mb-1
              "
            >
              <div
                className="
                  w-5
                  h-5
                  rounded-full
                  bg-[#B8322C]
                  flex
                  items-center
                  justify-center
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-3 h-3"
                  aria-hidden="true"
                >
                  <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>

              <span
                className={`
                  ${accentFont.className}
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#8A6040]
                `}
              >
                TK Airways · Boarding Pass
              </span>
            </div>

            <p
              className="
                text-[#12100E]
                leading-none
                mt-1
              "
              style={{
                fontFamily: "var(--font-sketch)",
                fontSize: "clamp(1.5rem, 4.5vw, 2.4rem)",
              }}
            >
              Tech Kurukshetra
            </p>

            <p
              className={`
                ${accentFont.className}
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#B8322C]
                mt-0.5
              `}
            >
              Shadow Protocol · 2026
            </p>
          </div>

          {/* Pass ID */}
          <div
            className="
              flex
              flex-col
              items-end
              gap-2
              flex-shrink-0
              ml-4
            "
          >
            <div
              className="
                border
                border-[#B8322C]/50
                rounded-lg
                px-3
                py-1
                bg-[#B8322C]/10
              "
            >
              <span
                className={`
                  ${accentFont.className}
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#B8322C]
                `}
              >
                OPERATOR CLASS
              </span>
            </div>

            <div>
              <p
                className={`
                  ${accentFont.className}
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#8A6040]
                  text-right
                `}
              >
                Pass ID
              </p>

              <p
                className={`
                  ${accentFont.className}
                  text-base
                  font-bold
                  text-[#12100E]
                  tracking-[0.15em]
                  text-right
                `}
              >
                {passId}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-[#A89060]/50 mb-5" />

        {/* Passenger + Institution + Logo */}
        <div
          className="
            grid
            grid-cols-2
            gap-x-6
            gap-y-4
            mb-5
          "
        >
          {/* Passenger */}
          <div>
            <p
              className={`
                ${accentFont.className}
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#8A6040]
                mb-1
              `}
            >
              Passenger
            </p>

            <p
              className={`
                ${bodyFont.className}
                text-[#12100E]
                font-bold
                text-lg
                leading-tight
              `}
            >
              {name.toUpperCase()}
            </p>
          </div>

          {/* Institution + Date + Logo */}
          <div className="row-span-2 flex items-center justify-between gap-3">
            <div className="flex-1">
              {/* Institution */}
              <div className="mb-3">
                <p
                  className={`
                    ${accentFont.className}
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#8A6040]
                    mb-1
                  `}
                >
                  Institution
                </p>

                <p
                  className={`
                    ${bodyFont.className}
                    text-[#12100E]
                    font-semibold
                    text-sm
                    leading-tight
                  `}
                >
                  {college.toUpperCase()}
                </p>
              </div>

              {/* Date */}
              <div>
                <p
                  className={`
                    ${accentFont.className}
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#8A6040]
                    mb-1
                  `}
                >
                  Date
                </p>

                <p
                  className={`
                    ${accentFont.className}
                    text-[#12100E]
                    font-bold
                    text-sm
                    tracking-wide
                  `}
                >
                  26 SEPT 2026
                </p>
              </div>
            </div>

            {/* Tech Kurukshetra Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src="/logo-tech-kurukshetra.png"
                alt="Tech Kurukshetra"
                className="
                  w-16
                  h-16
                  sm:w-28
                  sm:h-28
                  object-contain
                "
              />
            </div>
          </div>

          {/* Domain */}
          <div>
            <p
              className={`
                ${accentFont.className}
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#8A6040]
                mb-1
              `}
            >
              Domain / Track
            </p>

            <p
              className={`
                ${bodyFont.className}
                text-[#12100E]
                font-semibold
                text-sm
                leading-tight
              `}
            >
              {domain}
            </p>
          </div>

          {/* Gate */}
       
        </div>

        {/* Route */}
        <div
          className="
            rounded-2xl
            px-5
            py-4
            mb-5
            flex
            items-center
            justify-between
          "
          style={{
            background: "rgba(18,16,14,0.07)",
          }}
        >
          {/* From */}
          <div className="text-center min-w-[64px]">
            <p
              className={`
                ${accentFont.className}
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-[#8A6040]
                mb-0.5
              `}
            >
              From
            </p>

            <p
              className={`
                ${accentFont.className}
                text-3xl
                font-bold
                text-[#12100E]
                tracking-wider
                leading-none
              `}
            >
              KOL
            </p>

            <p
              className={`
                ${bodyFont.className}
                text-[10px]
                text-[#6A5040]
                mt-0.5
              `}
            >
              Kolkata
            </p>
          </div>

          {/* Plane */}
          <div
            className="
              flex-1
              flex
              items-center
              gap-1.5
              mx-3
            "
          >
            <div className="flex-1 h-[1.5px] bg-[#A89060]/40" />

            <div
              className="
                flex
                flex-col
                items-center
                gap-0.5
              "
            >
              <svg
                viewBox="0 0 32 16"
                fill="none"
                className="w-8"
                aria-hidden="true"
              >
                <path
                  d="M28 8 L8 3 L6 8 L8 13 Z"
                  fill="#B8322C"
                />

                <path
                  d="M16 8 L12 2 L10 3 L14 8 Z"
                  fill="#B8322C"
                />

                <path
                  d="M16 8 L12 14 L10 13 L14 8 Z"
                  fill="#B8322C"
                />

                <path
                  d="M8 8 L4 5 L3 6 L6 8 L3 10 L4 11 Z"
                  fill="#B8322C"
                />
              </svg>

              <div className="flex gap-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="
                      w-1
                      h-1
                      rounded-full
                      bg-[#A89060]/50
                    "
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 h-[1.5px] bg-[#A89060]/40" />
          </div>

          {/* Destination */}
          <div className="text-center min-w-[64px]">
            <p
              className={`
                ${accentFont.className}
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-[#8A6040]
                mb-0.5
              `}
            >
              To
            </p>

            <p
              className={`
                ${accentFont.className}
                text-3xl
                font-bold
                text-[#B8322C]
                tracking-wider
                leading-none
              `}
            >
              UEMK
            </p>

            <p
              className={`
                ${bodyFont.className}
                text-[10px]
                text-[#6A5040]
                mt-0.5
              `}
            >
              New Town
            </p>
          </div>
        </div>

        {/* Flight details */}
        <div
          className="
            grid
            grid-cols-4
            gap-3
            mb-5
          "
        >
          {[
            {
              label: "Date",
              value: "26 SEPT 2026",
            },
            {
              label: "Boarding",
              value: "09:00 AM",
            },
            {
              label: "Flight",
              value: "TK-001",
            },
            {
              label: "Seat",
              value: seat,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="
                bg-white/20
                rounded-xl
                px-3
                py-2.5
                text-center
              "
            >
              <p
                className={`
                  ${accentFont.className}
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
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
                  leading-none
                  tracking-wider
                `}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Tear line */}
        <div
          className="
            relative
            flex
            items-center
            my-2
          "
        >
          <div
            className="
              absolute
              -left-8
              sm:-left-9
              w-8
              h-8
              rounded-full
              bg-[#E8D8BC]
            "
          />

          <div
            className="
              absolute
              -right-8
              sm:-right-9
              w-8
              h-8
              rounded-full
              bg-[#E8D8BC]
            "
          />

          <div
            className="
              flex-1
              border-t-2
              border-dashed
              border-[#A89060]/50
            "
          />
        </div>

        {/* Stub */}
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
            pt-4
          "
        >
          {/* Stub info */}
          <div className="flex gap-6">
            <div>
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
                Seat
              </p>

              <p
                className={`
                  ${accentFont.className}
                  text-2xl
                  font-bold
                  text-[#12100E]
                  tracking-widest
                `}
              >
                {seat}
              </p>
            </div>

            <div>
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
                Gate
              </p>

              <p
                className={`
                  ${accentFont.className}
                  text-2xl
                  font-bold
                  text-[#B8322C]
                  tracking-widest
                `}
              >
                SP-26
              </p>
            </div>
          </div>

          {/* Barcode */}
          <div
            className="
              flex
              flex-col
              items-end
              gap-1.5
              flex-1
              max-w-[200px]
            "
          >
            <p
              className={`
                ${accentFont.className}
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#8A6040]
              `}
            >
              Scan at gate
            </p>

            <div className="w-full">
              <Barcode seed={passId} />
            </div>

            <p
              className={`
                ${bodyFont.className}
                text-[9px]
                text-[#8A6040]
                tracking-[0.12em]
                font-medium
              `}
            >
              {passId}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="
          h-2
          w-full
          bg-gradient-to-r
          from-[#B8322C]
          via-[#E6392F]
          to-[#B8322C]
        "
      />
    </div>
  </div>

  {/* Reset */}
  <button
    onClick={handleReset}
    className={`
      ${accentFont.className}
      rounded-xl
      border
      border-[#B8A080]
      bg-transparent
      px-7
      py-3
      text-sm
      font-bold
      uppercase
      tracking-[0.18em]
      text-[#6A5040]
      transition-all
      duration-300
      hover:border-[#B8322C]/60
      hover:text-[#B8322C]
      hover:bg-[#B8322C]/5
    `}
  >
    ← New Pass
  </button>
</div>

          )}

          {/* ═══════════════════════════════════════
              GHOST PREVIEW
          ═══════════════════════════════════════ */}

          {!generated && (
            <div
              className="
                hidden
                lg:flex
                flex-col
                gap-3
                w-full
                max-w-[480px]
              "
            >
              <div
                className="
                  relative
                  rounded-3xl
                  overflow-hidden
                  opacity-25
                  pointer-events-none
                "
                style={{
                  background:
                    "linear-gradient(160deg, #F2E8D5 0%, #C8B898 100%)",
                  height: "340px",
                }}
              >
                <div
                  className="
                    p-7
                    flex
                    flex-col
                    gap-5
                    h-full
                  "
                >
                  {/* Header placeholder */}

                  <div
                    className="
                      flex
                      justify-between
                      items-start
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-2
                      "
                    >
                      <div
                        className="
                          h-3
                          w-36
                          bg-[#A89060]/40
                          rounded-full
                        "
                      />

                      <div
                        className="
                          h-8
                          w-52
                          bg-[#A89060]/40
                          rounded-lg
                        "
                      />
                    </div>

                    <div
                      className="
                        h-8
                        w-20
                        bg-[#B8322C]/30
                        rounded-lg
                      "
                    />
                  </div>

                  <div
                    className="
                      border-t
                      border-dashed
                      border-[#A89060]/30
                    "
                  />

                  {/* Grid */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="
                          h-8
                          bg-[#A89060]/25
                          rounded-lg
                        "
                      />
                    ))}
                  </div>

                  {/* Route */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      bg-black/10
                      rounded-xl
                      p-4
                    "
                  >
                    <div
                      className="
                        h-10
                        w-14
                        bg-[#A89060]/30
                        rounded-lg
                      "
                    />

                    <div
                      className="
                        flex-1
                        mx-4
                        h-6
                        bg-[#A89060]/20
                        rounded
                      "
                    />

                    <div
                      className="
                        h-10
                        w-14
                        bg-[#B8322C]/30
                        rounded-lg
                      "
                    />
                  </div>

                  {/* Bottom */}

                  <div
                    className="
                      mt-auto
                      border-t
                      border-dashed
                      border-[#A89060]/30
                      pt-3
                      flex
                      justify-between
                    "
                  >
                    <div
                      className="
                        h-8
                        w-16
                        bg-[#A89060]/25
                        rounded
                      "
                    />

                    <div
                      className="
                        h-8
                        w-32
                        bg-[#A89060]/20
                        rounded
                      "
                    />
                  </div>
                </div>

                <div
                  className="
                    h-2
                    w-full
                    bg-[#B8322C]/60
                    absolute
                    bottom-0
                  "
                />
              </div>

              <p
                className={`
                  ${accentFont.className}
                  text-center
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-[#3A3028]
                `}
              >
                Your pass will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}