"use client";

import { useEffect, useRef } from "react";
import { Rajdhani, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heading = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// ─── gallery items ───────────────────────────────────────────────────────────
// Replace src values with real images; the parallax works regardless.
const ITEMS = [
  {
    src: "/images/gallery/1.webp",
    label: "Opening Ceremony",
    year: "2025",
    span: "col-span-2 row-span-2",   // large hero tile
    speed: -40,                       // px shift on scroll (negative = up)
  },
  {
    src: "/images/gallery/2.webp",
    label: "Hackathon Finals",
    year: "2025",
    span: "col-span-1 row-span-1",
    speed: 30,
  },
  {
    src: "/images/gallery/3.webp",
    label: "Robotics Arena",
    year: "2025",
    span: "col-span-1 row-span-1",
    speed: -20,
  },
  {
    src: "/images/gallery/4.webp",
    label: "Guest Keynote",
    year: "2025",
    span: "col-span-1 row-span-2",
    speed: 50,
  },
  {
    src: "/images/gallery/5.webp",
    label: "Prize Distribution",
    year: "2025",
    span: "col-span-1 row-span-1",
    speed: -35,
  },
  {
    src: "/images/gallery/6.webp",
    label: "Paper Presentation",
    year: "2025",
    span: "col-span-1 row-span-1",
    speed: 25,
  },
  {
    src: "/images/gallery/7.webp",
    label: "Closing Night",
    year: "2025",
    span: "col-span-2 row-span-1",
    speed: -15,
  },
];

// ─── placeholder colours shown when an image is missing ──────────────────────
const PLACEHOLDER_COLORS = [
  "#1a1208",
  "#0e1a12",
  "#12100e",
  "#0d1018",
  "#18100d",
  "#0f1510",
  "#1a1118",
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── 1. Heading reveal ──────────────────────────────────────────────────
      const headingChildren = headingRef.current?.children;
      if (headingChildren) {
        gsap.fromTo(
          headingChildren,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── 2. Per-card parallax ───────────────────────────────────────────────
      const cards = section.querySelectorAll<HTMLElement>(".gallery-card");

      cards.forEach((card) => {
        const speed = Number(card.dataset.speed ?? 0);
        const img   = card.querySelector<HTMLElement>(".gallery-img");

        // slide the whole card in from below on first appear
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // parallax: inner image moves at a different rate than the card
        if (img && speed !== 0) {
          gsap.fromTo(
            img,
            { y: speed * -1 },          // start offset
            {
              y: speed,                  // end offset
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        // subtle hover scale via GSAP (pure CSS hover also works but GSAP
        // integrates better with ongoing ScrollTrigger transforms)
        card.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.07, duration: 0.55, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1,    duration: 0.55, ease: "power2.out" });
        });
      });

      // ── 3. Horizontal marquee strip ───────────────────────────────────────
      const strip = section.querySelector<HTMLElement>(".marquee-track");
      if (strip) {
        gsap.to(strip, {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      {/* ── top separator ─────────────────────────────────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E6392F]/60 to-transparent" />

      {/* ── section header ────────────────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="mx-auto flex flex-col gap-4 px-6 pb-12 pt-24 sm:px-10 md:px-14 lg:px-20"
      >
        {/* label */}
        <p
          className={`${heading.className} text-[11px] font-bold uppercase tracking-[0.25em] text-[#E6392F]`}
        >
          Tech Kurukshetra · Moments
        </p>

        {/* main heading */}
        <h2
          className="select-none uppercase leading-[0.88] tracking-tight text-[#F5F1E8]"
          style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(3rem,9vw,7.5rem)" }}
        >
          Gallery
        </h2>

        {/* sub-copy */}
        <p
          className={`${body.className} max-w-[520px] text-sm leading-7 text-[#A8A8A8] sm:text-base`}
        >
          Relive the energy, ideas, and camaraderie from previous editions of
          Tech Kurukshetra — captured frame by frame.
        </p>
      </div>

      {/* ── masonry-style grid ────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        className={`
          mx-auto
          grid
          
          grid-cols-4
          auto-rows-50
          gap-3
          px-6
          sm:px-10
          md:px-14
          lg:px-20
          sm:auto-rows-[220px]
          md:auto-rows-[240px]
        `}
      >
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            className={`gallery-card relative cursor-pointer overflow-hidden rounded-xl ${item.span}`}
            data-speed={item.speed}
            style={{ backgroundColor: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length] }}
          >
            {/* parallax inner image — scaled up so the shift never reveals edges */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.label}
              className="gallery-img absolute inset-0 h-[120%] w-full object-cover"
              style={{ top: "-10%", willChange: "transform" }}
              draggable={false}
              /* graceful fallback: hide broken-image icon, keep bg colour */
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* label */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p
                className={`${heading.className} text-[10px] font-bold uppercase tracking-[0.2em] text-[#E6392F]`}
              >
                {item.year}
              </p>
              <p
                className={`${body.className} mt-0.5 text-sm font-medium text-[#F5F1E8] sm:text-base`}
              >
                {item.label}
              </p>
            </div>

            {/* hover border glow */}
            <div
              className="
                absolute inset-0 rounded-xl
                ring-0 ring-[#E6392F]/0
                transition-all duration-500
                hover:ring-1 hover:ring-[#E6392F]/60
              "
            />
          </div>
        ))}
      </div>

      {/* ── scrolling marquee strip ───────────────────────────────────────── */}
      <div className="relative mt-20 overflow-hidden py-6 bg-a">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

        {/* doubled text so the scrub loop feels seamless */}
        <div className="marquee-track flex whitespace-nowrap will-change-transform">
          {Array.from({ length: 2 }).map((_, ri) => (
            <span key={ri} className="flex items-center">
              {["Hackathon", "Robotics", "Paper Presentation", "Gaming", "Design", "Innovation"].map(
                (word) => (
                  <span key={word} className="flex items-center">
                    <span
                      className={`${heading.className} px-8 text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase tracking-tight text-white/50`}
                    >
                      {word}
                    </span>
                    <span className="text-[#E6392F]/40 text-[clamp(1.5rem,3vw,2.5rem)]">✦</span>
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── bottom gradient into next section ────────────────────────────── */}
      <div className="h-32 w-full bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
