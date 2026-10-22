'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll state for navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
                isScrolled
                    ? 'bg-[#050807]/80 backdrop-blur-md border-primary/20 shadow-[0_4px_30px_rgba(57,255,20,0.1)]'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="#home" className="flex items-center gap-2 group cursor-pointer z-50">
                    <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Code2 className="w-8 h-8 text-primary group-hover:text-accent transition-colors drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
                    </motion.div>
                    <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl font-bold tracking-wider text-white"
                    >
                        A<span className="text-primary">.dev</span>
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                            <Link
                                href={link.href}
                                className="text-gray-300 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase group relative"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#39FF14]" />
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden z-50 flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-primary hover:text-accent transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-20 left-0 w-full bg-[#050807]/95 backdrop-blur-lg border-b border-primary/20 shadow-[0_10px_30px_rgba(57,255,20,0.15)] flex flex-col items-center py-8 gap-6 md:hidden"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-200 hover:text-primary text-lg tracking-widest uppercase transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
