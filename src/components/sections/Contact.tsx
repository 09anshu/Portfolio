'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Mail, Send, Terminal } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Contact() {
    return (
        <section id="contact" className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <SectionHeading title="Initiate Contact" subtitle="Let's build something amazing" />

                <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Contact Info (Terminal style) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 rounded-xl bg-[#050807] border border-[#0f2f1f] overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.1)] h-full flex flex-col"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#0a1510] border-b border-[#0f2f1f]">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <Terminal size={14} className="ml-2 text-gray-500" />
                            <span className="text-gray-500 text-xs font-mono ml-1">contact.sh</span>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 font-mono text-sm flex-1 flex flex-col">
                            <div className="text-primary mb-4">&gt; ./initiate_contact.sh</div>

                            <div className="text-gray-400 mb-6">
                                [SYSTEM]: Connection established. Awaiting input...
                            </div>

                            <div className="space-y-6 mt-4 flex-1">
                                <div>
                                    <div className="text-gray-500 text-xs mb-1">Email_Address:</div>
                                    <a href={`mailto:${siteConfig.social.email}`} className="text-white hover:text-primary transition-colors flex items-center gap-2">
                                        <Mail size={16} className="text-primary" /> {siteConfig.social.email}
                                    </a>
                                </div>

                                <div>
                                    <div className="text-gray-500 text-xs mb-1">Availability_Status:</div>
                                    <div className="text-white flex items-center gap-2">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                        </span>
                                        Open to opportunities
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-primary animate-pulse">&gt; _</div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3 h-full"
                    >
                        <form className="p-8 rounded-2xl bg-[#0f2f1f]/20 border border-primary/20 backdrop-blur-sm relative group h-full flex flex-col">
                            {/* Form subtle glow */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-mono text-primary uppercase tracking-widest block">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-black/40 border-b-2 border-primary/30 focus:border-primary text-white px-4 py-3 outline-none transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-mono text-primary uppercase tracking-widest block">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-black/40 border-b-2 border-primary/30 focus:border-primary text-white px-4 py-3 outline-none transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-8 flex-1">
                                <label htmlFor="message" className="text-xs font-mono text-primary uppercase tracking-widest block">Transmission Data</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full h-full min-h-[120px] bg-black/40 border-b-2 border-primary/30 focus:border-primary text-white px-4 py-3 outline-none transition-colors resize-none"
                                    placeholder="Enter your message..."
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="group/btn relative w-full overflow-hidden rounded-lg bg-primary py-4 font-bold tracking-widest text-[#050807] transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] flex items-center justify-center gap-2"
                            >
                                <span className="relative z-10 text-sm uppercase">Transmit Protocol</span>
                                <Send size={18} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />

                                {/* Button Hover Glow */}
                                <div className="absolute inset-0 z-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover/btn:w-full" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
