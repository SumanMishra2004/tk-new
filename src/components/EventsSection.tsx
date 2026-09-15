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

interface Coordinator {
  name: string;
  phone: string;
}

interface EventCard {
  poster: string;
  title: string;
  description: string;
  rules: string[];
  coordinators: [Coordinator, Coordinator];
  prizepool: string;
  registerLink: string;
  bg: string;
}

const events: EventCard[] = [
  /*{
    poster: "/4_5.png",
    title: "HackFest",
    description:
      "A 24-hour hackathon where teams build a working prototype around a surprise theme revealed at kickoff.",
    rules: [
      "Teams of 2–4 members only",
      "All code must be written during the event window",
      "Use of open-source libraries and public APIs is allowed",
      "Final submission via GitHub before the deadline",
      "Plagiarized or pre-built submissions lead to disqualification",
    ],
    coordinators: [
      { name: "Aritra Sen", phone: "+91 90000 00001" },
      { name: "Priya Das", phone: "+91 90000 00002" },
    ],
    prizepool: "Coming Soon",
    registerLink: "#",
    bg: "#2f251e",
  },
  {
    poster: "/images/events/codearena.png",
    title: "Code Arena",
    description:
      "A competitive programming contest across multiple rounds of increasing difficulty.",
    rules: [
      "Individual participation only",
      "Standard ICPC-style scoring",
      "No external help or AI tools during the contest",
      "Judge's decision on submissions is final",
    ],
    coordinators: [
      { name: "Rohan Ghosh", phone: "+91 90000 00003" },
      { name: "Ishita Roy", phone: "+91 90000 00004" },
    ],
    prizepool: "Coming Soon",
    registerLink: "#",
    bg: "#43392f",
  },
  {
    poster: "/images/events/designsprint.png",
    title: "Design Sprint",
    description:
      "A UI/UX challenge where teams redesign a real product experience in a fixed time slot.",
    rules: [
      "Teams of up to 3 members",
      "Figma or Adobe XD files only",
      "Original design work — no templates",
      "Present a 2-minute walkthrough at the end",
      "Late submissions are not accepted",
    ],
    coordinators: [
      { name: "Sneha Mukherjee", phone: "+91 90000 00005" },
      { name: "Debjit Paul", phone: "+91 90000 00006" },
    ],
    prizepool: "Coming Soon",
    registerLink: "#",
    bg: "#2f251e",
  },
  {
    poster: "/images/events/roboclash.png",
    title: "RoboClash",
    description:
      "A robotics showdown where teams build bots to complete an obstacle-based challenge.",
    rules: [
      "Bots must fit within the given size limit",
      "Only remote-controlled bots allowed",
      "Two attempts per team, best score counts",
      "No hazardous or combustible components",
      "On-spot repairs allowed within time limit",
      "Judges' safety call overrides any dispute",
    ],
    coordinators: [
      { name: "Aniket Basu", phone: "+91 90000 00007" },
      { name: "Riya Chatterjee", phone: "+91 90000 00008" },
    ],
    prizepool: "Coming Soon",
    registerLink: "#",
    bg: "#43392f",
  },
  {
    poster: "/images/events/quizmania.png",
    title: "Quiz Mania",
    description:
      "A rapid-fire tech and general knowledge quiz across written and buzzer rounds.",
    rules: [
      "Teams of 2 members",
      "Written round followed by buzzer finals",
      "No electronic devices during the quiz",
      "Negative marking applies in the buzzer round",
    ],
    coordinators: [
      { name: "Souvik Nandi", phone: "+91 90000 00009" },
      { name: "Anwesha Dutta", phone: "+91 90000 00010" },
    ],
    prizepool: "Coming Soon",
    registerLink: "#",
    bg: "#2f251e",
  },
  {
    poster: "/images/events/pitchit.png",
    title: "Pitch It",
    description:
      "A startup pitch competition where teams present an idea to a panel of judges.",
    rules: [
      "Teams of up to 4 members",
      "5-minute pitch + 3-minute Q&A",
      "Slide deck must be submitted a day prior",
      "Original ideas only — no existing registered startups",
      "Judges score on innovation, feasibility, and delivery",
    ],
    coordinators: [
      { name: "Arjun Mitra", phone: "+91 90000 00011" },
      { name: "Sohini Bose", phone: "+91 90000 00012" },
    ],
    prizepool: "Coming Soon",
    registerLink: "#",
    bg: "#43392f",
  },*/
];

/* ─── Coming-soon placeholder ─── */
function ComingSoonBlock({ label }: { label: string }) {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-5 px-6 py-20">
      <div className="flex items-center gap-3">
        <span className="h-[1px] w-10 bg-[#E6392F]/50" />
        <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.3em] text-[#E6392F]`}>
          {label}
        </span>
        <span className="h-[1px] w-10 bg-[#E6392F]/50" />
      </div>
      <p
        className="select-none uppercase leading-tight tracking-tight text-white/30"
        style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
      >
        Coming Soon
      </p>
      <p className={`${bodyFont.className} text-center text-sm text-white/40`}>
        Details will be announced shortly. Stay tuned.
      </p>
    </div>
  );
}

export default function StickyEventSections() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardEls = section.querySelectorAll<HTMLElement>(".stack-card");

    const ctx = gsap.context(() => {
      cardEls.forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: "center center",
              end: "max",
              scrub: true,
            },
          })
          // Blur: starts at card center, ends 100vh later
          .to(
            el,
            {
              ease: "none",
              startAt: { filter: "blur(0px)" },
              filter: "blur(3px)",
              scrollTrigger: {
                trigger: el,
                start: "center center",
                end: "+=100%",
                scrub: true,
              },
            },
            0
          )
          // Scale + push up — runs from card center to end of scroll
          .to(
            el,
            {
              ease: "none",
              scale: 0.85,
              yPercent: -5,
            },
            0
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div id="events" className="w-full text-white bg-[#12100e]">
      {/* Section header — matches the bold heading style used on the cards */}
      <section className="flex min-h-[60vh] w-full items-center justify-center px-6 py-[15vh] md:px-12">
        <div className="w-full text-center">
          <p className={`${accentFont.className} text-[11px] font-bold uppercase tracking-[0.3em] text-[#E6392F] mb-4`}>
            Tech Kurukshetra · Shadow Protocol
          </p>
          <h2
            className="text-white uppercase leading-[0.88] tracking-tight select-none"
            style={{
              fontFamily: "var(--font-sketch)",
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
            }}
          >
            Events
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-[2px] w-10 bg-[#E6392F] sm:w-14" />
            <span className={`${accentFont.className} text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6A5E50]`}>
              6 Competitions · Kolkata 2026
            </span>
            <span className="h-[2px] w-10 bg-[#E6392F] sm:w-14" />
          </div>
        </div>
      </section>

      {/* Sticky stack */}
      {events.length === 0 ? (
        <ComingSoonBlock label="Events" />
      ) : (
      <div ref={sectionRef} className="flex flex-col items-center pb-40">
       {events.map((event, index) => (
          <div
            key={event.title}
            className="
              stack-card
              relative
              w-[97%]
              md:w-[95%]
            "
            style={{
              position: "sticky",
              top: "2%",
              zIndex: index + 1,
              height: "90vh",
              backgroundColor: event.bg,
              overflow: "hidden",
              transformOrigin: "top center",
              willChange: "transform, filter",
              borderRadius: "1rem",
            }}
          >
            {/* INNER CARD */}
            <div
              className="
                flex
                h-full
                w-full
                flex-col
                overflow-y-auto
                px-5
                py-6

                sm:px-7
                sm:py-7

                md:grid
                md:grid-cols-[minmax(260px,34%)_1fr]
                md:gap-8
                md:overflow-hidden
                md:px-10
                md:py-10

                lg:grid-cols-[minmax(300px,36%)_1fr]
                lg:gap-12
                lg:px-14
                lg:py-12
              "
            >
              {/* POSTER COLUMN */}
              <div
                className="
                  flex
                  w-full
                  flex-shrink-0
                  flex-col
                  justify-center
                  md:h-full
                "
              >
                <div className="mb-3 flex items-center justify-between md:mb-4">
                  <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.25em] opacity-50`}>
                    Event {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.2em] opacity-50`}>
                    TK 2026
                  </span>
                </div>

                <div
                  className="
                    relative
                    aspect-[4/5]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    shadow-2xl

                    sm:mx-auto
                    sm:max-w-[260px]

                    md:max-w-none
                  "
                >
                  <img
                    src={event.poster}
                    alt={event.title}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />

                  {/* POSTER OVERLAY */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 backdrop-blur-md">
                    <span className={`${accentFont.className} text-[9px] font-bold uppercase tracking-[0.18em]`}>
                      Featured Event
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTENT COLUMN */}
              <div
                className="
                  flex
                  min-h-0
                  w-full
                  flex-col
                  justify-center
                  pt-7

                  md:h-full
                  md:pt-0
                "
              >
                {/* TITLE */}
                <div className="mb-5 border-b border-white/10 pb-5 md:mb-6 md:pb-6">
                  <div className={`${accentFont.className} mb-2 text-[9px] font-bold uppercase tracking-[0.3em] opacity-45`}>
                    Tech Kurukshetra Presents
                  </div>
                  <h3
                    className={`${accentFont.className} uppercase leading-[0.9] tracking-tight`}
                    style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", fontWeight: 700 }}
                  >
                    {event.title}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-5 md:mb-6">
                  <p className={`${bodyFont.className} max-w-2xl text-sm leading-relaxed opacity-75 sm:text-[15px] md:text-base`}>
                    {event.description}
                  </p>
                </div>

                {/* RULES */}
                <div className="mb-5 md:mb-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-8 bg-white/30" />
                    <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.25em] opacity-55`}>
                      Rules & Guidelines
                    </span>
                  </div>
                  <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                    {event.rules.map((rule, ruleIndex) => (
                      <li
                        key={rule}
                        className={`${bodyFont.className} flex items-start gap-2.5 text-[11px] leading-relaxed opacity-70 md:text-xs`}
                      >
                        <span className="mt-[5px] flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/60" />
                        <span>
                          <span className={`${accentFont.className} mr-1 text-[9px] opacity-40`}>
                            {String(ruleIndex + 1).padStart(2, "0")}
                          </span>
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COORDINATORS */}
                <div className="mb-5 md:mb-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-8 bg-white/30" />
                    <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.25em] opacity-55`}>
                      Event Coordinators
                    </span>
                  </div>
                  <div className="grid w-full max-w-2xl grid-cols-2 gap-2.5">
                    {event.coordinators.map((coordinator, coordinatorIndex) => (
                      <div
                        key={coordinator.name}
                        className="rounded-xl border border-white/10 bg-black/10 px-3 py-3 transition-colors hover:border-white/20"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <span className={`${accentFont.className} text-[9px] opacity-35`}>
                            0{coordinatorIndex + 1}
                          </span>
                          <p className={`${bodyFont.className} text-xs font-semibold sm:text-sm`}>
                            {coordinator.name}
                          </p>
                        </div>
                        <a
                          href={`tel:${coordinator.phone.replace(/\s+/g, "")}`}
                          className={`${bodyFont.className} text-[10px] opacity-55 underline-offset-2 transition-opacity hover:opacity-100 hover:underline sm:text-xs`}
                        >
                          {coordinator.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                    <div
                  className="
                   
                    flex
                    w-full
                    flex-col
                    gap-3
                    border-t
                    border-white/10
                    pt-4
                    mt-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    md:pt-5
                  "
                >
                  {/* PRIZE */}
                  <div>
                    <span className={`${accentFont.className} mb-1 block text-[9px] font-bold uppercase tracking-[0.2em] opacity-40`}>
                      Prize Pool
                    </span>
                    <span className={`${accentFont.className} text-sm font-bold uppercase tracking-wide sm:text-base`}>
                      {event.prizepool}
                    </span>
                  </div>

                  {/* REGISTER */}
                  <a
                    href={event.registerLink}
                    className={`
                      ${accentFont.className}
                      inline-flex items-center justify-center
                      rounded-full bg-white
                      px-7 py-3
                      text-[10px] font-bold uppercase tracking-[0.18em]
                      text-black transition-all duration-200
                      hover:bg-white/80 sm:px-8
                    `}
                  >
                    Register Now
                  </a>
                </div>
                </div>

                {/* BOTTOM ACTION AREA */}
              
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}