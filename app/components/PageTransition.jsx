"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PageTransition = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState("");

  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !isTransitioning) {
        e.preventDefault();
        const href = link.getAttribute("href");
        const linkText = link.textContent || "Loading";
        startTransition(href, linkText);
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [isTransitioning]);

  const startTransition = async (href, linkText) => {
    setIsTransitioning(true);
    setTransitionText(linkText);

    if (overlayRef.current) {
      overlayRef.current.classList.add("active");
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));

    router.push(href);

    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.classList.remove("active");
      }
      setIsTransitioning(false);
      setTransitionText("");
    }, 400);
  };

  return (
    <>
      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] opacity-0 invisible transition-all duration-300 ease-in-out bg-black overflow-hidden"
      >
        {/* Sliding Panels */}
        <div className="absolute inset-0 flex">
          <div className="slide-panel w-1/3 h-full bg-gradient-to-b from-yellow-400 to-amber-500 transform -translate-y-full"></div>
          <div className="slide-panel w-1/3 h-full bg-gradient-to-b from-amber-500 to-yellow-600 transform -translate-y-full"></div>
          <div className="slide-panel w-1/3 h-full bg-gradient-to-b from-yellow-600 to-amber-400 transform -translate-y-full"></div>
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            {/* Loading Text */}
            <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 uppercase tracking-wider mb-8 opacity-0 loading-text">
              {transitionText}
            </h2>

     

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-yellow-400/20 rounded-full overflow-hidden mx-auto opacity-0 loading-bar">
              <div className="h-full bg-yellow-400 rounded-full transform -translate-x-full progress-fill"></div>
            </div>
          </div>
        </div>

        {/* Subtle Corner Accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-yellow-400/30 opacity-0 corner-accent"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-yellow-400/30 opacity-0 corner-accent"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-yellow-400/30 opacity-0 corner-accent"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-yellow-400/30 opacity-0 corner-accent"></div>
      </div>

      {/* Page Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isTransitioning ? "blur-sm scale-98 brightness-50" : ""
        }`}
      >
        {children}
      </div>

      <style jsx>{`
        .active {
          opacity: 1 !important;
          visibility: visible !important;
        }

        .active .slide-panel {
          animation: slideDown 0.8s ease-in-out forwards;
        }

        .active .slide-panel:nth-child(1) {
          animation-delay: 0s;
        }

        .active .slide-panel:nth-child(2) {
          animation-delay: 0.1s;
        }

        .active .slide-panel:nth-child(3) {
          animation-delay: 0.2s;
        }

        .active .loading-text {
          animation: fadeInUp 0.6s ease-out 0.4s forwards;
        }

        .active .loading-spinner {
          animation: fadeInUp 0.6s ease-out 0.6s forwards;
        }

        .active .loading-bar {
          animation: fadeInUp 0.6s ease-out 0.8s forwards;
        }

        .active .progress-fill {
          animation: progressSlide 1s ease-in-out 0.8s forwards;
        }

        .active .corner-accent {
          animation: fadeIn 0.4s ease-out 0.5s forwards;
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes progressSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .slide-panel {
            width: 100%;
          }

          .active .slide-panel:nth-child(2),
          .active .slide-panel:nth-child(3) {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default PageTransition;
