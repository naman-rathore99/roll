"use client";
import React, { useRef } from "react";
import { Lenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const stickyRef = useRef(null);
  const handContainerRef = useRef(null);
  const handRef = useRef(null);
  const handleImgeRef = useRef(null);
  const introRef = useRef(null);
  const introCopyRef = useRef(null);
  const h1ElementRef = useRef(null);
  const webContentRef = useRef(null);
  const containerRef = useRef(null);

  const introHeaders = [
    "<span>time to </span>brave new challenges",
    "<span>time to </span>brave the unknown",
    "<span>time to </span>brave your fears",
    "<span>time to </span>brave the future",
    "<span>time to </span>brave the elements",
    "<span>time to </span>brave the odds",
  ];

  useGSAP(
    () => {
      let currentCycle = -1;
      let imageRevealed = false;

      const updateHeaderText = () => {
        if (h1ElementRef.current) {
          h1ElementRef.current.innerHTML =
            introHeaders[Math.min(currentCycle, introHeaders.length - 1)];
        }
      };

      const pinnedHeight = window.innerHeight * introHeaders.length;

      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: `+=${pinnedHeight}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const rotationProgress = Math.min((progress * 8) / 5, 1);

          const totalRotation = rotationProgress * 1800 - 90;

          const rotationCycle = ((totalRotation + 90) % 360) - 90;

          gsap.set(handContainerRef.current, { rotationZ: rotationCycle });

          const newCycle = Math.floor((totalRotation + 90) / 360);
          if (
            newCycle !== currentCycle &&
            newCycle >= 0 &&
            newCycle < introHeaders.length
          ) {
            {
              currentCycle = newCycle;
              updateHeaderText();

              if (newCycle === 3 && !imageRevealed) {
                gsap.to(handleImgeRef.current, { opacity: 1, duration: 0.3 });
                gsap.to(introCopyRef.current?.querySelectorAll("p"), {
                  x: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1,
                });
                imageRevealed = true;
              } else if (newCycle !== 3 && imageRevealed) {
                gsap.to(handleImgeRef.current, { opacity: 0, duration: 0.3 });
                gsap.to(introCopyRef.current?.querySelectorAll("p"), {
                  x: 20,
                  opacity: 0,
                  duration: 0.5,
                  stagger: 0.1,
                });
                imageRevealed = false;
              }
            }
            if (progress <= 6 / 8) {
              const animationProgress = Math.max(
                0,
                (progress - 5 / 8) / (1 / 8)
              );
              const newHeight = gsap.utils.interpolate(
                52.75,
                100,
                animationProgress
              );

              const newOpacity = gsap.utils.interpolate(
                1,
                0,
                animationProgress
              );
              gsap.set(handRef.current, { height: `${newHeight}%` });
              gsap.set(introRef.current, { opacity: 1 });
              gsap.set(h1ElementRef.current, { opacity: newOpacity });
              gsap.set(h1ElementRef.current.querySelectorAll("span"), {
                opacity: newOpacity,
              });
            } else {
              gsap.set(introRef.current, { opacity: 0 });
            }

            if (progress <= 7 / 8) {
              const scaleProgress = Math.max(0, (progress - 6 / 8) / (1 / 8));
              const newScale = gsap.utils.interpolate(1, 20, scaleProgress);
              gsap.set(handRef.current, { scale: newScale });
            }
          }
        },
      });
      updateHeaderText();
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <>
      <Lenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <div className="container" ref={containerRef}>
          <section className="sticky" ref={stickyRef}>
            <div className="hand-container" ref={handContainerRef}>
              <div className="hand" ref={handRef}>
                <img src="./portrait.png" alt="img" ref={handleImgeRef} />
              </div>
            </div>
            <div className="intro" ref={introRef}>
              <h1 ref={h1ElementRef}>
                <span>time to </span>brave{" "}
              </h1>

              <div ref={introCopyRef}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Error vitae labore doloribus, tenetur incidunt impedit quas
                  sint dolor vero id molestias iure.
                </p>
                <p>
                  Minus voluptatum odio aliquam tempora! Voluptate, similique
                  fugiat!
                </p>
              </div>
            </div>

            <div className="web-content" ref={webContentRef}>
              <h1>AYN CORE</h1>
            </div>
          </section>

          <section className="about">
            <p>
              ( Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              vitae labore doloribus, tenetur incidunt impedit quas sint dolor
              vero id molestias iure. )
            </p>
          </section>
        </div>
      </Lenis>
    </>
  );
};

export default Home;
