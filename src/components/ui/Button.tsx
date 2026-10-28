"use client";

import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "accent";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-text text-bg border-transparent hover:bg-white active:scale-[0.99]",
  secondary:
    "bg-transparent text-text border-white/10 hover:border-white/25 hover:bg-surface active:scale-[0.99]",
  accent:
    "bg-accent text-bg border-accent hover:brightness-105 active:scale-[0.99]",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  target,
  rel,
  ariaLabel,
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-display-sans text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

  const appliedVariant = variantClasses[variant];
  const combinedClasses = `${baseClasses} ${appliedVariant} ${className}`.trim();

  // Render text with letter roll hover effect
  const renderContent = () => {
    if (typeof children === "string") {
      const letters = children.split("");

      return (
        <span className="relative inline-flex items-center">
          {icon && iconPosition === "left" && (
            <span className="mr-2 inline-flex items-center transition-transform duration-200 group-hover:-translate-x-0.5">
              {icon}
            </span>
          )}

          {/* Accessible text for screen readers & clean clipboard selection */}
          <span className="sr-only">{children}</span>

          {/* Visual rolling animated letters: select-none prevents letter duplication in selection/clipboard */}
          <span
            className="inline-flex overflow-hidden leading-tight select-none pointer-events-none"
            aria-hidden="true"
          >
            {letters.map((char, index) => {
              const delay = `${index * 15}ms`;
              const displayChar = char === " " ? "\u00A0" : char;

              return (
                <span
                  key={index}
                  className="relative inline-block overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transform-none select-none"
                  style={{ transitionDelay: delay }}
                >
                  {/* Default visible character that slides up */}
                  <span
                    className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full motion-reduce:group-hover:transform-none select-none"
                    style={{ transitionDelay: delay }}
                  >
                    {displayChar}
                  </span>

                  {/* Duplicate character sliding up from below */}
                  <span
                    className="absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full motion-reduce:hidden select-none"
                    style={{ transitionDelay: delay }}
                  >
                    {displayChar}
                  </span>
                </span>
              );
            })}
          </span>

          {icon && iconPosition === "right" && (
            <span className="ml-2 inline-flex items-center transition-transform duration-200 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-2">
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    );
  };

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    const finalRel = isExternal ? rel || "noopener noreferrer" : rel;
    const finalTarget = isExternal && !target ? "_blank" : target;

    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={onClick}
        target={finalTarget}
        rel={finalRel}
        aria-label={ariaLabel}
      >
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {renderContent()}
    </button>
  );
}
