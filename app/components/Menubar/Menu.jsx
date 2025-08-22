"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import "./menu.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const MenuItem = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Project", link: "/project" },
  { title: "Contact", link: "/contact" },
];

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef(null);
const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // GSAP animation
  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0% , 100% 0%,100% 100% , 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: containerRef }
  );

  // Handle menu open/close
  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);

  // Detect current theme
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));

    // Optional: watch for theme changes dynamically
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="menu-container" ref={containerRef}>
      <div className="menu-bar">
        <div className="menu-logo" >
          <Link href="/" >
            Logo
          </Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p
            style={{ color: isDark ? "#fff" : "#000" }}
            className=" text-black  dark:text-white"
          >
            {isDark ? "☰" : "☰"}
          </p>
        </div>
      </div>

      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-close" onClick={toggleMenu}>
            <p style={{ color: isDark ? "#fff" : "#000" }}>Close</p>
          </div>
        </div>
        <div className="menu-close-icon" onClick={toggleMenu}>
          <p style={{ color: isDark ? "#fff" : "#000" }}>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {MenuItem.map((item, index) => (
              <div className="menu-link-items" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link
                    href={item.link}
                    className="menu-link"
                    style={{ color: isDark ? "#fff" : "#000" }}
                  >
                    {item.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#" style={{ color: isDark ? "#fff" : "#000" }}>
                X ↗
              </a>
              <a href="#" style={{ color: isDark ? "#fff" : "#000" }}>
                LinkedIn ↗
              </a>
              <a href="#" style={{ color: isDark ? "#fff" : "#000" }}>
                Dribbble ↗
              </a>
            </div>
            <div className="menu-info-col">
              <p style={{ color: isDark ? "#fff" : "#000" }}>
                coderUnitedagency@gmail.com
              </p>
              <p style={{ color: isDark ? "#fff" : "#000" }}>
                +1 (234) 567-8901
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
