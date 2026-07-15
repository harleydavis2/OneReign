"use client";
import React, { useEffect, useState } from "react";
import styles from "./Meteors.module.css";

interface MeteorInstance {
  id: number;
  left: string;
  delay: string;
  duration: string;
}

export function Meteors({ number = 20 }: { number?: number }) {
  const [meteorStyles, setMeteorStyles] = useState<MeteorInstance[]>([]);

  useEffect(() => {
    // Generate styles only on client to avoid hydration mismatch
    const generated: MeteorInstance[] = Array.from({ length: number }).map((_, idx) => {
      const randomLeft = Math.floor(Math.random() * 140 - 20) + "%";
      const randomDelay = (Math.random() * 8).toFixed(2) + "s";
      const randomDuration = (Math.random() * 8 + 4).toFixed(2) + "s";
      return {
        id: idx,
        left: randomLeft,
        delay: randomDelay,
        duration: randomDuration,
      };
    });
    setMeteorStyles(generated);
  }, [number]);

  return (
    <span className={styles.meteorContainer}>
      {meteorStyles.map((style) => (
        <span
          key={style.id}
          className={styles.meteor}
          style={{
            left: style.left,
            animationDelay: style.delay,
            animationDuration: style.duration,
          }}
        />
      ))}
    </span>
  );
}
