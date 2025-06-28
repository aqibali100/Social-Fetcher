'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail,Phone, MapPin, Clock, Send, User, FileText, Shield, Zap, Minus, Plus, Globe, Download, Smartphone } from 'lucide-react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

  interface FAQItem {
    id: string;
    question: string;
    answer: string;
    icon: React.ReactNode;
  }

 const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'Which platforms are supported by Social Fetcher?',
      answer: 'Social Fetcher supports YouTube, TikTok, Instagram, Facebook, Twitter, and LinkedIn and many more. You can downloads from any of these platforms.',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '2',
      question: 'Is using Social Fetcher to download videos safe?',
      answer: 'Yes! Social Fetcher is a safe and secure platform. We do not collect any user data and videos history is stored locally on your device.',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: '3',
      question: 'Which video qualities can I download?',
      answer: 'You can download any video quality supported by the platform. Social Fetcher supports HD, 4K, and 8K video quality.',
      icon: <Download className="w-5 h-5" />
    },
    {
      id: '4',
      question: 'What is the download speed?',
      answer: 'Social Fetcher is a lightning-fast platform. We use a globally distributed CDN, multi-threaded processing, and advanced compression to ensure lightning-fast downloads.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '5',
      question: 'Is Social Fetcher compatible with mobile devices?',
      answer: 'Yes! Social Fetcher is fully responsive and works perfectly on all devices - smartphones, tablets, and desktops.',
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: '6',
      question: 'Are there any download caps?',
      answer: 'No, there are no download caps. You can download as many videos as you want.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: '7',
      question: 'How can I extract thumbnails and tags?',
      answer: 'Just copy the video URL and paste it into the input field. Then click the "Fetch/Extract" button to download the thumbnail and tags.',
      icon: <Download className="w-5 h-5" />
    },
    {
      id: '8',
      question: 'Do you keep the videos I download on file?',
      answer: 'No, we do not keep the videos on file. They are downloaded directly to your device and are not stored on our servers.',
      icon: <Shield className="w-5 h-5" />
    }
  ];

export default function ContactUs() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  
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
            console.log('Form submitted:', formData);

            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        }, 2000);
    };

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

      const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ background: 'transparent' }}
            />
            {/* Content */}
            <div className="relative z-10">
                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-6 py-35 pb-10">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Get In Touch</span>
            </h1>

                <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Social Fetcher empowers your online business with data-rich video content.
            </p>
                    </div>

                    {/* Main Contact Form Section */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Contact Form */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                                    <Send className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
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
                                    className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                      {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:border-blue-200"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg group-hover:from-blue-100 group-hover:to-purple-100 transition-colors duration-200">
                        <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-lg cursor-pointer md:text-xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-300 group-hover:from-blue-100 group-hover:to-blue-200 ${openItems.has(item.id) ? 'rotate-180 bg-gradient-to-br from-blue-100 to-blue-200' : ''
                          }`}
                      >
                        {openItems.has(item.id) ? (
                          <Minus className="w-4 h-4 text-blue-600 cursor-pointer" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-600 group-hover:text-blue-600 cursor-pointer" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openItems.has(item.id)
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="pb-6 pt-0">
                    <div className="ml-16 pr-8">
                      <div className="h-px bg-gradient-to-r from-gray-200 to-transparent mb-4" />
                      <p className="text-gray-700 leading-relaxed text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                    </footer>
                </main>
            </div>
        </div>
        </>
    );
}