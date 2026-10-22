'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
            {/* Moving Grid Background */}
            <div
                className="absolute inset-[-100%] bg-[linear-gradient(to_right,#0f2f1f_1px,transparent_1px),linear-gradient(to_bottom,#0f2f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
            />

            {/* Grid Animation */}
            <motion.div
                animate={{
                    y: [0, 64],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                }}
                className="absolute inset-[-100%] bg-[linear-gradient(to_right,#0f2f1f_1px,transparent_1px),linear-gradient(to_bottom,#0f2f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                }}
            />

            {/* Subtle glowing orbs */}
            <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>
    );
}
