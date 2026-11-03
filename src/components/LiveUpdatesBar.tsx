"use client";

import { Rajdhani, Space_Grotesk } from "next/font/google";

const accentFont = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function LiveUpdatesBar() {
  return (
    <section className="relative z-20 w-full bg-[#0a0706] border-y border-[#E6392F]/20 py-3 px-4 sm:px-8 overflow-hidden select-none">
      {/* Subtle ambient red/warm backlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(230,57,47,0.3) 0%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex flex-col items-center justify-center gap-2 text-center max-w-4xl">
        {/* Centered Notice Badge */}
        <div className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6392F] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6392F]" />
          </span>
          <span
            className={`${accentFont.className} rounded bg-[#E6392F]/15 border border-[#E6392F]/40 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#FF705F]`}
          >
            LIVE UPDATES
          </span>
        </div>

        {/* Centered Notice Message */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[#E6392F] text-xs font-bold">⚡</span>
          <p
            className={`${bodyFont.className} text-xs sm:text-sm text-neutral-200 font-medium tracking-wide`}
          >
            <span className="text-[#FF705F] font-bold">700+</span> registrations in{" "}
            <span className="text-white font-semibold">Orbion Hackathon</span>
          </p>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <a
            href="https://unstop.com/hackathons/orbion-8-hour-hackathon-institute-of-engineering-and-managemet-1756946?lb=I5srHPJQ&utm_medium=Share&utm_source=roshayad43718&utm_campaign=Online_coding_challenge"
            target="_blank"
            rel="noopener noreferrer"
            className={`${accentFont.className} inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#E6392F] hover:text-[#FF705F] transition-colors`}
          >
            <span>View on Unstop</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
