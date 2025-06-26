'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Download, Video,Users,Plus, Minus, Globe, Clock , Tag, Wand2, Image, Zap, Shield, Monitor, Smartphone, Tablet, Play, Star, TrendingUp, Sparkles,  Youtube,Facebook,Instagram,Music,Twitter,Linkedin,Twitch,Camera,} from 'lucide-react';

const platforms = [
  {
    name: 'YouTube',
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    description: 'Video downloads & thumbnails'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
    description: 'Posts & video content'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    color: 'from-pink-500 via-purple-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50',
    description: 'Stories, reels & posts'
  },
  {
    name: 'TikTok',
    icon: Music,
    color: 'from-black to-gray-800',
    bgColor: 'bg-gray-50',
    description: 'Short videos & music'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'from-sky-400 to-sky-500',
    bgColor: 'bg-sky-50',
    description: 'Tweets & media content'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'from-blue-700 to-blue-800',
    bgColor: 'bg-blue-50',
    description: 'Professional content'
  },
  {
    name: 'Twitch',
    icon: Twitch,
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50',
    description: 'Live streams & clips'
  },
  {
    name: 'Vimeo',
    icon: Play,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    description: 'High-quality videos'
  },
  {
    name: 'Dailymotion',
    icon: Video,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Video platform content'
  },
  {
    name: 'Snapchat',
    icon: Camera,
    color: 'from-yellow-400 to-yellow-500',
    bgColor: 'bg-yellow-50',
    description: 'Stories & snaps'
  },
  {
    name: 'Pinterest',
    icon: Smartphone,
    color: 'from-red-600 to-red-700',
    bgColor: 'bg-red-50',
    description: 'Pins & boards'
  },
  {
    name: 'Reddit',
    icon: Monitor,
    color: 'from-orange-600 to-orange-700',
    bgColor: 'bg-orange-50',
    description: 'Posts & discussions'
  },
  {
    name: 'Tumblr',
    icon: Globe,
    color: 'from-indigo-600 to-indigo-700',
    bgColor: 'bg-indigo-50',
    description: 'Blog posts & media'
  }
];

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  platform: string;
  downloads: string;
  verified: boolean;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Creator",
    company: "TechReviews Pro",
    content: "Social Fetcher has revolutionized my workflow. I can download high-quality videos from YouTube, Instagram, and TikTok in seconds. The thumbnail extraction feature saves me hours every week.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "YouTube & Instagram",
    downloads: "2.5K+",
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Social Media Manager",
    company: "Digital Marketing Hub",
    content: "The tag generation feature is incredible! It analyzes my videos and suggests perfect hashtags for maximum reach. My engagement increased by 400% since using Social Fetcher.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "TikTok & Facebook",
    downloads: "5.2K+",
    verified: true
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Video Editor",
    company: "Creative Studios Inc",
    content: "As a professional video editor, I need reliable tools. Social Fetcher delivers exceptional quality downloads from multiple platforms. The batch processing is a game-changer.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "Multi-Platform",
    downloads: "8.7K+",
    verified: true,
    featured: true
  },
  {
    id: 4,
    name: "David Kim",
    role: "Influencer",
    company: "Lifestyle Blogger",
    content: "Social Fetcher's thumbnail downloader is perfect for creating consistent branding across platforms. The quality is always pristine, and the speed is unmatched.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "Instagram & YouTube",
    downloads: "3.8K+",
    verified: true
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "Brand Solutions Co",
    content: "The analytics and tag extraction features provide incredible insights. I can analyze competitor content and optimize our strategy. Essential tool for our team.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "All Platforms",
    downloads: "12K+",
    verified: true
  },
  {
    id: 6,
    name: "Alex Johnson",
    role: "YouTuber",
    company: "Tech Channel",
    content: "Downloaded over 10K videos for my content research. Social Fetcher never fails to deliver high-quality downloads. The speed is absolutely incredible!",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "YouTube",
    downloads: "15K+",
    verified: true,
    featured: true
  },
  {
    id: 7,
    name: "Maria Garcia",
    role: "Social Media Strategist",
    company: "Growth Agency",
    content: "The tag generator is pure magic! It understands context and suggests trending hashtags that actually work. Our client engagement rates have skyrocketed.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "Instagram & TikTok",
    downloads: "7.3K+",
    verified: true
  },
  {
    id: 8,
    name: "James Wilson",
    role: "Content Manager",
    company: "E-commerce Brand",
    content: "Bulk downloading feature saved our team countless hours. We can now download entire playlists and extract thumbnails for our product campaigns efficiently.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "YouTube & Facebook",
    downloads: "9.1K+",
    verified: true
  },
  {
    id: 9,
    name: "Sophie Brown",
    role: "Digital Creator",
    company: "Fashion Influencer",
    content: "Love how Social Fetcher maintains video quality while being lightning fast. The thumbnail extraction helps me create stunning mood boards for my content.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "Instagram & Pinterest",
    downloads: "4.6K+",
    verified: true
  },
  {
    id: 10,
    name: "Ryan Mitchell",
    role: "Video Producer",
    company: "Media Production House",
    content: "Social Fetcher is our go-to tool for content acquisition. The multi-platform support and reliable downloads make it indispensable for our production workflow.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    platform: "All Platforms",
    downloads: "18K+",
    verified: true,
    featured: true
  }
];

const stats = [
  { icon: Download, label: "Downloads", value: "50M+", color: "from-blue-500 to-cyan-500" },
  { icon: Users, label: "Active Users", value: "200K+", color: "from-purple-500 to-pink-500" },
  { icon: Shield, label: "Uptime", value: "99.9%", color: "from-green-500 to-emerald-500" },
  { icon: Zap, label: "Avg Speed", value: "5s", color: "from-orange-500 to-red-500" }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const duplicatedPlatforms = [...platforms, ...platforms];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) setVisibleCards(4);
      else if (window.innerWidth >= 1024) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = testimonials.length - visibleCards;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, visibleCards]);

  const maxIndex = testimonials.length - visibleCards;

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => prev <= 0 ? maxIndex : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const features = [
    {
      icon: <Monitor className="w-7 h-7" />,
      title: "Multiplatform Download",
      description: "Download videos from YouTube, Facebook, Instagram, TikTok, and more than ten other platforms with our all-purpose compatibility engine.",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      shadowColor: "shadow-blue-500/25",
      bgAccent: "bg-blue-50",
      textAccent: "text-blue-600",
      stats: "10+ Platforms",
      extraIcons: [<Smartphone className="w-3 h-3" />, <Tablet className="w-3 h-3" />],
      glowColor: "blue"
    },
    {
      icon: <Video className="w-7 h-7" />,
      title: "Video Downloader",
      description: "High-quality video downloads in a range of formats and resolutions up to 8K Ultra HD with advanced codec support.",
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      shadowColor: "shadow-purple-500/25",
      bgAccent: "bg-purple-50",
      textAccent: "text-purple-600",
      stats: "Up to 8K Quality",
      extraIcons: [<Play className="w-3 h-3" />],
      glowColor: "purple"
    },
    {
      icon: <Tag className="w-7 h-7" />,
      title: "Tags Extractor",
      description: "Use advanced AI analysis to automatically extract trending tags and keywords from any video to improve discoverability.",
      gradient: "from-emerald-500 via-emerald-600 to-teal-600",
      shadowColor: "shadow-emerald-500/25",
      bgAccent: "bg-emerald-50",
      textAccent: "text-emerald-600",
      stats: "AI-Powered",
      extraIcons: [<TrendingUp className="w-3 h-3" />],
      glowColor: "emerald"
    },
    {
      icon: <Wand2 className="w-7 h-7" />,
      title: "Tags Generator",
      description: "To generate optimized tags and keywords, apply machine learning algorithms that have been trained on millions of successful videos.",
      gradient: "from-orange-500 via-orange-600 to-red-600",
      shadowColor: "shadow-orange-500/25",
      bgAccent: "bg-orange-50",
      textAccent: "text-orange-600",
      stats: "ML-Generated",
      extraIcons: [<Star className="w-3 h-3" />],
      glowColor: "orange"
    },
    {
      icon: <Image className="w-7 h-7" />,
      title: "Thumbnail Downloader",
      description: "Download incredibly high-resolution preview images and thumbnails from a range of video formats for your projects.",
      gradient: "from-indigo-500 via-indigo-600 to-purple-600",
      shadowColor: "shadow-indigo-500/25",
      bgAccent: "bg-indigo-50",
      textAccent: "text-indigo-600",
      stats: "Ultra-HD",
      extraIcons: [<Sparkles className="w-3 h-3" />],
      glowColor: "indigo"
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Lightning Fast",
      description: "lightning-fast downloads thanks to a globally distributed CDN, multi-threaded processing, and advanced compression.   ",
      gradient: "from-yellow-500 via-yellow-600 to-amber-600",
      shadowColor: "shadow-yellow-500/25",
      bgAccent: "bg-yellow-50",
      textAccent: "text-yellow-600",
      stats: "10x Faster",
      extraIcons: [],
      glowColor: "yellow"
    },
  ];

  interface FAQItem {
    id: string;
    question: string;
    answer: string;
    icon: React.ReactNode;
  }

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'Which platforms does Social Fetcher support?',
      answer: 'Social Fetcher supports all major social media platforms including YouTube, Facebook, Instagram, TikTok, Twitter, LinkedIn, Pinterest, Snapchat, and many more. We continuously add support for new platforms based on user demand.',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '2',
      question: 'Is it safe to download videos using Social Fetcher?',
      answer: 'Absolutely! Social Fetcher uses secure, encrypted connections and doesn\'t store any of your personal data. We don\'t require registration or login, ensuring your privacy is completely protected. All downloads are processed securely on our servers.',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: '3',
      question: 'What video qualities are available for download?',
      answer: 'We offer multiple quality options including HD (1080p), Full HD (720p), Standard (480p), and Mobile (360p). The available qualities depend on the original video\'s resolution. We also support audio-only downloads in MP3 format.',
      icon: <Download className="w-5 h-5" />
    },
    {
      id: '4',
      question: 'How fast are the downloads?',
      answer: 'Download speeds depend on your internet connection and the video size. Our optimized servers ensure maximum speed, typically completing downloads within 10-30 seconds for standard videos. Larger files may take slightly longer.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '5',
      question: 'Can I use Social Fetcher on mobile devices?',
      answer: 'Yes! Social Fetcher is fully responsive and works perfectly on all devices - smartphones, tablets, and desktops. Our mobile-optimized interface ensures a smooth experience regardless of your device.',
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: '6',
      question: 'Are there any download limits?',
      answer: 'For basic users, we offer generous daily download limits. Premium users enjoy unlimited downloads, faster processing speeds, and priority support. Check our pricing page for detailed information about our subscription plans.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: '7',
      question: 'How do I extract tags and thumbnails?',
      answer: 'Simply paste the video URL into our tool, and we\'ll automatically extract all available metadata including tags, descriptions, thumbnails, and video information. You can download thumbnails in various resolutions and copy tags with one click.',
      icon: <Download className="w-5 h-5" />
    },
    {
      id: '8',
      question: 'Do you store the videos I download?',
      answer: 'No, we don\'t store any videos on our servers. All processing is done in real-time, and files are automatically deleted after download. This ensures your privacy and keeps our service fast and secure.',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

    const seoProps = {
        title: "Social Fetcher | Ultimate Video Downloader",
        description: "Learn more about Your Company Name, our mission, and values.",
        keywords: "about, company, mission, values, Your Company Name",
        author: "Your Name",
        ogImage: "/images/about-og-image.jpg",
    };
  return (
    <>
       <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl sm:my-24 mt-30">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center mt-37">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Explorer our latest blog posts.{' '}
              <a href="/blogs" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Social Fetcher – Download Videos from
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">YouTube, Facebook, Instagram, TikTok & More</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Social Fetcher empowers your online business with data-rich video content.
            </p>
            <div className="inline-block mt-6">
              <a href="/features" aria-label="Get Started">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Get Started
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="jsx-da1dd2fcec19d1a5 ml-2 w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" className="jsx-da1dd2fcec19d1a5"></path></svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-gray-100 relative overflow-hidden">
        {/* Dynamic Mouse Follower */}
        <div
          className="fixed w-96 h-96 pointer-events-none z-0 opacity-20 transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            filter: 'blur(40px)'
          }}
        />

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-lg"></div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <section className="relative py-15 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-8 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 group">
                <div className="relative">
                  <Download className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-gray-700 font-semibold text-sm tracking-wide">Powerful Features</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Everything
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> You Need</span>
              </h2>

              <p className="mt-5 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Experience the ultimate video downloading platform with cutting-edge features designed for<br></br> creators,
                marketers, and content enthusiasts.
              </p>

              {/* Enhanced Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                {[
                  '500K+ Videos Downloaded',
                  '10M+ Tags Generated',
                  '10+ Platforms Supported',
                  '99% User Satisfaction'
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-500 group hover:text-gray-700 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="font-medium text-sm">{stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/60 p-8 transition-all duration-700 hover:bg-white/95 hover:border-gray-300/60 hover:scale-[1.02] hover:${feature.shadowColor} hover:shadow-2xl transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transitionDelay: `${index * 50}ms`
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated Particles on Hover */}
                  {hoveredCard === index && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1 h-1 bg-gradient-to-r from-${feature.glowColor}-400 to-${feature.glowColor}-600 rounded-full opacity-70`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `sparkle ${0.8 + Math.random() * 0.4}s ease-out forwards`,
                            animationDelay: `${Math.random() * 0.5}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl`}></div>

                  {/* Stats Badge */}
                  <div className={`absolute top-4 right-4 ${feature.bgAccent} ${feature.textAccent} px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                    {feature.stats}
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <div className="text-white relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                        {feature.icon}
                      </div>

                      {/* Extra icons */}
                      {feature.extraIcons.length > 0 && (
                        <div className="absolute -top-1 -right-1 flex gap-1">
                          {feature.extraIcons.map((icon, iconIndex) => (
                            <div key={iconIndex} className="text-white/90 bg-white/25 rounded-full p-1 backdrop-blur-sm">
                              {icon}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Enhanced Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-125`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Enhanced Interactive Elements */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gray-200/50 transition-all duration-500"></div>

                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-100 transition-all duration-700 rounded-3xl`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className={`text-center mt-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-6 mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-24"></div>
                <span className="text-gray-500 font-medium text-sm tracking-wide">Ready to get started?</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-24"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Download className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10 text-sm">Start Downloading Now</span>
                </button>

                <button className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-gray-200/60 hover:bg-white hover:border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Play className="w-5 h-5" />
                  <span className="text-sm">Watch Demo</span>
                </button>
              </div>
            </div> */}
          </div>
        </section>

        <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
      `}</style>
      </div>

      <div>
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,white_50%,transparent_100%)]" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                Universal Compatibility
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Supported
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Platforms</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Download content from all major social media platforms with our advanced fetching technology.
                Supporting videos, images, thumbnails, and metadata extraction.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

              <div className="overflow-hidden slider-height">
                <div className="flex animate-scroll-left">
                  {duplicatedPlatforms.map((platform, index) => {
                    const IconComponent = platform.icon;
                    return (
                      <div
                        key={`${platform.name}-${index}`}
                        className="flex-shrink-0 mx-4 group"
                      >
                        <div className="relative">
                          <div className={`
                        w-80 h-48 rounded-2xl p-6 transition-all duration-500 ease-out
                        bg-white/80 backdrop-blur-sm border border-white/20
                        shadow-xl shadow-gray-200/50
                        group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-gray-300/50
                        group-hover:-translate-y-2
                        ${platform.bgColor}
                      `}>
                            <div className="flex items-center justify-center mb-4">
                              <div className={`
                            w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color}
                            flex items-center justify-center transform transition-all duration-500
                            group-hover:scale-110 group-hover:rotate-3
                            shadow-lg
                          `}>
                                <IconComponent className="w-8 h-8 text-white" />
                              </div>
                            </div>

                            <div className="text-center">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                                {platform.name}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                                {platform.description}
                              </p>
                            </div>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>

                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-white/20">
                <div className="text-center sm:text-left">
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    More platforms coming soon!
                  </p>
                  <p className="text-gray-600 text-sm">
                    We're constantly adding support for new social media platforms
                  </p>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
  @keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-scroll-left {
  animation: scroll-left 100s linear infinite;
  display: flex;
  width: max-content;
}
  .slider-height{
  display:flex;
  height: 215px;
  align-items:center;
  }
      `}</style>
        </section>
      </div>

      {/* <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-5 animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-5 animate-pulse delay-700"></div>

          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-bounce delay-300"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full opacity-20 animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-40 w-5 h-5 bg-pink-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg border border-white/20">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Loved by creators worldwide</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Trusted by
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> 200K+ Creators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of content creators, marketers, and businesses who rely on Social Fetcher for their video download and content optimization needs.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-3 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div
              ref={containerRef}
              className="overflow-hidden rounded-3xl"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                  width: `${(testimonials.length / visibleCards) * 100}%`
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="px-3"
                    style={{ width: `${100 / testimonials.length}%` }}
                  >
                    <div className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 ${testimonial.featured ? 'ring-2 ring-blue-200' : ''}`}>
                      {testimonial.featured && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          Featured
                        </div>
                      )}

                      {testimonial.verified && (
                        <div className="absolute top-4 right-4 bg-green-100 text-green-600 rounded-full p-1">
                          <Shield className="w-4 h-4" />
                        </div>
                      )}

                      <div className="flex space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                      </div>

                      <blockquote className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
                        "{testimonial.content}"
                      </blockquote>

                      <div className="flex items-center space-x-3 mb-4">
                        <div className="relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm truncate">{testimonial.name}</div>
                          <div className="text-gray-600 text-xs truncate">{testimonial.role}</div>
                          <div className="text-blue-600 text-xs font-medium truncate">{testimonial.company}</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Downloads</span>
                          <span className="text-sm font-bold text-gray-900">{testimonial.downloads}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Platform</span>
                          <span className="text-xs font-medium text-blue-600 truncate max-w-20">{testimonial.platform}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-x-8 group border border-white/20"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:shadow-2xl hover:translate-x-8 group border border-white/20"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>

          <div className="flex justify-center space-x-2 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-3'
                  : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                  }`}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      </section> */}

      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200/50 bg-[size:60px_60px] opacity-30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">?</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Frequently
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Asked Questions</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about Social Fetcher's video downloading,
              tag extraction, and thumbnail generation features.
            </p>
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
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg group-hover:from-blue-100 group-hover:to-purple-100 transition-colors duration-200">
                        <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-300 group-hover:from-blue-100 group-hover:to-blue-200 ${openItems.has(item.id) ? 'rotate-180 bg-gradient-to-br from-blue-100 to-blue-200' : ''
                          }`}
                      >
                        {openItems.has(item.id) ? (
                          <Minus className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
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
                  <div className="px-6 pb-6 pt-0">
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

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <a href="/contact-us">
                <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Contact Support
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-grid-gray-200\/50 {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
        }
      `}</style>
      </section>
    </>
  );
}
