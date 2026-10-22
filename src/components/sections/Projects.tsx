'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Github, ExternalLink, Star, GitFork, Sparkles, Code2 } from 'lucide-react';
import Link from 'next/link';
import { siteConfig, ProjectData } from '@/config/site';

const CATEGORY_FILTERS = ['All', 'AI & Agents', 'Computer Vision', 'Full Stack'];

export default function Projects() {
    const [projects, setProjects] = useState<ProjectData[]>(siteConfig.projects);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('/api/github/projects');
                if (res.ok) {
                    const data = await res.json();
                    if (isSubscribed && data.projects && Array.isArray(data.projects)) {
                        setProjects(data.projects);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch dynamic projects from GitHub API:', err);
            } finally {
                if (isSubscribed) setIsLoading(false);
            }
        };

        fetchProjects();

        return () => {
            isSubscribed = false;
        };
    }, []);

    const filteredProjects = projects.filter((project) => {
        if (selectedFilter === 'All') return true;
        if (selectedFilter === 'AI & Agents') {
            return (
                project.badge.includes('AI') ||
                project.badge.includes('Agent') ||
                project.badge.includes('FinTech')
            );
        }
        if (selectedFilter === 'Computer Vision') {
            return (
                project.badge.includes('Vision') ||
                project.badge.includes('XAI') ||
                project.badge.includes('Medical')
            );
        }
        if (selectedFilter === 'Full Stack') {
            return (
                project.badge.includes('Full-Stack') ||
                project.badge.includes('SaaS') ||
                project.badge.includes('Web')
            );
        }
        return true;
    });

    return (
        <section id="projects" className="py-24 relative z-10 bg-black/40">
            {/* Ambient Background Accents */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <SectionHeading title="Featured Systems" subtitle="Live GitHub Projects & Architectures" />

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-12">
                    {CATEGORY_FILTERS.map((filter) => {
                        const active = selectedFilter === filter;
                        return (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
                                    active
                                        ? 'bg-primary text-[#050807] font-bold border-primary shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105'
                                        : 'bg-[#0a1510]/80 text-gray-400 border-primary/20 hover:border-primary/60 hover:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={`${project.id}-${selectedFilter}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.2), ease: 'easeOut' }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group relative rounded-2xl flex flex-col justify-between overflow-hidden bg-[#09150E] border border-primary/20 hover:border-primary/80 transition-colors duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_35px_rgba(57,255,20,0.2)]"
                            >
                                {/* Top Banner with Matrix Visual Pattern */}
                                <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[#0c2317] via-[#09150E] to-[#040806] p-6 flex flex-col justify-between border-b border-primary/10">
                                    {/* Cyber Grid background */}
                                    <div className="absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,white,transparent)]">
                                        <div className="w-full h-full bg-[linear-gradient(to_right,#39FF14_1px,transparent_1px),linear-gradient(to_bottom,#39FF14_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                                    </div>

                                    {/* Hover glow */}
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-[35px] group-hover:bg-primary/40 transition-colors duration-500 pointer-events-none" />

                                    {/* Top Bar: Badge & Live GitHub Stats */}
                                    <div className="relative z-10 flex items-center justify-between w-full">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-primary/15 text-primary border border-primary/30 shadow-[0_0_12px_rgba(57,255,20,0.2)]">
                                            <Sparkles size={11} className="text-primary" />
                                            {project.badge}
                                        </span>

                                        <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
                                            <span className="inline-flex items-center gap-1 hover:text-primary transition-colors" title="GitHub Stars">
                                                <Star size={13} className="text-yellow-400 fill-yellow-400/20" />
                                                {project.stars}
                                            </span>
                                            <span className="inline-flex items-center gap-1 hover:text-primary transition-colors" title="Forks">
                                                <GitFork size={13} className="text-primary/70" />
                                                {project.forks}
                                            </span>
                                        </div>
                                    </div>

                                    {/* System Icon / Monogram */}
                                    <div className="relative z-10 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-black/60 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.15)]">
                                            <Code2 size={20} />
                                        </div>
                                        <span className="text-xs font-mono text-gray-400 truncate max-w-[200px]">
                                            github.com/{siteConfig.github.username}/{project.repo}
                                        </span>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack Pills */}
                                    <div>
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2.5 py-0.5 text-[11px] font-mono text-primary bg-primary/10 rounded-md border border-primary/20 group-hover:border-primary/40 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                            <Link
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#050807] border border-primary/30 text-white font-mono text-xs uppercase tracking-wider hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] group/btn"
                                            >
                                                <Github size={15} />
                                                <span>Source</span>
                                            </Link>

                                            {project.live && (
                                                <Link
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/20 border border-primary text-primary font-mono text-xs uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.25)]"
                                                >
                                                    <ExternalLink size={15} />
                                                    <span>Live Demo</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bottom Call to Action */}
                <div className="mt-16 text-center">
                    <Link
                        href={siteConfig.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-[#0a1510] border border-primary/40 text-primary hover:text-black hover:bg-primary transition-all duration-300 font-mono text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
                    >
                        <span>Explore All Repositories on GitHub</span>
                        <ExternalLink size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
