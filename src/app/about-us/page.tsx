'use client';

import { useEffect, useRef } from 'react';
import { ArrowLeft, Users, Target, Award, Globe, Shield, Zap, Heart, Star, Download, Play, Image, Smartphone, Monitor, Headphones, Code, Rocket, CheckCircle, TrendingUp, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

export default function AboutUs() {
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

    const stats = [
        { icon: Download, value: '10M+', label: 'Downloads Processed' },
        { icon: Users, value: '2M+', label: 'Happy Users' },
        { icon: Globe, value: '150+', label: 'Countries Served' },
        { icon: Star, value: '4.9/5', label: 'User Rating' }
    ];

    const features = [
        {
            icon: Download,
            title: 'Multi-Platform Support',
            description: 'Download from YouTube, Instagram, TikTok, Facebook, Twitter, and 50+ other platforms'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Advanced processing algorithms ensure quick downloads without compromising quality'
        },
        {
            icon: Shield,
            title: 'Privacy First',
            description: 'No registration required, no data stored, complete privacy protection for all users'
        },
        {
            icon: Image,
            title: 'Multiple Formats',
            description: 'Support for video, audio, thumbnails, and metadata extraction in various formats'
        },
        {
            icon: Smartphone,
            title: 'Mobile Optimized',
            description: 'Fully responsive design works perfectly on all devices and screen sizes'
        },
        {
            icon: Heart,
            title: 'Completely Free',
            description: 'No hidden fees, no premium tiers, just free unlimited downloads for everyone'
        }
    ];

    const team = [
        {
            name: 'Alex Chen',
            role: 'Founder & CEO',
            description: 'Former Google engineer with 10+ years in video technology and social media platforms.',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Sarah Johnson',
            role: 'CTO',
            description: 'Expert in distributed systems and API development, previously at Netflix and YouTube.',
            image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Marcus Rodriguez',
            role: 'Lead Developer',
            description: 'Full-stack developer specializing in high-performance web applications and user experience.',
            image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Emily Zhang',
            role: 'Product Manager',
            description: 'Product strategy expert focused on user-centric design and feature development.',
            image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ];

    const timeline = [
        {
            year: '2020',
            title: 'The Beginning',
            description: 'Started as a simple YouTube downloader to help students access educational content offline.'
        },
        {
            year: '2021',
            title: 'Multi-Platform Expansion',
            description: 'Added support for Instagram, TikTok, and Facebook based on user demand.'
        },
        {
            year: '2022',
            title: 'Global Growth',
            description: 'Reached 1 million users worldwide and expanded to support 25+ platforms.'
        },
        {
            year: '2023',
            title: 'Advanced Features',
            description: 'Introduced thumbnail extraction, metadata tools, and batch downloading capabilities.'
        },
        {
            year: '2024',
            title: 'Innovation Continues',
            description: 'Launched AI-powered content analysis and expanded to 50+ supported platforms.'
        }
    ];

    const values = [
        {
            icon: Shield,
            title: 'Privacy & Security',
            description: 'We believe privacy is a fundamental right. No tracking, no data collection, no compromises.'
        },
        {
            icon: Heart,
            title: 'User-Centric Design',
            description: 'Every feature is designed with our users in mind, prioritizing simplicity and effectiveness.'
        },
        {
            icon: Globe,
            title: 'Universal Access',
            description: 'Making content accessible to everyone, everywhere, regardless of platform restrictions.'
        },
        {
            icon: Rocket,
            title: 'Continuous Innovation',
            description: 'Constantly evolving and improving to meet the changing needs of digital content creators.'
        }
    ];

    const achievements = [
        {
            icon: Award,
            title: 'Best Free Tool 2023',
            description: 'Recognized by TechCrunch as the best free video downloading tool'
        },
        {
            icon: Star,
            title: 'Editor\'s Choice',
            description: 'Featured as Editor\'s Choice on ProductHunt with 2000+ upvotes'
        },
        {
            icon: TrendingUp,
            title: 'Fastest Growing',
            description: 'Fastest growing video downloader with 300% year-over-year growth'
        },
        {
            icon: Users,
            title: 'Community Favorite',
            description: 'Voted #1 by the Reddit developer community for reliability'
        }
    ];

    const seoProps = {
        title: "About Us - Your Company Name",
        description: "Learn more about Your Company Name, our mission, and values.",
        keywords: "about, company, mission, values, Your Company Name",
        author: "Your Name",
        ogImage: "/images/about-og-image.jpg",
    };

    return (
        <>
           <Head>
        <title>About Us | Social Fetcher</title>
        <meta name="description" content="Learn more about our mission and values." />
        <meta name="keywords" content="about, company, mission, values" />
        <meta property="og:image" content="/images/about-og-image.jpg" />
      </Head>
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
                        <div className="max-w-7xl mx-auto px-6 py-4">
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
                                    <Users className="w-6 h-6 text-purple-600" />
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        About Us
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="max-w-7xl mx-auto px-6 py-12">
                        {/* Hero Section */}
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
                                <Users className="w-5 h-5" />
                                <span className="font-medium">Our Story</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
                                Empowering Digital
                                <br />
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Content Freedom
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                                Social Fetcher was born from a simple belief: everyone should have easy access to the digital content they love.
                                What started as a small project has grown into the world's most trusted video downloading platform,
                                serving millions of users across the globe.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex justify-center mb-3">
                                            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mission & Vision */}
                        <div className="grid lg:grid-cols-2 gap-12 mb-20">
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                                </div>

                                <p className="text-gray-700 leading-relaxed mb-6">
                                    To democratize access to digital content by providing free, fast, and secure downloading tools
                                    that respect user privacy and content creator rights. We believe that technology should serve
                                    people, not the other way around.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">Free access for everyone</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">Privacy-first approach</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">Continuous innovation</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                        <Rocket className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                                </div>

                                <p className="text-gray-700 leading-relaxed mb-6">
                                    To become the world's most trusted platform for digital content access, fostering a future
                                    where content barriers don't limit creativity, education, or personal expression. We envision
                                    a world where digital content flows freely and securely.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500" />
                                        <span className="text-gray-700">Global accessibility</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500" />
                                        <span className="text-gray-700">Technological excellence</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500" />
                                        <span className="text-gray-700">Community empowerment</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">What Makes Us Special</h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Cutting-edge technology meets user-friendly design to deliver the best downloading experience
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                                <feature.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    From a simple idea to a global platform trusted by millions
                                </p>
                            </div>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600 rounded-full hidden lg:block"></div>

                                <div className="space-y-12">
                                    {timeline.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                        >
                                            <div className="flex-1">
                                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300">
                                                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                                        {item.year}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>

                                            {/* Timeline dot */}
                                            <div className="hidden lg:block w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                                            <div className="flex-1 hidden lg:block"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Team Section */}
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Passionate individuals working together to make digital content more accessible
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {team.map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                                    >
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-600 to-blue-600">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                                        <div className="text-purple-600 font-medium mb-3">{member.role}</div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Values Section */}
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    The principles that guide everything we do and every decision we make
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {values.map((value, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white flex-shrink-0">
                                                <value.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">Recognition & Awards</h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Honored to be recognized by industry leaders and our amazing community
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 text-center"
                                    >
                                        <div className="flex justify-center mb-4">
                                            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                                <achievement.icon className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technology Stack */}
                        <div className="mb-20">
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50">
                                <div className="text-center mb-8">
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                            <Code className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-800">Built with Modern Technology</h2>
                                    </div>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Our platform is built using cutting-edge technologies to ensure reliability, speed, and security
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
                                                <Monitor className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Frontend</h3>
                                        <p className="text-gray-600 text-sm">React, Next.js, TypeScript, Tailwind CSS</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
                                                <Headphones className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Backend</h3>
                                        <p className="text-gray-600 text-sm">Node.js, Python, Docker, Kubernetes</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
                                                <Shield className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Security</h3>
                                        <p className="text-gray-600 text-sm">SSL/TLS, OAuth, Rate Limiting, GDPR Compliant</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-12 shadow-xl">
                                <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
                                <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                                    Be part of the millions who trust Social Fetcher for their content downloading needs.
                                    Experience the freedom of accessing your favorite content, anywhere, anytime.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                                    <Link
                                        href="/"
                                        className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <Play className="w-5 h-5" />
                                        Try Social Fetcher Now
                                    </Link>

                                    <Link
                                        href="/contact"
                                        className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
                                    >
                                        <Users className="w-5 h-5" />
                                        Get in Touch
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <Clock className="w-6 h-6 mx-auto mb-2" />
                                        <div className="font-semibold">24/7 Available</div>
                                        <div className="text-sm text-purple-200">Always ready to serve</div>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <Shield className="w-6 h-6 mx-auto mb-2" />
                                        <div className="font-semibold">100% Secure</div>
                                        <div className="text-sm text-purple-200">Your privacy protected</div>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <MapPin className="w-6 h-6 mx-auto mb-2" />
                                        <div className="font-semibold">Global Reach</div>
                                        <div className="text-sm text-purple-200">Serving 150+ countries</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="mt-16 pt-8 border-t border-amber-200/50 text-center text-gray-600">
                            <p className="mb-4 text-lg">
                                © {new Date().getFullYear()} Social Fetcher. Built with ❤️ for the global community.
                            </p>
                            <p className="text-sm max-w-2xl mx-auto">
                                We're more than just a tool - we're a community of creators, learners, and digital enthusiasts
                                working together to make content more accessible for everyone.
                            </p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}