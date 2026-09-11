"use client";

import DaysLeft from "@/components/Daysleft";
import OverlaySection from "@/components/DragonOverlay";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import TeamSection from "@/components/TeamSection";
import EventTimeline from "@/components/EventTimeline";
import Footer from "@/components/Footer";
import BoardingPassSection from "@/components/BoardingPassSection";
import SponsorsSection from "@/components/SponsorsSection";
import FAQSection from "@/components/FAQSection";
import LocationContact from "@/components/LocationContact";

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
        <BoardingPassSection />
        <SponsorsSection />
        <FAQSection />
        <LocationContact />
      </main>
      <Footer />
    </div>
  );
}
