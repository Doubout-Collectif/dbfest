import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { grindyBrush, thunder } from "./fonts";
import { SanityLive } from "@/sanity/lib/live";

import Navbar from "@/components/Navbar";
import { LogoDockProvider } from "@/components/Logo-dock-context";
import SmoothScroll from "@/components/SmoothScroll";
import { FrameProvider } from "@/components/frame/Frame-context";
import ViewportFrame from "@/components/frame/ViewportFrame";
import IntroSequence from "@/components/frame/IntroSequence";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DBCFEST - 10 ans de Doubout Collectif",
  description: "DBCFEST 1er festival de Doubout Collectif en Guyane pour ses 10 ans. Musique consciente, art engagé et culture urbaine, entre mémoire et célébration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${thunder.variable} ${grindyBrush.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <SmoothScroll>
          <FrameProvider>
            <LogoDockProvider>
              <Navbar />
              {children}
            </LogoDockProvider>
            <ViewportFrame />
            <IntroSequence />
          </FrameProvider>
        </SmoothScroll>

        <SanityLive />
      </body>
    </html>
  );
}