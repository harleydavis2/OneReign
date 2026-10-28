"use client";

import React from "react";

interface RollTextProps {
  text: string;
  className?: string;
}

/**
 * Visuvate-style Rolling Character Flip Component
 * Renders characters in two stacked spans with staggered 18ms transition delays.
 * select-none prevents letter duplication in selection/clipboard.
 */
export default function RollText({ text, className = "" }: RollTextProps) {
  const chars = text.split("");

  return (
    <span className={`vv-roll relative inline-flex ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex select-none pointer-events-none">
        {chars.map((char, i) => (
          <span
            key={i}
            className="vv-roll-char select-none"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="select-none">{char === " " ? "\u00A0" : char}</span>
            <span className="select-none">{char === " " ? "\u00A0" : char}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
