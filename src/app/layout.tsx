import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://techkurukshetra.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Tech Kurukshetra 2026 — The Ultimate Tech Summit",
    template: "%s | Tech Kurukshetra 2026",
  },
  description:
    "Tech Kurukshetra is the annual technical festival of UEM Kolkata — a battleground of innovation, code, and creativity. Join hackathons, robotics, design sprints, quizzes and more.",

  keywords: [
    "Tech Kurukshetra",
    "TK 2026",
    "UEM Kolkata tech fest",
    "techfest Kolkata",
    "hackathon Kolkata",
    "IEDC UEM",
    "college tech event",
    "coding competition",
    "robotics competition",
    "tech festival India",
    "Kolkata",
    "UEMK",
    "IEDC",
    "IEDC UEMK",
    "IEDC UEM Kolkata",
    "UEM Kolkata",
    "UEM Kolkata tech fest",
    "UEM Kolkata tech summit",
    "UEM Kolkata tech fest 2026",
    "UEM Kolkata tech summit 2026",
    "UEM Kolkata tech fest 2026",
    "UEM Kolkata tech summit 2026",
    "UEM Kolkata tech fest 2026",
    "UEM Kolkata tech summit 2026",
    "Hackathon",
    "Robotics",
    "Treasure hunt",
    "Quiz"
  ],

  authors: [{ name: "IEDC UEM Kolkata", url: BASE_URL }],
  creator: "IEDC UEM Kolkata",
  publisher: "University of Engineering & Management, Kolkata",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Tech Kurukshetra",
    title: "Tech Kurukshetra 2026 — The Ultimate Tech Fest",
    description:
      "The annual tech festival of UEM Kolkata. Hackathons, robotics, design sprints, quizzes and more — one epic battleground.",
    images: [
      {
        url: "/tk-logo.webp",
        width: 1200,
        height: 630,
        alt: "Tech Kurukshetra 2026",
      },
    ],
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tech Kurukshetra 2026 — The Ultimate Tech Fest",
    description:
      "The annual tech festival of UEM Kolkata. Hackathons, robotics, design sprints, quizzes and more.",
    images: ["/tk-logo.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Tech Kurukshetra 2026",
  description:
    "The annual technical festival of UEM Kolkata — a battleground of innovation, code, and creativity featuring hackathons, robotics, design sprints, quizzes and more.",
  url: BASE_URL,
  image: `${BASE_URL}/tk-logo.webp`,
  organizer: {
    "@type": "Organization",
    name: "IEDC UEM Kolkata",
    url: BASE_URL,
  },
  location: {
    "@type": "Place",
    name: "University of Engineering & Management, Kolkata",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden max-w-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full overflow-x-hidden max-w-full relative" suppressHydrationWarning>
        <SmoothScroll />
        <div className="w-full max-w-full overflow-x-hidden relative">
          {children}
        </div>
      </body>
    </html>
  );
}
