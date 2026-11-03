"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Mousewheel,
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
}

const members: Member[] = [
  {
    name: "Arista Seth",
    role: "Managment and Logistics Lead",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453635/zkvdrjqrsgivva6z7hfv.jpg",
  },
  {
    name: "Debarshi Banerjee",
    role: "Technical Lead",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453637/yljcvnn5w1vcswbwoxe3.webp",
  },
  {
    name: "Roshan Yadav",
    role: "Convenor",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453774/kqc5dt6wdla9qyspq5ip.jpg",
  },
  {
    name: "Ritam Das Gupta",
    role: "Graphics Lead",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453639/dflgvldlstcebzdhagpb.jpg",
  },
  {
    name: "Sayan Mondal",
    role: "Web Dev Lead",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/WhatsApp_Image_2026-11-03_at_5.08.49_PM.jpg",
  },
  {
    name: "Asmita Chatterjee",
    role: "Social Media and PR",
    image: "https://res.cloudinary.com/vhf4myms/image/upload/v1789485665/Asmita_Chatterjee.jpg",
  },
  {
    name: "Rounak Ghosh",
    role: "Videography Lead",
    image: "https://res.cloudinary.com/r5icihkw/image/upload/f_auto/q_auto/WhatsApp_Image_2026-11-03_at_5.05.36_PM.jpg",
  },
];

export default function TeamCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    const heading = headingRef.current;
    const carousel = carouselRef.current;
    if (!heading || !carousel) return;

    // Set initial hidden states immediately so there's no flash
    gsap.set(heading, { y: 50, opacity: 0 });
    gsap.set(carousel, { y: 100, opacity: 0 });

    const headingTween = gsap.to(heading, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    const carouselTween = gsap.to(carousel, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      headingTween.scrollTrigger?.kill();
      carouselTween.scrollTrigger?.kill();
      headingTween.kill();
      carouselTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-16 sm:py-24"
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
          The people who make it happen — our core team driving every initiative behind the scenes.
        </p>
      </div>

      {/* SWIPER CONTAINER */}
      <div ref={carouselRef} className="relative w-full overflow-hidden">
        {/* NAV ARROWS — DESKTOP */}
        <button
          onClick={handlePrev}
          aria-label="Previous team member"
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
            md:flex lg:left-8
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
          onClick={handleNext}
          aria-label="Next team member"
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
            md:flex lg:right-8
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
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Mousewheel, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={1}
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
            slideShadows: true,
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.5,
          }}
          pagination={{
            clickable: true,
          }}
          className="teamSwiper"
        >
          {members.map((member, index) => (
            <SwiperSlide
              key={`${member.name}-${index}`}
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

                {/* Subtle base gradient strictly at bottom, avoiding the subject's face */}
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
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* TOP RIGHT DOT */}
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
          ))}
        </Swiper>

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
            {String(activeIndex + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}
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
          padding-top: 40px;
          padding-bottom: 60px;
          overflow: visible;
        }

        .teamSwiper .swiper-wrapper {
          align-items: center;
        }

        .teamSwiper .swiper-slide {
          height: auto;
          transition:
            transform 1s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.8s ease,
            filter 0.8s ease;
        }

        /* SIDE CARDS — visible but receded for circular feel */
        .teamSwiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.55;
          filter: brightness(0.65) saturate(0.8);
        }

        /* Next/prev neighbors — slightly brighter */
        .teamSwiper .swiper-slide-prev,
        .teamSwiper .swiper-slide-next {
          opacity: 0.7;
          filter: brightness(0.8) saturate(0.9);
        }

        /* CENTER CARD — full glow + scale pop */
        .teamSwiper .swiper-slide-active {
          opacity: 1;
          filter: brightness(1) saturate(1);
          transform: scale(1.08);
          z-index: 10;
        }

        /* Red glow ring on active */
        .teamSwiper .swiper-slide-active > div {
          box-shadow:
            0 0 50px rgba(230, 57, 47, 0.15),
            0 25px 70px rgba(0, 0, 0, 0.55);
        }

        /* Slide shadows from coverflow — subtle dark tint */
        .teamSwiper .swiper-slide-shadow-left,
        .teamSwiper .swiper-slide-shadow-right {
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.35),
            transparent
          );
          border-radius: 0.75rem;
        }

        /* PAGINATION */
        .teamSwiper .swiper-pagination {
          bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .teamSwiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          margin: 0 !important;
          border-radius: 9999px;
          background: rgba(255,255,255,0.25);
          border: 1px solid rgba(255,255,255,0.1);
          opacity: 1;
          transition:
            width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.4s ease,
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }

        .teamSwiper .swiper-pagination-bullet-active {
          width: 28px;
          background: #E6392F;
          border-color: rgba(230, 57, 47, 0.4);
          box-shadow: 0 0 12px rgba(230, 57, 47, 0.35);
        }

        /* Hide default swiper nav buttons */
        .teamSwiper .swiper-button-next,
        .teamSwiper .swiper-button-prev {
          display: none;
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .teamSwiper {
            padding-top: 24px;
            padding-bottom: 52px;
          }
        }
      `}</style>
    </section>
  );
}
