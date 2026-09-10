"use client";

/**
 * EventTimeline
 * ─────────────
 * A scroll-driven GSAP timeline visualised as an SVG snake path.
 *
 * How it works:
 *  • A single continuous SVG cubic-bezier "snake" weaves left → right → left
 *    down the section, passing through every event node.
 *  • DrawSVGPlugin progressively "draws" the stroke as the user scrolls.
 *  • A glowing dot (MotionPathPlugin) rides the front of the drawn stroke.
 *  • Each event card fades + slides in exactly when the path reaches its node.
 *  • Red accent pulses radiate from each reached node.
 *
 * Replace the EVENTS array with real data; SVG path points auto-derive from it.
 */

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rajdhani, Space_Grotesk } from "next/font/google";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);

const heading = Rajdhani({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const body    = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

// ─── timeline data ────────────────────────────────────────────────────────────
interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  tag: string;
  icon: string;    // single emoji / character used as node icon
}

const EVENTS: TimelineEvent[] = [
  {
    time: "09:00 AM",
    title: "Inauguration Ceremony",
    description: "Official opening with distinguished guests, keynote address, and the symbolic lighting of the lamp.",
    tag: "Day 1",
    icon: "✦",
  },
  {
    time: "10:30 AM",
    title: "Hackathon Kickoff",
    description: "24-hour coding marathon begins. Teams receive their problem statements and race against the clock.",
    tag: "Day 1",
    icon: "⌨",
  },
  {
    time: "02:00 PM",
    title: "Robotics Arena",
    description: "Line followers, sumo bots, and autonomous drones battle it out on the arena floor.",
    tag: "Day 1",
    icon: "⚙",
  },
  {
    time: "05:00 PM",
    title: "Paper Presentation",
    description: "Cutting-edge research from students across the country evaluated by industry experts.",
    tag: "Day 1",
    icon: "◈",
  },
  {
    time: "09:30 AM",
    title: "Gaming Championship",
    description: "Esports tournament: BGMI, Valorant, and Chess — strategy meets reflexes.",
    tag: "Day 2",
    icon: "◉",
  },
  {
    time: "12:00 PM",
    title: "Hackathon Judging",
    description: "Teams demo their builds to a panel of VCs and senior engineers. Live scoring on the big screen.",
    tag: "Day 2",
    icon: "◎",
  },
  {
    time: "04:00 PM",
    title: "Cultural Showcase",
    description: "Music, dance, and art performances celebrating the intersection of technology and creativity.",
    tag: "Day 2",
    icon: "✧",
  },
  {
    time: "06:30 PM",
    title: "Prize Distribution",
    description: "Winners crowned. Cash prizes, trophies, and internship offers await the champions.",
    tag: "Day 2",
    icon: "★",
  },
];

// ─── SVG geometry constants ───────────────────────────────────────────────────
// The snake oscillates between LEFT_X and RIGHT_X.
// Each event node sits at a fixed Y increment.
const SVG_WIDTH   = 900;
const LEFT_X      = 180;
const RIGHT_X     = SVG_WIDTH - 180;
const NODE_RADIUS = 14;
const ROW_HEIGHT  = 160;
const TOP_PADDING = 80;

// Pre-compute node positions: odd rows → LEFT, even rows → RIGHT (0-indexed)
function nodeX(i: number) {
  return i % 2 === 0 ? LEFT_X : RIGHT_X;
}
function nodeY(i: number) {
  return TOP_PADDING + i * ROW_HEIGHT;
}

// Build the "d" attribute for the snake path joining all nodes
function buildSnakePath(events: TimelineEvent[]): string {
  const pts = events.map((_, i) => ({ x: nodeX(i), y: nodeY(i) }));
  if (pts.length === 0) return "";

  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const midY = (prev.y + curr.y) / 2;
    // cubic bezier: control points pulled straight down / straight up
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

const SNAKE_PATH = buildSnakePath(EVENTS);
const SVG_HEIGHT  = nodeY(EVENTS.length - 1) + TOP_PADDING;

// ─── component ────────────────────────────────────────────────────────────────
export default function EventTimeline() {
  const sectionRef   = useRef<HTMLElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const pathRef      = useRef<SVGPathElement>(null);
  const dotRef       = useRef<SVGCircleElement>(null);
  const dotGlowRef   = useRef<SVGCircleElement>(null);

  // We use useLayoutEffect so GSAP measurements happen after the SVG is painted
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const path    = pathRef.current;
    const dot     = dotRef.current;
    const dotGlow = dotGlowRef.current;
    if (!section || !path || !dot || !dotGlow) return;

    const ctx = gsap.context(() => {

      // ── master timeline driven by scroll ──────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 10%",
          end: `+=${SVG_HEIGHT * 1.3}`,
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Draw the path from 0 → 100%
      tl.fromTo(
        path,
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", ease: "none", duration: EVENTS.length }
      );

      // 2. Dot riding along the drawn stroke
      tl.to(
        dot,
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
          duration: EVENTS.length,
        },
        0  // start at same time as the draw
      );

      // Glow dot (larger, lower opacity) follows same path
      tl.to(
        dotGlow,
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
          duration: EVENTS.length,
        },
        0
      );

      // 3. Stagger reveal each event card + node ring at the right moment
      EVENTS.forEach((_, i) => {
        const progress = i / (EVENTS.length - 1);           // 0..1 along path
        const insertAt = progress * EVENTS.length;           // time label in tl

        const card  = section.querySelector<HTMLElement>(`[data-card="${i}"]`);
        const ring  = section.querySelector<SVGCircleElement>(`[data-ring="${i}"]`);
        const pulse = section.querySelector<SVGCircleElement>(`[data-pulse="${i}"]`);
        const icon  = section.querySelector<SVGTextElement>(`[data-icon="${i}"]`);

        if (card) {
          const fromLeft = i % 2 === 0;
          tl.fromTo(
            card,
            { opacity: 0, x: fromLeft ? -40 : 40, y: 10 },
            { opacity: 1, x: 0, y: 0, duration: 0.4, ease: "power3.out" },
            insertAt - 0.15
          );
        }

        if (ring) {
          tl.fromTo(
            ring,
            { attr: { r: 6, opacity: 0 }, strokeWidth: 0 },
            { attr: { r: NODE_RADIUS, opacity: 1 }, strokeWidth: 2, duration: 0.3, ease: "back.out(2)" },
            insertAt - 0.1
          );
        }

        if (pulse) {
          tl.fromTo(
            pulse,
            { attr: { r: NODE_RADIUS, opacity: 0.7 } },
            { attr: { r: NODE_RADIUS * 3.5, opacity: 0 }, duration: 0.6, ease: "power2.out" },
            insertAt
          );
        }

        if (icon) {
          tl.fromTo(
            icon,
            { opacity: 0, attr: { "font-size": 8 } },
            { opacity: 1, attr: { "font-size": 14 }, duration: 0.3, ease: "power2.out" },
            insertAt - 0.05
          );
        }
      });

      // ── section heading reveal (independent, one-shot) ────────────────────
      gsap.fromTo(
        section.querySelectorAll(".tl-heading > *"),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  // ─── render ──────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative w-full overflow-hidden bg-[#080706] text-white"
    >
      {/* top edge glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E6392F]/50 to-transparent" />

      {/* ── section header ──────────────────────────────────────────────── */}
      <div className="tl-heading mx-auto flex max-w-[1100px] flex-col gap-4 px-6 pb-0 pt-24 sm:px-10 md:px-14">
        <p className={`${heading.className} text-[11px] font-bold uppercase tracking-[0.25em] text-[#E6392F]`}>
          Tech Kurukshetra · Schedule
        </p>
        <h2
          className="select-none uppercase leading-[0.88] tracking-tight text-[#F5F1E8]"
          style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(3rem,9vw,7rem)" }}
        >
          Event Timeline
        </h2>
        <p className={`${body.className} max-w-[480px] text-sm leading-7 text-[#707070] sm:text-base`}>
          Every moment, mapped. Scroll to travel through two days of competition,
          creativity, and chaos.
        </p>
      </div>

      {/* ── SVG + cards ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto" style={{ maxWidth: SVG_WIDTH, minHeight: SVG_HEIGHT + 160 }}>

        {/* ── SVG layer (absolute, full-width) ────────────────────────── */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width="100%"
          height={SVG_HEIGHT}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* glow filter for the path */}
            <filter id="tl-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* stronger glow for the dot */}
            <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* radial gradient for node fills */}
            <radialGradient id="node-grad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff6b5b" />
              <stop offset="100%" stopColor="#E6392F" />
            </radialGradient>
          </defs>

          {/* ── ghost / dim path (full path, always visible, faint) ──── */}
          <path
            d={SNAKE_PATH}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.04"
            strokeWidth="2"
            strokeDasharray="6 10"
          />

          {/* ── main drawn path ────────────────────────────────────────── */}
          <path
            ref={pathRef}
            d={SNAKE_PATH}
            fill="none"
            stroke="#E6392F"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#tl-glow)"
            style={{ drawSVG: "0% 0%" } as React.CSSProperties}
          />

          {/* ── glowing leading dot ──────────────────────────────────── */}
          <circle
            ref={dotGlowRef}
            r={16}
            fill="#E6392F"
            fillOpacity={0.18}
            filter="url(#dot-glow)"
            cx={nodeX(0)}
            cy={nodeY(0)}
          />
          <circle
            ref={dotRef}
            r={6}
            fill="#E6392F"
            stroke="#ff9f97"
            strokeWidth={1.5}
            cx={nodeX(0)}
            cy={nodeY(0)}
            filter="url(#dot-glow)"
          />

          {/* ── per-event nodes ──────────────────────────────────────── */}
          {EVENTS.map((evt, i) => (
            <g key={i} transform={`translate(${nodeX(i)}, ${nodeY(i)})`}>
              {/* pulse ring (animates outward when reached) */}
              <circle
                data-pulse={i}
                r={NODE_RADIUS}
                fill="none"
                stroke="#E6392F"
                strokeWidth={1}
                opacity={0}
              />
              {/* node ring (starts small, grows when reached) */}
              <circle
                data-ring={i}
                r={6}
                fill="url(#node-grad)"
                stroke="#E6392F"
                strokeWidth={0}
                opacity={0}
              />
              {/* icon inside node */}
              <text
                data-icon={i}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fill="#fff"
                opacity={0}
                style={{ userSelect: "none", fontFamily: "sans-serif" }}
              >
                {evt.icon}
              </text>
            </g>
          ))}
        </svg>

        {/* ── HTML event cards ────────────────────────────────────────── */}
        {EVENTS.map((evt, i) => {
          const cx   = nodeX(i);
          const cy   = nodeY(i);
          const left = i % 2 === 0;        // even nodes sit on the LEFT side

          // card sits on the opposite side of the node from the snake centre
          const cardOffset = 36;           // gap between node edge and card
          const cardWidth  = 280;

          const cardStyle: React.CSSProperties = {
            position: "absolute",
            top:  cy - 50,
            width: cardWidth,
            // left-side nodes → card extends left; right-side → card extends right
            ...(left
              ? { left: cx + NODE_RADIUS + cardOffset }
              : { right: SVG_WIDTH - cx + NODE_RADIUS + cardOffset }),
            opacity: 0,
          };

          return (
            <div
              key={i}
              data-card={i}
              style={cardStyle}
              className="pointer-events-none"
            >
              {/* connector line from node to card */}
              <div
                className="absolute top-[58px] h-px bg-gradient-to-r from-[#E6392F]/60 to-transparent"
                style={{
                  width: cardOffset - 4,
                  ...(left ? { right: "100%", transformOrigin: "right" } : { left: "100%", transformOrigin: "left", transform: "scaleX(-1)" }),
                }}
              />

              {/* tag */}
              <p className={`${heading.className} mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6392F]`}>
                {evt.tag} · {evt.time}
              </p>

              {/* title */}
              <h3
                className={`${heading.className} text-xl font-bold uppercase leading-tight tracking-tight text-[#F5F1E8] sm:text-2xl`}
              >
                {evt.title}
              </h3>

              {/* divider */}
              <div className="my-2 h-px w-8 bg-[#E6392F]/50" />

              {/* description */}
              <p className={`${body.className} text-[13px] leading-6 text-[#707070]`}>
                {evt.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#080706]" />
    </section>
  );
}
