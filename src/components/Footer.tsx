"use client";

import {  Heart } from "lucide-react";

const socials = [
  { icon: "", href: "https://www.instagram.com/tech_kurukshetra", label: "Instagram" },
  { icon: "", href: "https://www.linkedin.com/company/tech-kurukshetra", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-[#EFE2C7] pt-16 pb-10 overflow-hidden border-t border-[#B88A3D]/30"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 z-0"
        style={{
          backgroundImage: `radial-gradient(#8A623B 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
        }}
      />
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.20] mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8322C]/40 to-transparent z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">

          {/* Brand + CTA */}
          <div className="flex flex-col items-start gap-5">
            <div className="inline-flex items-center justify-center px-3.5 py-2.5 bg-[#12100E] border border-[#B8322C]/40 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.25)]">
              <img
                src="/images/tk-logo.webp"
                alt="Tech Kurukshetra 2026"
                className="h-9 sm:h-10 w-auto max-w-[210px] object-contain"
              />
            </div>
            <p className="text-[#5A5043] text-sm leading-relaxed max-w-xs font-medium">
              Enter the mission. Master the unknown. The flagship national-level tech fest of Dept. of CSE(IOT,CS,BT), UEM Kolkata.
            </p>
            <a
              href="#countdown"
              className="inline-block border border-[#B8322C] bg-[#B8322C] font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-[#F7F1E5] shadow-[0_5px_15px_rgba(184,50,44,0.25)] hover:bg-[#962520] rounded-lg px-6 py-2.5 transition-colors"
            >
              Register Now →
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <h4 className="font-heading text-sm font-bold text-[#1D1B18] tracking-wider uppercase">
              Contact
            </h4>
            <ul className="flex flex-col items-start md:items-end gap-2 text-sm text-[#5A5043] font-medium">
              <li>
                <a href="mailto:tech.kurukshetra.uem@gmail.com" className="hover:text-[#B8322C] transition-colors">
                  📧 tech.kurukshetra.uem@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+911744233208" className="hover:text-[#B8322C] transition-colors">
                  📞 +91 1744-233208
                </a>
              </li>
              <li>📍 Dept. of CSE(IOT,CS,BT), UEM, Kolkata, West Bengal</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#B88A3D]/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-lg bg-[#F2ECE1]/80 border border-[#B88A3D]/40 flex items-center justify-center text-[#5A5043] hover:text-[#B8322C] hover:border-[#B8322C] hover:bg-[#F2ECE1] transition-all shadow-sm"
                  aria-label={social.label}
                >
                 
                </a>
              );
            })}
          </div>
          <p className="text-[#5A5043] text-xs font-accent font-semibold flex items-center gap-1 text-center">
            © 2026 Tech Kurukshetra, Dept. of CSE(IOT,CS,BT), UEM Kolkata. Made with{" "}
            <Heart className="size-3.5 text-[#B8322C] fill-[#B8322C]" /> by students.
          </p>
        </div>

      </div>
    </footer>
  );
}
