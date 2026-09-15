"use client";

import { useState } from "react";
import { Space_Grotesk, Rajdhani } from "next/font/google";

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

const FAQS = [
  {
    q: "What is Tech Kurukshetra?",
    a: "Tech Kurukshetra is the flagship national-level technical fest of the Department of CSE (IoT, CS, BT) at UEM Kolkata. It brings together students from across India to compete, collaborate, and innovate under a single theme. The 2026 edition runs under the Shadow Protocol theme.",
  },
  {
    q: "Who can participate?",
    a: "Any student currently enrolled in an undergraduate or postgraduate program at a recognised institution in India can participate. There is no branch restriction — all streams are welcome.",
  },
  {
    q: "How do I register for events?",
    a: "Click the 'Register Now' button on this page or navigate to the Events section, pick your event, and fill in the registration form. You will receive a confirmation email with further instructions.",
  },
  {
    q: "Is there a registration fee?",
    a: "Most events are free to enter. Some flagship competitions may have a nominal entry fee detailed on the individual event page. Accommodation and food packages are available separately.",
  },
  {
    q: "Can I participate in multiple events?",
    a: "Yes — you can register for multiple events as long as their schedules do not clash. We recommend checking the Event Timeline section for exact dates and times before registering.",
  },
  {
    q: "What is the team size for events?",
    a: "Team size varies per event. Solo, duo, and team formats (up to 4 members) are available depending on the competition. Each event page specifies the allowed team size.",
  },
  {
    q: "Will accommodation be provided?",
    a: "Outstation participants can opt for campus accommodation at a nominal cost. Limited slots are available, so early registration is strongly recommended. Details will be sent after successful event registration.",
  },
  {
    q: "How do I generate my Boarding Pass?",
    a: "Use the 'Your Boarding Pass' section on this page. Enter your name, domain/track, and college name, then click Generate. Your personalised Shadow Protocol boarding pass will be created instantly — you can share it or use it as your event identity badge.",
  },
  {
    q: "What if I face technical issues during registration?",
    a: "Reach out to us at tech.kurukshetra@uem.edu.in or call the helpline listed in the Contact section. Our team is available during event hours to resolve any issues promptly.",
  },
  {
    q: "Will certificates be provided?",
    a: "Yes. All participants receive digital participation certificates. Winners and runners-up receive merit certificates and prizes. Certificates are issued within 7 days after the fest concludes.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="faq"
      className="relative w-full py-24 overflow-hidden"
      style={{ background: "#EFE2C7" }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(#8A623B 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      {/* paper noise */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Shadow Protocol decorative SVGs ── */}

      {/* Shuriken — top-left */}
      <svg
        aria-hidden="true"
        className="absolute top-10 left-6 pointer-events-none opacity-[0.10] select-none"
        width="110" height="110" viewBox="0 0 100 100"
        fill="#7A4F2E"
      >
        <g transform="translate(50,50)">
          {[0,45,90,135].map((deg) => (
            <polygon
              key={deg}
              points="0,-38 6,-6 0,38 -6,-6"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="5" fill="#C4916A" />
        </g>
      </svg>

      {/* Katana silhouette — top-right */}
      <svg
        aria-hidden="true"
        className="absolute top-8 right-8 pointer-events-none opacity-[0.09] select-none"
        width="160" height="32" viewBox="0 0 160 32"
        fill="none"
      >
        {/* blade */}
        <polygon points="0,14 140,12 158,16 140,20" fill="#8A5C3A" />
        {/* guard */}
        <ellipse cx="20" cy="16" rx="4" ry="10" fill="#6B4228" />
        {/* grip wrapping lines */}
        <line x1="4" y1="13" x2="4" y2="19" stroke="#5A3420" strokeWidth="1.5"/>
        <line x1="9" y1="12.5" x2="9" y2="19.5" stroke="#5A3420" strokeWidth="1.5"/>
        <line x1="14" y1="12.5" x2="14" y2="19.5" stroke="#5A3420" strokeWidth="1.5"/>
      </svg>

      {/* Torii gate — bottom-left */}
      <svg
        aria-hidden="true"
        className="absolute bottom-10 left-8 pointer-events-none opacity-[0.08] select-none"
        width="90" height="110" viewBox="0 0 90 110"
        fill="none" stroke="#8A5232" strokeWidth="4" strokeLinecap="round"
      >
        {/* columns */}
        <line x1="18" y1="30" x2="18" y2="108" />
        <line x1="72" y1="30" x2="72" y2="108" />
        {/* top crossbeam with upswept ends */}
        <path d="M4,22 Q45,10 86,22" strokeWidth="5" />
        {/* second crossbeam */}
        <line x1="14" y1="38" x2="76" y2="38" strokeWidth="3.5" />
        {/* cap */}
        <line x1="10" y1="18" x2="80" y2="18" strokeWidth="6" />
      </svg>

      {/* Shuriken — bottom-right, rotated */}
      <svg
        aria-hidden="true"
        className="absolute bottom-14 right-10 pointer-events-none opacity-[0.08] select-none"
        width="80" height="80" viewBox="0 0 100 100"
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

      {/* Vertical Japanese brush text seal — right edge */}
      <svg
        aria-hidden="true"
        className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none opacity-[0.07] select-none"
        width="28" height="140" viewBox="0 0 28 140"
        fill="#6B3E24"
      >
        {/* 影 (shadow) character, simplified stroke-based representation */}
        <rect x="10" y="4" width="8" height="3" rx="1"/>
        <rect x="4" y="10" width="20" height="2.5" rx="1"/>
        <rect x="12" y="4" width="2.5" height="22" rx="1"/>
        <rect x="6" y="18" width="7" height="2" rx="1"/>
        <rect x="15" y="18" width="7" height="2" rx="1"/>
        {/* 者 (person) simplified */}
        <rect x="8" y="36" width="12" height="2.5" rx="1"/>
        <rect x="13" y="36" width="2.5" height="18" rx="1"/>
        <rect x="6" y="46" width="16" height="2" rx="1"/>
        <rect x="8" y="52" width="5" height="8" rx="1"/>
        <rect x="15" y="52" width="5" height="8" rx="1"/>
        {/* 忍 (ninja/endure) simplified */}
        <rect x="9" y="72" width="10" height="2.5" rx="1"/>
        <rect x="13" y="72" width="2" height="14" rx="1"/>
        <rect x="6" y="80" width="16" height="2" rx="1"/>
        <rect x="7" y="86" width="6" height="2" rx="1"/>
        <rect x="15" y="86" width="6" height="2" rx="1"/>
        {/* 道 (path/way) simplified */}
        <rect x="8" y="106" width="12" height="2.5" rx="1"/>
        <rect x="13" y="106" width="2" height="16" rx="1"/>
        <rect x="6" y="116" width="7" height="2" rx="1"/>
        <rect x="15" y="116" width="7" height="2" rx="1"/>
        <rect x="6" y="122" width="16" height="2.5" rx="1"/>
      </svg>

      {/* Kunai — mid-left, diagonal */}
      <svg
        aria-hidden="true"
        className="absolute top-1/2 left-5 -translate-y-1/2 pointer-events-none opacity-[0.09] select-none"
        width="24" height="130" viewBox="0 0 24 130"
        fill="#7A4A2A"
      >
        {/* blade tip */}
        <polygon points="12,0 16,20 12,18 8,20" />
        {/* handle */}
        <rect x="10" y="18" width="4" height="55" rx="2"/>
        {/* guard ring */}
        <ellipse cx="12" cy="78" rx="9" ry="4" fill="#9A6A42"/>
        {/* cord wrap */}
        <rect x="10" y="82" width="4" height="30" rx="2"/>
        <line x1="9" y1="86" x2="15" y2="88" stroke="#5A3020" strokeWidth="1.2"/>
        <line x1="9" y1="92" x2="15" y2="94" stroke="#5A3020" strokeWidth="1.2"/>
        <line x1="9" y1="98" x2="15" y2="100" stroke="#5A3020" strokeWidth="1.2"/>
        {/* ring at base */}
        <circle cx="12" cy="120" r="8" fill="none" stroke="#9A6A42" strokeWidth="2.5"/>
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <p
            className={`${accentFont.className} text-[11px] font-bold uppercase tracking-[0.25em] text-[#B8322C] mb-3`}
          >
            Shadow Protocol · Intel Brief
          </p>
          <h2
            className="text-[#12100E] uppercase leading-tight select-none"
            style={{
              fontFamily: "var(--font-sketch)",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            }}
          >
            Frequently Asked
          </h2>
          <p
            className={`${bodyFont.className} mt-4 text-[#6A5040] text-sm sm:text-base max-w-lg mx-auto`}
          >
            Everything you need to know before entering the mission.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`
                  rounded-xl border transition-all duration-300
                  ${
                    isOpen
                      ? "border-[#B8322C]/40 bg-white/60 shadow-[0_4px_20px_rgba(184,50,44,0.08)]"
                      : "border-[#C4A882]/60 bg-white/30 hover:border-[#B8A060]"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8322C]/40 rounded-xl"
                >
                  <span
                    className={`${bodyFont.className} text-sm sm:text-base font-semibold leading-snug ${
                      isOpen ? "text-[#12100E]" : "text-[#3A2E22]"
                    }`}
                  >
                    {faq.q}
                  </span>

                  {/* +/× icon */}
                  <span
                    className={`
                      flex-shrink-0 flex items-center justify-center
                      w-7 h-7 rounded-full border
                      transition-all duration-300
                      ${
                        isOpen
                          ? "bg-[#B8322C] border-[#B8322C] rotate-45"
                          : "bg-transparent border-[#C4A882] text-[#8A6040]"
                      }
                    `}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-[#8A7A6A]"}`}
                    >
                      <line x1="7" y1="1" x2="7" y2="13" />
                      <line x1="1" y1="7" x2="13" y2="7" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5">
                    <div className="h-[1px] w-full bg-[#B8322C]/20 mb-4" />
                    <p
                      className={`${bodyFont.className} text-sm leading-relaxed text-[#5A4030]`}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className={`${bodyFont.className} text-[#6A5040] text-sm mb-4`}>
            Still have questions?
          </p>
          <a
            href="#contact"
            className={`
              ${accentFont.className}
              inline-flex items-center gap-2
              rounded-lg border border-[#B8322C]/40
              px-6 py-3 text-sm font-bold
              uppercase tracking-[0.15em]
              text-[#B8322C] transition-all duration-300
              hover:bg-[#B8322C]/8 hover:border-[#B8322C]
            `}
          >
            Contact Us
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
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
