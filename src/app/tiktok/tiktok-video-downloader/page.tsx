'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Download, 
  Video, 
  Music, 
  Share2, 
  Copy, 
  Check, 
  Play, 
  Pause,
  Heart,
  Eye,
  Clock,
  User,
  TrendingUp,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Star,
  ChevronDown,
  ChevronRight,
  Settings,
  History,
  Bookmark,
  X
} from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  author: string;
  duration: string;
  views: string;
  likes: string;
  thumbnail: string;
  url: string;
}

interface DownloadProgress {
  id: string;
  progress: number;
  status: 'downloading' | 'completed' | 'error';
  fileName: string;
}

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedQuality, setSelectedQuality] = useState('hd');
  const [removeWatermark, setRemoveWatermark] = useState(true);
  const [downloadHistory, setDownloadHistory] = useState<VideoData[]>([]);
  const [favorites, setFavorites] = useState<VideoData[]>([]);
  const [downloads, setDownloads] = useState<DownloadProgress[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('download');
  const [stats, setStats] = useState({
    totalDownloads: 12543,
    activeUsers: 1324,
    videosProcessed: 98765
  });

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 3),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 2) - 1,
        videosProcessed: prev.videosProcessed + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // URL validation
  useEffect(() => {
    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/;
    setIsValidUrl(tiktokRegex.test(url));
  }, [url]);

  // Mock video data fetch
 const fetchVideoData = async () => {
  setIsLoading(true);
  try {
    const res = await fetch('/api/tiktokdownloader', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      throw new Error('Invalid JSON from server');
    }

    if (!res.ok) {
      throw new Error(data?.error || 'Unknown error');
    }

    console.log('🔍 Raw TikMate response:', data.raw); // ✅ inspect complete response

    setVideoData({
      id: data.id,
      title: data.caption,
      author: data.author,
      duration: data.duration,
      views: data.views,
      likes: data.likes,
      thumbnail: data.thumbnail,
      url: data.videoUrl,
    });
  } catch (error) {
    console.error('Download error:', error);
    // alert('Error: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};


  const handleDownload = (quality: string, audioOnly = false) => {
    if (!videoData) return;

    const downloadId = 'download-' + Date.now();
    const fileName = `${videoData.author}_${videoData.id}.${audioOnly ? 'mp3' : 'mp4'}`;
    
    const newDownload: DownloadProgress = {
      id: downloadId,
      progress: 0,
      status: 'downloading',
      fileName
    };

    setDownloads(prev => [...prev, newDownload]);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloads(prev => prev.map(download => {
        if (download.id === downloadId) {
          const newProgress = Math.min(download.progress + Math.random() * 15, 100);
          return {
            ...download,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'downloading'
          };
        }
        return download;
      }));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setDownloadHistory(prev => [videoData, ...prev.slice(0, 9)]);
    }, 8000);
  };

  const addToFavorites = (video: VideoData) => {
    setFavorites(prev => {
      if (prev.find(fav => fav.id === video.id)) {
        return prev.filter(fav => fav.id !== video.id);
      }
      return [video, ...prev.slice(0, 9)];
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-2xl">
              <Video className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            TikTok Downloader
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Download TikTok videos in HD quality without watermarks. Fast, free, and secure.
          </p>
          
          {/* Live Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{stats.totalDownloads.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.videosProcessed.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Videos Processed</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-sm border border-white/10">
              <TabsTrigger value="download" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
                <Download className="h-4 w-4 mr-2" />
                Download
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                <Bookmark className="h-4 w-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="download" className="space-y-6 mt-8">
              {/* URL Input Section */}
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Share2 className="h-6 w-6 mr-3 text-pink-400" />
                    Paste TikTok URL
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Enter the TikTok video URL you want to download
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Input
                      type="url"
                      placeholder="https://www.tiktok.com/@username/video/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg pr-12"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                      className="absolute right-2 top-2 text-gray-400 hover:text-white"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {url && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${isValidUrl ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className={`text-sm ${isValidUrl ? 'text-green-400' : 'text-red-400'}`}>
                        {isValidUrl ? 'Valid TikTok URL' : 'Invalid URL format'}
                      </span>
                    </div>
                  )}

                  <Button
                    onClick={fetchVideoData}
                    disabled={!isValidUrl || isLoading}
                    className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                        Analyzing Video...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-3" />
                        Get Video Info
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Video Preview */}
              {videoData && (
                <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-2xl">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={videoData.thumbnail}
                            alt="Video thumbnail"
                            className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm">
                              <Play className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{videoData.title}</h3>
                          <div className="flex items-center space-x-4 text-gray-300">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {videoData.author}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {videoData.duration}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Badge variant="secondary" className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                            <Eye className="h-3 w-3 mr-1" />
                            {videoData.views} views
                          </Badge>
                          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                            <Heart className="h-3 w-3 mr-1" />
                            {videoData.likes} likes
                          </Badge>
                        </div>

                        <Separator className="bg-white/10" />

                        {/* Download Options */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="watermark" className="text-white">Remove Watermark</Label>
                            <Switch
                              id="watermark"
                              checked={removeWatermark}
                              onCheckedChange={setRemoveWatermark}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            <Button
                              onClick={() => handleDownload('hd')}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Download HD Video
                            </Button>
                            <Button
                              onClick={() => handleDownload('sd')}
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Download SD Video
                            </Button>
                            <Button
                              onClick={() => handleDownload('audio', true)}
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <Music className="h-4 w-4 mr-2" />
                              Download Audio Only
                            </Button>
                          </div>

                          <Button
                            onClick={() => addToFavorites(videoData)}
                            variant="ghost"
                            className="w-full text-gray-300 hover:text-pink-400 hover:bg-pink-500/10"
                          >
                            <Heart className={`h-4 w-4 mr-2 ${favorites.find(fav => fav.id === videoData.id) ? 'fill-current text-pink-400' : ''}`} />
                            {favorites.find(fav => fav.id === videoData.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Download Progress */}
              {downloads.length > 0 && (
                <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Download Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {downloads.map((download) => (
                      <div key={download.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300 truncate">{download.fileName}</span>
                          <div className="flex items-center space-x-2">
                            {download.status === 'completed' ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : download.status === 'error' ? (
                              <X className="h-4 w-4 text-red-400" />
                            ) : (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-pink-400 border-t-transparent" />
                            )}
                            <span className="text-xs text-gray-400">{Math.round(download.progress)}%</span>
                          </div>
                        </div>
                        <Progress 
                          value={download.progress} 
                          className="bg-white/10"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6 mt-8">
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <History className="h-5 w-5 mr-2" />
                    Download History
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Your recently downloaded videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {downloadHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No downloads yet</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {downloadHistory.map((video, index) => (
                        <div key={video.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                          <img
                            src={video.thumbnail}
                            alt="Thumbnail"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{video.title}</p>
                            <p className="text-gray-400 text-sm">{video.author}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6 mt-8">
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Favorite Videos
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Videos you've saved for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No favorites yet</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {favorites.map((video) => (
                        <div key={video.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                          <img
                            src={video.thumbnail}
                            alt="Thumbnail"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{video.title}</p>
                            <p className="text-gray-400 text-sm">{video.author}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => addToFavorites(video)}
                            className="text-pink-400 hover:text-pink-300"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-8">
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Download Settings
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Customize your download preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Auto-remove watermarks</Label>
                        <p className="text-sm text-gray-400">Automatically remove watermarks from downloads</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">High quality by default</Label>
                        <p className="text-sm text-gray-400">Always download in highest available quality</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Save to history</Label>
                        <p className="text-sm text-gray-400">Keep track of downloaded videos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="bg-black/20 backdrop-blur-sm border-white/10 text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">100% Safe & Secure</h3>
            <p className="text-gray-300">Your privacy is protected. No data stored on our servers.</p>
          </Card>

          <Card className="bg-black/20 backdrop-blur-sm border-white/10 text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-300">Download videos in seconds with our optimized servers.</p>
          </Card>

          <Card className="bg-black/20 backdrop-blur-sm border-white/10 text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Mobile Friendly</h3>
            <p className="text-gray-300">Works perfectly on all devices - phone, tablet, or desktop.</p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Is it free to download TikTok videos?",
                answer: "Yes, our TikTok downloader is completely free to use with no hidden charges or subscription fees."
              },
              {
                question: "Can I download videos without watermarks?",
                answer: "Yes, we offer the option to download TikTok videos without watermarks in high quality."
              },
              {
                question: "What video qualities are available?",
                answer: "We support multiple formats including HD video, SD video, and audio-only downloads."
              },
              {
                question: "Is my data safe when using this service?",
                answer: "Absolutely. We don't store any personal data or downloaded content on our servers."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-medium">
                      {faq.question}
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-gray-300 leading-relaxed">{faq.answer}</p>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
}