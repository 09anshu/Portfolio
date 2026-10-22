'use client';

import { motion } from 'framer-motion';
import { Download, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

const titles = [
  "AI Tools Developer",
  "Full Stack Developer",
  "Generative AI Developer",
  "AI / ML Engineer",
  "AI Integration Developer",
  "LLM Workflow Builder",
];
export default function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentTitle = titles[titleIndex];
        const typingSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && text === currentTitle) {
            const timeout = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && text === '') {
            const waitTimeout = setTimeout(() => {
                setIsDeleting(false);
                setTitleIndex((prev) => (prev + 1) % titles.length);
            }, 500);
            return () => clearTimeout(waitTimeout);
        }

        const timeout = setTimeout(() => {
            setText(
                isDeleting
                    ? currentTitle.substring(0, text.length - 1)
                    : currentTitle.substring(0, text.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, titleIndex]);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden font-sans">
            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

            {/* Background Code Snippets */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                transition={{
                    opacity: { duration: 1, delay: 0.5 },
                    x: { duration: 1, delay: 0.5 },
                    y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }
                }}
                className="absolute left-[5%] xl:left-[10%] top-[25%] -z-10 hidden lg:block"
            >
                <div className="p-4 rounded-xl bg-[#09150E] border border-[#143B25] font-mono text-sm shadow-[0_0_20px_rgba(57,255,20,0.05)] hover:border-primary/50 transition-colors duration-300">
                    <span className="text-primary">def</span> <span className="text-[#00ff88]">predict</span>(img):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">return</span> <span className="text-[#39FF14]">model</span>(img)
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
                transition={{
                    opacity: { duration: 1, delay: 0.7 },
                    x: { duration: 1, delay: 0.7 },
                    y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.7 }
                }}
                className="absolute right-[5%] xl:right-[10%] bottom-[25%] -z-10 hidden lg:block"
            >
                <div className="p-4 rounded-xl bg-[#09150E] border border-[#143B25] font-mono text-sm shadow-[0_0_20px_rgba(57,255,20,0.05)] hover:border-primary/50 transition-colors duration-300">
                    <span className="text-gray-400">import</span> <span className="text-primary">torch</span><br />
                    <span className="text-gray-400">from</span> <span className="text-primary">torch</span> <span className="text-gray-400">import</span> nn<br />
                    <span className="text-primary">model</span> = nn.Sequential()
                </div>
            </motion.div>


            <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <span className="text-primary font-mono tracking-widest text-xs lg:text-sm uppercase bg-primary/5 px-6 py-2 rounded-full border border-primary/30 shadow-[0_0_15px_rgba(57,255,20,0.1)] inline-block">
                        Welcome to my universe
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary drop-shadow-[0_0_30px_rgba(57,255,20,0.8)] filter drop-shadow-[0_0_15px_#39FF14] font-black">Anshu</span><br />
                    <span className="font-semibold text-gray-200 tracking-tight">Aman</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-16 mb-10 flex justify-center items-center"
                >
                    <div className="text-2xl md:text-4xl font-mono text-primary flex items-center shadow-[0_0_15px_rgba(57,255,20,0.1)] drop-shadow-[0_0_5px_#39FF14]">
                        {text}
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            className="ml-1 w-1 h-6 md:h-8 bg-primary inline-block shadow-[0_0_8px_#39FF14]"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link
                        href="#projects"
                        className="group relative px-8 py-4 bg-primary text-[#050807] font-bold rounded-lg overflow-hidden shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.8)] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <span className="relative z-10">View Projects</span>
                        <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>

                    <Link
                        href="#contact"
                        className="group px-8 py-4 bg-transparent border border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-[0_0_10px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                    >
                        <Mail size={20} />
                        <span>Contact Me</span>
                    </Link>

                    <a
                        href={siteConfig.social.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-8 py-4 bg-[#0f2f1f] border border-primary/30 text-white font-bold rounded-lg hover:border-primary transition-all flex items-center gap-2 w-full sm:w-auto justify-center hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]"
                    >
                        <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                        <span>Resume</span>
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
}
