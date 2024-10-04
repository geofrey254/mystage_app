import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loading from "./loading";
import { Suspense } from "react";
import Footer from "@/components/Footer";

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  title: "MyStage - Find Your Stop",
  description:
    "Tell us where you're headed, and let us find the perfect bus stage for you. No more wandering or second-guessing—just enter your destination, and we'll guide you directly there.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
