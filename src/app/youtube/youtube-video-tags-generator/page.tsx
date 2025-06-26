"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '../../../components/hooks/use-toast';
import {
  Wand2,
  Download,
  Copy,
  FileText,
  BarChart3,
  Sparkles,
  Target,
  TrendingUp,
  FileDown,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Hash,
  Zap,
  Award,
  Brain,
  Lightbulb,
  Search,
  Filter,
  Settings,
  Globe,
  Users,
  Calendar,
  Tag,
  Rocket,
  Star,
  Flame,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Play,
  Video
} from 'lucide-react';

interface GeneratedTag {
  tag: string;
  relevanceScore: number;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  category: string;
  trending: boolean;
}

interface GenerationSettings {
  category: string;
  audience: string;
  language: string;
  tagCount: number;
  includeHashtags: boolean;
  includeLongTail: boolean;
  focusOnTrending: boolean;
  competitionLevel: string;
}

export default function YouTubeTagsGenerator() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedTags, setGeneratedTags] = useState<GeneratedTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('generator');
  const [settings, setSettings] = useState<GenerationSettings>({
    category: 'general',
    audience: 'general',
    language: 'english',
    tagCount: 30,
    includeHashtags: false,
    includeLongTail: true,
    focusOnTrending: true,
    competitionLevel: 'medium'
  });
  const { toast } = useToast();

  // Mock categories and audiences
  const categories = [
    'General', 'Gaming', 'Technology', 'Education', 'Entertainment', 'Music',
    'Sports', 'Travel', 'Food', 'Fashion', 'Health', 'Business', 'Science',
    'Art', 'Comedy', 'News', 'Lifestyle', 'DIY', 'Automotive', 'Pets'
  ];

  const audiences = [
    'General', 'Kids', 'Teens', 'Young Adults', 'Adults', 'Seniors',
    'Professionals', 'Students', 'Parents', 'Gamers', 'Tech Enthusiasts'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Japanese', 'Korean', 'Chinese', 'Hindi', 'Arabic'
  ];

  // Mock generated tags data
  const mockGeneratedTags: GeneratedTag[] = [
    { tag: 'how to', relevanceScore: 95, searchVolume: 125000, competition: 'high', category: 'Tutorial', trending: true },
    { tag: 'tutorial', relevanceScore: 92, searchVolume: 98000, competition: 'high', category: 'Education', trending: true },
    { tag: 'beginner guide', relevanceScore: 88, searchVolume: 67000, competition: 'medium', category: 'Education', trending: false },
    { tag: 'step by step', relevanceScore: 85, searchVolume: 54000, competition: 'medium', category: 'Tutorial', trending: false },
    { tag: 'easy tutorial', relevanceScore: 82, searchVolume: 43000, competition: 'low', category: 'Education', trending: true },
    { tag: 'complete guide', relevanceScore: 80, searchVolume: 38000, competition: 'medium', category: 'Tutorial', trending: false },
    { tag: 'tips and tricks', relevanceScore: 78, searchVolume: 32000, competition: 'low', category: 'Tips', trending: true },
    { tag: 'best practices', relevanceScore: 75, searchVolume: 28000, competition: 'low', category: 'Tips', trending: false },
    { tag: 'quick tutorial', relevanceScore: 73, searchVolume: 25000, competition: 'low', category: 'Tutorial', trending: false },
    { tag: 'explained', relevanceScore: 70, searchVolume: 22000, competition: 'medium', category: 'Education', trending: false },
    { tag: 'for beginners', relevanceScore: 68, searchVolume: 19000, competition: 'low', category: 'Education', trending: false },
    { tag: 'made simple', relevanceScore: 65, searchVolume: 16000, competition: 'low', category: 'Tutorial', trending: false },
    { tag: 'ultimate guide', relevanceScore: 63, searchVolume: 14000, competition: 'medium', category: 'Tutorial', trending: true },
    { tag: 'pro tips', relevanceScore: 60, searchVolume: 12000, competition: 'low', category: 'Tips', trending: false },
    { tag: 'advanced tutorial', relevanceScore: 58, searchVolume: 10000, competition: 'low', category: 'Education', trending: false }
  ];

  const trendingTags = [
    'viral', 'trending', '2024', 'new', 'latest', 'popular', 'hot', 'must watch',
    'breaking', 'exclusive', 'first time', 'reaction', 'review', 'unboxing',
    'challenge', 'experiment', 'behind the scenes', 'live', 'premiere'
  ];

  const longTailSuggestions = [
    'how to make money online',
    'best way to learn programming',
    'complete beginner tutorial',
    'step by step guide for beginners',
    'easy way to understand',
    'what you need to know about',
    'common mistakes to avoid',
    'tips for better results'
  ];

  const generateTags = useCallback(async () => {
    if (!videoTitle.trim() && !videoDescription.trim() && !keywords.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide at least a video title, description, or keywords to generate tags.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let tags = [...mockGeneratedTags];
      
      // Filter based on settings
      if (settings.focusOnTrending) {
        tags = tags.filter(tag => tag.trending || Math.random() > 0.5);
      }
      
      if (settings.competitionLevel === 'low') {
        tags = tags.filter(tag => tag.competition === 'low' || Math.random() > 0.7);
      } else if (settings.competitionLevel === 'high') {
        tags = tags.filter(tag => tag.competition === 'high' || Math.random() > 0.3);
      }
      
      // Add trending tags if enabled
      if (settings.focusOnTrending) {
        const additionalTrending = trendingTags.slice(0, 5).map(tag => ({
          tag,
          relevanceScore: Math.floor(Math.random() * 20) + 70,
          searchVolume: Math.floor(Math.random() * 50000) + 10000,
          competition: 'medium' as const,
          category: 'Trending',
          trending: true
        }));
        tags = [...tags, ...additionalTrending];
      }
      
      // Add long-tail keywords if enabled
      if (settings.includeLongTail) {
        const longTail = longTailSuggestions.slice(0, 3).map(tag => ({
          tag,
          relevanceScore: Math.floor(Math.random() * 15) + 60,
          searchVolume: Math.floor(Math.random() * 20000) + 5000,
          competition: 'low' as const,
          category: 'Long-tail',
          trending: false
        }));
        tags = [...tags, ...longTail];
      }
      
      // Limit to requested count
      tags = tags.slice(0, settings.tagCount);
      
      setGeneratedTags(tags);
      setLoading(false);
      
      toast({
        title: "Tags Generated Successfully!",
        description: `Generated ${tags.length} optimized tags for your video.`,
      });
    }, 2500);
  }, [videoTitle, videoDescription, keywords, settings, toast]);

  const toggleTagSelection = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const selectAllTags = () => {
    setSelectedTags(generatedTags.map(t => t.tag));
  };

  const clearSelection = () => {
    setSelectedTags([]);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${label} copied successfully!`,
    });
  };

  const exportTags = (format: 'json' | 'csv' | 'txt') => {
    if (selectedTags.length === 0) {
      toast({
        title: "No Tags Selected",
        description: "Please select some tags to export.",
        variant: "destructive",
      });
      return;
    }

    const selectedTagsData = generatedTags.filter(t => selectedTags.includes(t.tag));
    let content = '';
    let filename = '';

    switch (format) {
      case 'json':
        content = JSON.stringify({
          tags: selectedTagsData,
          settings,
          generatedAt: new Date().toISOString()
        }, null, 2);
        filename = 'generated_youtube_tags.json';
        break;
      case 'csv':
        content = 'Tag,Relevance Score,Search Volume,Competition,Category,Trending\n' +
          selectedTagsData.map(tag => 
            `"${tag.tag}",${tag.relevanceScore},${tag.searchVolume},${tag.competition},${tag.category},${tag.trending}`
          ).join('\n');
        filename = 'generated_youtube_tags.csv';
        break;
      case 'txt':
        content = selectedTags.join(', ');
        filename = 'generated_youtube_tags.txt';
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
      description: `${selectedTags.length} tags exported as ${format.toUpperCase()} format!`,
    });
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tutorial': return <Video className="h-3 w-3" />;
      case 'education': return <Brain className="h-3 w-3" />;
      case 'tips': return <Lightbulb className="h-3 w-3" />;
      case 'trending': return <Flame className="h-3 w-3" />;
      case 'long-tail': return <Target className="h-3 w-3" />;
      default: return <Tag className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-full backdrop-blur-sm">
              <Wand2 className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              YouTube Tags Generator
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate optimized YouTube tags with AI-powered insights, trending analysis, and advanced targeting options
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 bg-white/10 backdrop-blur-md border-white/20 h-auto p-1">
            <TabsTrigger value="generator" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
              <Wand2 className="h-4 w-4" />
              Generator
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2 py-3 data-[state=active]:bg-white/20">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            {/* Input Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Video className="h-5 w-5" />
                    Video Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white mb-2 block">Video Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter your video title..."
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white mb-2 block">Video Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your video content..."
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="keywords" className="text-white mb-2 block">Target Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="Enter keywords separated by commas..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Settings className="h-5 w-5" />
                    Quick Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white mb-2 block">Category</Label>
                      <Select value={settings.category} onValueChange={(value) => setSettings(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Audience</Label>
                      <Select value={settings.audience} onValueChange={(value) => setSettings(prev => ({ ...prev, audience: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {audiences.map(aud => (
                            <SelectItem key={aud} value={aud.toLowerCase()}>{aud}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">Number of Tags: {settings.tagCount}</Label>
                    <Slider
                      value={[settings.tagCount]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, tagCount: value[0] }))}
                      max={50}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Include Trending Tags</Label>
                      <Switch
                        checked={settings.focusOnTrending}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, focusOnTrending: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Include Long-tail Keywords</Label>
                      <Switch
                        checked={settings.includeLongTail}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeLongTail: checked }))}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={generateTags}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Generating Tags...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Tags
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Loading State */}
            {loading && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI Processing...</h3>
                    <p className="text-gray-300">Analyzing content and generating optimized tags</p>
                    <Progress value={75} className="mt-4 max-w-md mx-auto" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Tags */}
            {generatedTags.length > 0 && !loading && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Hash className="h-5 w-5" />
                      Generated Tags ({generatedTags.length})
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={selectAllTags}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Select All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearSelection}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-300">Click tags to select them for export. Selected: {selectedTags.length}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {generatedTags.map((tagData, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedTags.includes(tagData.tag)
                            ? 'bg-purple-500/20 border-purple-400'
                            : 'bg-white/5 border-white/20 hover:bg-white/10'
                        }`}
                        onClick={() => toggleTagSelection(tagData.tag)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(tagData.category)}
                            <span className="text-white font-medium">{tagData.tag}</span>
                          </div>
                          {tagData.trending && <Flame className="h-4 w-4 text-orange-400" />}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <Badge className={getCompetitionColor(tagData.competition)}>
                            {tagData.competition}
                          </Badge>
                          <div className="text-gray-300">
                            {tagData.searchVolume.toLocaleString()} searches
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                            <span>Relevance</span>
                            <span>{tagData.relevanceScore}%</span>
                          </div>
                          <Progress value={tagData.relevanceScore} className="h-1" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(selectedTags.join(', '), 'Selected tags')}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Selected
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(selectedTags.join(' #'), 'Hashtags')}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Hash className="mr-2 h-4 w-4" />
                          Copy as Hashtags
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {generatedTags.length > 0 ? (
              <>
                {/* Analytics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Target className="h-5 w-5 text-green-400" />
                        High Competition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {generatedTags.filter(t => t.competition === 'high').length}
                      </div>
                      <p className="text-gray-300 text-sm">High search volume tags</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="h-5 w-5 text-yellow-400" />
                        Medium Competition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-yellow-400 mb-2">
                        {generatedTags.filter(t => t.competition === 'medium').length}
                      </div>
                      <p className="text-gray-300 text-sm">Balanced opportunity</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Zap className="h-5 w-5 text-blue-400" />
                        Low Competition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {generatedTags.filter(t => t.competition === 'low').length}
                      </div>
                      <p className="text-gray-300 text-sm">Easy to rank tags</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Flame className="h-5 w-5 text-orange-400" />
                        Trending Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-400 mb-2">
                        {generatedTags.filter(t => t.trending).length}
                      </div>
                      <p className="text-gray-300 text-sm">Currently trending</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Performing Tags */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Award className="h-5 w-5" />
                      Top Performing Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedTags
                        .sort((a, b) => b.relevanceScore - a.relevanceScore)
                        .slice(0, 10)
                        .map((tagData, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-white font-bold text-lg">#{index + 1}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{tagData.tag}</span>
                                {tagData.trending && <Flame className="h-4 w-4 text-orange-400" />}
                              </div>
                              <div className="text-gray-400 text-sm">{tagData.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">{tagData.relevanceScore}%</div>
                            <div className="text-gray-400 text-xs">{tagData.searchVolume.toLocaleString()} searches</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Category Breakdown */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BarChart3 className="h-5 w-5" />
                      Category Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(
                        generatedTags.reduce((acc, tag) => {
                          acc[tag.category] = (acc[tag.category] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category)}
                            <span className="text-white">{category}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-300">{count} tags</span>
                            <Progress 
                              value={(count / generatedTags.length) * 100} 
                              className="w-24" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Analytics Available</h3>
                  <p className="text-gray-300">Generate tags first to see detailed analytics and insights.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5" />
                  Advanced Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white mb-2 block">Content Category</Label>
                      <Select value={settings.category} onValueChange={(value) => setSettings(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Target Audience</Label>
                      <Select value={settings.audience} onValueChange={(value) => setSettings(prev => ({ ...prev, audience: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {audiences.map(aud => (
                            <SelectItem key={aud} value={aud.toLowerCase()}>{aud}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Language</Label>
                      <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map(lang => (
                            <SelectItem key={lang} value={lang.toLowerCase()}>{lang}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Competition Level</Label>
                      <Select value={settings.competitionLevel} onValueChange={(value) => setSettings(prev => ({ ...prev, competitionLevel: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Competition (Easier to rank)</SelectItem>
                          <SelectItem value="medium">Medium Competition (Balanced)</SelectItem>
                          <SelectItem value="high">High Competition (High volume)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-white mb-2 block">Number of Tags: {settings.tagCount}</Label>
                      <Slider
                        value={[settings.tagCount]}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, tagCount: value[0] }))}
                        max={50}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>10</span>
                        <span>50</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <Label className="text-white">Include Hashtags</Label>
                          <p className="text-gray-400 text-sm">Add # prefix to generated tags</p>
                        </div>
                        <Switch
                          checked={settings.includeHashtags}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeHashtags: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <Label className="text-white">Long-tail Keywords</Label>
                          <p className="text-gray-400 text-sm">Include 3-4 word specific phrases</p>
                        </div>
                        <Switch
                          checked={settings.includeLongTail}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeLongTail: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <Label className="text-white">Focus on Trending</Label>
                          <p className="text-gray-400 text-sm">Prioritize currently trending tags</p>
                        </div>
                        <Switch
                          checked={settings.focusOnTrending}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, focusOnTrending: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            {selectedTags.length > 0 ? (
              <>
                {/* Selected Tags Preview */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      Selected Tags ({selectedTags.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedTags.map((tag, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Export Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Copy className="h-5 w-5" />
                        Quick Copy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        onClick={() => copyToClipboard(selectedTags.join(', '), 'Tags as comma-separated')}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy as Comma-Separated
                      </Button>
                      <Button
                        onClick={() => copyToClipboard(selectedTags.map(tag => `#${tag}`).join(' '), 'Tags as hashtags')}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                      >
                        <Hash className="mr-2 h-4 w-4" />
                        Copy as Hashtags
                      </Button>
                      <Button
                        onClick={() => copyToClipboard(selectedTags.join('\n'), 'Tags as line-separated')}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Copy Line-Separated
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <FileDown className="h-5 w-5" />
                        File Export
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        onClick={() => exportTags('json')}
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Export as JSON
                        <span className="ml-2 text-xs opacity-75">Complete data</span>
                      </Button>
                      <Button
                        onClick={() => exportTags('csv')}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Export as CSV
                        <span className="ml-2 text-xs opacity-75">Spreadsheet ready</span>
                      </Button>
                      <Button
                        onClick={() => exportTags('txt')}
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Export as TXT
                        <span className="ml-2 text-xs opacity-75">Simple list</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Export Statistics */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BarChart3 className="h-5 w-5" />
                      Export Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{selectedTags.length}</div>
                        <div className="text-gray-300 text-sm">Selected Tags</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {generatedTags.filter(t => selectedTags.includes(t.tag) && t.competition === 'low').length}
                        </div>
                        <div className="text-gray-300 text-sm">Low Competition</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400">
                          {generatedTags.filter(t => selectedTags.includes(t.tag) && t.trending).length}
                        </div>
                        <div className="text-gray-300 text-sm">Trending</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {Math.round(generatedTags.filter(t => selectedTags.includes(t.tag)).reduce((acc, t) => acc + t.relevanceScore, 0) / selectedTags.length)}%
                        </div>
                        <div className="text-gray-300 text-sm">Avg. Relevance</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-12 text-center">
                  <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Tags Selected</h3>
                  <p className="text-gray-300 mb-4">Select some tags from the generator to export them.</p>
                  <Button
                    onClick={() => setActiveTab('generator')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Go to Generator
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}