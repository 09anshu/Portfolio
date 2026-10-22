'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fix for overflowing scrollbar when loading
        document.body.style.overflow = 'hidden';

        const duration = 6000; // 6 seconds to load
        const intervalTime = 30;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            // Adding a little randomness to the loading to make it look real
            const randomJump = Math.random() > 0.8 ? 5 : 1;
            currentStep += randomJump;

            const currentProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
            setProgress(currentProgress);

            if (currentStep >= steps || currentProgress >= 100) {
                setProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = ''; // Restore scroll
                }, 600); // Wait a bit at 100%
            }
        }, intervalTime);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050807] font-mono text-primary"
                >
                    <div className="flex flex-col items-center max-w-sm w-full px-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl md:text-3xl font-bold tracking-wider mb-10 text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]"
                        >
                            &lt;DevPortfolio /&gt;
                        </motion.h1>

                        <div className="w-full text-sm md:text-base text-gray-400 mb-6 flex items-center justify-center">
                            <span className="text-[#39FF14] mr-3 font-bold">$</span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex items-center"
                            >
                                initializing portfolio
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                    className="inline-block w-[8px] h-[16px] bg-[#39FF14] shadow-[0_0_8px_#39FF14] ml-2"
                                />
                            </motion.span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-[3px] bg-[#143B25] overflow-hidden mb-6 relative">
                            {/* Progress Fill */}
                            <motion.div
                                className="h-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut", duration: 0.2 }}
                            />
                        </div>

                        <div className="text-xs md:text-sm text-gray-500 font-mono tracking-widest mt-2">
                            {progress}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
