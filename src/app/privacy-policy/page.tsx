'use client';

import { useEffect, useRef } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, Server, Globe, FileText } from 'lucide-react';
import Link from 'next/link';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

export default function PrivacyPolicy() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const particles: Particle[] = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 8000);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.1,
                    color: Math.random() > 0.5 ? '#8B5CF6' : '#3B82F6'
                });
            }

            particlesRef.current = particles;
        };

        const updateParticles = () => {
            particlesRef.current.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                particle.opacity += (Math.random() - 0.5) * 0.01;
                particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
            });
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
                ctx.fill();
            });

            // Draw connections
            particlesRef.current.forEach((particle, i) => {
                particlesRef.current.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });
        };

        const animate = () => {
            updateParticles();
            drawParticles();
            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ background: 'transparent' }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <header className="border-b border-amber-200/50 backdrop-blur-sm bg-white/30 sticky top-0 z-20">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/"
                                className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group"
                            >
                                <div className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white group-hover:shadow-lg transition-all duration-300">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                <span className="font-medium">Back to Social Fetcher</span>
                            </Link>

                            <div className="flex items-center gap-2">
                                <Shield className="w-6 h-6 text-purple-600" />
                                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Privacy Policy
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-6 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium">Your Privacy Matters</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                            Privacy Policy
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            We're committed to protecting your privacy and being transparent about how we collect, use, and protect your information.
                        </p>

                        <div className="mt-8 text-sm text-gray-500">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    {/* Privacy Sections */}
                    <div className="space-y-12">
                        {/* Information We Collect */}
                        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Eye className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    <strong>Usage Information:</strong> We may collect information about how you use Social Fetcher, including the URLs you process, download patterns, and feature usage to improve our service.
                                </p>

                                <p>
                                    <strong>Technical Information:</strong> We automatically collect certain technical information such as your IP address, browser type, device information, and operating system for security and optimization purposes.
                                </p>

                                <p>
                                    <strong>No Account Required:</strong> Social Fetcher doesn't require user registration or account creation. We don't collect personal information like names, email addresses, or phone numbers unless voluntarily provided for support purposes.
                                </p>
                            </div>
                        </section>

                        {/* How We Use Information */}
                        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Server className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Service Provision:</strong> To process your download requests and provide video, thumbnail, and metadata extraction services</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Service Improvement:</strong> To analyze usage patterns and improve our platform's performance and features</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Security:</strong> To detect and prevent abuse, fraud, and unauthorized access to our services</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Data Protection */}
                        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Data Protection & Security</h2>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    We implement industry-standard security measures to protect your information:
                                </p>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Encryption:</strong> All data transmission is encrypted using HTTPS/TLS protocols</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Data Minimization:</strong> We only collect and retain data necessary for service operation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Temporary Storage:</strong> Downloaded content is temporarily processed and not permanently stored on our servers</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Access Controls:</strong> Strict access controls limit who can access user data within our organization</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Third-Party Services */}
                        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Third-Party Services</h2>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Social Fetcher integrates with various social media platforms to provide our services:
                                </p>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Platform APIs:</strong> We use public APIs from YouTube, Facebook, Instagram, TikTok, and other platforms to extract video information</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Analytics:</strong> We may use privacy-focused analytics to understand service usage and improve performance</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>No Data Sharing:</strong> We don't sell, rent, or share your personal information with third parties for marketing purposes</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Your Rights */}
                        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Your Rights & Choices</h2>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    You have the following rights regarding your information:
                                </p>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Access:</strong> Request information about what data we have collected about you</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Deletion:</strong> Request deletion of your personal information (where applicable)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Correction:</strong> Request correction of inaccurate personal information</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span><strong>Portability:</strong> Request a copy of your data in a machine-readable format</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Legal Compliance */}
                        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Legal Compliance & Terms</h2>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    <strong>Copyright Respect:</strong> Social Fetcher is designed to help users access content they have rights to download. Users are responsible for ensuring they have permission to download content and comply with applicable copyright laws.
                                </p>

                                <p>
                                    <strong>Platform Terms:</strong> Users must comply with the terms of service of the original platforms (YouTube, Instagram, etc.) when using our service to download content.
                                </p>

                                <p>
                                    <strong>Prohibited Use:</strong> Our service cannot be used for downloading copyrighted content without permission, violating platform terms, or any illegal activities.
                                </p>

                                <p>
                                    <strong>Age Restriction:</strong> Our service is intended for users aged 13 and above. We don't knowingly collect information from children under 13.
                                </p>
                            </div>
                        </section>

                        {/* Changes to Policy */}
                        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Changes to This Policy</h2>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes:
                                </p>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span>We will update the "Last updated" date at the top of this policy</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span>Significant changes will be prominently displayed on our website</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
                                        <span>Continued use of our service after changes indicates acceptance</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
                            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                                If you have any questions about this Privacy Policy, need to exercise your rights, or have concerns about how we handle your information, please don't hesitate to reach out.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                                    <span className="text-purple-100">Email us at:</span>
                                    <br />
                                    <span className="font-semibold">privacy@socialfetcher.com</span>
                                </div>

                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                                    <span className="text-purple-100">Response time:</span>
                                    <br />
                                    <span className="font-semibold">Within 72 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 pt-8 border-t border-amber-200/50 text-center text-gray-600">
                        <p className="mb-4">
                            © {new Date().getFullYear()} Social Fetcher. All rights reserved.
                        </p>
                        <p className="text-sm">
                            This privacy policy is designed to be transparent and user-friendly.
                            We believe privacy is a fundamental right.
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}