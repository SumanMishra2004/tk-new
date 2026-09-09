"use client";

import DaysLeft from "@/components/Daysleft";
import OverlaySection from "@/components/DragonOverlay";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import Image from "next/image";


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-[#f1eeee]">
      <Navigation />
      <main className="flex flex-col flex-1">
        <HeroSection />

       
        <div className="relative">
          {/* ── Sticky countdown ── */}
          <div className="sticky top-0 z-0">
            <DaysLeft />
          </div>

          {/* ── Overlay section that slides over the counter ── */}
          <div className="relative z-10 -mt-8">
            <OverlaySection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* =========================================================
   OVERLAY SECTION
   Sits above the sticky countdown and slides over it.
   Replace this placeholder with real content.
========================================================= */
