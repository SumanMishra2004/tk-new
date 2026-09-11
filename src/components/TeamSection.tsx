
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rajdhani, Space_Grotesk } from "next/font/google";

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

/* ─────────────────────────────────────────────────────────────────────────────
   VELOCITY CONTROLS
   ───────────────────────────────────────────────────────────────────────────── */

/*
 * Initial / idle velocity of each row.
 *
 * This is intentionally NOT zero.
 * The rows continuously move even when the user is not scrolling.
 *
 * Row 1 = slow
 * Row 2 = medium
 * Row 3 = fast
 */
const INITIAL_VELOCITY = [0.75, 0.9, 1.15];

/*
 * How strongly SCROLL velocity affects each row.
 *
 * IMPORTANT:
 * These are deliberately different.
 *
 * Row 1 reacts mildly.
 * Row 2 reacts more.
 * Row 3 reacts the strongest.
 */
const SCROLL_VELOCITY_FACTOR = [0.65, 0.0052, 0.0075];

/*
 * Maximum additional velocity.
 *
 * Each row has its own cap.
 */
const MAX_SCROLL_BOOST = [3.0, 4.0, 5.0];

/*
 * How quickly the rows return to their initial velocity.
 *
 * Higher = reacts faster.
 * Lower = more inertia.
 */
const VELOCITY_LERP = [0.075, 0.095, 0.12];

/*
 * How long the velocity effect remains after the user stops scrolling.
 *
 * Higher = longer momentum.
 */
const VELOCITY_DECAY = 0.94;

/*
 * Direction of each row.
 */
const ROW_DIRECTION: Array<1 | -1> = [1, -1, 1];

/*
 * Base marquee duration.
 *
 * This determines the actual physical distance covered by the duplicated
 * row. Initial velocity then controls how quickly that animation runs.
 */
const ROW_DURATION = [48, 42, 36];

/*
 * Initial velocity is slightly different on first render.
 * This gives the marquee an immediate subtle movement.
 */
const INITIAL_KICK = [0.82, 0.9, 1.0];

/* ─────────────────────────────────────────────────────────────────────────────
   ENTRANCE / HOVER
   ───────────────────────────────────────────────────────────────────────────── */

const ENTRANCE_STAGGER = 0.035;
const ENTRANCE_DURATION = 0.65;

const CARD_TILT_MAX = 8;
const HOVER_TIMESCALE = 0.2;

/* ─────────────────────────────────────────────────────────────────────────────
   TEAM DATA
   ───────────────────────────────────────────────────────────────────────────── */

interface Member {
  name: string;
  role: string;
  dept?: string;
  avatar?: string;
}

interface Team {
  id: string;
  label: string;
  accent: string;
  members: Member[];
}

const TEAMS: Team[] = [
  {
    id: "faculty",
    label: "Faculty",
    accent: "#E6392F",
    members: [
      {
        name: "Dr. Aritra Sen",
        role: "Faculty Coordinator",
        dept: "Dept. of CSE",
      },
      {
        name: "Prof. Nandita Roy",
        role: "Technical Advisor",
        dept: "Dept. of CSE (IoT)",
      },
      {
        name: "Dr. Suman Ghosh",
        role: "Faculty In-charge",
        dept: "Dept. of CSE (CS)",
      },
      {
        name: "Prof. Ritika Bose",
        role: "Research Head",
        dept: "Dept. of CSE (BT)",
      },
      {
        name: "Dr. Partha Das",
        role: "Industry Liaison",
        dept: "Dept. of CSE",
      },
      {
        name: "Prof. Ananya Mitra",
        role: "Event Coordinator",
        dept: "Dept. of CSE (IoT)",
      },
    ],
  },
  {
    id: "mentors",
    label: "Mentors & Judges",
    accent: "#C0392B",
    members: [
      {
        name: "Vikram Malhotra",
        role: "Senior Engineer",
        dept: "Google India",
      },
      {
        name: "Priya Kapoor",
        role: "Product Manager",
        dept: "Microsoft",
      },
      {
        name: "Rahul Verma",
        role: "AI Researcher",
        dept: "IIT Kharagpur",
      },
      {
        name: "Debapriya Mukherjee",
        role: "Startup Founder",
        dept: "TechBridge Labs",
      },
      {
        name: "Ankit Sharma",
        role: "Cloud Architect",
        dept: "AWS India",
      },
      {
        name: "Soumya Banerjee",
        role: "ML Engineer",
        dept: "Meta AI",
      },
      {
        name: "Neha Joshi",
        role: "UX Lead",
        dept: "Flipkart",
      },
      {
        name: "Arijit Datta",
        role: "Blockchain Expert",
        dept: "Web3 Ventures",
      },
    ],
  },
  {
    id: "organizing",
    label: "Organizing Committee",
    accent: "#A93226",
    members: [
      {
        name: "Rohan Chatterjee",
        role: "General Secretary",
        dept: "IEDC UEM",
      },
      {
        name: "Sneha Biswas",
        role: "President",
        dept: "IEDC UEM",
      },
      {
        name: "Ayan Paul",
        role: "Technical Head",
        dept: "IEDC UEM",
      },
      {
        name: "Priti Kundu",
        role: "Design Head",
        dept: "IEDC UEM",
      },
      {
        name: "Arnab Ghosh",
        role: "Logistics Head",
        dept: "IEDC UEM",
      },
      {
        name: "Tanushree Dey",
        role: "Marketing Head",
        dept: "IEDC UEM",
      },
      {
        name: "Souvik Das",
        role: "Registration Head",
        dept: "IEDC UEM",
      },
      {
        name: "Mitu Sarkar",
        role: "Sponsorship Head",
        dept: "IEDC UEM",
      },
      {
        name: "Dibya Sen",
        role: "Outreach Head",
        dept: "IEDC UEM",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────────────────────── */

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const BG_PALETTE = [
  "#151515",
  "#171717",
  "#191919",
  "#1B1B1B",
  "#181818",
  "#1D1D1D",
  "#161616",
  "#1A1A1A",
];

function memberBg(name: string) {
  let h = 0;

  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }

  return BG_PALETTE[h % BG_PALETTE.length];
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMING SOON
   ───────────────────────────────────────────────────────────────────────────── */

function TeamComingSoon() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-6 py-20">
      <div className="flex items-center gap-3">
        <span className="h-[1px] w-10 bg-[#E6392F]/50" />
        <span
          className={`${heading.className} text-[10px] font-bold uppercase tracking-[0.3em] text-[#E6392F]`}
        >
          Tech Kurukshetra · People
        </span>
        <span className="h-[1px] w-10 bg-[#E6392F]/50" />
      </div>
      <p
        className="select-none uppercase leading-tight tracking-tight text-white/30"
        style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
      >
        Coming Soon
      </p>
      <p className={`${body.className} text-center text-sm text-white/40`}>
        Team details will be announced shortly.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────────────────────────────────────── */

export default function TeamSection() {
  const outerRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);

  const hasTeam = TEAMS.length > 0 && TEAMS.some((t) => t.members.length > 0);

  useLayoutEffect(() => {
    const outer = outerRef.current;

    if (!outer) return;

    const ctx = gsap.context(() => {
      /* ───────────────────────────────────────────────────────────────
         ENTRANCE
         ─────────────────────────────────────────────────────────────── */

      gsap.fromTo(
        outer.querySelectorAll(".ts-head > *"),
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        outer.querySelectorAll(".member-card"),
        {
          y: 35,
          opacity: 0,
          scale: 0.94,
          rotateX: 8,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: ENTRANCE_STAGGER,
          duration: ENTRANCE_DURATION,
          ease: "power3.out",
          delay: 0.1,
        },
      );

      /* ───────────────────────────────────────────────────────────────
         CREATE ROW MARQUEES
         ─────────────────────────────────────────────────────────────── */

      const rowTweens = trackRefs.current.map((track, index) => {
        if (!track) return null;

        const direction = ROW_DIRECTION[index];
        const duration = ROW_DURATION[index];

        gsap.set(track, {
          xPercent: direction === 1 ? 0 : -50,
        });

        return gsap.to(track, {
          xPercent: direction === 1 ? -50 : 0,
          duration,
          ease: "none",
          repeat: -1,
          paused: false,
        });
      });

      /* ───────────────────────────────────────────────────────────────
         CURRENT VELOCITY FOR EACH ROW
         ─────────────────────────────────────────────────────────────── */

      /*
       * Every row has its own velocity state.
       *
       * This is the important part:
       *
       * rowVelocity[0]
       * rowVelocity[1]
       * rowVelocity[2]
       *
       * are NOT the same.
       */
      const rowVelocity = [
        INITIAL_VELOCITY[0] * INITIAL_KICK[0],
        INITIAL_VELOCITY[1] * INITIAL_KICK[1],
        INITIAL_VELOCITY[2] * INITIAL_KICK[2],
      ];

      const targetVelocity = [
        ...rowVelocity,
      ];

      /*
       * Stores the last GSAP scroll velocity.
       *
       * GSAP gives us this directly through ScrollTrigger.
       */
      let scrollVelocity = 0;

      /*
       * This flag allows the velocity to naturally decay when scrolling
       * stops.
       */
      let hasScrollVelocity = false;

      /* ───────────────────────────────────────────────────────────────
         GSAP SCROLL VELOCITY TRACKER
         ─────────────────────────────────────────────────────────────── */

      const velocityTrigger = ScrollTrigger.create({
        trigger: outer,
        start: "top bottom",
        end: "bottom top",

        onUpdate: (self) => {
          /*
           * This is the actual scroll velocity from GSAP.
           *
           * We intentionally DO NOT use Math.abs() here.
           *
           * Positive  = scrolling down
           * Negative  = scrolling up
           *
           * The sign is useful for giving the velocity calculation
           * directional behavior.
           */
          scrollVelocity = self.getVelocity();

          hasScrollVelocity = Math.abs(scrollVelocity) > 0.01;
        },
      });

      /* ───────────────────────────────────────────────────────────────
         ROW HOVER STATE
         ─────────────────────────────────────────────────────────────── */

      const hoveredRows = TEAMS.map(() => false);

      const hoverHandlers = rowRefs.current.map((row, index) => {
        if (!row) return null;

        const enter = () => {
          hoveredRows[index] = true;
        };

        const leave = () => {
          hoveredRows[index] = false;
        };

        row.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);

        return {
          row,
          enter,
          leave,
        };
      });

      /* ───────────────────────────────────────────────────────────────
         VELOCITY ENGINE
         ─────────────────────────────────────────────────────────────── */

      const tickerFn = () => {
        /*
         * If there was scrolling recently, calculate a target velocity
         * for EACH ROW independently.
         */

        if (hasScrollVelocity) {
          TEAMS.forEach((_, index) => {
            /*
             * Absolute scroll speed.
             *
             * We use magnitude for speed because each marquee already
             * has its own direction.
             */
            const scrollSpeed = Math.abs(scrollVelocity);

            /*
             * Every row reacts differently.
             *
             * Example:
             *
             * Row 1:
             *  velocity × 0.0032
             *
             * Row 2:
             *  velocity × 0.0052
             *
             * Row 3:
             *  velocity × 0.0075
             */
            const boost =
              scrollSpeed *
              SCROLL_VELOCITY_FACTOR[index];

            targetVelocity[index] = Math.min(
              INITIAL_VELOCITY[index] + boost,
              INITIAL_VELOCITY[index] +
                MAX_SCROLL_BOOST[index],
            );
          });
        }

        /*
         * Once scrolling stops, gradually return every row to its
         * own initial velocity.
         */
        if (!hasScrollVelocity) {
          TEAMS.forEach((_, index) => {
            targetVelocity[index] =
              INITIAL_VELOCITY[index];
          });
        }

        /*
         * Smooth velocity interpolation.
         *
         * This creates the "momentum" feeling instead of instantly
         * jumping from 1x → 4x.
         */
        TEAMS.forEach((_, index) => {
          rowVelocity[index] +=
            (targetVelocity[index] -
              rowVelocity[index]) *
            VELOCITY_LERP[index];

          /*
           * Once velocity becomes very small, force it back to the
           * intended initial velocity.
           */
          if (
            Math.abs(
              rowVelocity[index] -
                INITIAL_VELOCITY[index],
            ) < 0.002
          ) {
            rowVelocity[index] =
              INITIAL_VELOCITY[index];
          }

          const tween = rowTweens[index];

          if (!tween) return;

          /*
           * Hover slows the row but DOES NOT stop it.
           */
          const hoverMultiplier = hoveredRows[index]
            ? HOVER_TIMESCALE
            : 1;

          /*
           * Actual final speed.
           *
           * This is different for every row.
           */
          const finalTimeScale =
            rowVelocity[index] *
            hoverMultiplier;

          tween.timeScale(finalTimeScale);
        });

        /*
         * Velocity decays toward zero.
         *
         * This is what makes the acceleration temporary.
         */
        scrollVelocity *= VELOCITY_DECAY;

        /*
         * Once the velocity becomes tiny, consider scrolling stopped.
         */
        if (Math.abs(scrollVelocity) < 0.15) {
          scrollVelocity = 0;
          hasScrollVelocity = false;
        }
      };

      gsap.ticker.add(tickerFn);

      /* ───────────────────────────────────────────────────────────────
         CARD POINTER TILT
         ─────────────────────────────────────────────────────────────── */

      const cards =
        outer.querySelectorAll<HTMLElement>(".member-card");

      const cardHandlers = Array.from(cards).map((card) => {
        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();

          const px =
            (event.clientX - rect.left) /
              rect.width -
            0.5;

          const py =
            (event.clientY - rect.top) /
              rect.height -
            0.5;

          gsap.to(card, {
            rotateY: px * CARD_TILT_MAX,
            rotateX: -py * CARD_TILT_MAX,
            scale: 1.035,
            z: 30,
            duration: 0.3,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            z: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);

        return {
          card,
          handleMove,
          handleLeave,
        };
      });

      /* ───────────────────────────────────────────────────────────────
         INITIAL REFRESH
         ─────────────────────────────────────────────────────────────── */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      /* ───────────────────────────────────────────────────────────────
         CLEANUP
         ─────────────────────────────────────────────────────────────── */

      return () => {
        velocityTrigger.kill();

        gsap.ticker.remove(tickerFn);

        hoverHandlers.forEach((handler) => {
          if (!handler) return;

          handler.row.removeEventListener(
            "mouseenter",
            handler.enter,
          );

          handler.row.removeEventListener(
            "mouseleave",
            handler.leave,
          );
        });

        cardHandlers.forEach(
          ({ card, handleMove, handleLeave }) => {
            card.removeEventListener(
              "mousemove",
              handleMove,
            );

            card.removeEventListener(
              "mouseleave",
              handleLeave,
            );
          },
        );
      };
    }, outer);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={outerRef}
      id="team"
      className="
        relative
        w-full
        
        
        overflow-hidden
        bg-black
        py-16
        text-white
        sm:py-20
        md:py-24
      "
    >
      {/* TOP LINE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-white/10
        "
      />

      {/* ───────────────────────────────────────────────────────────────
          HEADER
         ─────────────────────────────────────────────────────────────── */}

      <div
        className="
          ts-head
          flex
          flex-col
          gap-2
          px-5
          sm:px-8
          md:px-14
          lg:px-20
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
          Tech Kurukshetra · People
        </p>

        <h2
          className="
            select-none
            uppercase
            leading-[0.86]
            tracking-tight
            text-white
          "
          style={{
            fontFamily: "var(--font-sketch)",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
          }}
        >
          The Team
        </h2>
      </div>

      {/* ───────────────────────────────────────────────────────────────
          THREE PARALLAX ROWS
         ─────────────────────────────────────────────────────────────── */}

      {hasTeam ? (
      <div
        className="
          mt-10
          flex
          flex-col
          gap-10
          sm:mt-14
          sm:gap-12
          md:gap-14
        "
        style={{
          perspective: "1400px",
        }}
      >
        {TEAMS.map((team, index) => (
          <div
            key={team.id}
            ref={(element) => {
              rowRefs.current[index] = element;
            }}
            className="relative"
          >
            {/* ROW LABEL */}

            <div
              className="
                mb-3
                flex
                items-center
                justify-between
                px-5
                sm:px-8
                md:px-14
                lg:px-20
              "
            >
              <span
                className={`
                  ${heading.className}
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  sm:text-xs
                `}
                style={{
                  color: team.accent,
                }}
              >
                / {team.label}
              </span>

              <span
                className={`
                  ${body.className}
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/25
                `}
              >
                {String(team.members.length).padStart(
                  2,
                  "0",
                )}{" "}
                members
              </span>
            </div>

            {/* LEFT MASK */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-20
                w-14
                bg-gradient-to-r
                from-black
                to-transparent
                sm:w-24
                md:w-32
              "
            />

            {/* RIGHT MASK */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                z-20
                w-14
                bg-gradient-to-l
                from-black
                to-transparent
                sm:w-24
                md:w-32
              "
            />

            {/* ROW */}

            <div className="overflow-hidden">
              <div
                ref={(element) => {
                  trackRefs.current[index] = element;
                }}
                className="
                  flex
                  w-max
                  gap-3
                  sm:gap-4
                  md:gap-5
                "
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {[...team.members, ...team.members].map(
                  (member, memberIndex) => (
                    <MemberCard
                      key={`${team.id}-${member.name}-${memberIndex}`}
                      member={member}
                      accent={team.accent}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <TeamComingSoon />
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MEMBER CARD
   ───────────────────────────────────────────────────────────────────────────── */

function MemberCard({
  member,
  accent,
}: {
  member: Member;
  accent: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const bg = memberBg(member.name);

  return (
    <div
      ref={cardRef}
      className="
        member-card
        group
        relative
        h-[235px]
        w-[155px]
        shrink-0
        cursor-default
        overflow-hidden
        rounded-xl
        border
        border-white/[0.08]
        sm:h-[285px]
        sm:w-[185px]
        sm:rounded-2xl
        md:h-[330px]
        md:w-[215px]
        lg:h-[350px]
        lg:w-[225px]
      "
      style={{
        backgroundColor: bg,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* IMAGE */}

      <div className="absolute inset-0">
        {member.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.avatar}
            alt={member.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className={`
                ${heading.className}
                select-none
                text-5xl
                font-bold
                sm:text-6xl
                md:text-7xl
              `}
              style={{
                color: accent,
              }}
            >
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* IMAGE OVERLAY */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-black/10
          transition-colors
          duration-500
          group-hover:bg-black/0
        "
      />

      {/* BOTTOM GRADIENT */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-[60%]
        "
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.78) 32%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* HOVER BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-xl
          border
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          sm:rounded-2xl
        "
        style={{
          borderColor: `${accent}80`,
        }}
      />

      {/* INFO */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20
          flex
          flex-col
          gap-0.5
          px-3
          pb-3
          sm:px-3.5
          sm:pb-4
          md:px-4
          md:pb-5
        "
      >
        <p
          className={`
            ${heading.className}
            truncate
            text-[12px]
            font-bold
            uppercase
            leading-tight
            tracking-tight
            text-white
            sm:text-sm
            md:text-base
          `}
        >
          {member.name}
        </p>

        <p
          className={`
            ${body.className}
            truncate
            text-[9px]
            leading-4
            sm:text-[10px]
            md:text-[11px]
          `}
          style={{
            color: accent,
          }}
        >
          {member.role}
        </p>

        {member.dept && (
          <p
            className={`
              ${body.className}
              truncate
              text-[8px]
              leading-3
              text-white/45
              sm:text-[9px]
              sm:leading-4
              md:text-[10px]
            `}
          >
            {member.dept}
          </p>
        )}
      </div>

      {/* CORNER DOT */}

      <div
        className="
          pointer-events-none
          absolute
          right-2.5
          top-2.5
          z-30
          h-1.5
          w-1.5
          rounded-full
          opacity-50
          transition-all
          duration-300
          group-hover:scale-125
          group-hover:opacity-100
        "
        style={{
          backgroundColor: accent,
          boxShadow: `0 0 10px ${accent}`,
        }}
      />

      {/* BOTTOM ACCENT */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-30
          h-[2px]
          w-0
          -translate-x-1/2
          transition-all
          duration-500
          group-hover:w-2/3
        "
        style={{
          backgroundColor: accent,
          boxShadow: `0 0 10px ${accent}`,
        }}
      />
    </div>
  );
}