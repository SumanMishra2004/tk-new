"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Space_Grotesk, Rajdhani } from "next/font/google";

import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  phone?: string;
  linkedin?: string;
}

interface EventCard {
  poster: string;
  title: string;
  description: string;
  rules: string[];
  coordinators: Coordinator[];
  prizepool: string;
  registerLink: string;
  bg: string;
}

const events: EventCard[] = [
  {
    poster: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/ordion2.jpg",
    title: "Orbion",
    description:
      "A 8-hour hackathon where teams build a working prototype around a surprise theme revealed at kickoff.",
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
    prizepool: "Revealing Soon",
    registerLink: "https://unstop.com/hackathons/orbion-8-hour-hackathon-institute-of-engineering-and-managemet-1756946?lb=I5srHPJQ&utm_medium=Share&utm_source=roshayad43718&utm_campaign=Online_coding_challenge",
    bg: "#2f251e",
  },
  {
    poster: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/mystic_mind_2.jpg",
    title: "Mystic Minds",
    description:
      "It's time to whirl all the knowledge inside your brain!! Join this exciting quiz event and put your intellect to the ultimate test.",
    rules: [
      "Open to all university/college students.",
      "Team Size: [Solo / Teams of 2]",
      "Solo Participant: ₹49",
      "Team of 2: ₹79",
      "Decision of the quizmasters/organizers will be final.",
    ],
    coordinators: [
      { name: "Ritam Das Gupta", phone: "+91 62915 34401" },
      { name: "Anadir Paul", phone: "+91 93877 96623" },
    ],
    prizepool: "Revealing Soon",
    registerLink: "https://forms.gle/g5DaYwkiQPfrE5ZK9",
    bg: "#43392f",
  },
  {
    poster: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/mind_forge_2.jpg",
    title: "Mind Forge",
    description:
      "Get ready to forge bold ideas into powerful innovations at MIND FORGE: The Ultimate Pitch Challenge, where creativity meets technology and ideas take center stage !!",
    rules: [
      "Open to all university/college student",
      "Team Size: 2–4",
      "Registration Fee: ₹100",
    ],
    coordinators: [
      { name: "Arista Seth", phone: "+91 79803 12509" },
    ],
    prizepool: "Revealing Soon",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSe1IMCCqCMSqZ9k1lzV0Ia6_TRhkhk0URErHvtrsjmpnhzZZA/viewform",
    bg: "#2f251e",
  },
  {
    poster: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/WhatsApp_Image_2026-11-03_at_5.44.29_PM.jpg",
    title: "Tech Canvas",
    description: "Step into the dark, sleek world of high-tech aesthetics and let your creativity take center stage at Tech Canvas, the premier poster design competition at TechKurukshetra '26!",
    rules: [
      "Maximum team size - 2",
      "Every participant has to register either individually or as a team.",
      "If registering as a team, only one member must fill the form.",
      "Partnered participants must register with the same team name to avoid confusion on the day of the event.",
      "Theme of the poster must be pertaining to emerging technologies."
    ],
    coordinators: [
      { name: "Arista Seth", phone: "+91 79803 12509" },
      { name: "Asmita Chatterjee", phone: "+91 6291 750 785" }
    ],
    prizepool: "Revealing Soon",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLScU78xo8AwtZY6EH4ue2VTs3fPaUQp0fGCLkRA662opR2Q2AA/viewform",
    bg: "#2f251e",
  },
  {
    poster: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/lg_315x410.png",
    title: "Techfest IIT Bombay",
    description:
      "Tech Kurukshetra 2026 in collaboration with Techfest, IIT Bombay presents Kolkata Zonals featuring premier national-level competitions.",
    rules: [
      "SparkX - National AI Competition",
      "Zerocode - Prompt War",
      "Innovatex - Future Habitat Challenge",
      "Event Date: 14th November, 2026",
      "Venue: Tech Kurukshetra, UEM Kolkata",
    ],
    coordinators: [
      { name: "Dr. Sangita Dutta", phone: "LinkedIn", linkedin: "https://www.linkedin.com/in/dr-sangita-dutta-509b201a4/" },
      { name: "Sayantani Das", phone: "LinkedIn", linkedin: "https://in.linkedin.com/in/sayantani-das-2636102b6" },
    ],
    prizepool: "Revealing Soon",
    registerLink: "https://techfest.org/competitions",
    bg: "#2f251e",
  },
  {
    poster: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/desktop_315x410.png",
    title: "Techfest IIT Bombay",
    description:
      "Tech Kurukshetra 2026 in collaboration with Techfest, IIT Bombay presents Kolkata Zonals featuring premier robotics competitions.",
    rules: [
      "ThetaShift - Spherical Bot Competition",
      "Meshmerize - Line Following Robot",
      "Roboreach - Robotic Arm Competition",
      "Event Date: 14th November, 2026",
      "Venue: Tech Kurukshetra, UEM Kolkata",
    ],
    coordinators: [
      { name: "Dr. Sangita Dutta", phone: "LinkedIn", linkedin: "https://www.linkedin.com/in/dr-sangita-dutta-509b201a4/" },
      { name: "Avik Kr Das", phone: "LinkedIn", linkedin: "https://in.linkedin.com/in/avikdasetc" },
    ],
    prizepool: "Revealing Soon",
    registerLink: "https://techfest.org/competitions",
    bg: "#2f251e",
  },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  const activeEvent = events[activeIndex] || events[0];

  return (
    <section ref={sectionRef} id="events" className="w-full bg-[#12100e] py-16 sm:py-24 text-white overflow-hidden relative">
      {/* Section Header */}
      <div className="mb-10 px-6 text-center sm:mb-14">
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
            4 Competitions · Kolkata 2026
          </span>
          <span className="h-[2px] w-10 bg-[#E6392F] sm:w-14" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center xl:items-center justify-center w-full max-w-[1800px] mx-auto gap-12 xl:gap-8 px-4 sm:px-6 lg:px-12 mt-4 xl:mt-10">

        {/* LEFT: Carousel */}
        <div ref={carouselRef} className="relative w-full xl:w-[50%] flex-shrink-0 flex flex-col items-center justify-center">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="
            absolute left-2 sm:left-6 lg:left-4 xl:left-10
            top-[45%] xl:top-[40%] -translate-y-1/2 z-30
            flex h-10 w-10 sm:h-12 sm:w-12
            items-center justify-center
            rounded-full
            border border-white/15
            bg-black/40 backdrop-blur-md
            text-white/60
            transition-all duration-300
            hover:border-white/40 hover:bg-white/10 hover:text-white
            hover:scale-110
            active:scale-95
          "
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="
            absolute right-2 sm:right-6 lg:right-4 xl:right-10
            top-[45%] xl:top-[40%] -translate-y-1/2 z-30
            flex h-10 w-10 sm:h-12 sm:w-12
            items-center justify-center
            rounded-full
            border border-white/15
            bg-black/40 backdrop-blur-md
            text-white/60
            transition-all duration-300
            hover:border-white/40 hover:bg-white/10 hover:text-white
            hover:scale-110
            active:scale-95
          "
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            loopAdditionalSlides={2}
            watchSlidesProgress={true}
            touchStartPreventDefault={false}
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            coverflowEffect={{
              rotate: 0,
              stretch: -30,
              depth: 350,
              modifier: 1,
              scale: 0.94,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            className="eventsSwiper"
          >
            {events.map((event, index) => (
              <SwiperSlide
                key={`${event.title}-${index}`}
                className="
                !w-[220px] !h-[285px]
                sm:!w-[255px] sm:!h-[330px]
                md:!w-[285px] md:!h-[370px]
                lg:!w-[315px] lg:!h-[410px]
              "
              >
                <div
                  className="
                  group relative h-full w-full select-none overflow-hidden
                  rounded-2xl
                  transition-shadow duration-300 ease-out
                  shadow-[0_22px_42px_rgba(0,0,0,0.55)]
                  hover:shadow-[0_30px_50px_rgba(0,0,0,0.65)]
                "
                  style={{
                    background: `linear-gradient(145deg, ${event.bg}, #110d0a 72%)`,
                  }}
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-black/30">
                    <img
                      src={event.poster}
                      alt={event.title}
                      draggable={false}
                      className="
                      h-full w-full object-cover
                      transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-[1.07]
                    "
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Fallback pattern if image is missing */}
                    <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-black/40">
                      <div className={`${accentFont.className} mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30`}>Event Poster</div>
                      <div className="h-px w-10 bg-white/20" />
                    </div>

                  </div>

                  <div className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-all duration-500 group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.06)]" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex items-center justify-center gap-3 text-center">
            <span className="h-px w-6 bg-white/20 sm:w-10" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35 sm:text-[11px] transition-all duration-500">
              {String(activeIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
            </p>
            <span className="h-px w-6 bg-white/20 sm:w-10" />
          </div>

          {/* BELOW-DESKTOP ONLY: Quick Action CTA */}
          <div className="flex xl:hidden items-center justify-center w-full max-w-md mx-auto mt-6 px-6 relative z-30">
            <a
                href={activeEvent.registerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                ${accentFont.className}
                flex w-full items-center justify-center
                rounded-full bg-white
                py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.22em]
                text-black transition-all duration-300
                hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]
                flex-shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.25)]
              `}
              >
                Register Now ↗
            </a>
          </div>
        </div>

        {/* RIGHT: Active Event Details */}
        <div ref={detailsRef} className="w-full max-w-3xl xl:max-w-none xl:w-[50%] relative z-20 flex flex-col justify-center">
          <div
            className="rounded-3xl border border-white/[0.14] bg-white/[0.08] p-4 sm:p-6 xl:p-8 transition-all duration-700 relative overflow-hidden flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0.5px_0_rgba(255,255,255,0.14)] backdrop-blur-[22px] backdrop-saturate-[160%]"
            style={{ WebkitBackdropFilter: "blur(22px) saturate(160%)" }}
          >
            {/* subtle glow accent based on bg color, though keeping it neutral is safer */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-5 md:gap-8 relative z-10">
              {/* Left: Info */}
              <div className="flex-1">
                <div className="mb-3">
                  <div className={`${accentFont.className} mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-[#E6392F]`}>
                    Tech Kurukshetra Presents
                  </div>
                  <h3
                    className={`${accentFont.className} text-2xl sm:text-3xl xl:text-4xl uppercase leading-[0.9] tracking-tight font-bold`}
                  >
                    {activeEvent.title}
                  </h3>
                </div>

                <p className={`${bodyFont.className} text-[12px] sm:text-[13px] leading-relaxed text-white/75 mb-4`}>
                  {activeEvent.description}
                </p>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-px w-6 bg-white/30" />
                    <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.25em] text-white/60`}>
                      Rules & Guidelines
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {activeEvent.rules.map((rule, idx) => (
                      <li key={idx} className={`${bodyFont.className} flex items-start gap-2 text-[11px] sm:text-[12px] leading-relaxed text-white/70`}>
                        <span className="mt-[5px] flex h-[3px] w-[3px] flex-shrink-0 rounded-full bg-[#E6392F]" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Coordinators & Actions */}
              <div className="flex-1 md:max-w-[260px] flex flex-col justify-between gap-5 md:gap-4">
                {activeEvent.coordinators && activeEvent.coordinators.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-px w-6 bg-white/30" />
                      <span className={`${accentFont.className} text-[10px] font-bold uppercase tracking-[0.25em] text-white/60`}>
                        Coordinators
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-h-[190px] sm:max-h-[220px] overflow-y-auto pr-1">
                      {activeEvent.coordinators.map((coordinator, idx) => (
                        <div key={idx} className="rounded-lg border border-white/5 bg-white/5 p-2 sm:p-2.5 hover:bg-white/10 transition-colors">
                          <p className={`${bodyFont.className} text-[11px] sm:text-[12px] font-semibold mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis`}>{coordinator.name}</p>
                          {coordinator.linkedin ? (
                            <a
                              href={coordinator.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${bodyFont.className} inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-white/80 hover:text-white transition-colors font-medium`}
                            >
                              <span>LinkedIn</span>
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-white">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                              </svg>
                            </a>
                          ) : coordinator.phone && coordinator.phone !== "TBA" && coordinator.phone !== "LinkedIn" ? (
                            <a href={`tel:${coordinator.phone.replace(/\s+/g, "")}`} className={`${bodyFont.className} text-[9px] sm:text-[10px] text-white/50 hover:text-white transition-colors`}>
                              {coordinator.phone}
                            </a>
                          ) : (
                            <span className={`${bodyFont.className} text-[9px] sm:text-[10px] text-white/40 tracking-wider`}>
                              {coordinator.phone || "Contact TBA"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="hidden xl:flex rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4 mt-auto flex-col items-start justify-start">
                  <a
                      href={activeEvent.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                      ${accentFont.className}
                      flex w-full items-center justify-center
                      rounded-full bg-white
                      py-3.5 sm:py-4
                      text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.22em]
                      text-black transition-all duration-300
                      hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]
                      flex-shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.2)]
                    `}
                    >
                      Register Now ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .eventsSwiper {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 40px;
          overflow: visible;
          touch-action: pan-y;
          user-select: none;
        }
        .eventsSwiper .swiper-slide {
          height: auto;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: transform, opacity;
          transition: opacity 0.4s ease;
        }
        .eventsSwiper .swiper-slide > div {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .eventsSwiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.45;
        }
        .eventsSwiper .swiper-slide-prev,
        .eventsSwiper .swiper-slide-next {
          opacity: 0.75;
        }
        .eventsSwiper .swiper-slide-active {
          opacity: 1;
          z-index: 10;
        }
        .eventsSwiper .swiper-slide-active > div {
          border-color: rgba(255,255,255,0.25);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }
        .eventsSwiper .swiper-pagination {
          bottom: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }
        .eventsSwiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          margin: 0 !important;
          border-radius: 9999px;
          background: rgba(255,255,255,0.25);
          border: 1px solid rgba(255,255,255,0.1);
          opacity: 1;
          transition: width 0.4s ease, background 0.4s ease, border-color 0.4s ease;
        }
        .eventsSwiper .swiper-pagination-bullet-active {
          width: 24px;
          background: #E6392F;
          border-color: rgba(230, 57, 47, 0.4);
        }
        .eventsSwiper .swiper-button-next,
        .eventsSwiper .swiper-button-prev {
          display: none;
        }
      `}</style>
    </section>
  );
}
