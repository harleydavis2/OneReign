"use client";

import React, { useEffect, useState } from "react";
import siteContent from "@/content/site";

export default function FloatingWhatsApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkMenuState = () => {
      const open =
        document.body.classList.contains("menu-open") ||
        document.documentElement.getAttribute("data-menu-open") === "true";
      setIsMenuOpen(open);
    };

    checkMenuState();

    // Listen for custom event or mutation
    const handleMenuEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      if (customEvent.detail !== undefined && typeof customEvent.detail.open === "boolean") {
        setIsMenuOpen(customEvent.detail.open);
      } else {
        checkMenuState();
      }
    };

    window.addEventListener("onereign:menu-toggle", handleMenuEvent);

    const observer = new MutationObserver(() => {
      checkMenuState();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-menu-open"],
    });

    return () => {
      window.removeEventListener("onereign:menu-toggle", handleMenuEvent);
      observer.disconnect();
    };
  }, []);

  if (isMenuOpen) {
    return null;
  }

  return (
    <a
      href={siteContent.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#151519] shadow-2xl transition-all duration-200 hover:scale-105 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(198,255,77,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
      style={{
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.6)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="#C6FF4D"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M9.5 9a.5.5 0 0 0-.5.5v.1c0 2.2 1.8 4 4 4h.1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.4-.5l-1.2-.2a.5.5 0 0 0-.5.3l-.3.4a3.8 3.8 0 0 1-1.6-1.6l.4-.3a.5.5 0 0 0 .3-.5l-.2-1.2a.5.5 0 0 0-.5-.4h-1z" fill="#C6FF4D" stroke="none" />
      </svg>
    </a>
  );
}

