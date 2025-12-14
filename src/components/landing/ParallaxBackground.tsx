"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ParallaxBackground() {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const moveX1 = useTransform(springX, [0, 1], [-20, 20]);
    const moveY1 = useTransform(springY, [0, 1], [-20, 20]);

    const moveX2 = useTransform(springX, [0, 1], [30, -30]);
    const moveY2 = useTransform(springY, [0, 1], [30, -30]);

    const moveX3 = useTransform(springX, [0, 1], [-10, 10]);
    const moveY3 = useTransform(springY, [0, 1], [-10, 10]);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX / innerWidth);
            mouseY.set(e.clientY / innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Gradient Orbs */}
            <motion.div
                style={{ x: moveX1, y: moveY1 }}
                className="absolute -top-[10%] -left-[10%] h-[50vh] w-[50vh] rounded-full bg-purple-500/20 blur-[100px]"
            />
            <motion.div
                style={{ x: moveX2, y: moveY2 }}
                className="absolute top-[20%] right-[10%] h-[40vh] w-[40vh] rounded-full bg-indigo-500/20 blur-[100px]"
            />
            <motion.div
                style={{ x: moveX3, y: moveY3 }}
                className="absolute bottom-[10%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-blue-500/10 blur-[100px]"
            />

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
    );
}
