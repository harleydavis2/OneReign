import React from "react";

interface PillProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  dot?: boolean;
  className?: string;
}

export default function Pill({
  children,
  variant = "default",
  dot = false,
  className = "",
}: PillProps) {
  const variantStyles = {
    default: "border-white/10 bg-surface text-muted",
    accent: "border-accent/30 bg-accent/10 text-accent",
    muted: "border-white/5 bg-surface/50 text-muted/70",
  };

  const dotStyles = {
    default: "bg-muted",
    accent: "bg-accent shadow-[0_0_8px_rgba(198,255,77,0.6)]",
    muted: "bg-muted/50",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-display-sans text-xs font-medium tracking-wide ${variantStyles[variant]} ${className}`.trim()}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotStyles[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

