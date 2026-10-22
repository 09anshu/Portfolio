'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const jumpPointer = () => setClicked(true);
        const stopJump = () => setClicked(false);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', jumpPointer);
        window.addEventListener('mouseup', stopJump);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', jumpPointer);
            window.removeEventListener('mouseup', stopJump);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Outer Glow */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] shadow-[0_0_10px_#39FF14] mix-blend-screen"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: clicked ? 0.8 : isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] shadow-[0_0_8px_#39FF14]"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.1,
                }}
            />
        </>
    );
}
