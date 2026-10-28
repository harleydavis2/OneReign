import React from "react";
import Link from "next/link";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  num: string;
  title: string;
  outcome: string;
  bullets: string[];
  href?: string;
}

export default function ServiceCard({
  num,
  title,
  outcome,
  bullets,
  href = "/contact",
}: ServiceCardProps) {
  // Cap at 3 bullets max as required
  const displayedBullets = bullets.slice(0, 3);

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.num}>{num}</span>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.outcome}>{outcome}</p>

        <ul className={styles.bullets}>
          {displayedBullets.map((bullet, idx) => (
            <li key={idx} className={styles.bulletItem}>
              <span className={styles.bulletDot} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.learnMore}>Learn more</span>
      </div>
    </Link>
  );
}
