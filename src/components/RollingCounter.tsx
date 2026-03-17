"use client"
import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, motion, useInView } from "framer-motion";

interface RollingCounterProps {
    value: number;
    direction?: "up" | "down";
    suffix?: string;
}

export default function RollingCounter({ value, direction = "up", suffix = "" }: RollingCounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // 1. Create a motion value starting at 0 (or the target if going down)
    const count = useMotionValue(direction === "down" ? value : 0);

    // 2. Round the value so we don't see decimals during the roll
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            // 3. Trigger the animation when the component enters the viewport
            const animation = animate(count, value, {
                duration: 2, // 2 seconds for a premium feel
                ease: "easeOut", // Starts fast and slows down at the end
            });

            return animation.stop;
        }
    }, [isInView, count, value]);

    return (
        <motion.span ref={ref} className="text-3xl font-black text-slate-900">
            <motion.span>{rounded}</motion.span>
            {suffix}
        </motion.span>
    );
}
