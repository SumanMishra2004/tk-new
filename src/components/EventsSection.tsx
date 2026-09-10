"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    image: "/images/11.png",
    title: "The Algorithm",
    description: "The algorithm's workings are shrouded in complexity.",
    bg: "#2f251e",
  },
  {
    image: "/images/12.png",
    title: "The Dogma",
    description:
      "Enshrining the principles of conformity and reinforcing the status quo.",
    bg: "#43392f",
  },
  {
    image: "/images/9.png",
    title: "The Architects",
    description:
      "The elusive entities, lacking human form, operate in the shadows.",
    bg: "#2f251e",
  },
  {
    image: "/images/8.png",
    title: "The Wasteland",
    description:
      "This overlooked realm, a consequence of algorithmic judgments.",
    bg: "#43392f",
  },
  {
    image: "/images/7.png",
    title: "The Narrative",
    description: "The collective story sculpted by the architects.",
    bg: "#2f251e",
  },
  {
    image: "/images/10.png",
    title: "The Opulence",
    description: "The cognitive elite's wealth in the algorithmic society.",
    bg: "#43392f",
  },
];

export default function StickySections() {
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
    <div className="w-full text-white bg-[#12100e]">
      {/* Intro */}
      <section className="flex min-h-[100vh] w-full items-center justify-center px-6 py-[25vh] md:px-12">
        <p className="w-full max-w-[900px] text-[clamp(1.5rem,5vw,3rem)] leading-[1.2] font-medium tracking-tight">
          As data conglomerates reveled in the opulence of cognitive wealth, a
          silent underclass manifested, condemned to the digital periphery.
        </p>
      </section>

      {/* Sticky stack */}
      <div ref={sectionRef} className="flex flex-col items-center pb-40">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="stack-card w-[97%] md:w-[95%]"
            style={{
              position: "sticky",
              top: "10%",
              zIndex: index + 1,
              height: "90vh",
              backgroundColor: card.bg,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3vh",
              overflow: "hidden",
              padding: "0 1.5rem",
              textAlign: "center",
              transformOrigin: "top center",
              willChange: "transform, filter",
              borderRadius: "1rem",
            }}
          >
            {/* Image */}
            <img
              src={card.image}
              alt={card.title}
              style={{
                height: "35%",
                width: "auto",
                maxWidth: "70vw",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
            />

            {/* Title */}
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(2rem,6vw,5rem)",
                fontWeight: "normal",
                textTransform: "uppercase",
                lineHeight: 1,
                letterSpacing: "-0.095em",
                color: "white",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontWeight: "normal",
                  textTransform: "none",
                  letterSpacing: "normal",
                }}
              >
                The
              </span>
              <span style={{ fontWeight: 900 }}>
                {card.title.replace("The ", "")}
              </span>
            </h2>

            {/* Description */}
            <p
              style={{
                margin: 0,
                width: "100%",
                maxWidth: 500,
                padding: "0 1rem",
                fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                lineHeight: 1.5,
                opacity: 0.8,
                color: "white",
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>

   
    </div>
  );
}
