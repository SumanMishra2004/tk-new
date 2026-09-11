"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Rajdhani } from "next/font/google";

const accentFont = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/* ─── Japanese kanji / katakana glyphs used as decorative rain ─── */
const KANJI = [
  "忍", "者", "影", "刃", "闇", "戦", "術", "鋼",
  "煙", "道", "侍", "幻", "霧", "鬼", "火", "雷",
  "竜", "魂", "血", "剣", "夜", "月", "星", "影",
  "シ", "ャ", "ド", "ウ", "プ", "ロ", "ト", "コ", "ル",
];

interface LoadingScreenProps {
  done: boolean;
  onExited: () => void;
}

/* ─── Single falling kanji column ─── */
function KanjiColumn({
  chars,
  x,
  duration,
  delay,
  opacity,
}: {
  chars: string[];
  x: number;
  duration: number;
  delay: number;
  opacity: number;
}) {
  return (
    <div
      className="absolute top-0 flex flex-col pointer-events-none select-none"
      style={{
        left: `${x}%`,
        animationName: "kanjifall",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        opacity,
        willChange: "transform",
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className={`${accentFont.className} block text-[13px] leading-6`}
          style={{
            color: i === 0 ? "#FF705F" : i < 3 ? "#E6392F" : "#3A1010",
            textShadow: i === 0 ? "0 0 8px #FF705F" : "none",
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export default function LoadingScreen({ done, onExited }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);

  /* ── Generate kanji columns once ── */
  const columns = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      chars: Array.from({ length: 14 }, () => KANJI[Math.floor(Math.random() * KANJI.length)]),
      x: (i / 18) * 100 + Math.random() * 3,
      duration: 6 + Math.random() * 6,
      delay: -(Math.random() * 8),
      opacity: 0.05 + Math.random() * 0.12,
    }))
  );

  /* ── Entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Content fades in
      tl.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Seal draws in with a scale pop
      tl.fromTo(
        sealRef.current,
        { scale: 0.6, opacity: 0, rotate: -15 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.6)" },
        "-=0.2"
      );

      // Progress bar crawls to ~82% while loading
      tl.fromTo(
        progressFillRef.current,
        { scaleX: 0 },
        {
          scaleX: 0.82,
          duration: 5,
          ease: "power1.inOut",
          transformOrigin: "left center",
        },
        "-=0.4"
      );

      // Slow seal rotation — idle spin
      gsap.to(sealRef.current, {
        rotate: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Exit: the slash reveal ── */
  useEffect(() => {
    if (!done) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onExited });

      // Snap bar to 100%
      tl.to(
        progressFillRef.current,
        {
          scaleX: 1,
          duration: 0.25,
          ease: "power3.out",
          transformOrigin: "left center",
        },
        0
      );

      // Flash slash across the screen
      tl.fromTo(
        slashRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.18, ease: "power4.out", transformOrigin: "left center" },
        0.3
      );
      tl.to(slashRef.current, { opacity: 0, duration: 0.12, ease: "power2.in" }, 0.48);

      // Content fades out fast
      tl.to(contentRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0.3);

      // Two curtains split open (top goes up, bottom goes down)
      tl.to(
        curtainTopRef.current,
        { yPercent: -100, duration: 0.7, ease: "expo.inOut" },
        0.42
      );
      tl.to(
        curtainBotRef.current,
        { yPercent: 100, duration: 0.7, ease: "expo.inOut" },
        0.42
      );
    });

    return () => ctx.revert();
  }, [done, onExited]);

  return (
    <>
      {/* Keyframes for kanji rain */}
      <style>{`
        @keyframes kanjifall {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(110vh); }
        }
      `}</style>

      {/* ── Full overlay ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] overflow-hidden"
        role="status"
        aria-label="Loading Tech Kurukshetra"
        aria-live="polite"
      >
        {/* TOP CURTAIN */}
        <div
          ref={curtainTopRef}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#060404]"
          style={{ zIndex: 2 }}
        />
        {/* BOTTOM CURTAIN */}
        <div
          ref={curtainBotRef}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060404]"
          style={{ zIndex: 2 }}
        />

        {/* ── Background canvas ── */}
        <div className="absolute inset-0 bg-[#060404]" style={{ zIndex: 1 }}>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Kanji rain columns */}
          <div className="absolute inset-0 overflow-hidden">
            {columns.current.map((col, i) => (
              <KanjiColumn key={i} {...col} />
            ))}
          </div>

          {/* Thin horizontal scan line */}
          <div
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{
              top: "50%",
              background:
                "linear-gradient(to right, transparent, rgba(230,57,47,0.15) 30%, rgba(230,57,47,0.15) 70%, transparent)",
            }}
          />
        </div>

        {/* ── Slash flash element ── */}
        <div
          ref={slashRef}
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: "50%",
            height: "2px",
            zIndex: 10,
            background:
              "linear-gradient(to right, transparent, #FF705F 20%, #ffffff 50%, #FF705F 80%, transparent)",
            boxShadow: "0 0 24px 4px rgba(255,112,95,0.6)",
            transformOrigin: "left center",
            opacity: 0,
            transform: "scaleX(0)",
          }}
        />

        {/* ── Centre content ── */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8"
          style={{ zIndex: 3 }}
        >
          {/* ── Seal / emblem ── */}
          <div ref={sealRef} className="relative flex items-center justify-center">

            {/* Outer octagon border — pure CSS clip */}
            <div
              className="absolute"
              style={{
                width: 140,
                height: 140,
                clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                background:
                  "linear-gradient(135deg, rgba(230,57,47,0.18) 0%, transparent 60%)",
                border: "1px solid rgba(230,57,47,0.3)",
              }}
            />

            {/* Inner circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: 104,
                height: 104,
                border: "1px solid rgba(230,57,47,0.25)",
                background:
                  "radial-gradient(ellipse at center, rgba(230,57,47,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Rotating dashed ring */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
              aria-hidden="true"
              style={{ animation: "none" }} // GSAP handles rotation on parent
            >
              <circle
                cx="60"
                cy="60"
                r="56"
                fill="none"
                stroke="rgba(230,57,47,0.2)"
                strokeWidth="0.8"
                strokeDasharray="4 6"
              />
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="rgba(230,57,47,0.12)"
                strokeWidth="0.6"
                strokeDasharray="2 10"
              />
            </svg>

            {/* Logo image */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tk-logo.webp"
                alt="Tech Kurukshetra"
                width={80}
                height={80}
                className="object-contain select-none"
                style={{
                  filter:
                    "drop-shadow(0 0 18px rgba(230,57,47,0.55)) drop-shadow(0 0 6px rgba(230,57,47,0.3))",
                }}
              />
              {/* Japanese subtitle */}
              <span
                className={`${accentFont.className} text-[10px] tracking-[0.5em] uppercase`}
                style={{ color: "rgba(230,57,47,0.7)" }}
              >
                影の掟
              </span>
            </div>
          </div>

          {/* ── Event name ── */}
          <div className="flex flex-col items-center gap-1">
            <p
              className="text-white/80 select-none uppercase leading-tight tracking-tight"
              style={{
                fontFamily: "var(--font-sketch)",
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
              }}
            >
              Tech Kurukshetra
            </p>
            <p
              className={`${accentFont.className} text-[11px] font-bold uppercase tracking-[0.35em] text-[#E6392F]`}
            >
              Shadow Protocol · 2026
            </p>
          </div>

          {/* ── Progress bar ── */}
          <div className="flex flex-col items-center gap-3 w-[200px] sm:w-[260px]">
            {/* Bar track */}
            <div className="relative w-full h-[1px] bg-white/8">
              {/* Glow track */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(230,57,47,0.08), transparent)",
                }}
              />
              {/* Fill */}
              <div
                ref={progressFillRef}
                className="absolute inset-0 origin-left"
                style={{
                  background:
                    "linear-gradient(to right, #8B0000, #E6392F, #FF705F)",
                  boxShadow: "0 0 10px rgba(230,57,47,0.7), 0 0 3px #fff",
                  transform: "scaleX(0)",
                }}
              />
              {/* Left cap dot */}
              <div
                className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#E6392F]"
                style={{ boxShadow: "0 0 6px #E6392F" }}
              />
            </div>

            {/* Status text in Japanese style */}
            <p
              className={`${accentFont.className} text-[10px] uppercase tracking-[0.4em] text-white/25`}
            >
              起動中 · Initialising
            </p>
          </div>

          {/* ── Bottom corner decorations ── */}
          <div className="absolute bottom-8 left-8 flex items-center gap-2 opacity-20">
            <div className="h-px w-10 bg-[#E6392F]" />
            <span className={`${accentFont.className} text-[9px] uppercase tracking-[0.3em] text-[#E6392F]`}>
              忍 UEM Kolkata
            </span>
          </div>
          <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-20">
            <span className={`${accentFont.className} text-[9px] uppercase tracking-[0.3em] text-[#E6392F]`}>
              IEDC 影
            </span>
            <div className="h-px w-10 bg-[#E6392F]" />
          </div>
        </div>
      </div>
    </>
  );
}
