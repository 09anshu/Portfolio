'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Award, ExternalLink, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { siteConfig, CertificationData } from '@/config/site';

export default function Certifications() {
    const certifications: CertificationData[] = siteConfig.certifications;

    return (
        <section id="certifications" className="py-24 relative z-10 bg-black/30">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <SectionHeading title="Certifications" subtitle="Industry Recognized & Verified Credentials" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 max-w-5xl mx-auto">
                    {certifications.map((cert, idx) => {
                        const isFeatured = !!cert.featured;

                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="group relative rounded-2xl flex flex-col justify-between overflow-hidden bg-[#09150E] border border-primary/25 hover:border-primary/80 transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_35px_rgba(57,255,20,0.18)]"
                            >
                                {/* Decorative subtle glow & matrix grid accent */}
                                <div className="absolute top-0 right-0 w-44 h-44 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors pointer-events-none" />
                                
                                <div className="p-8 relative z-10 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* Header Row: Issuer, Badge & Date */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                                                    <Award size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold block">
                                                        {cert.issuer}
                                                    </span>
                                                    {cert.credentialId && (
                                                        <span className="text-[11px] font-mono text-gray-500">
                                                            ID: {cert.credentialId}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {isFeatured && (
                                                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-primary/15 text-primary border border-primary/30">
                                                        <ShieldCheck size={11} />
                                                        Verified
                                                    </span>
                                                )}
                                                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                                                    {cert.date}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                                            {cert.title}
                                        </h3>

                                        {/* Skills / Scope Description */}
                                        {cert.skills && (
                                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                                                {cert.skills}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Links: PDF Preview & Verification */}
                                    <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-3">
                                        {cert.pdf && (
                                            <Link
                                                href={cert.pdf}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/15 border border-primary/40 text-primary hover:bg-primary hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.15)] group/btn"
                                            >
                                                <FileText size={15} />
                                                <span>View eCertificate (PDF)</span>
                                            </Link>
                                        )}

                                        {cert.verifyUrl ? (
                                            <Link
                                                href={cert.verifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#050807] border border-white/10 hover:border-primary/50 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.4)]"
                                            >
                                                <ExternalLink size={14} />
                                                <span>Verify Credly</span>
                                            </Link>
                                        ) : !cert.pdf && (
                                            <span className="text-xs font-mono text-gray-500 inline-flex items-center gap-1.5">
                                                <CheckCircle2 size={13} className="text-primary/70" />
                                                Honors & Recognition Award
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
