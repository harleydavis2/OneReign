import localFont from "next/font/local";

export const interTight = localFont({
  src: [
    {
      path: "../../public/fonts/inter-tight-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-tight-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-tight-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-tight-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});
