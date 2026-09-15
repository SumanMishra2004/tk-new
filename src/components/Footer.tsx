"use client";

import { Heart } from "lucide-react";
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

const QUICK_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Events",   href: "#events" },
  { label: "Gallery",  href: "#gallery" },
  { label: "Team",     href: "#team" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ",      href: "#faq" },
  { label: "Contact",  href: "#contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tech_kurukshetra",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full bg-[#0D0B09] overflow-hidden"
    >
      {/* ── top red accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E6392F]/50 to-transparent" />

      {/* ── subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(rgba(230,57,47,0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── noise ── */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ════════════════════════ MAIN CONTENT ════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-8">

        {/* ── 4-col grid: brand | quick links | contact | register ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/[0.07]">

          {/* ── COL 1: Brand ── */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            {/* Logos */}
            <div className="flex flex-col gap-3">
              {/* TK logo in dark pill */}
              <div className="inline-flex items-center self-start px-3 py-2 bg-white/[0.05] border border-white/[0.09] rounded-xl">
                <img
                  src="/tk-logo.webp"
                  alt="Tech Kurukshetra 2026"
                  className="h-9 w-auto object-contain"
                  style={{ maxWidth: 180 }}
                />
              </div>
              {/* IEM + UEM & IEDC */}
              <div className="flex items-center gap-3">
                <img
                  src="/IEM_UEM_4.webp"
                  alt="IEM & UEM"
                  className="h-11 w-auto object-contain"
                  style={{ maxWidth: 165 }}
                />
                <div className="h-6 w-px bg-white/10" />
                <img
                  src="/IEDC (2).webp"
                  alt="IEDC"
                  className="h-8 w-auto object-contain"
                  style={{ maxWidth: 44 }}
                />
              </div>
            </div>

            <p className={`${bodyFont.className} text-white/55 text-sm leading-relaxed`}>
              The flagship national-level tech fest of Dept.&nbsp;of CSE&nbsp;(IoT,&nbsp;CS,&nbsp;BT),
              UEM&nbsp;Kolkata. Shadow Protocol — 2026.
            </p>
          </div>

          {/* ── COL 2: Quick Links ── */}
          <div className="flex flex-col gap-4">
            <p className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6392F]`}>
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`${bodyFont.className} text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group`}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E6392F]/40 group-hover:bg-[#E6392F] transition-colors flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3: Contact ── */}
          <div className="flex flex-col gap-4">
            <p className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6392F]`}>
              Contact
            </p>
            <ul className={`${bodyFont.className} flex flex-col gap-3 text-sm text-white/50`}>
              <li>
                <a
                  href="mailto:tech.kurukshetra.uem@gmail.com"
                  className="hover:text-white transition-colors flex items-start gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#E6392F]/60" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  tech.kurukshetra.uem@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+911744233208"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="w-4 h-4 flex-shrink-0 text-[#E6392F]/60" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.95 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.87 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91&nbsp;1744-233208
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#E6392F]/60" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Dept. of CSE&nbsp;(IoT,&nbsp;CS,&nbsp;BT),<br />
                UEM&nbsp;Kolkata, New&nbsp;Town,<br />
                West&nbsp;Bengal — 700&nbsp;160
              </li>
            </ul>
          </div>

          {/* ── COL 4: CTA + Socials ── */}
          <div className="flex flex-col gap-5">
            <p className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6392F]`}>
              Join the Mission
            </p>
            <p className={`${bodyFont.className} text-sm text-white/50 leading-relaxed`}>
              Secure your boarding pass and enter Shadow Protocol 2026.
            </p>

            <a
              href="#boarding-pass"
              className={`
                ${accentFont.className}
                inline-flex items-center justify-center gap-2
                rounded-xl bg-[#E6392F] border border-[#FF5040]/25
                px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em]
                text-white shadow-[0_0_24px_rgba(230,57,47,0.3)]
                hover:bg-[#F04A3D] hover:shadow-[0_0_32px_rgba(230,57,47,0.45)]
                hover:-translate-y-0.5 transition-all duration-200
              `}
            >
              Register Now →
            </a>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    w-9 h-9 rounded-xl
                    border border-white/[0.09] bg-white/[0.04]
                    flex items-center justify-center
                    text-white/45
                    hover:border-[#E6392F]/40 hover:text-[#E6392F] hover:bg-[#E6392F]/8
                    transition-all duration-200
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* left: dept tag */}
          <p className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.22em] text-white/20`}>
            Dept. of CSE (IoT, CS, BT) · UEM Kolkata
          </p>

          {/* right: copyright */}
          <p className={`${bodyFont.className} text-white/20 text-xs flex items-center gap-1.5 text-center`}>
            © 2026 Tech Kurukshetra. Made with
            <Heart className="size-3 text-[#E6392F] fill-[#E6392F]" />
            by students.
          </p>
        </div>
      </div>
    </footer>
  );
}
