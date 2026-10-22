'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
    return (
        <div className={cn("text-center mb-16", className)}>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-[#ededed] drop-shadow-[0_0_15px_rgba(57,255,20,0.3)] mb-4 inline-block"
            >
                {title.split('').map((letter, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, textShadow: "0 0 0px #39FF14" }}
                        whileInView={{ opacity: 1, textShadow: "0 0 15px #39FF14" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="inline-block hover:text-primary transition-colors cursor-default"
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                ))}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-primary text-sm md:text-base tracking-widest uppercase font-mono"
                >
                    {subtitle}
                </motion.p>
            )}

            {/* Decorative Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
                className="h-[2px] w-24 bg-primary mx-auto mt-6 shadow-[0_0_10px_#39FF14]"
            />
        </div>
    );
}
