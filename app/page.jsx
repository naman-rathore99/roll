"use client";

import { useEffect } from "react";

import Lenis from "lenis";
import Footer from "./components/Footer/Footer";
export default function HeroSection() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <section className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center overflow-hidden transition-colors duration-300">
        {/* Infinite Grid Background - Light */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
            backgroundSize: "325px 800px",
          }}
        />
        {/* Infinite Grid Background - Dark */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
            backgroundSize: "325px 800px",
          }}
        />

        {/* Foreground Content */}
        <div className="relative z-1 text-center px-6 flex flex-col items-stretch">
          {/* DEVELOPMENT aligned left */}
          <div className="relative text-center px-6 flex flex-col items-baseline">
            <h1 className="text-[18rem] md:text-[12rem] font-bold leading-tight">
              DEVELOPMENT
            </h1>
          </div>
          {/* AGENCY aligned right */}
          <div className="relative text-center px-2 flex flex-col items-end">
            <h2 className="text-[8rem] md:text-[7rem] font-bold mt-4 leading-tight">
              AGENCY
            </h2>
          </div>
          {/* Paragraph */}
          <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            YOU HAVE A PROJECT IDEA BUT YOU'RE LOST WITH ALL THE TECH STUFF?
            <br />
            LET US HANDLE IT AND MAKE IT HAPPEN!
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
