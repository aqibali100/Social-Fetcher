'use client';
import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, ArrowUp, Clock } from 'lucide-react';
import { useHydrationFix } from './hooks/useHydrationFix';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [hoveredFooterItem, setHoveredFooterItem] = useState<string | null>(null);
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const footerLinks = {
        YouTube: [
            { name: 'Tag Generator', href: '/youtube-video-tags-generator' },
            { name: 'Tag Extractor', href: '/youtube-video-tags-extractor' },
            { name: 'Video Downloader', href: '/youtube-video-downloader' },
            { name: 'Thumbnail Downloader', href: '/youtube-thumbnail-downloader' },
        ],
        Instagram: [
            { name: 'Tag Generator', href: '/instagram' },
            { name: 'Tag Extractor', href: '/instagram' },
            { name: 'Video Downloader', href: '/instagram' },
            { name: 'Thumbnail Downloader', href: '/instagram' },
        ],
        "Other Tools": [
            { name: 'Slug Generator', href: '/slug-generator' },
            { name: 'Word Counter', href: '/word-counter' },
            { name: 'PNG to JPG Converter', href: '/png-to-jpg-converter' },
            { name: 'JPG to PNG Converter', href: '#' },
            { name: 'Video to Audio Converter', href: '#' },
            { name: 'PNG to PDF Converter', href: '#' },
        ],
        company: [
            { name: 'Blogs', href: '/blogs' },
            { name: 'About Us', href: '/about-us' },
            { name: 'Contact Us', href: '/contact-us' },
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Terms of Service', href: '/terms-of-services' },
        ],
    };

    const { isClient } = useHydrationFix();
    const [positions, setPositions] = useState<Array<{
        left: string;
        top: string;
        animation: string;
        delay: string;
    }> | null>(null);

    useEffect(() => {
        if (isClient) {
            setPositions(
                Array.from({ length: 30 }, () => ({
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${6 + Math.random() * 8}s ease-in-out infinite`,
                    delay: `${Math.random() * 8}s`
                }))
            );
        }
    }, [isClient]);

    if (!isClient) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Minimal static version for SSR */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-transparent"></div>
            </div>
        );
    }
    return (
        <>
            <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Static elements that can render on server */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-transparent"></div>
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

                    {/* Dynamic elements */}
                    {positions?.map((pos, i) => (
                        <div
                            key={i}
                            className="absolute opacity-30"
                            style={{
                                left: pos.left,
                                top: pos.top,
                                animation: pos.animation,
                                animationDelay: pos.delay
                            }}
                        >
                            <div className="w-0.5 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-lg"></div>
                        </div>
                    ))}
                </div>

                {/* Main Footer Content */}
                <div className="relative py-16 pb-8">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
                            <div className="lg:col-span-2">
                                <div className="group mb-2">
                                    <div className="inline-flex items-center gap-3 mb-6">
                                        <div className="relative">
                                            <div className="w-40 rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg">
                                                <Link href="/">
                                                    <Image src="/images/Logo.png" width={100} height={100} className='w-full h-full' alt="Logo" />
                                                </Link>
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping"></div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                                    The ultimate video downloading platform trusted by millions of creators worldwide.
                                    Download, extract, and optimize content from 10+ platforms with enterprise-grade security.
                                </p>
                            </div>

                            {/* Links Sections */}
                            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                                <div key={category} className="transform transition-all duration-700" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                                    <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider relative">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                    </h4>
                                    <ul className="space-y-3">
                                        {links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <a
                                                    href={link.href}
                                                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm relative group inline-block"
                                                    onMouseEnter={() => setHoveredFooterItem(`${category}-${linkIndex}`)}
                                                    onMouseLeave={() => setHoveredFooterItem(null)}
                                                >
                                                    <span className="relative z-10">{link.name}</span>
                                                    <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10 ${hoveredFooterItem === `${category}-${linkIndex}` ? 'animate-pulse' : ''}`}></div>
                                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        
                        {/* Contact Info */}
                        <div className="flex justify-between items-center mt-12">
                            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group cursor-pointer">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm">support@videodownloader.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group cursor-pointer">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group cursor-pointer">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-sm">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="relative border-t border-gray-700/50 py-8">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <span>© {currentYear} Social Fetcher. All rights reserved.</span>
                            </div>

                            <div className="flex items-center gap-4 text-gray-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Last updated: Dec 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl cursor-pointer shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-110 z-50 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                    }`}
            >
                <ArrowUp className="w-5 h-5 mx-auto" />
            </button>
        </>
    );
}
