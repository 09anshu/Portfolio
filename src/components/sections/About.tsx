'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Code, Brain, Database, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

const GITHUB_USERNAME = siteConfig.github.username;

interface GitHubStat {
    label: string;
    value: string;
}

export default function About() {
    const [stats, setStats] = useState<GitHubStat[]>([
        { label: 'Projects', value: '15+' },
        { label: 'Repos', value: '20+' },
        { label: 'Commits', value: '...' },
    ]);

    useEffect(() => {
        const fetchCommitCount = async () => {
            try {
                // GitHub Search Commits API returns total_count for all commits by the user
                const res = await fetch(
                    `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
                    { headers: { Accept: 'application/vnd.github.cloak-preview+json' } }
                );
                if (!res.ok) return;
                const data = await res.json();
                const totalCommits = data.total_count ?? 0;

                setStats([
                    { label: 'Projects', value: '15+' },
                    { label: 'Repos', value: '20+' },
                    { label: 'Commits', value: totalCommits.toLocaleString() },
                ]);
            } catch (error) {
                console.error('Failed to fetch GitHub commit count:', error);
            }
        };

        fetchCommitCount();
    }, []);

const features = [
    {
        icon: <Brain className="w-6 h-6 text-primary" />,
        title: "AI Tools & Workflows",
        desc: "LLM-powered tools built with LangChain, Gemini and Ollama that automate repetitive work."
    },
    {
        icon: <Code className="w-6 h-6 text-primary" />,
        title: "Full Stack Web",
        desc: "Fast, responsive apps built with React, Next.js, Node.js and FastAPI."
    },
    {
        icon: <Database className="w-6 h-6 text-primary" />,
        title: "Deployment & Data",
        desc: "Apps shipped with Docker, Vercel and Render, backed by MongoDB, MySQL and Redis."
    },
    {
        icon: <Cpu className="w-6 h-6 text-primary" />,
        title: "User-first Solutions",
        desc: "Finding real friction and shipping simple tools that people actually use."
    }
];
    return (
        <section id="about" className="py-24 relative z-10">
            <div className="container mx-auto px-6 lg:px-12">
                <SectionHeading title="About Me" subtitle="Who I am & What I do" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                            Innovating at the intersection of <br />
                            <span className="text-primary italic">AI & Web Technologies</span>
                        </h3>

                        <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                            <p>
                                I am a BTech Computer Science student specializing in AI & Machine Learning,
                                currently studying at <strong className="text-gray-200">SRM Institute of Science and Technology</strong>.
                            </p>
                            <p>
                                Technology who builds and deploys practical AI-powered tools and full-stack apps.
                            </p>
                            <p>
                                I look for real user friction and ship simple, usable solutions in Python, JavaScript, React, Next.js, FastAPI and LLM workflows.
                            </p>
                        </div>

                        {/* Live GitHub Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-10">
                            {stats.map((stat, i) => (
                                <div key={stat.label} className="border-l-2 border-primary pl-4">
                                    <motion.div
                                        key={stat.value}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="text-3xl font-black text-white"
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-xs text-primary uppercase tracking-wider font-mono mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Glassmorphism Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, rotateY: 30, z: -100 }}
                        whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, type: "spring" }}
                        className="perspective-1000"
                    >
                        <div className="relative p-8 rounded-2xl bg-[#0f2f1f]/30 border border-primary/20 backdrop-blur-xl shadow-[0_0_40px_rgba(57,255,20,0.1)] group hover:border-primary/50 transition-colors duration-500 overflow-hidden">
                            {/* Decorative corner glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[40px] group-hover:bg-primary/40 transition-colors duration-500" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-[40px] group-hover:bg-accent/40 transition-colors duration-500" />

                            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                                        className="p-6 rounded-xl bg-black/40 border border-white/5 hover:border-primary/30 hover:bg-[#050807]/80 transition-all hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] hover:-translate-y-1"
                                    >
                                        <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                        <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

