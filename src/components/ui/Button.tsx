import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

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
}: ButtonProps) {
  const combinedClassName = `${styles.btn} ${styles[variant]} ${className}`.trim();

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    const finalRel = isExternal ? rel || "noopener noreferrer" : rel;
    const finalTarget = isExternal && !target ? "_blank" : target;

    return (
      <Link
        href={href}
        className={combinedClassName}
        onClick={onClick}
        target={finalTarget}
        rel={finalRel}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
