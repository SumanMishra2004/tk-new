"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Space_Grotesk, Rajdhani } from "next/font/google";

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

const stats = [
  {
    value: 5,
    suffix: "+",
    label: "Events",
    code: "EV",
    percentage: 75,
  },
  {
    value: 200,
    suffix: "+",
    label: "Participants",
    code: "PT",
    percentage: 85,
  },
  {
    value: 1000,
    suffix: "+",
    label: "Registrations",
    code: "RG",
    percentage: 95,
  },
  {
    value: 50,
    suffix: "+",
    label: "Projects",
    code: "PR",
    percentage: 80,
  },
];

export default function OverlaySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ── ABOUT US ── */
      gsap.fromTo(
        ".about-content",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 85%",
            end: "top 50%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      /* ── STATS HEADER ── */
      gsap.fromTo(
        ".stats-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-header",
            start: "top 88%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── STAT CARDS ── */
      const items = gsap.utils.toArray<HTMLElement>(".stat-item");

      items.forEach((item, index) => {
        const bar = item.querySelector<HTMLElement>(".stat-bar");
        const number = item.querySelector<HTMLElement>(".stat-value");

        if (!bar || !number) return;

        const target = Number(item.dataset.value);
        const percentage = Number(item.dataset.percentage);
        const counter = { value: 0 };

        /* card slide-up */
        gsap.fromTo(
          item,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        /* bar fill */
        gsap.fromTo(
          bar,
          { height: "0%" },
          {
            height: `${percentage}%`,
            duration: 1.4,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        /* number count-up */
        gsap.fromTo(
          counter,
          { value: 0 },
          {
            value: target,
            duration: 1.4,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              number.textContent = Math.floor(counter.value).toString();
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        w-full
        overflow-hidden
        bg-black
        px-5
        py-16
        text-white
        sm:px-8
        sm:py-20
        lg:px-16
        lg:py-24
      "
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            ABOUT US
        ===================================================== */}

        <div
          className="
            about-content
            grid
            items-center
            gap-10
            md:grid-cols-[0.8fr_1.2fr]
            md:gap-16
            lg:gap-24
          "
        >
          {/* LEFT */}

          <div className="text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#E6392F] sm:w-16" />

              <span
                className={`
                  ${accentFont.className}
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#F05A47]
                  sm:text-xs
                `}
              >
                01 / Identity
              </span>
            </div>

            <h2
              className="
                mt-5
                text-5xl
                font-black
                uppercase
                leading-[0.85]
                tracking-tight
                text-[#F5F1E8]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
              style={{
                fontFamily: "var(--font-sketch)",
              }}
            >
              About
              <br />

              <span className="text-[#E6392F]">
                Us
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="max-w-2xl">
            <p
              className={`
                ${accentFont.className}
                text-lg
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white
                sm:text-xl
                md:text-2xl
              `}
            >
              Technology. Strategy. Competition.
            </p>

            <div className="mt-5 h-px w-full max-w-xl bg-white/20" />

            <p
              className={`
                ${bodyFont.className}
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-white/70
                sm:text-base
                sm:leading-7
                md:text-lg
              `}
            >
              Tech Kurukshetra is a platform where
              technology meets strategy and innovation
              meets competition. It brings together
              students, creators, developers, and
              innovators to build ideas that challenge
              the way we think.
            </p>

            <p
              className={`
                ${bodyFont.className}
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-white/50
                sm:text-base
              `}
            >
              Enter the Shadow Protocol. Build.
              Compete. Innovate.
            </p>
          </div>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mt-14 md:mt-16">

          {/* HEADER */}

          <div
            className="
              stats-header
              mb-6
              flex
              items-end
              justify-between
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#E6392F]" />

                <span
                  className={`
                    ${accentFont.className}
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#F05A47]
                    sm:text-xs
                  `}
                >
                  02 / Protocol Metrics
                </span>
              </div>

              <h3
                className={`
                  ${accentFont.className}
                  mt-2
                  text-2xl
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  sm:text-3xl
                `}
              >
                System Statistics
              </h3>
            </div>

            <span
              className={`
                ${accentFont.className}
                hidden
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-white/30
                sm:block
              `}
            >
              SHADOW_PROTOCOL // 2026
            </span>
          </div>

          <div className="mb-6 h-px w-full bg-white/15" />

          {/* STAT GRID */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-4
              sm:gap-5
              lg:gap-6
            "
          >
            {stats.map((stat) => (
              <Stat
                key={stat.code}
                {...stat}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  suffix,
  label,
  code,
  percentage,
}: {
  value: number;
  suffix: string;
  label: string;
  code: string;
  percentage: number;
}) {
  return (
    <div
      className="
        stat-item
        group
        relative
        flex
        min-h-[190px]
        flex-col
        justify-end
        overflow-hidden
        border
        border-white/15
        p-5
        transition-colors
        duration-500
        hover:border-[#E6392F]/60
        sm:min-h-[230px]
        sm:p-6
      "
      data-value={value}
      data-percentage={percentage}
    >
      {/* TOP */}

      <div
        className="
          absolute
          left-4
          right-4
          top-4
          flex
          items-center
          justify-between
          sm:left-5
          sm:right-5
        "
      >
        <span
          className={`
            ${accentFont.className}
            text-[10px]
            font-bold
            tracking-[0.2em]
            text-[#E6392F]
          `}
        >
          {code}
        </span>

        <span
          className={`
            ${accentFont.className}
            text-[9px]
            tracking-[0.2em]
            text-white/30
          `}
        >
          SYS
        </span>
      </div>

      {/* BAR */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[65%]
          px-5
        "
      >
        {/* GRID */}

        <div
          className="
            absolute
            inset-x-5
            bottom-0
            top-0
            flex
            flex-col
            justify-between
            opacity-20
          "
        >
          <span className="h-px w-full bg-white/20" />
          <span className="h-px w-full bg-white/20" />
          <span className="h-px w-full bg-white/20" />
          <span className="h-px w-full bg-white/20" />
        </div>

        {/* BAR */}

        <div
          className="
            stat-bar
            absolute
            bottom-0
            left-5
            h-0
            w-[calc(100%-2.5rem)]
            bg-[#E6392F]/25
          "
        >
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[2px]
              bg-[#E6392F]
            "
          />

          <div
            className="
              absolute
              right-0
              top-0
              h-full
              w-px
              bg-[#F05A47]
            "
          />
        </div>
      </div>

      {/* VALUE */}

      <div className="relative z-10">
        <div className="flex items-baseline gap-1">
          <span
            className={`
              ${accentFont.className}
              stat-value
              text-5xl
              font-bold
              leading-none
              tracking-tight
              text-white
              sm:text-6xl
              md:text-7xl
            `}
          >
            0
          </span>

          <span
            className={`
              ${accentFont.className}
              text-2xl
              font-bold
              text-[#E6392F]
              sm:text-3xl
            `}
          >
            {suffix}
          </span>
        </div>

        <p
          className={`
            ${bodyFont.className}
            mt-2
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-white/50
            sm:text-[10px]
          `}
        >
          {label}
        </p>
      </div>

      {/* CORNERS */}

      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#E6392F]" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[#E6392F]" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#E6392F]" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#E6392F]" />

      {/* HOVER LINE */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-[#E6392F]
          transition-all
          duration-500
          group-hover:w-full
        "
      />
    </div>
  );
}