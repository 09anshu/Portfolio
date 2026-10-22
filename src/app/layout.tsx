import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "A.dev | AI/ML Portfolio",
  description: "Modern futuristic developer portfolio for an AI/ML Engineer and Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-white`}
      >
        <LoadingScreen />
        <CustomCursor />
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
