import React from "react";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: "Live" | "In progress" | string;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const isLive = status.toLowerCase() === "live";

  return (
    <span className={`${styles.badge} ${isLive ? styles.live : styles.inProgress} ${className}`.trim()}>
      <span className={styles.dot} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}
