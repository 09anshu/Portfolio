import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
    return (
        <footer className="border-t border-primary/20 bg-[#050807] py-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between z-10 relative">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h3 className="text-2xl font-bold tracking-wider text-white mb-2">
                        A<span className="text-primary">.dev</span>
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Building the future, one line of code at a time.
                    </p>
                </div>

                <div className="flex gap-6 mb-6 md:mb-0">
                    <Link
                        href={siteConfig.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary hover:drop-shadow-[0_0_8px_#39FF14] transition-all"
                        aria-label="GitHub Profile"
                    >
                        <Github size={24} />
                    </Link>
                    <Link
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary hover:drop-shadow-[0_0_8px_#39FF14] transition-all"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={24} />
                    </Link>
                    <Link
                        href={`mailto:${siteConfig.social.email}`}
                        className="text-gray-400 hover:text-primary hover:drop-shadow-[0_0_8px_#39FF14] transition-all"
                        aria-label="Email Contact"
                    >
                        <Mail size={24} />
                    </Link>
                    <Link
                        href={siteConfig.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary hover:drop-shadow-[0_0_8px_#39FF14] transition-all"
                        aria-label="Twitter Profile"
                    >
                        <Twitter size={24} />
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-xs z-10 relative">
                <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            </div>
        </footer>
    );
}
