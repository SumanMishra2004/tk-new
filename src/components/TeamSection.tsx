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
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453639/h577anzfvej1ibpgvnvw.jpg",
  },
  {
    name: "Asmita Chatterjee",
    role: "Social Media and PR",
    image: "https://res.cloudinary.com/vhf4myms/image/upload/v1789485665/Asmita_Chatterjee.jpg",
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

      <div ref={carouselRef} className="relative">
        {/* NAVIGATION ARROWS */}
        <button
          onClick={handlePrev}
          className="
            team-nav-btn
            absolute left-2 sm:left-6 lg:left-10
            top-1/2 -translate-y-1/2 z-30
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
          aria-label="Previous team member"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="
            team-nav-btn
            absolute right-2 sm:right-6 lg:right-10
            top-1/2 -translate-y-1/2 z-30
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
          aria-label="Next team member"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <Swiper
          modules={[
            EffectCoverflow,
            Pagination,
            Autoplay,
            Mousewheel,
            Navigation,
          ]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}

          effect="coverflow"

          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          grabCursor={true}

          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
            waitForTransition: true,
          }}

          speed={1000}

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
                      bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]
                    "
                  />
                </div>

                {/* Bottom gradient — taller & richer */}
                <div
                  className="
                    pointer-events-none
                    absolute inset-x-0 bottom-0
                    z-10 h-[65%]
                    bg-gradient-to-t
                    from-black via-black/80 to-transparent
                  "
                />

                {/* TOP LEFT NUMBER */}
                <div
                  className="
                    absolute left-4 top-4 z-20
                    font-mono text-[9px] tracking-[0.25em]
                    text-white/30
                    transition-colors duration-300
                    group-hover:text-white/60
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* TOP RIGHT DOT */}
                <div className="absolute right-4 top-4 z-20">
                  <div
                    className="
                      h-2 w-2 rounded-full
                      border border-white/40 bg-transparent
                      transition-all duration-500
                      group-hover:scale-150
                      group-hover:border-[#E6392F]
                      group-hover:bg-[#E6392F]
                      group-hover:shadow-[0_0_10px_rgba(230,57,47,0.6)]
                    "
                  />
                </div>

                {/* CONTENT */}
                <div
                  className="
                    absolute inset-x-0 bottom-0 z-20
                    p-5 sm:p-6 md:p-7
                    transform transition-transform duration-500 ease-out
                    group-hover:translate-y-[-4px]
                  "
                >
                  {/* Thin accent line */}
                  <div
                    className="
                      mb-3 h-[1px] w-8
                      bg-[#E6392F]/60
                      transition-all duration-500
                      group-hover:w-12 group-hover:bg-[#E6392F]
                    "
                  />

                  <h3
                    className="
                      text-base font-bold uppercase
                      leading-[1.05] tracking-tight
                      text-white
                      sm:text-lg md:text-xl lg:text-2xl
                    "
                  >
                    {member.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[8px] uppercase
                      tracking-[0.2em]
                      text-white/50
                      sm:text-[9px] md:text-[10px] lg:text-[11px]
                      transition-colors duration-300
                      group-hover:text-white/70
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