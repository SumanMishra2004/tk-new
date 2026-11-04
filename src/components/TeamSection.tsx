"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  EffectCoverflow,
  Autoplay,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

interface Member {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

interface FacultyMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  isPlaceholder?: boolean;
  orderClass: string;
  badgeNumber: string;
}

interface CoordinatorMember {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
}

function getInitials(name: string): string {
  const parts = name.replace(/^Dr\.?\s+/i, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const facultyMembers: FacultyMember[] = [
  {
    id: "faculty-1",
    name: "Dr Sandip Mandal",
    role: "Faculty Convener",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/hod.jpg",
    linkedin: "https://www.linkedin.com/in/dr-sandip-mandal/",
    isPlaceholder: false,
    orderClass: "order-1 sm:order-1",
    badgeNumber: "01",
  },
  {
    id: "faculty-2",
    name: "Dr. Sangita Dutta",
    role: "Faculty Convener",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/zjk1sdvuv7nogngftflg.jpg",
    linkedin: "https://www.linkedin.com/in/dr-sangita-dutta-509b201a4/",
    isPlaceholder: false,
    orderClass: "order-2 sm:order-2",
    badgeNumber: "02",
  },
  {
    id: "faculty-3",
    name: "Suchanda Chatterjee (Das)",
    role: "Faculty Convener",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/IMG_20260920_145411.jpg",
    linkedin: "https://www.linkedin.com/in/suchanda-chatterjee-das-49b46a3b2/",
    isPlaceholder: false,
    orderClass: "order-3 sm:order-3",
    badgeNumber: "03",
  },
];

const facultyCoordinators: CoordinatorMember[] = [
  {
    name: "Sayantani Das",
    role: "Faculty Coordinator",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/Sayantani.jpg",
    linkedin: "https://in.linkedin.com/in/sayantani-das-2636102b6",
  },
  {
    name: "Avik Kumar Das",
    role: "Faculty Coordinator",
    linkedin: "https://in.linkedin.com/in/avikdasetc",
  },
  {
    name: "Apurba Nandi",
    role: "Faculty Coordinator",
    linkedin: "https://www.linkedin.com/in/apurba-nandi-8b63b2174/",
  },
  {
    name: "Rangon Sarkar",
    role: "Faculty Coordinator",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/WhatsApp_Image_2026-09-20_at_11.10.40_PM.jpg",
    linkedin: "https://in.linkedin.com/in/rangon-sarkar-a453981bb",
  },
  {
    name: "Uddipan Ghosh",
    role: "Faculty Coordinator",
    linkedin: "https://in.linkedin.com/in/uddipan-ghosh-9685a5232",
  },
  {
    name: "Apalok Roy",
    role: "Faculty Coordinator",
    linkedin: "https://www.linkedin.com/in/apalok-roy-b25a65205/",
  },
  {
    name: "Sweta Saha",
    role: "Faculty Coordinator",
    linkedin: "https://www.linkedin.com/in/sweta-sarkar-825984238/",
  },
  {
    name: "Dr. Siddhartha Roy",
    role: "Faculty Coordinator",
    linkedin: "https://in.linkedin.com/in/siddhartha-roy-3893732b9",
  },
  {
    name: "Nitu Saha",
    role: "Faculty Coordinator",
    linkedin: "https://in.linkedin.com/in/nitu-saha-3846551b6",
  },
  {
    name: "Dr. Ahona Ghosh",
    role: "Faculty Coordinator",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/Ahona.jpg",
    linkedin: "https://www.linkedin.com/in/dr-ahona-ghosh-66757a85/",
  },
  {
    name: "Tejashri Srivastava",
    role: "Faculty Coordinator",
    linkedin: "https://in.linkedin.com/in/tejashri-chate",
  },
  {
    name: "Dr. Raktim Kumar Dey",
    role: "Faculty Coordinator",
    linkedin: "https://in.linkedin.com/in/dr-raktim-kumar-dey-1a971343",
  },
  {
    name: "Rupayan Halder",
    role: "Faculty Coordinator",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/RPH.png",
    linkedin: "https://www.linkedin.com/in/rupayan-halder-962922209/",
  },
  {
    name: "Riya Sarkar",
    role: "Faculty Coordinator",
    linkedin: "https://www.linkedin.com/in/riyasarkarofficial/",
  },
  {
    name: "Riya Jana",
    role: "Faculty Coordinator",
  },
  {
    name: "Monalisa Chakraborty",
    role: "Faculty Coordinator",
    linkedin: "https://www.linkedin.com/in/monalisa-chakraborty-1336862a4/",
  },
  {
    name: "Saikat Mukherjee",
    role: "Faculty Coordinator",
    linkedin: "https://www.linkedin.com/in/saikat-mukherjee-b212332a2/",
  },
];

const displayFacultyCoordinators: CoordinatorMember[] = [
  ...facultyCoordinators,
  ...facultyCoordinators,
];

const members: Member[] = [
  {
    name: "Arista Seth",
    role: "Managment and Logistics Lead",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453635/zkvdrjqrsgivva6z7hfv.jpg",
    linkedin: "https://www.linkedin.com/in/arista-seth-193b28317/",
  },
  {
    name: "Debarshi Banerjee",
    role: "Technical Lead",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453637/yljcvnn5w1vcswbwoxe3.webp",
    linkedin: "https://www.linkedin.com/in/debarshi-banerjee-594107318/",
  },
  {
    name: "Roshan Yadav",
    role: "Convenor",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453774/kqc5dt6wdla9qyspq5ip.jpg",
    linkedin: "https://www.linkedin.com/in/roshan-yadav-717572322/",
  },
  {
    name: "Ritam Das Gupta",
    role: "Graphics Lead",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453639/dflgvldlstcebzdhagpb.jpg",
    linkedin: "https://www.linkedin.com/in/ritam-das-gupta-413877320/",
  },
  {
    name: "Sayan Mondal",
    role: "Web Dev Lead",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/WhatsApp_Image_2026-11-03_at_5.08.49_PM.jpg",
    linkedin: "https://www.linkedin.com/in/sayan-mondal-261141318/",
  },
  {
    name: "Asmita Chatterjee",
    role: "Social Media and PR",
    image: "https://res.cloudinary.com/vhf4myms/image/upload/v1789485665/Asmita_Chatterjee.jpg",
    linkedin: "https://www.linkedin.com/in/asmita-chatterjee-b214b1232/",
  },
  {
    name: "Rounak Ghosh",
    role: "Videography Lead",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/WhatsApp_Image_2026-11-03_at_5.05.36_PM.jpg",
    linkedin: "https://www.linkedin.com/in/rounak-ghosh-497b5530a/",
  },
];

const displayMembers: Member[] = [...members, ...members];

export default function TeamCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const facultyRef = useRef<HTMLDivElement>(null);
  const facultyCarouselRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Faculty Coordinators Swiper
  const [activeFacultyIndex, setActiveFacultyIndex] = useState(0);
  const facultySwiperRef = useRef<SwiperType | null>(null);

  const handleFacultyPrev = useCallback(() => {
    facultySwiperRef.current?.slidePrev();
  }, []);

  const handleFacultyNext = useCallback(() => {
    facultySwiperRef.current?.slideNext();
  }, []);

  const handleFacultyBulletClick = useCallback((targetIndex: number) => {
    if (!facultySwiperRef.current) return;
    facultySwiperRef.current.slideToLoop(targetIndex);
  }, []);

  // Core Leads Swiper
  const [activeCoreIndex, setActiveCoreIndex] = useState(0);
  const coreSwiperRef = useRef<SwiperType | null>(null);

  const handleCorePrev = useCallback(() => {
    coreSwiperRef.current?.slidePrev();
  }, []);

  const handleCoreNext = useCallback(() => {
    coreSwiperRef.current?.slideNext();
  }, []);

  const handleCoreBulletClick = useCallback((targetIndex: number) => {
    if (!coreSwiperRef.current) return;
    coreSwiperRef.current.slideToLoop(targetIndex);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (facultyRef.current) {
        gsap.fromTo(
          facultyRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      if (facultyCarouselRef.current) {
        gsap.fromTo(
          facultyCarouselRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: facultyCarouselRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-16 sm:py-24 overflow-hidden"
      id="team"
    >
      {/* HEADING */}
      <div ref={headingRef} className="mb-10 px-6 text-center sm:mb-14">
        <h2
          className="
            font-[family-name:var(--font-sketch)]
            text-5xl
            uppercase
            tracking-wide
            text-white
            sm:text-6xl
            md:text-7xl
          "
          style={{ fontFamily: "var(--font-sketch)" }}
        >
          The Backbone
        </h2>
        <p
          className="
            mx-auto
            mt-4
            max-w-lg
            text-xs
            uppercase
            tracking-[0.22em]
            text-white/45
            sm:text-sm
          "
          style={{ fontFamily: "var(--font-sketch)" }}
        >
          The people who make it happen — our mentors and core team driving every initiative behind the scenes.
        </p>
      </div>

      {/* ── FACULTY LEAD SECTION (3 IN A ROW) ── */}
      <div ref={facultyRef} className="mx-auto max-w-6xl px-4 sm:px-6 mb-14 sm:mb-16">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-[#E6392F]" />
          <span
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#E6392F]"
            style={{ fontFamily: "var(--font-sketch)" }}
          >
            Faculty Lead
          </span>
          <div className="h-px w-8 bg-[#E6392F]" />
        </div>

        {/* 3 CARDS IN A ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 md:gap-8 max-w-5xl mx-auto items-center justify-items-center">
          {facultyMembers.map((faculty) => (
            <div
              key={faculty.id}
              className={`
                ${faculty.orderClass}
                group relative
                w-[220px] h-[293px]
                sm:w-full sm:max-w-[260px] sm:h-[347px]
                md:max-w-[290px] md:h-[387px]
                lg:max-w-[320px] lg:h-[427px]
                overflow-hidden rounded-xl border
                ${
                  faculty.isPlaceholder
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-[#E6392F]/35 bg-black z-10 shadow-[0_0_30px_rgba(230,57,47,0.15)] hover:border-[#E6392F]/70 hover:shadow-[0_0_40px_rgba(230,57,47,0.3)] hover:scale-[1.02]"
                }
                select-none transition-all duration-700
              `}
            >
              {/* IMAGE OR PLACEHOLDER */}
              {!faculty.isPlaceholder && faculty.image ? (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    draggable={false}
                    className="
                      h-full w-full
                      object-cover object-top
                      transition-transform duration-[1.2s]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-[1.06]
                    "
                  />
                  {/* Vignette overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
                  {/* Subtle bottom gradient */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 sm:h-28 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 bg-gradient-to-b from-white/[0.04] via-black/40 to-black/85">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/30 transition-all duration-300 group-hover:border-[#E6392F]/40 group-hover:text-[#E6392F]/70">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
                    Upcoming
                  </span>
                </div>
              )}

              {/* TOP LEFT NUMBER */}
              <div
                className="
                  absolute left-3 top-3 z-20
                  rounded bg-black/55 px-1.5 py-0.5 backdrop-blur-md
                  font-mono text-[9px] tracking-[0.2em]
                  text-white/70 border border-white/10
                  transition-colors duration-300
                  group-hover:text-white group-hover:border-[#E6392F]/50
                "
              >
                {faculty.badgeNumber}
              </div>

              {/* TOP RIGHT LINKEDIN BUTTON */}
              {faculty.linkedin ? (
                <a
                  href={faculty.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${faculty.name} LinkedIn`}
                  className="
                    absolute right-3 top-3 z-30
                    flex h-7 w-7 items-center justify-center
                    rounded-full border border-white/20
                    bg-black/60 text-white/75 backdrop-blur-md
                    transition-all duration-300
                    hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white
                    hover:shadow-[0_0_12px_rgba(10,102,194,0.6)]
                    active:scale-95
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              ) : (
                <div className="absolute right-3.5 top-3.5 z-20">
                  <div
                    className={`
                      h-2 w-2 rounded-full border
                      transition-all duration-500
                      ${
                        !faculty.isPlaceholder
                          ? "border-[#E6392F] bg-[#E6392F] shadow-[0_0_8px_rgba(230,57,47,0.7)]"
                          : "border-white/40 bg-transparent group-hover:border-[#E6392F] group-hover:bg-[#E6392F]"
                      }
                    `}
                  />
                </div>
              )}

              {/* COMPACT FLOATING DOCKED CARD */}
              <div
                className="
                  absolute inset-x-2.5 bottom-2.5 z-20
                  rounded-lg border border-white/15 bg-black/80 px-3 py-2 sm:px-3.5 sm:py-2.5
                  backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.6)]
                  transition-all duration-300
                  group-hover:border-[#E6392F]/50 group-hover:bg-black/90
                "
              >
                <div className="flex items-center justify-between gap-1.5">
                  <h3
                    className="
                      text-[13px] sm:text-sm md:text-[15px] font-bold uppercase
                      leading-tight tracking-tight
                      text-white truncate
                    "
                  >
                    {faculty.name}
                  </h3>
                  <span
                    className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                      !faculty.isPlaceholder ? "bg-[#E6392F]" : "bg-white/30"
                    }`}
                  />
                </div>

                <p
                  className="
                    mt-0.5
                    text-[8px] sm:text-[9px] md:text-[10px] uppercase
                    tracking-[0.16em]
                    text-white/65 truncate
                    transition-colors duration-300
                    group-hover:text-[#E6392F]
                  "
                >
                  {faculty.role}
                </p>
              </div>

              {/* HOVER BORDER GLOW */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  z-30 rounded-xl
                  border border-white/0
                  transition-all duration-700
                  group-hover:border-white/20
                  group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.03)]
                "
              />

              {/* TOP SCANLINE */}
              <div
                className="
                  pointer-events-none absolute inset-x-0 top-0
                  z-30 h-px
                  bg-gradient-to-r from-transparent via-white/50 to-transparent
                  opacity-0 transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              {/* INNER FRAME */}
              <div
                className="
                  pointer-events-none absolute inset-[6px]
                  z-20 rounded-lg
                  border border-white/[0.04]
                  transition-all duration-500
                  group-hover:border-white/[0.08]
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── FACULTY COORDINATORS (CAROUSEL) ── */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-[#E6392F]" />
        <span
          className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#E6392F]"
          style={{ fontFamily: "var(--font-sketch)" }}
        >
          Faculty Coordinators
        </span>
        <div className="h-px w-8 bg-[#E6392F]" />
      </div>

      {/* FACULTY SWIPER CONTAINER */}
      <div ref={facultyCarouselRef} className="relative w-full overflow-hidden mb-16 sm:mb-20">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-black to-transparent" />

        {/* NAV ARROWS — DESKTOP */}
        <button
          onClick={handleFacultyPrev}
          aria-label="Previous faculty coordinator"
          className="
            pointer-events-auto
            absolute left-4 top-1/2 z-30
            hidden -translate-y-1/2
            h-10 w-10 items-center justify-center
            rounded-full border border-white/20
            bg-black/60 text-white backdrop-blur-sm
            transition-all duration-300
            hover:scale-110 hover:border-[#E6392F] hover:bg-[#E6392F]
            active:scale-95
            md:flex lg:left-8 cursor-pointer
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleFacultyNext}
          aria-label="Next faculty coordinator"
          className="
            pointer-events-auto
            absolute right-4 top-1/2 z-30
            hidden -translate-y-1/2
            h-10 w-10 items-center justify-center
            rounded-full border border-white/20
            bg-black/60 text-white backdrop-blur-sm
            transition-all duration-300
            hover:scale-110 hover:border-[#E6392F] hover:bg-[#E6392F]
            active:scale-95
            md:flex lg:right-8 cursor-pointer
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <Swiper
          onSwiper={(swiper) => {
            facultySwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveFacultyIndex(swiper.realIndex % facultyCoordinators.length);
          }}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          speed={900}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -30,
            depth: 350,
            modifier: 1,
            slideShadows: false,
          }}
          className="teamSwiper"
        >
          {displayFacultyCoordinators.map((coordinator, index) => {
            const coordinatorIndex = index % facultyCoordinators.length;
            return (
              <SwiperSlide
                key={`faculty-${coordinator.name}-${index}`}
                className="
                  !w-[200px] !h-[267px]
                  sm:!w-[240px] sm:!h-[320px]
                  md:!w-[280px] md:!h-[373px]
                  lg:!w-[320px] lg:!h-[427px]
                "
              >
                <div
                  className="
                    group
                    relative
                    w-full h-full
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/10
                    select-none
                    transition-shadow
                    duration-700
                    bg-[#0B0908]
                  "
                >
                  {/* IMAGE OR STYLIZED AVATAR */}
                  {coordinator.image ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={coordinator.image}
                        alt={coordinator.name}
                        draggable={false}
                        className="
                          h-full
                          w-full
                          object-cover
                          object-top
                          transition-transform
                          duration-[1.2s]
                          ease-[cubic-bezier(0.22,1,0.36,1)]
                          group-hover:scale-[1.06]
                        "
                      />
                      <div
                        className="
                          pointer-events-none
                          absolute inset-0
                          bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]
                        "
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#161210] via-[#0E0C0A] to-[#070605] overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(rgba(230,57,47,0.7) 1px, transparent 1px)`,
                          backgroundSize: "22px 22px",
                        }}
                      />
                      <div className="absolute h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-[#E6392F]/10 blur-2xl pointer-events-none transition-all duration-700 group-hover:bg-[#E6392F]/20 group-hover:scale-125" />
                      <div className="relative z-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-[#E6392F]/50 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(230,57,47,0.25)]">
                        <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-white/85 transition-colors duration-300 group-hover:text-white">
                          {getInitials(coordinator.name)}
                        </span>
                      </div>
                      <span className="relative z-10 mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-[#E6392F]/70 transition-colors duration-300 group-hover:text-[#E6392F]">
                        Coordinator
                      </span>
                    </div>
                  )}

                  {/* Subtle base gradient strictly at bottom */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-x-0 bottom-0
                      z-10 h-24 sm:h-28
                      bg-gradient-to-t
                      from-black/90 via-black/40 to-transparent
                    "
                  />

                  {/* TOP LEFT NUMBER */}
                  <div
                    className="
                      absolute left-3 top-3 z-20
                      rounded bg-black/45 px-1.5 py-0.5 backdrop-blur-md
                      font-mono text-[9px] tracking-[0.2em]
                      text-white/70 border border-white/10
                      transition-colors duration-300
                      group-hover:text-white group-hover:border-[#E6392F]/50
                    "
                  >
                    {String(coordinatorIndex + 1).padStart(2, "0")}
                  </div>

                  {/* TOP RIGHT INDICATOR / LINKEDIN */}
                  {coordinator.linkedin ? (
                    <a
                      href={coordinator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${coordinator.name} LinkedIn`}
                      className="
                        absolute right-3 top-3 z-30
                        flex h-7 w-7 items-center justify-center
                        rounded-full border border-white/20
                        bg-black/60 text-white/75 backdrop-blur-md
                        transition-all duration-300
                        hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white
                        hover:shadow-[0_0_12px_rgba(10,102,194,0.6)]
                        active:scale-95
                      "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  ) : (
                    <div className="absolute right-3.5 top-3.5 z-20">
                      <div
                        className="
                          h-2 w-2 rounded-full
                          border border-white/40 bg-transparent
                          transition-all duration-500
                          group-hover:scale-125
                          group-hover:border-[#E6392F]
                          group-hover:bg-[#E6392F]
                          group-hover:shadow-[0_0_8px_rgba(230,57,47,0.7)]
                        "
                      />
                    </div>
                  )}

                  {/* COMPACT FLOATING DOCKED CARD */}
                  <div
                    className="
                      absolute inset-x-2.5 bottom-2.5 z-20
                      rounded-lg border border-white/15 bg-black/75 px-3 py-2 sm:px-3.5 sm:py-2.5
                      backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.6)]
                      transition-all duration-300
                      group-hover:border-[#E6392F]/50 group-hover:bg-black/85
                    "
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <h3
                        className="
                          text-[13px] sm:text-sm md:text-[15px] font-bold uppercase
                          leading-tight tracking-tight
                          text-white truncate
                        "
                      >
                        {coordinator.name}
                      </h3>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E6392F] flex-shrink-0" />
                    </div>

                    <p
                      className="
                        mt-0.5
                        text-[8px] sm:text-[9px] md:text-[10px] uppercase
                        tracking-[0.16em]
                        text-white/65 truncate
                        transition-colors duration-300
                        group-hover:text-[#E6392F]
                      "
                    >
                      {coordinator.role}
                    </p>
                  </div>

                  {/* HOVER BORDER GLOW */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      z-30 rounded-xl
                      border border-white/0
                      transition-all duration-700
                      group-hover:border-white/20
                      group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.03)]
                    "
                  />

                  {/* TOP SCANLINE */}
                  <div
                    className="
                      pointer-events-none absolute inset-x-0 top-0
                      z-30 h-px
                      bg-gradient-to-r from-transparent via-white/50 to-transparent
                      opacity-0 transition-opacity duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* INNER FRAME */}
                  <div
                    className="
                      pointer-events-none absolute inset-[6px]
                      z-20 rounded-lg
                      border border-white/[0.04]
                      transition-all duration-500
                      group-hover:border-white/[0.08]
                    "
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* PAGINATION BULLETS */}
        <div className="mt-5 flex items-center justify-center gap-1.5 sm:gap-2 px-4 max-w-xl mx-auto flex-wrap">
          {facultyCoordinators.map((_, i) => (
            <button
              key={`faculty-bullet-${i}`}
              type="button"
              onClick={() => handleFacultyBulletClick(i)}
              aria-label={`Go to faculty coordinator ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeFacultyIndex === i
                  ? "w-7 bg-[#E6392F] shadow-[0_0_12px_rgba(230,57,47,0.45)]"
                  : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* ACTIVE MEMBER INFO BAR */}
        <div className="mt-2 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-6 bg-white/20 sm:w-10" />
          <p
            className="
              text-[10px] font-medium uppercase
              tracking-[0.3em] text-white/35
              sm:text-[11px]
              transition-all duration-500
            "
          >
            {String(activeFacultyIndex + 1).padStart(2, "0")} / {String(facultyCoordinators.length).padStart(2, "0")}
          </p>
          <span className="h-px w-6 bg-white/20 sm:w-10" />
        </div>
      </div>

      {/* ── CORE / STUDENT LEADS ── */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-[#E6392F]" />
        <span
          className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#E6392F]"
          style={{ fontFamily: "var(--font-sketch)" }}
        >
          Core Leads
        </span>
        <div className="h-px w-8 bg-[#E6392F]" />
      </div>

      {/* CORE SWIPER CONTAINER */}
      <div ref={carouselRef} className="relative w-full overflow-hidden">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-black to-transparent" />

        {/* NAV ARROWS — DESKTOP */}
        <button
          onClick={handleCorePrev}
          aria-label="Previous core lead"
          className="
            pointer-events-auto
            absolute left-4 top-1/2 z-30
            hidden -translate-y-1/2
            h-10 w-10 items-center justify-center
            rounded-full border border-white/20
            bg-black/60 text-white backdrop-blur-sm
            transition-all duration-300
            hover:scale-110 hover:border-[#E6392F] hover:bg-[#E6392F]
            active:scale-95
            md:flex lg:left-8 cursor-pointer
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleCoreNext}
          aria-label="Next core lead"
          className="
            pointer-events-auto
            absolute right-4 top-1/2 z-30
            hidden -translate-y-1/2
            h-10 w-10 items-center justify-center
            rounded-full border border-white/20
            bg-black/60 text-white backdrop-blur-sm
            transition-all duration-300
            hover:scale-110 hover:border-[#E6392F] hover:bg-[#E6392F]
            active:scale-95
            md:flex lg:right-8 cursor-pointer
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <Swiper
          onSwiper={(swiper) => {
            coreSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveCoreIndex(swiper.realIndex % members.length);
          }}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          speed={900}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -30,
            depth: 350,
            modifier: 1,
            slideShadows: false,
          }}
          className="teamSwiper"
        >
          {displayMembers.map((member, index) => {
            const memberIndex = index % members.length;
            return (
              <SwiperSlide
                key={`core-${member.name}-${index}`}
                className="
                  !w-[200px] !h-[267px]
                  sm:!w-[240px] sm:!h-[320px]
                  md:!w-[280px] md:!h-[373px]
                  lg:!w-[320px] lg:!h-[427px]
                "
              >
                <div
                  className="
                    group
                    relative
                    w-full h-full
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/10
                    select-none
                    transition-shadow
                    duration-700
                    bg-[#0B0908]
                  "
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      draggable={false}
                      className="
                        h-full
                        w-full
                        object-cover
                        object-top
                        transition-transform
                        duration-[1.2s]
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-[1.06]
                      "
                    />

                    {/* Vignette overlay */}
                    <div
                      className="
                        pointer-events-none
                        absolute inset-0
                        bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]
                      "
                    />
                  </div>

                  {/* Subtle base gradient strictly at bottom */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-x-0 bottom-0
                      z-10 h-24 sm:h-28
                      bg-gradient-to-t
                      from-black/90 via-black/40 to-transparent
                    "
                  />

                  {/* TOP LEFT NUMBER */}
                  <div
                    className="
                      absolute left-3 top-3 z-20
                      rounded bg-black/45 px-1.5 py-0.5 backdrop-blur-md
                      font-mono text-[9px] tracking-[0.2em]
                      text-white/70 border border-white/10
                      transition-colors duration-300
                      group-hover:text-white group-hover:border-[#E6392F]/50
                    "
                  >
                    {String(memberIndex + 1).padStart(2, "0")}
                  </div>

                  {/* TOP RIGHT LINKEDIN BUTTON / DOT */}
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="
                        absolute right-3 top-3 z-30
                        flex h-7 w-7 items-center justify-center
                        rounded-full border border-white/20
                        bg-black/60 text-white/75 backdrop-blur-md
                        transition-all duration-300
                        hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white
                        hover:shadow-[0_0_12px_rgba(10,102,194,0.6)]
                        active:scale-95
                      "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  ) : (
                    <div className="absolute right-3.5 top-3.5 z-20">
                      <div
                        className="
                          h-2 w-2 rounded-full
                          border border-white/40 bg-transparent
                          transition-all duration-500
                          group-hover:scale-125
                          group-hover:border-[#E6392F]
                          group-hover:bg-[#E6392F]
                          group-hover:shadow-[0_0_8px_rgba(230,57,47,0.7)]
                        "
                      />
                    </div>
                  )}

                  {/* COMPACT FLOATING DOCKED CARD */}
                  <div
                    className="
                      absolute inset-x-2.5 bottom-2.5 z-20
                      rounded-lg border border-white/15 bg-black/75 px-3 py-2 sm:px-3.5 sm:py-2.5
                      backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.6)]
                      transition-all duration-300
                      group-hover:border-[#E6392F]/50 group-hover:bg-black/85
                    "
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <h3
                        className="
                          text-[13px] sm:text-sm md:text-[15px] font-bold uppercase
                          leading-tight tracking-tight
                          text-white truncate
                        "
                      >
                        {member.name}
                      </h3>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E6392F] flex-shrink-0" />
                    </div>

                    <p
                      className="
                        mt-0.5
                        text-[8px] sm:text-[9px] md:text-[10px] uppercase
                        tracking-[0.16em]
                        text-white/65 truncate
                        transition-colors duration-300
                        group-hover:text-[#E6392F]
                      "
                    >
                      {member.role}
                    </p>
                  </div>

                  {/* HOVER BORDER GLOW */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      z-30 rounded-xl
                      border border-white/0
                      transition-all duration-700
                      group-hover:border-white/20
                      group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.03)]
                    "
                  />

                  {/* TOP SCANLINE */}
                  <div
                    className="
                      pointer-events-none absolute inset-x-0 top-0
                      z-30 h-px
                      bg-gradient-to-r from-transparent via-white/50 to-transparent
                      opacity-0 transition-opacity duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* INNER FRAME */}
                  <div
                    className="
                      pointer-events-none absolute inset-[6px]
                      z-20 rounded-lg
                      border border-white/[0.04]
                      transition-all duration-500
                      group-hover:border-white/[0.08]
                    "
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* PAGINATION BULLETS */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {members.map((_, i) => (
            <button
              key={`core-bullet-${i}`}
              type="button"
              onClick={() => handleCoreBulletClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeCoreIndex === i
                  ? "w-7 bg-[#E6392F] shadow-[0_0_12px_rgba(230,57,47,0.45)]"
                  : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* ACTIVE MEMBER INFO BAR */}
        <div className="mt-2 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-6 bg-white/20 sm:w-10" />
          <p
            className="
              text-[10px] font-medium uppercase
              tracking-[0.3em] text-white/35
              sm:text-[11px]
              transition-all duration-500
            "
          >
            {String(activeCoreIndex + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}
          </p>
          <span className="h-px w-6 bg-white/20 sm:w-10" />
        </div>
      </div>

      {/* =========================
          STYLES
      ========================= */}
      <style>{`
        .teamSwiper {
          width: 100%;
          padding-top: 32px;
          padding-bottom: 56px;
          overflow: visible;
        }

        .teamSwiper .swiper-wrapper {
          align-items: center;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .teamSwiper .swiper-slide {
          height: auto;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          transition:
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.6s ease,
            filter 0.6s ease;
        }

        /* SIDE CARDS — visible but receded for circular depth */
        .teamSwiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.55;
          filter: brightness(0.65) saturate(0.8);
        }

        /* Next/prev neighbors — slightly brighter */
        .teamSwiper .swiper-slide-prev,
        .teamSwiper .swiper-slide-next {
          opacity: 0.75;
          filter: brightness(0.85) saturate(0.95);
        }

        /* CENTER CARD — full glow + scale pop */
        .teamSwiper .swiper-slide-active {
          opacity: 1;
          filter: brightness(1) saturate(1);
          transform: scale(1.06);
          z-index: 10;
        }

        /* Red glow ring on active */
        .teamSwiper .swiper-slide-active > div {
          box-shadow:
            0 0 50px rgba(230, 57, 47, 0.2),
            0 25px 70px rgba(0, 0, 0, 0.6);
        }

        /* Slide shadows from coverflow */
        .teamSwiper .swiper-slide-shadow-left,
        .teamSwiper .swiper-slide-shadow-right {
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.35),
            transparent
          );
          border-radius: 0.75rem;
        }

        /* Hide default swiper nav buttons */
        .teamSwiper .swiper-button-next,
        .teamSwiper .swiper-button-prev {
          display: none;
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .teamSwiper {
            padding-top: 20px;
            padding-bottom: 48px;
          }
        }
      `}</style>
    </section>
  );
}
