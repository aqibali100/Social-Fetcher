'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Copy, Check, Zap, Shield, Globe, Search, Star, ArrowRight, Sparkles, Download, Settings,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <div
            className="w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              boxShadow: `0 0 ${2 + Math.random() * 4}px rgba(59, 130, 246, 0.5)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

const generateSlug = (text: string, options: SlugOptions): string => {
  if (!text) return '';

  let slug = text.toLowerCase();

  // Remove special characters
  slug = slug.replace(/[^\w\s-]/g, '');

  // Replace spaces with separator
  slug = slug.replace(/\s+/g, options.separator);

  // Remove multiple separators
  slug = slug.replace(new RegExp(`${options.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}+`, 'g'), options.separator);

  // Remove leading/trailing separators
  slug = slug.replace(new RegExp(`^${options.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}+|${options.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}+$`, 'g'), '');

  // Apply max length
  if (options.maxLength && slug.length > options.maxLength) {
    slug = slug.substring(0, options.maxLength);
    // Remove trailing separator if cut off in middle
    slug = slug.replace(new RegExp(`${options.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '');
  }

  return slug;
};

interface SlugOptions {
  separator: string;
  maxLength?: number;
  removeNumbers: boolean;
}

export default function SlugGenerator() {
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState('');
  const [generatedSlug, setGeneratedSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const getCurrentYear = () => new Date().getFullYear();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());



  const [options, setOptions] = useState<SlugOptions>({
    separator: '-',
    maxLength: 50,
    removeNumbers: false,
  });

  const generateSlugCallback = useCallback((text: string, opts: SlugOptions) => {
    let processedText = text;
    if (opts.removeNumbers) {
      processedText = processedText.replace(/\d/g, '');
    }
    return generateSlug(processedText, opts);
  }, []);

  useEffect(() => {
    const slug = generateSlugCallback(inputText, options);
    setGeneratedSlug(slug);
  }, [inputText, options, generateSlugCallback]);

  const handleCopy = async () => {
    if (generatedSlug) {
      await navigator.clipboard.writeText(generatedSlug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

const startGeneratingSlugs = () => {
  if (inputRef.current) {
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  interface FAQItem {
    id: number;
    question: string;
    answer: string;
  }

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is a slug in a web URL?",
      answer: "A slug in a web URL is string of characters that identifies a specific resource or page on a website. It is the part of the URL that comes after the domain name and before the query parameters or fragment."
    },
    {
      id: 2,
      question: "What is a slug generator used for?",
      answer: "Slug generator is used for creating unique and user-friendly URLs for your website's content. It helps in generating SEO-friendly slugs that are easy to remember and shareable."
    },
    {
      id: 3,
      question: "What is the slug generator's mechanism?",
      answer: "Yes, we offer comprehensive post-launch support including maintenance, updates, bug fixes, and technical assistance. We have various support packages available, from basic maintenance to full-scale ongoing development partnerships."
    },
    {
      id: 4,
      question: "Can I separate slugs with spaces?",
      answer: "Our pricing is project-based and depends on the specific requirements, complexity, and timeline. We offer transparent pricing with detailed quotes that break down all costs. We also provide flexible payment plans and can work within various budget ranges."
    },
    {
      id: 5,
      question: "Is the tool free to use?",
      answer: "Absolutely! We're experienced in collaborating with existing teams and can integrate seamlessly into your current workflow. Whether you need additional development resources, specialized expertise, or project leadership, we adapt to your team's needs and processes."
    },
    {
      id: 6,
      question: "Will the tool have an impact on my website's SEO?",
      answer: "We work with a wide range of modern technologies including React, Vue.js, Node.js, Python, PHP, mobile frameworks like React Native and Flutter, cloud platforms like AWS and Azure, and many other cutting-edge tools and frameworks."
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate SEO-friendly slugs in real-time as you type',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'URL Safe',
      description: 'Automatically removes special characters and spaces',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Universal',
      description: 'Works with any language and character set',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      description: 'Creates search engine friendly URLs and many more',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const examples = [
    { input: 'How to Download YouTube Videos', output: 'how-to-download-youtube-videos' },
    { input: `Best Instagram Video Downloader ${getCurrentYear()}!`, output: `best-instagram-video-downloader-${getCurrentYear()}` },
    { input: 'TikTok Video Extractor & Generator', output: 'tiktok-video-extractor-generator' },
    { input: 'Facebook Video Download Tutorial', output: 'facebook-video-download-tutorial' }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <Particles />

        {/* Hero Section */}
        <section className="relative z-10 pt-30 pb-16 px-4" ref={inputRef}>
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight mt-5">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Slug Generator</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
              Instantly turn any text into clear, search engine optimized URL slugs. Ideal for optimizing social<br></br> media content, blog posts, and video titles.
            </p>

            {/* Main Input Section */}
            <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardHeader className="pb-4">
                <h3 className="text-white text-left text-2xl md:text-3xl font-bold leading-tight">Generate Your Slug</h3>
                <CardDescription className="text-gray-300 text-left">
                  Enter your text below and watch it transform into a perfect URL slug
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative" >
                  <Input
                    type="text"
                    placeholder="Enter your text here... (e.g., How to Download YouTube Videos)"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="text-sm py-4 bg-white/5 pr-12 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                  {inputText && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">Live</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="separator" className="text-white text-sm">Separator</Label>
                    <select
                      id="separator"
                      value={options.separator}
                      onChange={(e) => setOptions(prev => ({ ...prev, separator: e.target.value }))}
                      className="bg-white/10 border cursor-pointer border-white/20 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-blue-400"
                    >
                      <option value="-" className="bg-slate-800">Dash (-)</option>
                      <option value="_" className="bg-slate-800">Underscore ( _ )</option>
                      <option value="." className="bg-slate-800">Dot (.)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxLength" className="text-white text-sm">Max Length</Label>
                    <Input
                      id="maxLength"
                      type="number"
                      min="10"
                      max="200"
                      value={options.maxLength || ''}
                      onChange={(e) => setOptions(prev => ({ ...prev, maxLength: parseInt(e.target.value) || undefined }))}
                      className="w-20 bg-white/10 border-white/20 text-white text-sm h-8"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="removeNumbers" className="text-white text-sm">Remove Numbers</Label>
                    <Switch
                      id="removeNumbers"
                      className='bg-white/10 border border-white/20'
                      checked={options.removeNumbers}
                      onCheckedChange={(checked) => setOptions(prev => ({ ...prev, removeNumbers: checked }))}
                    />
                  </div>
                </div>

                {/* Output */}
                {generatedSlug && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white font-medium">Generated Slug:</Label>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                        {generatedSlug.length} characters
                      </Badge>
                    </div>
                    <div className="relative">
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 font-mono text-lg text-blue-300 break-all">
                        {generatedSlug}
                      </div>
                      <Button
                        onClick={handleCopy}
                        size="sm"
                        className={cn(
                          "absolute right-0  top-25 transition-all duration-200 mt-1 cursor-pointer",
                          copied
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        )}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <CardHeader className="text-center pb-8">
          <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
            <Sparkles
              className="w-8 h-8 text-yellow-400 animate-pulse animate-spin-slow"
            />
            <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>How to Use</span>
          </h2>
          <CardDescription className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
            Get perfect slugs in just a few simple steps
          </CardDescription>
        </CardHeader>
      <div className='pb-20'>
          <section className="relative z-10 py-20 px-4 pt-0">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-white/20">
              <CardContent className="space-y-8 p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-white font-semibold">Enter Your Text</h3>
                    <p className="text-gray-300 text-sm">
                      Type or paste your title, heading, or any text you want to convert
                    </p>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Customize Options</h3>
                    <p className="text-gray-300 text-sm">
                      Choose separator, set max length, and toggle advanced options
                    </p>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Copy & Use</h3>
                    <p className="text-gray-300 text-sm">
                      Click copy and use your perfect slug in URLs, file names, or IDs
                    </p>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Perfect for:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Blog Posts',
                      'Video Titles',
                      'Social Media',
                      'File Names',
                      'Product URLs',
                      'Category Pages',
                      'Tag Systems',
                      'SEO Optimization'
                    ].map((use, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20 justify-center py-2"
                      >
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

        {/* Features Section */}
        <section className="relative z-10 py-13 px-4 pt-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4"><span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Why Choose our Slug Generator?</span></h2>
              <p className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
                Strong features that help you generate the ideal URLs for your content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className={cn(
                      "w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                      feature.color
                    )}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="relative z-10 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-4"><span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Watch It Happen</span></h2>
              <p className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
                Actual instances from videos and social media
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {examples.map((example, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                        Example {index + 1}
                      </Badge>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-gray-400 text-sm">Input:</Label>
                        <p className="text-white font-medium">{example.input}</p>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Output:</Label>
                        <code className="text-blue-300 font-mono bg-blue-500/10 px-2 py-1 rounded text-sm">
                          {example.output}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="relative z-10 pb-15 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-5">
                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Are You Prepared to Improve Your URLs?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join the thousands of content producers who use our slug generator to generate SEO-friendly URLs that improve user experience and search engine rankings.
                </p>
                <Button
                  size="lg"
                  onClick={startGeneratingSlugs}
                  className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Start Generating Slugs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 pb-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
              Find answers to common questions about our services, process,<br></br> and how we can help bring your vision to life.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openItems.has(item.id);

              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-200
          transition-all duration-500 ease-out bg-none cursor-pointer focus:bg-transparent
          ${isOpen
                      ? 'shadow-xl border-blue-200 ring-1 ring-blue-100'
                      : 'bg-none hover:shadow-lg hover:border-gray-300'
                    }
        `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Gradient Background Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0
            transition-opacity duration-500 ease-out bg-none
            ${isOpen ? 'opacity-100' : 'group-hover:opacity-30'}
          `}
                  />

                  {/* Question Button */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="relative w-full px-8 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl focus:bg-transparent cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg md:text-xl font-semibold text-white pr-8 leading-relaxed
              group-hover:text-white group-hover:text-900 bg-none
              transition-colors duration-300 ${isOpen ? 'text-white' : ''}`}
                      >
                        {item.question}
                      </h3>

                      {/* Animated Icon Container */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-500 ease-out transform cursor-pointer
                ${isOpen
                            ? 'bg-blue-500 text-white scale-110 rotate-180'
                            : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 group-hover:scale-105'
                          }
              `}
                      >
                        <div className={`transition-all duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}>
                          {isOpen ? (
                            <Minus size={20} className="transition-all duration-300" />
                          ) : (
                            <Plus size={20} className="transition-all duration-300" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Answer Content */}
                  <div
                    className={`relative overflow-hidden transition-all duration-500 ease-out
            ${isOpen ? 'max-h-96 opacity-100 bg-none' : 'max-h-0 opacity-0'}
          `}
                  >
                    <div className="px-8 pb-8 bg-none">
                      <div className={`pt-2 border-t border-gray-100 transition-all duration-500 ease-out delay-100
              ${isOpen ? 'transform translate-y-0 bg-none' : 'transform -translate-y-4'}
            `}>
                        <p className="text-white leading-relaxed text-base md:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Animation */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500
            transition-all duration-500 ease-out
            ${isOpen ? 'w-full' : 'w-0'}
          `}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
  );
}