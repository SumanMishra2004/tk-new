"use client";

import { useEffect, useRef } from "react";
import { Rajdhani, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* Fonts                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Gallery Items                                                              */
/* -------------------------------------------------------------------------- */

const ITEMS = [
  {
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774069138/iot/tzw3sr3v2kabktbc0dwd.jpg",
    
    span: "col-span-2 row-span-3 col-start-1 row-start-1",
    speed: -40,
  },

  {
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774100346/iot/chjz9ii3pn3cs0ebqemt.jpg",
  
    span: "col-span-2 row-span-2 col-start-3 row-start-1",
    speed: 30,
  },

  {
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1789117210/qdmwofrxbt8xfzjshqhq.jpg",
   
    span: "col-span-2 row-span-4 col-start-5 row-start-1",
    speed: -20,
  },

  {
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774119939/iot/jq6lrjgalbxrqjpvbsfe.jpg",
   
    span: "col-span-2 row-span-2 col-start-3 row-start-3",
    speed: 50,
  },

  {
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1789116770/azuotaypg3vmj5w9iacn.jpg",
    
    span: "col-span-2 row-span-4 col-start-1 row-start-4",
    speed: -35,
  },

  {
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1789117523/gmbasbyiym0gyttxo0yv.jpg",
   
    span: "col-span-4 row-span-3 col-start-3 row-start-5",
    speed: 25,
  },
];

/* -------------------------------------------------------------------------- */
/* Placeholder Colors                                                         */
/* -------------------------------------------------------------------------- */

const PLACEHOLDER_COLORS = [
  "#1a1208",
  "#0e1a12",
  "#12100e",
  "#0d1018",
  "#18100d",
  "#0f1510",
];

/* -------------------------------------------------------------------------- */
/* Gallery Section                                                            */
/* -------------------------------------------------------------------------- */

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* -------------------------------------------------------------------- */
      /* Heading Reveal                                                       */
      /* -------------------------------------------------------------------- */

      const headingChildren = headingRef.current?.children;

      if (headingChildren) {
        gsap.fromTo(
          headingChildren,
          {
            y: 60,
            opacity: 0,
          },
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

      /* -------------------------------------------------------------------- */
      /* Gallery Cards                                                        */
      /* -------------------------------------------------------------------- */

      const cards =
        section.querySelectorAll<HTMLElement>(".gallery-card");

      cards.forEach((card) => {
        const speed = Number(card.dataset.speed ?? 0);

        const img =
          card.querySelector<HTMLImageElement>(".gallery-img");

        /* Card entrance */

        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
          },
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

        /* Image parallax */

        if (img && speed !== 0) {
          gsap.fromTo(
            img,
            {
              y: -speed,
            },
            {
              y: speed,
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

        /* Hover */

        if (img) {
          const handleMouseEnter = () => {
            gsap.to(img, {
              scale: 1.07,
              duration: 0.55,
              ease: "power2.out",
              overwrite: true,
            });
          };

          const handleMouseLeave = () => {
            gsap.to(img, {
              scale: 1,
              duration: 0.55,
              ease: "power2.out",
              overwrite: true,
            });
          };

          card.addEventListener(
            "mouseenter",
            handleMouseEnter
          );

          card.addEventListener(
            "mouseleave",
            handleMouseLeave
          );
        }
      });

      /* -------------------------------------------------------------------- */
      /* Marquee                                                               */
      /* -------------------------------------------------------------------- */

      const strip =
        section.querySelector<HTMLElement>(".marquee-track");

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

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* ================================================================== */}
      {/* TOP SEPARATOR                                                       */}
      {/* ================================================================== */}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E6392F]/60 to-transparent" />

      {/* ================================================================== */}
      {/* HEADER                                                              */}
      {/* ================================================================== */}

      <div
        ref={headingRef}
        className="
          mx-auto
          flex
          w-full
          max-w-[1500px]
          flex-col
          gap-4

          px-5
          pb-10
          pt-20

          sm:px-8
          sm:pb-12
          sm:pt-24

          md:px-10

          lg:px-12
          lg:pb-14
          lg:pt-28

          xl:px-16
        "
      >
        <p
          className={`
            ${heading.className}
            text-[10px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-[#E6392F]

            sm:text-[11px]
          `}
        >
          Tech Kurukshetra · Moments
        </p>

        <h2
          className="
            select-none
            uppercase
            leading-[0.88]
            tracking-tight
            text-[#F5F1E8]
          "
          style={{
            fontFamily: "var(--font-sketch)",
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
          }}
        >
          Gallery
        </h2>

        <p
          className={`
            ${body.className}
            max-w-[520px]
            text-sm
            leading-7
            text-[#A8A8A8]

            sm:text-base
          `}
        >
          Relive the energy, ideas, and camaraderie from previous
          editions of Tech Kurukshetra — captured frame by frame.
        </p>
      </div>

      {/* ================================================================== */}
      {/* GALLERY                                                             */}
      {/* ================================================================== */}

      <div
        ref={gridRef}
        className="
          mx-auto
          w-full
          max-w-[1500px]

          px-4

          sm:px-6

          md:px-8

          lg:px-12

          xl:px-16
        "
      >
        {/*
          IMPORTANT:
          The grid has a controlled height instead of aspect-ratio.

          This prevents the gallery from becoming excessively tall
          on wide desktop screens.
        */}

        <div
          className="
            grid
            w-full

            grid-cols-6
            grid-rows-7

            gap-2

            h-[520px]

            sm:h-[580px]
            sm:gap-3

            md:h-[640px]
            md:gap-4

            lg:h-[700px]

            xl:h-[760px]
          "
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`
                gallery-card
                group
                relative
                min-h-0
                min-w-0
                cursor-pointer
                overflow-hidden
                rounded-lg

                ${item.span}
              `}
              data-speed={item.speed}
              style={{
                backgroundColor:
                  PLACEHOLDER_COLORS[
                    i % PLACEHOLDER_COLORS.length
                  ],
              }}
            >
              {/* ---------------------------------------------------------- */}
              {/* IMAGE                                                       */}
              {/* ---------------------------------------------------------- */}

              {item.src && (
                <img
                  src={item.src}
                  alt={item.src}
                  className="
                    gallery-img
                    absolute
                    left-0
                    top-[-10%]
                    h-[120%]
                    w-full
                    object-cover

                    will-change-transform

                    transition-[filter]
                    duration-500

                    group-hover:brightness-110
                  "
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              {/* ---------------------------------------------------------- */}
              {/* OVERLAY                                                     */}
              {/* ---------------------------------------------------------- */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/20
                  to-transparent
                "
              />

              {/* ---------------------------------------------------------- */}
              {/* TEXT                                                        */}
              {/* ---------------------------------------------------------- */}

           
              {/* ---------------------------------------------------------- */}
              {/* HOVER BORDER                                                */}
              {/* ---------------------------------------------------------- */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-lg

                  ring-1
                  ring-[#E6392F]/0

                  transition-all
                  duration-500

                  group-hover:ring-[#E6392F]/60
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* MARQUEE                                                             */}
      {/* ================================================================== */}

      <div
        className="
          relative
          mt-16
          overflow-hidden
          bg-black
          py-6

          sm:mt-20
          sm:py-8
        "
      >
        {/* Left fade */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-10
            w-16
            bg-gradient-to-r
            from-black
            to-transparent

            sm:w-24
          "
        />

        {/* Right fade */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-10
            w-16
            bg-gradient-to-l
            from-black
            to-transparent

            sm:w-24
          "
        />

        <div
          className="
            marquee-track
            flex
            w-max
            whitespace-nowrap
            will-change-transform
          "
        >
          {Array.from({ length: 2 }).map((_, ri) => (
            <span
              key={ri}
              className="flex shrink-0 items-center"
            >
              {[
                "Hackathon",
                "Robotics",
                "Paper Presentation",
                "Gaming",
                "Design",
                "Innovation",
              ].map((word) => (
                <span
                  key={word}
                  className="flex shrink-0 items-center"
                >
                  <span
                    className={`
                      ${heading.className}
                      px-5
                      text-[clamp(2.5rem,6vw,5rem)]
                      font-bold
                      uppercase
                      tracking-tight
                      text-white/50

                      sm:px-8
                    `}
                  >
                    {word}
                  </span>

                  <span
                    className="
                      text-[clamp(1.5rem,3vw,2.5rem)]
                      text-[#E6392F]/40
                    "
                  >
                    ✦
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* BOTTOM                                                             */}
      {/* ================================================================== */}

      <div
        className="
          h-20
          w-full
          bg-gradient-to-b
          from-transparent
          to-black

          sm:h-28

          lg:h-32
        "
      />
    </section>
  );
}