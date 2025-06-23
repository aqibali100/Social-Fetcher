"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '../../../components/hooks/use-toast';
import {
  Search,
  Download,
  Copy,
  FileText,
  BarChart3,
  Sparkles,
  Eye,
  ThumbsUp,
  Calendar,
  Tag,
  TrendingUp,
  FileDown,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Hash,
  Zap,
  Target,
  Award,
  Wand2,
  Image,
  Play
} from 'lucide-react';
import Header from '@/components/Header';
import RootLayout from '@/app/layout';
import Footer from '@/components/Footer';

interface TagAnalytics {
  tag: string;
  relevanceScore: number;
  category: 'high' | 'medium' | 'low';
  frequency: number;
}

export default function YouTubeTagsExtractor() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [extractedTags, setExtractedTags] = useState<TagAnalytics[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('extractor');
  const { toast } = useToast();

  // Mock data for demonstration
  const mockVideoData: VideoData = {
    id: 'dQw4w9WgXcQ',
    title: 'Sample YouTube Video - Ultimate Guide to Content Creation',
    description: 'Learn the best practices for creating engaging content on YouTube. This comprehensive guide covers everything from video production to optimization techniques.',
    tags: ['youtube', 'content creation', 'video marketing', 'social media', 'tutorial', 'guide', 'tips', 'strategy', 'engagement', 'optimization', 'seo', 'viral', 'trending', 'algorithm', 'monetization'],
    thumbnails: {
      default: 'https://images.pexels.com/photos/3532544/pexels-photo-3532544.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop',
      medium: 'https://images.pexels.com/photos/3532544/pexels-photo-3532544.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop',
      high: 'https://images.pexels.com/photos/3532544/pexels-photo-3532544.jpeg?auto=compress&cs=tinysrgb&w=480&h=360&fit=crop',
      maxres: 'https://images.pexels.com/photos/3532544/pexels-photo-3532544.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop'
    },
    statistics: {
      viewCount: '1,234,567',
      likeCount: '45,123',
      commentCount: '2,345'
    },
    publishedAt: '2024-01-15T10:30:00Z',
    duration: '12:34',
    channelTitle: 'Content Creator Pro'
  };

  const mockSuggestedTags = [
    'content strategy', 'video production', 'youtube growth', 'social media marketing',
    'digital marketing', 'online business', 'creator economy', 'youtube algorithm',
    'video optimization', 'content monetization', 'audience engagement', 'brand building'
  ];

  const isValidYouTubeUrl = (url: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
  };

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const analyzeTagsData = (tags: string[]): TagAnalytics[] => {
    return tags.map(tag => ({
      tag,
      relevanceScore: Math.floor(Math.random() * 40) + 60,
      category: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
      frequency: Math.floor(Math.random() * 1000) + 100
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
  };

  const handleExtractTags = useCallback(async () => {
    alert(url);
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a YouTube URL to extract tags.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setVideoData(mockVideoData);
      setExtractedTags(analyzeTagsData(mockVideoData.tags));
      setSuggestedTags(mockSuggestedTags);
      setLoading(false);
      
      toast({
        title: "Tags Extracted Successfully!",
        description: `Found ${mockVideoData.tags.length} tags from the video.`,
      });
    }, 2000);
  }, [url, toast]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${label} copied successfully!`,
    });
  };

  const downloadThumbnail = (url: string, quality: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `thumbnail_${quality}.jpg`;
    link.click();
    
    toast({
      title: "Thumbnail Downloaded",
      description: `${quality} quality thumbnail saved successfully!`,
    });
  };

  const exportTags = (format: 'json' | 'csv' | 'txt') => {
    if (!videoData) return;

    let content = '';
    let filename = '';

    switch (format) {
      case 'json':
        content = JSON.stringify({
          video: videoData,
          tags: extractedTags,
          exportedAt: new Date().toISOString()
        }, null, 2);
        filename = 'youtube_tags.json';
        break;
      case 'csv':
        content = 'Tag,Relevance Score,Category,Frequency\n' +
          extractedTags.map(tag => `"${tag.tag}",${tag.relevanceScore},${tag.category},${tag.frequency}`).join('\n');
        filename = 'youtube_tags.csv';
        break;
      case 'txt':
        content = extractedTags.map(tag => tag.tag).join(', ');
        filename = 'youtube_tags.txt';
        break;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Tags exported as ${format.toUpperCase()} format!`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const seoProps = {
    title: 'YouTube Video Tags Extractor',
    description: 'Extract tags from YouTube videos and download thumbnails for easy organization and analysis.',
  }

  return (
 <RootLayout seoProps={seoProps}>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-40">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-500/20 rounded-full backdrop-blur-sm">
              <Play className="h-8 w-8 text-red-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              YouTube Tags Extractor
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Extract, analyze, and optimize YouTube video tags with AI-powered insights and advanced analytics
          </p>
        </div>

        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-lg py-6"
                />
              </div>  
              <Button
                onClick={handleExtractTags}
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Extract Tags
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-2">Analyzing Video...</h3>
                <p className="text-gray-300">Extracting tags and generating insights</p>
                <Progress value={65} className="mt-4 max-w-md mx-auto" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {videoData && !loading && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 bg-white/10 backdrop-blur-md border-white/20 h-auto p-1">
              <TabsTrigger value="extractor" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
                <Tag className="h-4 w-4" />
                Tags
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="generator" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
                <Wand2 className="h-4 w-4" />
                Generator
              </TabsTrigger>
              <TabsTrigger value="download" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
                <Download className="h-4 w-4" />
                Download
              </TabsTrigger>
            </TabsList>

            {/* Video Information Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-4">{videoData.title}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Eye className="h-4 w-4" />
                        <span>{videoData.statistics.viewCount} views</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{videoData.statistics.likeCount} likes</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(videoData.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Play className="h-4 w-4" />
                        <span>{videoData.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{videoData.description.substring(0, 200)}...</p>
                  </div>
                  <div className="text-center">
                    <img
                      src={videoData.thumbnails.high}
                      alt="Video thumbnail"
                      className="w-full rounded-lg shadow-lg mb-4"
                    />
                    <p className="text-gray-300 text-sm">{videoData.channelTitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="extractor" className="space-y-6">
              {/* Tags Display */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Hash className="h-5 w-5" />
                    Extracted Tags ({extractedTags.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {extractedTags.map((tagData, index) => (
                      <Badge
                        key={index}
                        className={`${getCategoryColor(tagData.category)} cursor-pointer transition-all duration-300 hover:scale-105`}
                        onClick={() => copyToClipboard(tagData.tag, 'Tag')}
                      >
                        {tagData.tag}
                        <span className="ml-2 text-xs">({tagData.relevanceScore}%)</span>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(extractedTags.map(t => t.tag).join(', '), 'All tags')}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportTags('txt')}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Export TXT
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportTags('csv')}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportTags('json')}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Export JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Tag Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Target className="h-5 w-5 text-green-400" />
                      High Relevance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {extractedTags.filter(t => t.category === 'high').length}
                    </div>
                    <p className="text-gray-300 text-sm">Tags with 80%+ relevance</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <TrendingUp className="h-5 w-5 text-yellow-400" />
                      Medium Relevance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {extractedTags.filter(t => t.category === 'medium').length}
                    </div>
                    <p className="text-gray-300 text-sm">Tags with 60-80% relevance</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      Low Relevance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      {extractedTags.filter(t => t.category === 'low').length}
                    </div>
                    <p className="text-gray-300 text-sm">Tags with &lt;60% relevance</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Tag Analysis */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    Tag Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {extractedTags.slice(0, 10).map((tagData, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className={getCategoryColor(tagData.category)}>
                            {tagData.tag}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-white font-semibold">{tagData.relevanceScore}%</div>
                            <div className="text-gray-400 text-xs">{tagData.frequency} searches</div>
                          </div>
                          <Progress value={tagData.relevanceScore} className="w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generator" className="space-y-6">
              {/* AI Tag Suggestions */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    AI-Powered Tag Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Based on your video content and trending topics:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedTags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-purple-100 text-purple-800 border-purple-200 cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => copyToClipboard(tag, 'Suggested tag')}
                      >
                        <Zap className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(suggestedTags.join(', '), 'All suggested tags')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy All Suggestions
                  </Button>
                </CardContent>
              </Card>

              {/* Tag Optimization Tips */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Award className="h-5 w-5 text-yellow-400" />
                    Optimization Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-white font-semibold">Great tag diversity</h4>
                        <p className="text-gray-300 text-sm">Your tags cover multiple relevant categories</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="text-white font-semibold">Consider long-tail keywords</h4>
                        <p className="text-gray-300 text-sm">Add more specific 3-4 word tags for better targeting</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-white font-semibold">Include trending tags</h4>
                        <p className="text-gray-300 text-sm">Some of your tags are currently trending - great choice!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="download" className="space-y-6">
              {/* Thumbnail Downloads */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Image className="h-5 w-5" />
                    Thumbnail Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(videoData.thumbnails).map(([quality, url]) => (
                      <div key={quality} className="text-center">
                        <img
                          src={url}
                          alt={`${quality} quality thumbnail`}
                          className="w-full rounded-lg shadow-lg mb-2"
                        />
                        <div className="text-white text-sm font-semibold mb-2 capitalize">{quality} Quality</div>
                        <Button
                          size="sm"
                          onClick={() => downloadThumbnail(url, quality)}
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileDown className="h-5 w-5" />
                    Export Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => exportTags('json')}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-6"
                    >
                      <FileDown className="mr-2 h-5 w-5" />
                      JSON Format
                      <div className="text-xs opacity-75 ml-2">Complete data</div>
                    </Button>
                    <Button
                      onClick={() => exportTags('csv')}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6"
                    >
                      <FileDown className="mr-2 h-5 w-5" />
                      CSV Format
                      <div className="text-xs opacity-75 ml-2">Spreadsheet ready</div>
                    </Button>
                    <Button
                      onClick={() => exportTags('txt')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
                    >
                      <FileDown className="mr-2 h-5 w-5" />
                      TXT Format
                      <div className="text-xs opacity-75 ml-2">Simple list</div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
      <Footer />
        </RootLayout>
  );
}