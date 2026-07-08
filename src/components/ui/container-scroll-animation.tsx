"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./ContainerScroll.module.css";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far the container is scrolled through the viewport
      // 0 = top of container enters bottom of screen
      // 1 = bottom of container leaves top of screen
      const startTrigger = rect.top - viewportHeight;
      const endTrigger = rect.bottom;
      const totalDist = viewportHeight + rect.height;
      const currentScroll = viewportHeight - rect.top;
      
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollYProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Map scroll progress (0 to 1) to rotation and scale
  // At progress = 0 (not in view / start): rotateX = 20deg, scale = 0.9, translateY = 40px
  // At progress = 0.6 (fully centered): rotateX = 0deg, scale = 1.0, translateY = 0px
  const rotationProgress = Math.min(1, scrollYProgress / 0.6); // Complete rotation by 60% of scroll progress
  
  const rotateX = 20 - rotationProgress * 20;
  const scale = 0.92 + rotationProgress * 0.08;
  const translateY = (1 - rotationProgress) * 40;

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.titleWrapper}>
        {titleComponent}
      </div>
      <div 
        className={styles.cardWrapper}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
        }}
      >
        <div className={styles.cardInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
