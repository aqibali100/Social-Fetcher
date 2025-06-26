'use client'
import React, { useState, useEffect } from 'react';
import {
    ChevronDown, Globe, Menu, X, DownloadCloud, Tag, Edit,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface DropdownItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
    description?: string;
}

interface NavItem {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
}

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState('EN');

    const navItems: NavItem[] = [
        { label: 'Home', href: '/' },
        {
            label: 'YouTube',
            dropdown: [
                {
                    label: 'YouTube Videos Downloader',
                    href: '/youtube/youtube-video-downloader',
                    icon: <DownloadCloud className="w-4 h-4" />,
                    description: 'Efficiently download YouTube videos in various formats for offline access.'
                },
                {
                    label: 'YouTube Thumbnail Downloader',
                    href: '/youtube/youtube-thumbnail-downloader',
                    icon: <DownloadCloud className="w-4 h-4" />,
                    description: 'Quickly extract high-quality thumbnails from YouTube videos.'
                },
                {
                    label: 'YouTube Video Tags Extractor',
                    href: '/youtube/youtube-video-tags-extractor',
                    icon: <Tag className="w-4 h-4" />,
                    description: 'Extract YouTube video tags to analyze content trends and SEO strategies.'
                },
                {
                    label: 'YouTube Video Tags Generator',
                    href: '/youtube/youtube-video-tags-generator',
                    icon: <Edit className="w-4 h-4" />,
                    description: 'Generate effective and relevant video tags to optimize video discoverability.'
                }
            ]
        },
        {
            label: 'TikTok',
            // dropdown: [
            //     {
            //         label: 'TikTok Video Downloader',
            //         href: '/development',
            //         icon: <DownloadCloud className="w-4 h-4" />,
            //         description: 'Download TikTok videos quickly and easily in various formats for offline viewing.'
            //     },
            //     {
            //         label: 'TikTok Thumbnail Downloader',
            //         href: '/support',
            //         icon: <Image className="w-4 h-4" />,
            //         description: 'Extract high-resolution thumbnails from TikTok videos effortlessly.'
            //     },
            //     {
            //         label: 'TikTok Video Tags Extractor',
            //         href: '/training',
            //         icon: <Tag className="w-4 h-4" />,
            //         description: 'Extract video tags from TikTok videos to optimize your content for better discoverability.'
            //     },
            //     {
            //         label: 'TikTok Video Tags Generator',
            //         href: '/consulting',
            //         icon: <Edit className="w-4 h-4" />,
            //         description: 'Generate effective and trending tags for TikTok videos to enhance visibility and engagement.'
            //     }
            // ]
        },
        {
            label: 'Instagram',
            // dropdown: [
            //     { label: 'Development', href: '/development', icon: <BookOpen className="w-4 h-4" />, description: 'Full-stack development services' },
            //     { label: 'Support', href: '/support', icon: <Mail className="w-4 h-4" />, description: '24/7 technical support' },
            //     { label: 'Training', href: '/training', icon: <Users className="w-4 h-4" />, description: 'Professional development courses' }
            // ]
        },
        {
            label: 'Facebook',
            // dropdown: [
            //     { label: 'Development', href: '/development', icon: <BookOpen className="w-4 h-4" />, description: 'Full-stack development services' },
            //     { label: 'Support', href: '/support', icon: <Mail className="w-4 h-4" />, description: '24/7 technical support' },
            //     { label: 'Training', href: '/training', icon: <Users className="w-4 h-4" />, description: 'Professional development courses' }
            // ]
        },
        { label: 'Blogs', href: '/blogs' },
    ];

    const languages = [
        { code: 'EN', name: 'English', flag: '🇺🇸' },
        { code: 'ES', name: 'Español', flag: '🇪🇸' },
        { code: 'FR', name: 'Français', flag: '🇫🇷' },
        { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
        { code: 'PT', name: 'Português', flag: '🇵🇹' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleDropdownToggle = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    const handleLanguageChange = (langCode: string) => {
        setSelectedLanguage(langCode);
        setActiveDropdown(null);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveDropdown(null);
    };

    return (
        <>
            <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4 z-50">
                <header
                    className={`
            transition-all duration-500 ease-out mobile-menu-container
            ${isScrolled
                            ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10 border border-gray-200/100'
                            : 'bg-white/80 backdrop-blur-md shadow-lg shadow-black/5 border border-gray-100/100'
                        }
            rounded-2xl
          `}
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between h-16 px-3 sm:px-6">
                            <div className="flex items-center space-x-3 group cursor-pointer">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                                    <div className="relative w-30 rounded-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                        <Link href='/'>
                                            <Image width={100} height={100} className="rounded-xl w-full h-full" src="/images/Logo.png" alt="social-fetcher-logo" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-1">
                                {navItems.map((item, index) => (
                                    <div key={item.label} className="relative group">
                                        {item.dropdown ? (
                                            <button
                                                onClick={() => handleDropdownToggle(item.label)}
                                                onMouseEnter={() => setActiveDropdown(item.label)}
                                                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50/50 group transform hover:scale-105"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <span className="relative">
                                                    {item.label}
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></span>
                                                </span>
                                                <ChevronDown className={`w-4 h-4 transition-all duration-500 ${activeDropdown === item.label ? 'rotate-180 text-blue-600' : ''} group-hover:scale-110`} />
                                            </button>
                                        ) : (
                                            <a
                                                href={item.href}
                                                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50/50 relative overflow-hidden group transform hover:scale-105"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <span className="relative z-10">
                                                    {item.label}
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></span>
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                            </a>
                                        )}

                                        {/* Dropdown Menu */}
                                        {item.dropdown && (
                                            <div
                                                onMouseLeave={() => setActiveDropdown(null)}
                                                className={`
                          absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-2
                          transform transition-all duration-500 origin-top
                          ${activeDropdown === item.label
                                                        ? 'opacity-100 scale-100 translate-y-0'
                                                        : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                                                    }
                        `}
                                            >
                                                {item.dropdown.map((dropdownItem, dropIndex) => (
                                                    <a
                                                        key={dropdownItem.label}
                                                        href={dropdownItem.href}
                                                        className={`
                              flex items-start space-x-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group transform
                              ${dropIndex > 0 ? 'border-t border-gray-100/50' : ''}
                            `}
                                                        style={{ animationDelay: `${dropIndex * 50}ms` }}
                                                    >
                                                        <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                                            {dropdownItem.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                                                {dropdownItem.label}
                                                            </div>
                                                            <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                                                {dropdownItem.description}
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Language Selector & Mobile Menu */}
                            <div className="flex items-center">
                                <div className="relative">
                                    <button
                                        onClick={() => handleDropdownToggle('language')}
                                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50/50 group transform hover:scale-105"
                                    >
                                        <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="hidden sm:inline">{selectedLanguage}</span>
                                        <ChevronDown className={`w-4 h-4 transition-all duration-500 ${activeDropdown === 'language' ? 'rotate-180 text-blue-600' : ''} group-hover:scale-110`} />
                                    </button>

                                    <div
                                        className={`
                      absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-2
                      transform transition-all duration-500 origin-top-right
                      ${activeDropdown === 'language'
                                                ? 'opacity-100 scale-100 translate-y-0'
                                                : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                                            }
                    `}
                                    >
                                        {languages.map((lang, langIndex) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`
                          w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform cursor-pointer
                          ${selectedLanguage === lang.code ? 'bg-blue-50/50 text-blue-600' : 'text-gray-700'}
                        `}
                                                style={{ animationDelay: `${langIndex * 50}ms` }}
                                            >
                                                <span className="text-lg transform hover:scale-125 transition-transform duration-300">{lang.flag}</span>
                                                <div>
                                                    <div className="font-medium">{lang.code}</div>
                                                    <div className="text-xs text-gray-500">{lang.name}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={toggleMobileMenu}
                                    className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                                >
                                    <div className="relative w-6 h-6">
                                        <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                                        <X className={`w-6 h-6 absolute inset-0 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-all duration-500
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Slide Panel */}
            <div
                className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden
          transform transition-all duration-500 ease-out mobile-menu-container
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-30"></div>
                                <div className="relative w-30 p-2 rounded-xl">
                                    <Link href='/'>
                                        <Image className="w-full h-full rounded-xl" width={100} height={100} src="/images/Logo.png" alt="social-fetcher-logo" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <nav className="space-y-2">
                            {navItems.map((item, index) => (
                                <div
                                    key={item.label}
                                    className={`transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                                >
                                    {item.dropdown ? (
                                        <div>
                                            <button
                                                onClick={() => handleDropdownToggle(`mobile-${item.label}`)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 rounded-xl transition-all duration-300 font-medium group"
                                            >
                                                <span className="relative">
                                                    {item.label}
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></span>
                                                </span>
                                                <ChevronDown className={`w-4 h-4 transition-all duration-500 ${activeDropdown === `mobile-${item.label}` ? 'rotate-180 text-blue-600' : ''} group-hover:scale-110`} />
                                            </button>
                                            <div
                                                className={`
                          ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-500
                          ${activeDropdown === `mobile-${item.label}` ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
                        `}
                                            >
                                                {item.dropdown.map((dropdownItem, dropIndex) => (
                                                    <a
                                                        key={dropdownItem.label}
                                                        href={dropdownItem.href}
                                                        className="flex items-center space-x-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 rounded-lg transition-all duration-300 transform hover:translate-x-2 group"
                                                        style={{ transitionDelay: `${dropIndex * 50}ms` }}
                                                    >
                                                        <div className="p-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110">
                                                            {dropdownItem.icon}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{dropdownItem.label}</div>
                                                            <div className="text-xs text-gray-500">{dropdownItem.description}</div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 rounded-xl transition-all duration-300 font-medium group transform hover:translate-x-2"
                                        >
                                            <span className="relative">
                                                {item.label}
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></span>
                                            </span>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Mobile Language Selector */}
                        <div
                            className={`mt-8 pt-6 border-t border-gray-200/50 transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                            style={{ transitionDelay: `${navItems.length * 100 + 300}ms` }}
                        >
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 px-4">Language</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {languages.map((lang, langIndex) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        className={`
                      flex items-center space-x-2 px-3 py-2 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-300 transform hover:scale-105
                      ${selectedLanguage === lang.code ? 'bg-blue-50/50 text-blue-600 ring-2 ring-blue-200' : 'text-gray-700'}
                    `}
                                        style={{ transitionDelay: `${langIndex * 50 + 100}ms` }}
                                    >
                                        <span className="text-lg transform hover:scale-125 transition-transform duration-300">{lang.flag}</span>
                                        <div>
                                            <div className="font-medium text-sm">{lang.code}</div>
                                            <div className="text-xs text-gray-500">{lang.name}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;