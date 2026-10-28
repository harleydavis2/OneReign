import React from "react";
import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "mark+name" | "full";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  href?: string;
}

export default function Logo({
  variant = "mark+name",
  className = "",
  href,
}: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      {variant === "mark+name" ? (
        <>
          <Image
            src="/logo-mark.png"
            alt="OneReign logo"
            width={28}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="font-display-sans text-[20px] font-semibold tracking-tight text-text leading-none">
            OneReign
          </span>
        </>
      ) : (
        <div className="w-full max-w-[220px]">
          <Image
            src="/logo-full.png"
            alt="OneReign logo"
            width={220}
            height={220}
            className="h-auto w-full max-w-[220px] object-contain"
          />
        </div>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="OneReign home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

