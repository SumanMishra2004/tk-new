"use client";

import DaysLeft from "@/components/Daysleft";
import OverlaySection from "@/components/DragonOverlay";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import TeamSection from "@/components/TeamSection";
import EventTimeline from "@/components/EventTimeline";
import Footer from "@/components/Footer";

import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-[#f1eeee]">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <DaysLeft />
        <OverlaySection />
        <EventsSection />
        <GallerySection />
        <TeamSection />
      
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
