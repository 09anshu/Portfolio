'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { GitHubCalendar } from 'react-github-calendar';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

// You would replace this with actual GitHub API fetching in a real scenario
// For demonstration, we'll use placeholder numbers but actual react-github-calendar.

export default function GithubActivity() {
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState([
        { label: "Total Contributions", value: "..." },
        { label: "Public Repos", value: "..." },
        { label: "Followers", value: "..." },
        { label: "Following", value: "..." },
    ]);
    const username = siteConfig.github.username;

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);

        // Fetch real GitHub stats
        const fetchGitHubStats = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setStats([
                        { label: "Total Contributions", value: "1,245+" }, // GitHub calendar package handles total contributions natively, but for the stat block we need a scrape or graphql api to get exact total contributions easily. We can use a placeholder for now or fetch it from a 3rd party service.
                        { label: "Public Repos", value: data.public_repos.toString() },
                        { label: "Followers", value: data.followers.toString() },
                        { label: "Following", value: data.following.toString() },
                    ]);
                } else {
                    console.error("Failed to fetch GitHub stats");
                }
            } catch (error) {
                console.error("Error fetching GitHub stats:", error);
            }
        };

        fetchGitHubStats();
    }, []);

    return (
        <section id="github" className="py-24 relative z-10 bg-[#070b09]">
            <div className="container mx-auto px-6 lg:px-12">
                <SectionHeading title="Open Source" subtitle="GitHub Activity & Stats" />

                <div className="max-w-6xl mx-auto">
                    {/* Animated Counters */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-6 text-center border-b-2 border-primary/20 hover:border-primary transition-colors bg-gradient-to-t from-primary/5 to-transparent rounded-t-lg"
                            >
                                <motion.h4
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, type: "spring" }}
                                    className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] mb-2"
                                >
                                    {stat.value}
                                </motion.h4>
                                <div className="text-gray-400 text-xs tracking-widest uppercase font-mono">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* GitHub Heatmap */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                        className="p-6 md:p-8 pb-10 rounded-2xl bg-[#050807] border border-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-x-auto relative group"
                    >
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-wider flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                            @{username} contributions
                        </h3>

                        <div className="w-full flex justify-center text-gray-300">
                            {mounted && (
                                <div className="github-calendar-wrapper w-full flex justify-center filter drop-shadow-[0_0_2px_#39FF14] [&>svg]:w-full [&>svg]:max-w-full">
                                    <GitHubCalendar
                                        username={username}
                                        colorScheme="dark"
                                        theme={{
                                            dark: ['#0f2f1f', '#195e38', '#258b52', '#31b96c', '#39FF14']
                                        }}
                                        blockSize={13.5}
                                        blockMargin={4.5}
                                        fontSize={13}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
