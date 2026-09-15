"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Rajdhani } from "next/font/google";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const accentFont = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const NAV_LINKS = [
  { label: "About",    href: "#about",    key: "about" },
  { label: "Events",   href: "#events",   key: "events" },
  { label: "Gallery",  href: "#gallery",  key: "gallery" },
  { label: "Team",     href: "#team",     key: "team" },
  { label: "Sponsors", href: "#sponsors", key: "sponsors" },
  { label: "FAQ",      href: "#faq",      key: "faq" },
  { label: "Contact",  href: "#contact",  key: "contact" },
];

/* Sections before boarding-pass are dark (black bg) → white glass.
   From boarding-pass onward the bg is skin/light → dark glass.      */
const DARK_BG_SECTIONS = new Set([
  "hero", "about", "events", "gallery", "team",
]);

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [darkBg, setDarkBg] = useState(true); // true = page bg is dark
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const allKeys = ["hero", ...NAV_LINKS.map((l) => l.key), "boarding-pass"];

    const update = () => {
      const scrollPos = window.scrollY + 80;
      setScrolled(window.scrollY > 10);

      let current = "hero";
      for (const key of allKeys) {
        const el = document.getElementById(key);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= scrollPos) {
          current = key;
        }
      }

      // active section for link highlighting (exclude boarding-pass from nav)
      const navKey = NAV_LINKS.some((l) => l.key === current) ? current : "hero";
      setActiveSection(navKey === "hero" && current === "hero" ? "hero" : current);

      // bg colour mode: dark until team ends, light from boarding-pass onward
      setDarkBg(DARK_BG_SECTIONS.has(current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (key: string, href: string) => {
    setOpen(false);
    if (key === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("hero");
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(key);
  };

  /* ── derived glass styles ── */
  // DARK BG (hero → team): whitish frosted glass
  // LIGHT BG (boarding-pass → end): dark/blackish frosted glass
  const navStyle = darkBg
    ? {
        border: scrolled ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.07)",
        background: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.14)"
          : "0 4px 16px rgba(0,0,0,0.25)",
      }
    : {
        border: scrolled ? "1px solid rgba(0,0,0,0.14)" : "1px solid rgba(0,0,0,0.07)",
        background: scrolled ? "rgba(18,16,14,0.52)" : "rgba(18,16,14,0.28)",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.06)"
          : "0 4px 16px rgba(0,0,0,0.15)",
      };

  const linkActiveClass = darkBg
    ? "text-white bg-white/12 border border-white/14"
    : "text-[#12100E] bg-black/10 border border-black/12";

  const linkIdleClass = darkBg
    ? "text-white/55 hover:text-white/90 hover:bg-white/7 border border-transparent"
    : "text-[#3A2E22]/70 hover:text-[#12100E] hover:bg-black/6 border border-transparent";

  const dotColor = "bg-[#E6392F]";

  return (
    <nav
      id="main-nav"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[10000] w-[calc(100%-1.25rem)] max-w-[1400px] flex h-[58px] items-center justify-between rounded-2xl px-3 sm:px-4 transition-all duration-500 backdrop-blur-[22px] backdrop-saturate-[160%]"
      style={{
        ...navStyle,
        WebkitBackdropFilter: "blur(22px) saturate(160%)",
      }}
    >
      {/* ════════ LOGOS ════════ */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">

        {/* TK logo — always visible */}
        <button
          onClick={() => scrollTo("hero", "#hero")}
          aria-label="Go to top"
          className="flex items-center bg-transparent border-none p-0 cursor-pointer shrink-0"
        >
          <img
            src="/tk-logo.webp"
            alt="Tech Kurukshetra"
            className="h-8 w-auto object-contain"
            style={{ maxWidth: "clamp(90px, 14vw, 160px)" }}
          />
        </button>

        <div className={`h-5 w-px shrink-0 ${darkBg ? "bg-white/20" : "bg-black/15"}`} />

        {/* IEDC */}
        <img
          src="/IEDC (2).webp"
          alt="IEDC"
          className="h-8 w-auto object-contain shrink-0"
          style={{ maxWidth: "clamp(28px, 5vw, 44px)" }}
        />

        <div className={`h-5 w-px shrink-0 ${darkBg ? "bg-white/20" : "bg-black/15"}`} />

        {/* IEM & UEM Combined Logo */}
        <img
          src="/IEM_UEM_4.webp"
          alt="IEM & UEM"
          className="h-8 sm:h-9 w-auto object-contain shrink-0"
          style={{ maxWidth: "clamp(85px, 14vw, 145px)" }}
        />
      </div>

      {/* ════════ DESKTOP NAV LINKS ════════ */}
      <div className="hidden lg:flex items-center gap-0.5">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.key;
          return (
            <button
              key={link.key}
              onClick={() => scrollTo(link.key, link.href)}
              className={`
                ${accentFont.className}
                relative px-3.5 py-2 rounded-xl
                text-[11px] font-bold uppercase tracking-[0.16em]
                cursor-pointer transition-all duration-200
                ${isActive ? linkActiveClass : linkIdleClass}
              `}
            >
              {link.label}
              {isActive && (
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${dotColor}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* ════════ RIGHT: REGISTER + HAMBURGER ════════ */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Register CTA */}
        <button
          onClick={() => scrollTo("events", "#events")}
          className={`
            ${accentFont.className}
            hidden sm:flex items-center gap-2
            px-4 py-2 rounded-xl
            bg-[#E6392F] border border-[#FF5040]/30
            text-[11px] font-bold tracking-[0.16em] uppercase text-white
            shadow-[0_0_18px_rgba(230,57,47,0.35)]
            hover:bg-[#F04A3D] hover:shadow-[0_0_26px_rgba(230,57,47,0.5)]
            transition-all duration-200 cursor-pointer
          `}
        >
          Register
        </button>

        {/* Hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className={`
              lg:hidden flex items-center justify-center
              w-9 h-9 rounded-xl transition-colors cursor-pointer
              ${darkBg
                ? "bg-white/8 border border-white/14 text-white hover:bg-white/16"
                : "bg-black/8 border border-black/12 text-[#12100E] hover:bg-black/14"
              }
            `}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#0C0A08]/96 border-white/10 backdrop-blur-2xl w-72"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>

            <div className="pt-2 pb-5 border-b border-white/8">
              <img src="/tk-logo.webp" alt="Tech Kurukshetra" className="h-8 w-auto object-contain" />
            </div>

            <div className="flex flex-col gap-1 pt-4">
              <button
                onClick={() => scrollTo("hero", "#hero")}
                className={`
                  ${accentFont.className} text-left px-4 py-3 rounded-xl
                  text-sm font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer
                  ${activeSection === "hero" ? "text-white bg-white/10" : "text-white/55 hover:text-white hover:bg-white/6"}
                `}
              >
                Home
              </button>

              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.key, link.href)}
                  className={`
                    ${accentFont.className} text-left px-4 py-3 rounded-xl
                    text-sm font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer
                    ${activeSection === link.key
                      ? "text-white bg-white/10 border-l-2 border-[#E6392F]"
                      : "text-white/55 hover:text-white hover:bg-white/6"
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}

              <div className="mt-5 pt-5 border-t border-white/8">
                <button
                  onClick={() => scrollTo("events", "#events")}
                  className={`
                    ${accentFont.className} block w-full px-4 py-3 rounded-xl
                    bg-[#E6392F] text-sm font-bold tracking-[0.15em] uppercase
                    text-white text-center hover:bg-[#F04A3D] transition-colors cursor-pointer
                    shadow-[0_0_18px_rgba(230,57,47,0.28)]
                  `}
                >
                  Register Now →
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
