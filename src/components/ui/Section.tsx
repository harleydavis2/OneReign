import React from "react";
import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  heading: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export default function Section({
  id,
  eyebrow,
  heading,
  intro,
  children,
  className = "",
  align = "left",
}: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">
        <div className={`${styles.header} ${align === "center" ? styles.center : ""}`}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className={styles.heading}>{heading}</h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
