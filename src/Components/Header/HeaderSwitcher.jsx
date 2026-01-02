import React, { useEffect, useState } from "react";
import HeaderTransparent from "./HeaderTransparent";
import HeaderWhite from "./HeaderWhite";

export default function HeaderSwitcher() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollTop > 80); // 👈 when to switch header
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-500">
      {/* Transparent Header */}
      <div
        className={`absolute top-0 w-full transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "opacity-0 -translate-y-2 pointer-events-none"
            : "opacity-100 translate-y-0 pointer-events-auto"
        }`}
      >
        <HeaderTransparent />
      </div>

      {/* White Header */}
      <div
        className={`absolute top-0 w-full transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <HeaderWhite />
      </div>
    </div>
  );
}
