import React from "react";
import Image from "next/image";
import styles from "./ScreenshotFrame.module.css";

interface ScreenshotFrameProps {
  type?: "browser" | "phone";
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  urlBarText?: string;
  placeholderText?: string;
  className?: string;
}

export default function ScreenshotFrame({
  type = "browser",
  src,
  alt,
  width = 1200,
  height = 750,
  priority = false,
  urlBarText = "https://faultline.onereign.co",
  placeholderText,
  className = "",
}: ScreenshotFrameProps) {
  if (type === "phone") {
    return (
      <div className={`${styles.phoneContainer} ${className}`.trim()}>
        <div className={styles.phoneFrame}>
          <div className={styles.phoneNotch}>
            <div className={styles.phoneSpeaker} />
            <div className={styles.phoneCamera} />
          </div>
          <div className={styles.phoneScreen}>
            {src ? (
              <Image
                src={src}
                alt={alt}
                width={width || 390}
                height={height || 844}
                priority={priority}
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder}>
                <div className={styles.placeholderIcon}>📱</div>
                <p className={styles.placeholderTitle}>{alt}</p>
                {placeholderText && <p className={styles.placeholderMeta}>{placeholderText}</p>}
                <span className={styles.placeholderTag}>TODO(rajesh): Android Studio Emulator Pixel 7</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.browserFrame} ${className}`.trim()}>
      <div className={styles.browserHeader}>
        <div className={styles.trafficLights}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <div className={styles.urlBar}>
          <svg className={styles.lockIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className={styles.urlText}>{urlBarText}</span>
        </div>
      </div>
      <div className={styles.browserContent}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <p className={styles.placeholderTitle}>{alt}</p>
            {placeholderText && <p className={styles.placeholderMeta}>{placeholderText}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
