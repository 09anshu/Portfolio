'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Mail, Send, Terminal, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            setStatus('error');
            setStatusMessage('Please fill in all protocol fields (Name, Email, Message).');
            return;
        }

        setStatus('transmitting');
        setStatusMessage('Establishing link and transmitting data packet...');
        setMailtoFallback(null);

        const targetEmail = siteConfig.social.email || 'anshuaman83@gmail.com';
        const defaultMailto = `mailto:${targetEmail}?subject=${encodeURIComponent(
            `[Portfolio Transmission] Message from ${trimmedName}`
        )}&body=${encodeURIComponent(
            `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}\n\n---\nSent from Portfolio Interface`
        )}`;

        try {
            let apiData: { success?: boolean; delivery?: string; mailtoUrl?: string; message?: string; error?: string } | null = null;

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
                });

                const contentType = res.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    apiData = await res.json();
                }
            } catch (networkErr) {
                console.warn('Direct API communication warning:', networkErr);
            }

            // Case 1: Backend SMTP dispatched the email silently
            if (apiData && apiData.success && apiData.delivery === 'smtp') {
                setStatus('success');
                setStatusMessage(apiData.message || 'Transmission successfully routed directly to your inbox!');
                setName('');
                setEmail('');
                setMessage('');
                return;
            }

            // Case 2: Direct mailto dispatch to the target email
            const activeMailto = (apiData && apiData.mailtoUrl) || defaultMailto;
            setMailtoFallback(activeMailto);
            setStatus('success');
            setStatusMessage(`Protocol ready! Dispatching transmission to ${targetEmail}...`);

            // Open email client with pre-filled fields
            window.location.href = activeMailto;

            setName('');
            setEmail('');
            setMessage('');
        } catch {
            setStatus('error');
            setMailtoFallback(defaultMailto);
            setStatusMessage(`Unable to transmit automatically. Click the link below to send directly to ${targetEmail}.`);
        }
    };

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
                            <div className="text-primary mb-3">&gt; ./initiate_contact.sh</div>

                            <div className="text-gray-400 mb-6 text-xs leading-relaxed">
                                [SYSTEM]: Node active. Destination target: <br />
                                <span className="text-primary">{siteConfig.social.email}</span>
                            </div>

                            <div className="space-y-6 mt-2 flex-1">
                                <div>
                                    <div className="text-gray-500 text-xs mb-1">Target_Email:</div>
                                    <a
                                        href={`mailto:${siteConfig.social.email}`}
                                        className="text-white hover:text-primary transition-colors flex items-center gap-2 break-all text-xs"
                                    >
                                        <Mail size={15} className="text-primary flex-shrink-0" /> {siteConfig.social.email}
                                    </a>
                                </div>

                                <div>
                                    <div className="text-gray-500 text-xs mb-1">Availability_Status:</div>
                                    <div className="text-white flex items-center gap-2 text-xs">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                        </span>
                                        Open to opportunities
                                    </div>
                                </div>

                                <div>
                                    <div className="text-gray-500 text-xs mb-1">Protocol_Status:</div>
                                    <div className="text-xs font-mono">
                                        {status === 'idle' && <span className="text-gray-400">STANDBY // AWAITING DATA</span>}
                                        {status === 'transmitting' && <span className="text-yellow-400 animate-pulse">TRANSMITTING PACKET...</span>}
                                        {status === 'success' && <span className="text-primary font-bold">200 OK // DISPATCHED</span>}
                                        {status === 'error' && <span className="text-red-400 font-bold">ALERT // RETRY READY</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-primary animate-pulse text-xs">&gt; _</div>
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
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 rounded-2xl bg-[#0f2f1f]/20 border border-primary/20 backdrop-blur-sm relative group h-full flex flex-col justify-between"
                        >
                            {/* Form subtle glow */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-mono text-primary uppercase tracking-widest block">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            disabled={status === 'transmitting'}
                                            className="w-full bg-black/40 border-b-2 border-primary/30 focus:border-primary text-white px-4 py-3 outline-none transition-colors disabled:opacity-50 text-sm font-sans"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-mono text-primary uppercase tracking-widest block">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={status === 'transmitting'}
                                            className="w-full bg-black/40 border-b-2 border-primary/30 focus:border-primary text-white px-4 py-3 outline-none transition-colors disabled:opacity-50 text-sm font-sans"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <label htmlFor="message" className="text-xs font-mono text-primary uppercase tracking-widest block">
                                        Transmission Data
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        disabled={status === 'transmitting'}
                                        className="w-full min-h-[130px] bg-black/40 border-b-2 border-primary/30 focus:border-primary text-white px-4 py-3 outline-none transition-colors resize-none disabled:opacity-50 text-sm font-sans"
                                        placeholder="Enter your message..."
                                    ></textarea>
                                </div>

                                {/* Status Feedback Messages */}
                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="p-4 rounded-xl bg-primary/10 border border-primary/40 text-primary text-xs font-mono mb-6 flex items-start gap-3"
                                        >
                                            <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5 text-primary" />
                                            <div className="flex-1">
                                                <div className="font-bold uppercase tracking-wider mb-1">Transmission Relayed!</div>
                                                <p className="text-gray-300">{statusMessage}</p>
                                                {mailtoFallback && (
                                                    <a
                                                        href={mailtoFallback}
                                                        className="inline-flex items-center gap-1.5 mt-2 text-primary underline hover:text-white"
                                                    >
                                                        Click here if your mail client did not open automatically <ArrowRight size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-6 flex items-start gap-3"
                                        >
                                            <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
                                            <div className="flex-1">
                                                <div className="font-bold uppercase tracking-wider mb-1">Transmission Alert</div>
                                                <p className="text-gray-300">{statusMessage}</p>
                                                {mailtoFallback && (
                                                    <a
                                                        href={mailtoFallback}
                                                        className="inline-flex items-center gap-1.5 mt-2 text-primary underline hover:text-white"
                                                    >
                                                        Send directly via your email client <ArrowRight size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'transmitting'}
                                className="group/btn relative w-full overflow-hidden rounded-lg bg-primary py-4 font-bold tracking-widest text-[#050807] transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 mt-2"
                            >
                                {status === 'transmitting' ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin text-[#050807]" />
                                        <span className="relative z-10 text-sm uppercase">Transmitting Data...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10 text-sm uppercase">Transmit Protocol</span>
                                        <Send size={18} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </>
                                )}

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
