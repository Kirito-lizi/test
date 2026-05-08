"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 55}%`,
    size: Math.random() < 0.8 ? 1 : 2,
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`,
  }));

  return (
    <div aria-hidden="true" className="star-field">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

function Clouds() {
  const clouds = [
    { id: 1, left: "-10%", top: "15%", width: "45%", delay: "0s", duration: "45s" },
    { id: 2, left: "30%", top: "8%", width: "35%", delay: "-15s", duration: "55s" },
    { id: 3, left: "60%", top: "20%", width: "40%", delay: "-30s", duration: "50s" },
    { id: 4, left: "-5%", top: "35%", width: "30%", delay: "-10s", duration: "60s" },
    { id: 5, left: "70%", top: "12%", width: "25%", delay: "-25s", duration: "48s" },
  ];

  return (
    <div aria-hidden="true" className="cloud-layer">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            left: cloud.left,
            top: cloud.top,
            width: cloud.width,
            animationDelay: cloud.delay,
            animationDuration: cloud.duration,
          }}
        />
      ))}
    </div>
  );
}

function ShootingStar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(true);
      setTimeout(() => setActive(false), 1500);
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(interval);
  }, []);

  if (!active) return null;

  const startLeft = 20 + Math.random() * 60;
  const startTop = 5 + Math.random() * 25;

  return (
    <div
      aria-hidden="true"
      className="shooting-star"
      style={{
        left: `${startLeft}%`,
        top: `${startTop}%`,
      }}
    />
  );
}

function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <Link href="/blog" className="scroll-link">
        <span className="scroll-arrow" />
        <span className="scroll-text">探索更多</span>
      </Link>
    </div>
  );
}

export function LandingPortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="sunset-hero">
      <div aria-hidden="true" className="sunset-sky" />
      <div aria-hidden="true" className="sunset-horizon" />
      <div aria-hidden="true" className="sunset-sea" />
      <div aria-hidden="true" className="sunset-glow" />

      {mounted && <StarField />}
      {mounted && <Clouds />}
      {mounted && <ShootingStar />}

      <div className="sunset-content">
        <h1 className="sunset-title">
          Kirito 的个人博客
        </h1>
        <p className="sunset-motto">
          Stay hungry, stay foolish.
        </p>
        <div className="sunset-divider" />
        <p className="sunset-subtitle">
          记录技术、设计与生活的碎片
        </p>
      </div>

      <ScrollIndicator />

      <footer className="landing-footer">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener"
        >
          皖ICP备2026006680号-1
        </a>
      </footer>
    </main>
  );
}
