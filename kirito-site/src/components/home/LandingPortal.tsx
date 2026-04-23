"use client";

import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const DEFAULT_POINTER = { x: 50, y: 42, active: false };

const seeds = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${6 + index * 8}%`,
  top: `${18 + (index % 5) * 10}%`,
  delay: `${index * -1.35}s`,
  duration: `${12 + (index % 4) * 2}s`,
}));

const droplets = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  left: `${12 + index * 18}%`,
  top: `${16 + (index % 3) * 18}%`,
  size: `${70 + (index % 3) * 28}px`,
  delay: `${index * -1.6}s`,
}));

export function LandingPortal() {
  const [pointer, setPointer] = useState(DEFAULT_POINTER);
  const frameRef = useRef<number | null>(null);

  const updatePointer = useEffectEvent((event: PointerEvent) => {
    const next = {
      x: Number(((event.clientX / window.innerWidth) * 100).toFixed(2)),
      y: Number(((event.clientY / window.innerHeight) * 100).toFixed(2)),
      active: true,
    };

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setPointer(next);
      frameRef.current = null;
    });
  });

  const resetPointer = useEffectEvent(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setPointer(DEFAULT_POINTER);
      frameRef.current = null;
    });
  });

  useEffect(() => {
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const sceneShiftX = ((pointer.x - 50) / 50) * 18;
  const sceneShiftY = ((pointer.y - 45) / 45) * 14;
  const panelRotateX = ((pointer.y - 50) / 50) * -7;
  const panelRotateY = ((pointer.x - 50) / 50) * 9;

  const rootStyle = {
    "--pointer-x": `${pointer.x}%`,
    "--pointer-y": `${pointer.y}%`,
    "--pointer-glow": pointer.active ? "1" : "0.7",
  } as CSSProperties;

  return (
    <main className="landing-page" style={rootStyle}>
      <div
        aria-hidden="true"
        className="landing-scene"
        style={{
          transform: `translate3d(${sceneShiftX * -0.35}px, ${sceneShiftY * -0.2}px, 0) scale(1.03)`,
        }}
      >
        <div className="scene-sun" />
        <div className="scene-aura" />
        <div className="scene-ridge scene-ridge-back" />
        <div className="scene-ridge scene-ridge-mid" />
        <div className="scene-river" />
        <div className="scene-ridge scene-ridge-front" />
        <div className="scene-mist scene-mist-top" />
        <div className="scene-mist scene-mist-bottom" />
        <div className="scene-glow scene-glow-left" />
        <div className="scene-glow scene-glow-right" />

        {seeds.map((seed) => (
          <span
            key={seed.id}
            className="scene-seed"
            style={
              {
                "--seed-left": seed.left,
                "--seed-top": seed.top,
                "--seed-delay": seed.delay,
                "--seed-duration": seed.duration,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <section
        className="liquid-glass-panel"
        aria-label="Kirito 博客入口"
        style={{
          transform: `perspective(1400px) rotateX(${panelRotateX.toFixed(2)}deg) rotateY(${panelRotateY.toFixed(2)}deg) translate3d(0, 0, 0)`,
        }}
      >
        <div aria-hidden="true" className="liquid-glass-shine" />
        <div aria-hidden="true" className="liquid-glass-edge" />
        <div aria-hidden="true" className="liquid-glass-ripple" />

        {droplets.map((droplet) => (
          <span
            key={droplet.id}
            aria-hidden="true"
            className="liquid-droplet"
            style={
              {
                "--drop-left": droplet.left,
                "--drop-top": droplet.top,
                "--drop-size": droplet.size,
                "--drop-delay": droplet.delay,
              } as CSSProperties
            }
          />
        ))}

        <h1 className="landing-title">这是Kirito的博客</h1>
      </section>

      <Link href="/blog" className="landing-enter-button">
        进入博客
      </Link>

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
