'use client';

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function AnimatedNumber({
  target,
  suffix,
  duration = 1800,
  started,
}: {
  target: number;
  suffix: string;
  duration?: number;
  started: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started) return;

    const controls = animate(0, target, {
      duration: duration / 1000,
      ease: [0.25, 0.8, 0.25, 1],
      onUpdate(latest) {
        setDisplay(Math.floor(latest));
      },
      onComplete() {
        setDisplay(target);
      },
    });

    return () => {
      controls.stop();
    };
  }, [started, target, duration]);

  const formatted =
    display >= 1000 ? display.toLocaleString("en-US") : String(display);

  return (
    <>
      {formatted}
      {suffix}
    </>
  );
}
