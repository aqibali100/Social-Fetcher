'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
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
  TrendingUp,
  Settings,
  ImageIcon,
  LinkIcon
} from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';

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

  const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 → 12
  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${paddedMinutes} ${ampm}`;
};


  // Save download history to localStorage
const saveToHistory = (data: Omit<DownloadHistory, 'downloadedAt'>) => {
  const now = new Date();
  const formattedTime = formatTime(now); // e.g., "11:31 PM"

  const newEntry: DownloadHistory = {
    ...data,
    downloadedAt: formattedTime,
  };

  const updatedHistory = [newEntry, ...downloadHistory.slice(0, 9)];
  setDownloadHistory(updatedHistory);
  localStorage.setItem('yt-thumbnail-history', JSON.stringify(updatedHistory));
};

  const clearHistory = () => {
    setDownloadHistory([]);
    localStorage.removeItem('yt-thumbnail-history');
  };

const getVideoThumbnail = async () => {
  setIsLoading(true);
  setError('');
  setVideoData(null);

  try {
    const res = await fetch('/api/youtube-thumbnail-downloader', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch data');
    setVideoData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

 const downloadThumbnail = async (thumbnail: ThumbnailData) => {
  if (!videoData?.snippet) {
    console.warn("Video data is not available.");
    return;
  }

  try {
    const response = await fetch(thumbnail.url);
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    const safeTitle = videoData.snippet.title.replace(/[^a-zA-Z0-9]/g, '_');
    anchor.href = objectUrl;
    anchor.download = `${safeTitle}_${thumbnail.quality}.jpg`;
    document.body.appendChild(anchor);
    anchor.click();

    // Cleanup
    window.URL.revokeObjectURL(objectUrl);
    document.body.removeChild(anchor);

    saveToHistory({
      id: videoData.id,
      title: videoData.snippet.title,
      channel: videoData.snippet.channelTitle,
      thumbnailUrl: thumbnail.url,
      quality: thumbnail.quality,
    });
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
  if (!videoData?.snippet?.thumbnails) return;

  const zip = new JSZip();
  const thumbnails = Object.entries(videoData.snippet.thumbnails).map(([quality, data]) => ({
    ...data,
    quality,
  }));

  for (const thumbnail of thumbnails) {
    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const safeTitle = videoData.snippet.title.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${safeTitle}_${thumbnail.quality}.jpg`;

      zip.file(fileName, blob);
    } catch (error) {
      console.error(`Failed to fetch ${thumbnail.quality} thumbnail:`, error);
    }
  }

  try {
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipFileName = `${videoData.snippet.title.replace(/[^a-zA-Z0-9]/g, '_')}_thumbnails.zip`;
    saveAs(zipBlob, zipFileName);
  } catch (err) {
    console.error('Error generating zip file:', err);
  }
};

  const seoProps = {
    title: "YouTube Thumbnail Downloader | Social Fetcher",
    description: "Learn more about Your Company Name, our mission, and values.",
    keywords: "about, company, mission, values, Your Company Name",
  };
  function formatViewCount(count) {
  const num = Number(count);
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(0) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(0) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(0) + 'K';
  return num.toString();
}

function formatYouTubeDuration(isoDuration: string) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const hours = parseInt(match?.[1] || "0");
  const minutes = parseInt(match?.[2] || "0");
  const seconds = parseInt(match?.[3] || "0");

  const paddedSeconds = seconds.toString().padStart(2, "0");
  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  } else {
    return `${minutes}:${paddedSeconds}`;
  }
}

const rawDuration = videoData?.contentDetails?.duration;
const formattedDuration = rawDuration ? formatYouTubeDuration(rawDuration) : "0:00";

// Safely create the array only if thumbnails exist
const thumbnailEntries = videoData?.snippet?.thumbnails
  ? Object.entries(videoData.snippet.thumbnails).map(([quality, data]) => ({
      ...data,
      quality,
    }))
  : [];

  return (
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
        <div className="container mx-auto px-4 py-30">
          <div className="text-center mb-12">
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight mt-5">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">YouTube Thumbnail Downloader</span>
            </h1>
             <p className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
                Extract and download high-quality thumbnails from any YouTube video instantly. <br></br>
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
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
                <TabsTrigger 
                  value="downloader" 
                  className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Downloader
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger 
                  value="features"
                  className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
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
                    <form className="space-y-4">
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
                          onClick={getVideoThumbnail}
                          disabled={isLoading || !url.trim()}
                          className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
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
                                  src={videoData.snippet.thumbnails.default.url}
                                  alt="Video thumbnail"
                                  className="w-32 h-24 object-cover rounded-lg border border-gray-600 group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                  <Play className="w-8 h-8 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-semibold text-white mb-2 truncate">
                                  {videoData.snippet.title}
                                </h3>
                                <p className="text-gray-300 mb-2">{videoData.snippet.channelTitle}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {formattedDuration}
                                  </span>
                                  <span>{formatViewCount(videoData.statistics.viewCount)} views</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Download All Button */}
                        <div className="flex justify-center">
                          <Button
                            onClick={downloadAllThumbnails}
                            className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download All Thumbnails
                          </Button>
                        </div>

                        {/* Thumbnails Grid */}
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {thumbnailEntries.map((thumbnail, index) => (
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
              className="flex-1 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={() => copyToClipboard(thumbnail.url)}
              variant="outline"
              className="bg-transparent cursor-pointer border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-300"
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
                        className="bg-transparent cursor-pointer border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
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
                                <span>{item.downloadedAt}</span>
                              </div>
                            </div>
                            <Button
                              onClick={() => window.open(`https://youtube.com/watch?v=${item.id}`, '_blank')}
                              variant="outline"
                              size="sm"
                              className="bg-transparent cursor-pointer border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
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
          <CardHeader className="text-center pb-8">
  <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
    <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse animate-spin-slow" />
    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      How to Use
    </span>
  </h2>
  <CardDescription className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
    Download high-quality YouTube thumbnails in just 3 easy steps
  </CardDescription>
</CardHeader>

<section className="relative z-10 py-20 px-4 pt-0">
  <div className="max-w-6xl mx-auto">
    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-white/20">
      <CardContent className="space-y-8 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold">Paste YouTube Link</h3>
            <p className="text-gray-300 text-sm">
              Copy the URL of any YouTube video and paste it in the input box
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold">Preview Thumbnails</h3>
            <p className="text-gray-300 text-sm">
              Instantly preview available thumbnail resolutions and formats
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold">Download & Use</h3>
            <p className="text-gray-300 text-sm">
              Select the desired quality and click download to save the image
            </p>
          </div>
        </div>

        <Separator className="bg-white/20" />

        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Ideal For:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'YouTube Creators',
              'Social Media',
              'Video Blogs',
              'Marketing Teams',
              'Graphic Designers',
              'Video Editors',
              'Content Planners',
              'Thumbnail Testing'
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
  );
}