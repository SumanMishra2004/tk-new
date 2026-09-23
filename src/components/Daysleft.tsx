"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date("2026-11-14T08:00:00+05:30");

export default function DaysLeft() {
  const containerRef = useRef<HTMLElement>(null);

  const daysRef = useRef<HTMLSpanElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const minutesRef = useRef<HTMLSpanElement>(null);
  const secondsRef = useRef<HTMLSpanElement>(null);

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        if (daysRef.current) daysRef.current.textContent = "00";
        if (hoursRef.current) hoursRef.current.textContent = "00";
        if (minutesRef.current) minutesRef.current.textContent = "00";
        if (secondsRef.current) secondsRef.current.textContent = "00";
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      if (daysRef.current) {
        daysRef.current.textContent = String(days).padStart(2, "0");
      }

      if (hoursRef.current) {
        hoursRef.current.textContent = String(hours).padStart(2, "0");
      }

      if (minutesRef.current) {
        minutesRef.current.textContent =
          String(minutes).padStart(2, "0");
      }

      if (secondsRef.current) {
        secondsRef.current.textContent =
          String(seconds).padStart(2, "0");
      }
    };

    updateCounter();

    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     SCROLL FADE-IN
     
     opacity: 0 → 1
     y:       50 → 0
  ========================================================= */

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 55%",
            scrub: 1.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        overflow-visible
        px-4
        py-10
        text-white
        sm:px-6
        lg:px-8
      "
    >
      {/* STICKY CONTENT */}
      
      
        <div className="mx-auto max-w-6xl">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="counter-header mb-12 text-center">

            <div className="mb-5 flex items-center justify-center gap-4">

              <span className="h-px w-12 bg-red-500/70 sm:w-20" />

              <span
                className="
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-red-400
                  sm:text-xs
                "
              >
                SHADOW PROTOCOL // SYSTEM COUNTDOWN
              </span>

              <span className="h-px w-12 bg-red-500/70 sm:w-20" />

            </div>

            <p
              className="
                mt-3
                font-mono
                text-xs
                uppercase
                tracking-[0.22em]
                text-white/55
                sm:text-sm
              "
            >
              Until system activation
            </p>

          </div>

          {/* =====================================================
              COUNTER
          ===================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              sm:grid-cols-4
              sm:gap-5
              lg:gap-6
            "
          >
            <CounterUnit
              valueRef={daysRef}
              label="Days"
              code="01"
            />

            <CounterUnit
              valueRef={hoursRef}
              label="Hours"
              code="02"
            />

            <CounterUnit
              valueRef={minutesRef}
              label="Minutes"
              code="03"
            />

            <CounterUnit
              valueRef={secondsRef}
              label="Seconds"
              code="04"
            />
          </div>

          {/* =====================================================
              STATUS
          ===================================================== */}

          <div className="mt-10 flex items-center justify-center gap-3">

            <span
              className="
                relative
                flex
                h-2.5
                w-2.5
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  h-4
                  w-4
                  rounded-full
                  bg-red-500/50
                "
              />

              <span
                className="
                  relative
                  h-2
                  w-2
                  rounded-full
                  bg-red-500
                "
              />
            </span>

            <span
              className="
                rounded-2xl
                bg-gray-900
                p-3
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-white/55
                sm:text-xs
              "
            >
              Protocol active
            </span>

          </div>

        </div>
     
    </section>
  );
}

/* =========================================================
   COUNTER UNIT
========================================================= */

function CounterUnit({
  valueRef,
  label,
  code,
}: {
  valueRef: React.RefObject<HTMLSpanElement | null>;
  label: string;
  code: string;
}) {
  return (
    <div className="counter-unit group relative">

      <div
        className="
          relative
          min-h-[175px]
          overflow-hidden
          border
          border-white/15
          px-5
          py-6
          transition-all
          duration-500
          group-hover:border-red-500/60
          sm:min-h-[210px]
          sm:px-6
        "
      >

        {/* TOP INFORMATION */}

        <div className="flex items-center justify-between">

          <span
            className="
              font-mono
              text-[9px]
              font-bold
              tracking-[0.18em]
              text-red-400
              sm:text-[10px]
            "
          >
            NODE-{code}
          </span>

          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            SYS
          </span>

        </div>

        {/* CORNERS */}

        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-red-500" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-red-500" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-red-500" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-red-500" />

        {/* NUMBER */}

        <div className="mt-7 flex items-center justify-center sm:mt-8">

          <span
            ref={valueRef}
            className="
              counter-number
              font-mono
              text-6xl
              font-black
              leading-none
              tracking-[-0.07em]
              text-white
              drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]
              sm:text-7xl
              md:text-8xl
            "
          >
            00
          </span>

        </div>

        {/* LABEL */}

        <div className="mt-5 text-center">

          <span
            className="
              font-mono
              text-[10px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-white/70
              sm:text-xs
            "
          >
            {label}
          </span>

        </div>

        {/* BOTTOM LINE */}

        <div
          className="
            absolute
            bottom-4
            left-1/2
            h-px
            w-10
            -translate-x-1/2
            overflow-hidden
            bg-white/15
          "
        >
          <span
            className="
              block
              h-full
              w-1/2
              -translate-x-full
              bg-red-500/80
            "
          />
        </div>

      </div>
    </div>
  );
}