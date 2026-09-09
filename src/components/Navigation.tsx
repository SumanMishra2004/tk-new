
"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navLinks = [
  { label: "HOME", href: "#hero", key: "hero" },
  { label: "ABOUT", href: "#about", key: "about" },
  { label: "COUNTDOWN", href: "#countdown", key: "countdown" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 150;

      let currentSection = "hero";

      for (const link of navLinks) {
        if (link.key === "hero") continue;

        const section = document.getElementById(link.key);

        if (!section) continue;

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition >= sectionTop) {
          currentSection = link.key;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  const handleNavClick = (key: string, href: string) => {
    setOpen(false);

    if (key === "hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActiveSection("hero");
      return;
    }

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setActiveSection(key);
  };

  return (
    <nav
      id="main-nav"
      className="
        fixed
        top-2.5
        left-1/2
        -translate-x-1/2
        z-[10000]

        mx-auto
        w-[calc(100%-1.5rem)]
        max-w-[1480px]

        flex
        h-16
        items-center
        justify-between

        rounded-full
        border
        border-white/15

        bg-black/80
        px-4
        sm:px-5

        backdrop-blur-2xl

        shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(213,30,30,0.15)]
      "
    >
      {/* LOGOS */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0 min-w-0">
        {/* Tech Kurukshetra */}
        <button
          onClick={() => handleNavClick("hero", "#hero")}
          aria-label="Go to home"
          className="
            flex
            items-center
            border-none
            bg-transparent
            p-0
            cursor-pointer
          "
        >
          <img
            src="/tk-logo.webp"
            alt="Tech Kurukshetra"
            className="
              h-7
              sm:h-9
              w-auto
              max-w-[130px]
              sm:max-w-[210px]
              object-contain
              block
            "
          />
        </button>

        <div className="h-4 sm:h-6 w-px bg-white/25 shrink-0" />

        {/* IEDC */}
        <img
          src="/IEDC (2).webp"
          alt="IEDC"
          className="
            h-7
            sm:h-9
            w-auto
            object-contain
            block
            shrink-0
          "
        />

        <div className="h-4 sm:h-6 w-px bg-white/25 shrink-0" />

        {/* IEM / UEM */}
        <img
          src="/images/IEM_UEM.webp"
          alt="IEM & UEM"
          className="
            h-7
            sm:h-9
            w-auto
            max-w-[90px]
            sm:max-w-[120px]
            object-contain
            block
            shrink-0
          "
        />
      </div>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <button
            key={link.key}
            onClick={() => handleNavClick(link.key, link.href)}
            className={`
              relative
              px-4
              py-2
              rounded-full

              font-accent
              text-[11px]
              font-bold
              tracking-[0.18em]
              uppercase

              cursor-pointer
              transition-all
              duration-200

              ${
                activeSection === link.key
                  ? "text-white bg-white/10 border border-white/15"
                  : "text-white/60 hover:text-white/90 hover:bg-white/5"
              }
            `}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* REGISTER */}
        <button
          onClick={() => handleNavClick("countdown", "#countdown")}
          className="
            hidden
            sm:flex
            items-center
            gap-2

            px-4
            sm:px-5
            py-2

            rounded-full

            bg-[#d51e1e]
            border
            border-[#ff3b30]/40

            font-accent
            text-[11px]
            font-bold
            tracking-[0.18em]
            uppercase
            text-white

            shadow-[0_4px_15px_rgba(213,30,30,0.4)]

            hover:bg-[#ff2626]
            transition-colors

            cursor-pointer
          "
        >
          <img
            src="/images/herosection/registerNow.svg"
            alt=""
            className="h-4 w-4"
          />

          Register
        </button>

        {/* MOBILE MENU */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            id="mobile-menu-trigger"
            aria-label="Open menu"
            className="
              lg:hidden

              flex
              items-center
              justify-center

              w-9
              h-9

              rounded-full

              bg-white/10
              border
              border-white/15

              text-white

              hover:bg-white/20
              transition-colors

              cursor-pointer
            "
          >
            <Menu className="size-4" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              bg-[#0A0A0A]/95
              border-white/10
              backdrop-blur-xl
              w-72
            "
          >
            <SheetHeader>
              <SheetTitle className="sr-only">
                Navigation Menu
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 pt-8">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() =>
                    handleNavClick(link.key, link.href)
                  }
                  className={`
                    text-left
                    px-4
                    py-3
                    rounded-xl

                    font-accent
                    text-sm
                    font-bold
                    tracking-[0.15em]
                    uppercase

                    transition-colors
                    cursor-pointer

                    ${
                      activeSection === link.key
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}

              {/* MOBILE REGISTER */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() =>
                    handleNavClick("countdown", "#countdown")
                  }
                  className="
                    block
                    w-full

                    px-4
                    py-3

                    rounded-xl

                    bg-[#d51e1e]

                    font-accent
                    text-sm
                    font-bold
                    tracking-[0.15em]
                    uppercase

                    text-white
                    text-center

                    hover:bg-[#ff2626]
                    transition-colors

                    cursor-pointer
                  "
                >
                  Register Now
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
