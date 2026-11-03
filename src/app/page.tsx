"use client";

import { useState, useCallback } from "react";
import DaysLeft from "@/components/Daysleft";
import OverlaySection from "@/components/DragonOverlay";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import BoardingPassSection from "@/components/BoardingPassSection";
import SponsorsSection from "@/components/SponsorsSection";
import FAQSection from "@/components/FAQSection";
import LocationContact from "@/components/LocationContact";
import HeroSection from "@/components/HeroSection";
import LiveUpdatesBar from "@/components/LiveUpdatesBar";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { usePageReady } from "@/hooks/usePageReady";

// Set to "original" to restore each section's existing background treatment.
const SITE_VISUAL_THEME: "parchment" | "original" = "original";

export default function LandingPage() {
  // True once both the video and document are ready
  const pageReady = usePageReady("video");

  // True once the exit animation fully completes — this unmounts the overlay
  const [loaderExited, setLoaderExited] = useState(false);

  const handleExited = useCallback(() => {
    setLoaderExited(true);
  }, []);

  return (
    <div
      className={`min-h-screen bg-black text-[#f1eeee] ${
        SITE_VISUAL_THEME === "parchment" ? "site-theme-parchment" : ""
      }`}
    >
      {/* Loading overlay — rendered above everything, unmounted after exit */}
      {!loaderExited && (
        <LoadingScreen done={pageReady} onExited={handleExited} />
      )}

      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <LiveUpdatesBar />
        <DaysLeft />
        <OverlaySection />
        <EventsSection />
        <GallerySection />
        <TeamSection />
        <BoardingPassSection />
        <SponsorsSection />
        <FAQSection />
        <LocationContact />
      </main>
      <Footer />
    </div>
  );
}
