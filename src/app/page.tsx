'use client'

import React, { useEffect, useState } from 'react';
import { Download, Video,   Plus, Minus, Globe, Clock , Tag, Wand2, Image, Zap, Shield, Monitor, Smartphone, Tablet, Play, Star, TrendingUp, Sparkles,  Youtube,Facebook,Instagram,Music,Twitter,Linkedin} from 'lucide-react';
import Link from 'next/link';

  interface FAQItem {
    id: string;
    question: string;
    answer: string;
    icon: React.ReactNode;
  }

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
      extraIcons: [
  <Smartphone className="w-3 h-3" key="smartphone-icon" />,
  <Tablet className="w-3 h-3" key="tablet-icon" />
],
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
      extraIcons: [<Play className="w-3 h-3" key="play-icon" />],
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
      extraIcons: [<TrendingUp className="w-3 h-3" key="trending-icon" />],
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
      extraIcons: [<Star className="w-3 h-3" key="star-icon" />],
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
      extraIcons: [<Sparkles className="w-3 h-3" key="sparkles-icon" />],
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
      extraIcons: [] ,
      glowColor: "yellow"
    },
  ];

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
  ];

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

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const duplicatedPlatforms = [...platforms, ...platforms];
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

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
        {/* Hero section */}
        <div className="mx-auto max-w-2xl sm:my-40 sm:mb-20 mt-40 pb-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Download Videos from
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> YouTube, Facebook, Instagram, TikTok & More</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Social Fetcher empowers your online business with data-rich video content.
            </p>
             <div className="hidden sm:mb-8 sm:flex sm:justify-center mt-10">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Explorer our latest blog posts.{' '}
              <Link href="/blogs" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
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

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Can not find the answer you are looking for? Our support team is here to help.
              </p>
              <a href="/contact-us">
                <button className="inline-flex cursor-pointer items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
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

//   export const metadata = {
//   title: "YouTube Video Downloader | Social Fetcher",
//   description: "Download YouTube videos in MP4 or MP3 format instantly using Social Fetcher.",
//   openGraph: {
//     title: "YouTube Video Downloader | Social Fetcher",
//     description: "Download YouTube videos in MP4 or MP3 format instantly.",
//     url: "https://yourdomain.com/youtube",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "YouTube Downloader",
//     description: "Download YouTube videos fast and free.",
//   }
// };
