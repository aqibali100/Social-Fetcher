'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, Clock, Send, User, FileText, Shield, Zap } from 'lucide-react';
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

export default function ContactUs() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });

            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        }, 2000);
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Get help with technical issues',
            contact: 'support@socialfetcher.com',
            response: 'Within 24 hours'
        },
        {
            icon: MessageSquare,
            title: 'Live Chat',
            description: 'Chat with our support team',
            contact: 'Available 24/7',
            response: 'Instant response'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak directly with our team',
            contact: '+1 (555) 123-4567',
            response: 'Mon-Fri 9AM-6PM EST'
        }
    ];

    const supportCategories = [
        {
            icon: Zap,
            title: 'Technical Issues',
            description: 'Download problems, errors, bugs'
        },
        {
            icon: Shield,
            title: 'Privacy & Security',
            description: 'Data protection, account security'
        },
        {
            icon: FileText,
            title: 'General Inquiries',
            description: 'Questions about our service'
        },
        {
            icon: User,
            title: 'Account Support',
            description: 'Account-related assistance'
        }
    ];

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
                    <div className="max-w-6xl mx-auto px-6 py-4">
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
                                <MessageSquare className="w-6 h-6 text-purple-600" />
                                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Contact Us
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-6 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
                            <MessageSquare className="w-5 h-5" />
                            <span className="font-medium">We are Here to Help</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                            Get in Touch
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Have questions about Social Fetcher? Need technical support? Want to share feedback?
                            We would love to hear from you and help make your experience better.
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                        <method.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{method.title}</h3>
                                </div>

                                <p className="text-gray-600 mb-4">{method.description}</p>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">Contact:</span>
                                        <span className="font-semibold text-gray-800">{method.contact}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{method.response}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Contact Form Section */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Contact Form */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Send className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="privacy">Privacy & Security</option>
                                        <option value="account">Account Support</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="business">Business Inquiry</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
                                        placeholder="Brief description of your inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 resize-none"
                                        placeholder="Please provide as much detail as possible about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                            <span className="font-medium">Message sent successfully!</span>
                                        </div>
                                        <p className="text-sm mt-1 ml-7">We will get back to you within 24 hours.</p>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Support Categories */}
                        <div className="space-y-6">
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">How Can We Help?</h3>

                                <div className="space-y-4">
                                    {supportCategories.map((category, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors duration-200"
                                        >
                                            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white flex-shrink-0">
                                                <category.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">{category.title}</h4>
                                                <p className="text-sm text-gray-600">{category.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xl font-bold mb-4">Quick Information</h3>

                                <div className="space-y-3 text-purple-100">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5" />
                                        <span>Average response time: 2-4 hours</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5" />
                                        <span>Based in United States (EST)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5" />
                                        <span>All communications are secure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                            <p className="text-gray-600">Quick answers to common questions about Social Fetcher</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">How do I download videos?</h4>
                                    <p className="text-gray-600 text-sm">Simply paste the video URL into our input field and click download. We support YouTube, Instagram, TikTok, Facebook, and many other platforms.</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Is Social Fetcher free to use?</h4>
                                    <p className="text-gray-600 text-sm">Yes! Social Fetcher offers free video downloading with no registration required. Premium features may be available for advanced users.</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">What video quality options are available?</h4>
                                    <p className="text-gray-600 text-sm">We provide multiple quality options including HD, Full HD, and 4K when available from the source platform.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Is it legal to download videos?</h4>
                                    <p className="text-gray-600 text-sm">Users are responsible for ensuring they have permission to download content and comply with platform terms of service and copyright laws.</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Do you store downloaded videos?</h4>
                                    <p className="text-gray-600 text-sm">No, we do not store any downloaded content on our servers. Videos are processed temporarily and delivered directly to you.</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Which platforms do you support?</h4>
                                    <p className="text-gray-600 text-sm">We support YouTube, Instagram, TikTok, Facebook, Twitter, and many other popular social media platforms.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="text-center text-gray-600">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl mb-8">
                            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
                            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                                Our support team is standing by to help you with any questions or issues you might have.
                                Do not hesitate to reach out - we are here to make your Social Fetcher experience amazing!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="mailto:support@socialfetcher.com"
                                    className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 hover:bg-white/30 transition-colors"
                                >
                                    <Mail className="w-5 h-5 inline mr-2" />
                                    support@socialfetcher.com
                                </a>

                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                                    <Phone className="w-5 h-5 inline mr-2" />
                                    +1 (555) 123-4567
                                </div>
                            </div>
                        </div>

                        <p className="text-sm">
                            © {new Date().getFullYear()} Social Fetcher. All rights reserved.
                            We are committed to providing excellent customer support.
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}