import type { SVGProps } from "react";

const defaults: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type IconProps = SVGProps<SVGSVGElement> & { size?: number; className?: string };

const icon =
  (children: React.ReactNode) =>
  ({ size = 20, className, ...props }: IconProps) =>
    (
      <svg
        {...defaults}
        width={size}
        height={size}
        className={className}
        {...props}
      >
        {children}
      </svg>
    );

// Arrow up-right (like external link / go)
export const IconArrow = icon(
  <path d="M7 17L17 7M17 7H9M17 7v8" />
);

// Asterisk / spark
export const IconSpark = icon(
  <>
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
    <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
  </>
);

// Check
export const IconCheck = icon(
  <path d="M5 12l5 5 9-9" />
);

// Close / X
export const IconX = icon(
  <>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </>
);

// Search / circle
export const IconSearch = icon(
  <>
    <circle cx="11" cy="11" r="6" />
    <path d="M15.5 15.5L20 20" />
  </>
);

// Plus
export const IconPlus = icon(
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>
);

// Bookmark
export const IconBookmark = icon(
  <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" />
);

// Layers
export const IconLayers = icon(
  <>
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
  </>
);

// Monitor / screen
export const IconMonitor = icon(
  <>
    <rect x="2" y="3" width="20" height="13" rx="1" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="16" x2="12" y2="21" />
  </>
);

// Folder
export const IconFolder = icon(
  <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
);

// Briefcase
export const IconBriefcase = icon(
  <>
    <rect x="2" y="8" width="20" height="13" rx="2" />
    <path d="M16 8V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </>
);

// Cursor / arrow pointer
export const IconCursor = icon(
  <path d="M4 4l7.5 18 3-7 7-3L4 4z" />
);

// Chat / comment
export const IconChat = icon(
  <>
    <rect x="3" y="3" width="18" height="13" rx="2" />
    <path d="M3 16l4 5" />
  </>
);

// Play
export const IconPlay = icon(
  <path d="M6 4l14 8-14 8V4z" />
);

// Home
export const IconHome = icon(
  <>
    <path d="M3 12L12 4l9 8" />
    <path d="M9 21V12h6v9" />
    <path d="M3 12v9h18V12" />
  </>
);

// AI / brain chip
export const IconAI = icon(
  <>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="5" x2="12" y2="3" />
    <line x1="12" y1="19" x2="12" y2="21" />
    <line x1="5" y1="12" x2="3" y2="12" />
    <line x1="19" y1="12" x2="21" y2="12" />
  </>
);

// Cloud
export const IconCloud = icon(
  <>
    <path d="M18 10a6 6 0 10-11.9 1A5 5 0 106 21h12a4 4 0 000-8h-.5" />
  </>
);

// Integration / link
export const IconLink = icon(
  <>
    <path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5" />
    <path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5" />
  </>
);

// Marketing / megaphone
export const IconMegaphone = icon(
  <>
    <path d="M3 10v4h4l7 5V5L7 10H3z" />
    <path d="M17 9a4 4 0 010 6" />
  </>
);
