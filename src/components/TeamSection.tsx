"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Mousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

interface Member {
  name: string;
  role: string;
  image: string;
}


const members:Member[] = [
  {
    name: "Arista Seth",
    role: "Student Co-ordinator",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453635/zkvdrjqrsgivva6z7hfv.jpg",
  },
  {
    name: "Debarshi Banerjee",
    role: "Student Co-ordinator",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453637/yljcvnn5w1vcswbwoxe3.webp",
  },
  {
    name: "Roshan Yadav",
    role: "Student Co-ordinator",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453774/kqc5dt6wdla9qyspq5ip.jpg",
  },
  {
    name: "Ritam Das Gupta",
    role: "Lead Operative",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453639/dflgvldlstcebzdhagpb.jpg",
  },
  
  {
    name: "Sayan Mondal",
    role: "Web Dev Lead",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1789453639/h577anzfvej1ibpgvnvw.jpg",
  },
 
];

export default function TeamCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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
      className="relative w-full bg-black py-12 sm:py-16"
      id="team"
    >

      {/* HEADING */}
      <div ref={headingRef} className="mb-8 px-6 text-center sm:mb-10">
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
            mt-3
            max-w-md
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

      <div ref={carouselRef}>
      <Swiper
        modules={[
          EffectCoverflow,
          Pagination,
          Autoplay,
          Mousewheel,
        ]}

        effect="coverflow"

        /* =========================
           SLIDES
        ========================= */

        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        grabCursor={true}

        /* =========================
           AUTOPLAY
        ========================= */

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
          waitForTransition: true,
        }}

        /* Smooth movement */
        speed={900}

        /* =========================
           SUBTLE 3D COVERFLOW
        ========================= */

        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}

        /* =========================
           MOUSE WHEEL
        ========================= */

        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.5,
        }}

        /* =========================
           PAGINATION
        ========================= */

        pagination={{
          clickable: true,
        }}

        className="teamSwiper"
      >

        {members.map((member, index) => (
          <SwiperSlide
            key={`${member.name}-${index}`}
            className="
              !w-[170px]
              sm:!w-[210px]
              md:!w-[250px]
              lg:!w-[290px]
           
            "
          >

            {/* =========================
                CARD
            ========================= */}

            <div
              className="
                group
                relative
                aspect-3/4
                w-full
                overflow-hidden
                rounded-sm
                border
                border-white/9
              
                select-none
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
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.035]
                  "
                />

                {/* Dark overlay */}

               

                {/* Bottom gradient */}


              </div>
{/* Bottom gradient */}
<div
  className="
    pointer-events-none
    absolute
    inset-x-0
    bottom-0
    z-10
    h-[55%]
    bg-gradient-to-t
    from-black
    via-black/75
    to-transparent
  "
/>
              {/* TOP LEFT NUMBER */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  z-20
                  font-mono
                  text-[8px]
                  tracking-[0.2em]
                  text-white/35
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* TOP RIGHT DOT */}

              <div
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                "
              >
                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    border
                    border-white/50
                    bg-transparent
                    transition-all
                    duration-300
                    group-hover:scale-125
                    group-hover:bg-white
                  "
                />
              </div>

              {/* CONTENT */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  z-20
                  p-4
                  sm:p-5
                  md:p-6
                "
              >

                <p
                  className="
                    mb-1.5
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.28em]
                    text-white/45
                    sm:text-[8px]
                    md:text-[9px]
                  "
                >
                  Operative
                </p>

                <h3
                  className="
                    text-sm
                    font-bold
                    uppercase
                    leading-[1.05]
                    tracking-tight
                    text-white
                    sm:text-base
                    md:text-lg
                    lg:text-xl
                  "
                >
                  {member.name}
                </h3>

                <p
                  className="
                    mt-1.5
                    text-[7px]
                    uppercase
                    tracking-[0.18em]
                    text-white/45
                    sm:text-[8px]
                    md:text-[9px]
                    lg:text-[10px]
                  "
                >
                  {member.role}
                </p>

              </div>

              {/* HOVER BORDER */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-30
                  rounded-sm
                  border
                  border-white/0
                  transition-all
                  duration-500
                  group-hover:border-white/25
                "
              />

              {/* SCANLINE */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  z-30
                  h-px
                  bg-white/40
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              {/* INNER FRAME */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-[5px]
                  z-20
                  border
                  border-white/[0.035]
                "
              />

            </div>

          </SwiperSlide>
        ))}

      </Swiper>
      </div>

      {/* =========================
          STYLES
      ========================= */}

      <style>{`

        .teamSwiper {
          width: 100%;
          padding-top: 30px;
          padding-bottom: 55px;
        }

        .teamSwiper .swiper-wrapper {
          align-items: center;
        }

        .teamSwiper .swiper-slide {
          height: auto;

          transition:
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.9s ease;
        }

        /* SIDE CARDS */

        .teamSwiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.55;
        }

        /* CENTER CARD */

        .teamSwiper .swiper-slide-active {
          opacity: 1;
        }

        /* PAGINATION */

        .teamSwiper .swiper-pagination {
          bottom: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;
        }

        .teamSwiper .swiper-pagination-bullet {
          width: 5px;
          height: 5px;

          margin: 0 !important;

          border-radius: 9999px;

          background: rgba(255,255,255,0.35);

          opacity: 1;

          transition:
            width 0.35s ease,
            background 0.35s ease;
        }

        .teamSwiper .swiper-pagination-bullet-active {
          width: 22px;

          background: rgba(255,255,255,0.85);
        }

        /* MOBILE */

        @media (max-width: 640px) {

          .teamSwiper {
            padding-top: 20px;
            padding-bottom: 50px;
          }

        }

      `}</style>

    </section>
  );
}