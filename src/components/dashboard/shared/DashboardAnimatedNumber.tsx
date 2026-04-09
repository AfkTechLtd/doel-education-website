"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface DashboardAnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  started?: boolean;
}

export default function DashboardAnimatedNumber({
  value,
  suffix = "",
  duration = 900,
  started = true,
}: DashboardAnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!started) return;

    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: duration / 1000,
      ease: [0.25, 0.8, 0.25, 1],
      onUpdate(latest) {
        setDisplay(Math.floor(latest));
      },
      onComplete() {
        setDisplay(value);
      },
    });

    return () => controls.stop();
  }, [duration, shouldReduceMotion, started, value]);

  const formatted =
    display >= 1000 ? display.toLocaleString("en-US") : String(display);

  return (
    <>
      {formatted}
      {suffix}
    </>
  );
}
