'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Copy, 
  Search, 
  Play, 
  Image, 
  Zap, 
  Shield, 
  Clock,
  Star,
  Check,
  X,
  History,
  Trash2,
  ExternalLink,
  Youtube,
  Sparkles,
  Globe,
  Users,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import RootLayout from '@/app/layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ThumbnailData {
  url: string;
  width: number;
  height: number;
  quality: string;
}

interface VideoData {
  id: string;
  title: string;
  channel: string;
  thumbnails: ThumbnailData[];
  duration: string;
  views: string;
}

interface DownloadHistory {
  id: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  downloadedAt: Date;
  quality: string;
}

export default function YouTubeThumbnailPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState('');
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
  const [copiedUrls, setCopiedUrls] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('downloader');

  // Load download history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('yt-thumbnail-history');
    if (savedHistory) {
      setDownloadHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save download history to localStorage
  const saveToHistory = (data: Omit<DownloadHistory, 'downloadedAt'>) => {
    const newEntry: DownloadHistory = {
      ...data,
      downloadedAt: new Date()
    };
    const updatedHistory = [newEntry, ...downloadHistory.slice(0, 9)]; // Keep last 10
    setDownloadHistory(updatedHistory);
    localStorage.setItem('yt-thumbnail-history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setDownloadHistory([]);
    localStorage.removeItem('yt-thumbnail-history');
  };

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const fetchVideoData = async (videoId: string): Promise<VideoData> => {
    // Simulate API call - In production, you'd call YouTube API or your backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData: VideoData = {
      id: videoId,
      title: "Amazing YouTube Video Title - Creative Content 2024",
      channel: "Creative Channel",
      duration: "12:34",
      views: "1.2M views",
      thumbnails: [
        {
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          quality: 'HD (1280x720)'
        },
        {
          url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          width: 640,
          height: 480,
          quality: 'SD (640x480)'
        },
        {
          url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          width: 480,
          height: 360,
          quality: 'HQ (480x360)'
        },
        {
          url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          width: 320,
          height: 180,
          quality: 'MQ (320x180)'
        },
        {
          url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
          width: 120,
          height: 90,
          quality: 'Default (120x90)'
        }
      ]
    };
    
    return mockData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError('');
    setVideoData(null);

    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      }

      const data = await fetchVideoData(videoId);
      console.log('Fetched video data:', data);
      setVideoData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video data');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadThumbnail = async (thumbnail: ThumbnailData) => {
    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoData?.title.replace(/[^a-zA-Z0-9]/g, '_')}_${thumbnail.quality}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      if (videoData) {
        saveToHistory({
          id: videoData.id,
          title: videoData.title,
          channel: videoData.channel,
          thumbnailUrl: thumbnail.url,
          quality: thumbnail.quality
        });
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrls(prev => new Set([...prev, url]));
      setTimeout(() => {
        setCopiedUrls(prev => {
          const newSet = new Set(prev);
          newSet.delete(url);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const downloadAllThumbnails = async () => {
    if (!videoData) return;
    
    for (const thumbnail of videoData.thumbnails) {
      await downloadThumbnail(thumbnail);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between downloads
    }
  };

  const seoProps = {
    title: "YouTube Thumbnail Downloader | Social Fetcher",
    description: "Learn more about Your Company Name, our mission, and values.",
    keywords: "about, company, mission, values, Your Company Name",
  };

  return (
   <RootLayout seoProps={seoProps}>
    <Header></Header>
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float opacity-10 ${
              i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {i % 3 === 0 ? (
              <Youtube className="w-8 h-8 text-red-400" />
            ) : i % 3 === 1 ? (
              <Image className="w-6 h-6 text-blue-400" />
            ) : (
              <Download className="w-7 h-7 text-green-400" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Advanced YouTube Tools</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
              YouTube Thumbnail
              <br />
              <span className="text-4xl md:text-6xl">Downloader</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Extract and download high-quality thumbnails from any YouTube video instantly. 
              Get HD, SD, and custom resolution thumbnails with one click.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-12">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>HD Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Multiple Formats</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Bulk Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No Registration</span>
              </div>
            </div>
          </div>

          {/* Main Interface */}
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
                <TabsTrigger 
                  value="downloader" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Downloader
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger 
                  value="features"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Features
                </TabsTrigger>
              </TabsList>

              {/* Downloader Tab */}
              <TabsContent value="downloader" className="mt-8 space-y-8">
                <Card className="bg-black/20 backdrop-blur-md border border-gray-700/50 shadow-2xl">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
                      <Youtube className="w-8 h-8 text-red-500" />
                      Enter YouTube URL
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Input
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="bg-black/30 border border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg rounded-xl pl-14 pr-32 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                          disabled={isLoading}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Button
                          type="submit"
                          disabled={isLoading || !url.trim()}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Loading...
                            </div>
                          ) : (
                            <>
                              <Search className="w-4 h-4 mr-2" />
                              Fetch
                            </>
                          )}
                        </Button>
                      </div>
                    </form>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span className="text-red-300">{error}</span>
                      </div>
                    )}

                    {isLoading && (
                      <div className="space-y-4">
                        <div className="animate-pulse bg-gray-700/50 h-48 rounded-xl"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-700/50 h-32 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    )}

                    {videoData && (
                      <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                        {/* Video Info */}
                        <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="relative group">
                                <img
                                  src={videoData.thumbnails[0]?.url}
                                  alt="Video thumbnail"
                                  className="w-32 h-24 object-cover rounded-lg border border-gray-600 group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                  <Play className="w-8 h-8 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-semibold text-white mb-2 truncate">
                                  {videoData.title}
                                </h3>
                                <p className="text-gray-300 mb-2">{videoData.channel}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {videoData.duration}
                                  </span>
                                  <span>{videoData.views}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Download All Button */}
                        <div className="flex justify-center">
                          <Button
                            onClick={downloadAllThumbnails}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download All Thumbnails
                          </Button>
                        </div>

                        {/* Thumbnails Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {videoData.thumbnails.map((thumbnail, index) => (
                            <Card
                              key={index}
                              className="bg-black/30 backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group"
                            >
                              <CardContent className="p-4 space-y-4">
                                <div className="relative">
                                  <img
                                    src={thumbnail.url}
                                    alt={`Thumbnail ${thumbnail.quality}`}
                                    className="w-full h-32 object-cover rounded-lg border border-gray-600"
                                  />
                                  <Badge
                                    variant="secondary"
                                    className="absolute top-2 right-2 bg-black/70 text-white border-0"
                                  >
                                    {thumbnail.quality}
                                  </Badge>
                                </div>
                                
                                <div className="space-y-3">
                                  <div className="text-center text-sm text-gray-300">
                                    {thumbnail.width} × {thumbnail.height}
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => downloadThumbnail(thumbnail)}
                                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
                                    >
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </Button>
                                    <Button
                                      onClick={() => copyToClipboard(thumbnail.url)}
                                      variant="outline"
                                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                      {copiedUrls.has(thumbnail.url) ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <Copy className="w-4 h-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="mt-8">
                <Card className="bg-black/20 backdrop-blur-md border border-gray-700/50 shadow-2xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <History className="w-6 h-6" />
                      Download History
                    </CardTitle>
                    {downloadHistory.length > 0 && (
                      <Button
                        onClick={clearHistory}
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {downloadHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl text-gray-400 mb-2">No downloads yet</h3>
                        <p className="text-gray-500">Your download history will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {downloadHistory.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                          >
                            <img
                              src={item.thumbnailUrl}
                              alt="Thumbnail"
                              className="w-16 h-12 object-cover rounded-lg border border-gray-600"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium truncate">{item.title}</h4>
                              <p className="text-gray-400 text-sm">{item.channel}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                <span>{item.quality}</span>
                                <span>{new Date(item.downloadedAt).toLocaleString()}</span>
                              </div>
                            </div>
                            <Button
                              onClick={() => window.open(`https://youtube.com/watch?v=${item.id}`, '_blank')}
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Zap,
                      title: "Lightning Fast",
                      description: "Extract thumbnails instantly from any YouTube video with our optimized processing.",
                      color: "text-yellow-400"
                    },
                    {
                      icon: Shield,
                      title: "100% Secure",
                      description: "Your data is never stored. All processing happens locally in your browser.",
                      color: "text-green-400"
                    },
                    {
                      icon: Image,
                      title: "Multiple Qualities",
                      description: "Download thumbnails in HD, SD, HQ, MQ, and default resolutions.",
                      color: "text-blue-400"
                    },
                    {
                      icon: Download,
                      title: "Bulk Download",
                      description: "Download all thumbnail sizes at once with our bulk download feature.",
                      color: "text-purple-400"
                    },
                    {
                      icon: Copy,
                      title: "Copy URLs",
                      description: "Quickly copy thumbnail URLs to clipboard for easy sharing and integration.",
                      color: "text-pink-400"
                    },
                    {
                      icon: Globe,
                      title: "Universal Access",
                      description: "Works with any YouTube video from any region without restrictions.",
                      color: "text-indigo-400"
                    }
                  ].map((feature, index) => (
                    <Card
                      key={index}
                      className="bg-black/30 backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
                    >
                      <CardContent className="p-6 text-center space-y-4">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Stats Section */}
                <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md border border-purple-500/20 mt-12">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-white mb-2">Trusted by Creators Worldwide</h3>
                      <p className="text-gray-300">Join thousands of content creators using our tools</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                      {[
                        { icon: Users, label: "Active Users", value: "50K+" },
                        { icon: Download, label: "Downloads", value: "2M+" },
                        { icon: TrendingUp, label: "Success Rate", value: "99.9%" },
                        { icon: Star, label: "Rating", value: "4.9/5" }
                      ].map((stat, index) => (
                        <div key={index} className="space-y-2">
                          <stat.icon className="w-8 h-8 text-purple-400 mx-auto" />
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300 text-lg">Everything you need to know about our YouTube thumbnail downloader</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What video platforms are supported?",
                  answer: "Currently, we support YouTube videos. We're working on adding support for other platforms like Instagram, TikTok, and Facebook."
                },
                {
                  question: "Are there any limits on downloads?",
                  answer: "No, there are no limits! You can download as many thumbnails as you need, completely free."
                },
                {
                  question: "What thumbnail qualities are available?",
                  answer: "We provide HD (1280x720), SD (640x480), HQ (480x360), MQ (320x180), and Default (120x90) quality thumbnails."
                },
                {
                  question: "Is it safe to use?",
                  answer: "Absolutely! We don't store any of your data. All processing happens in your browser, ensuring complete privacy and security."
                },
                {
                  question: "Can I use these thumbnails commercially?",
                  answer: "Please respect copyright laws. Make sure you have the right to use the thumbnails for your intended purpose."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-gray-800">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <Youtube className="w-8 h-8 text-red-500" />
              Social Fetcher
            </div>
            <p className="text-gray-400 mb-6">
              Your ultimate tool for social media content extraction and generation
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <Button variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white">
                Privacy Policy
              </Button>
              <Button variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white">
                Terms of Service
              </Button>
              <Button variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white">
                Contact Us
              </Button>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Social Fetcher. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
    <Footer></Footer>
   </RootLayout>
  );
}