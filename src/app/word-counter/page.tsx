'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {FileText,Hash,Clock,Eye,BookOpen,Target,TrendingUp,Zap,BarChart3,PieChart,Activity,Sparkles,Copy,Check,Download,RefreshCw,Settings,Star,ArrowRight,MessageSquare,Globe,Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        >
          <div
            className="w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              boxShadow: `0 0 ${3 + Math.random() * 6}px rgba(59, 130, 246, 0.4)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
  averageWordsPerSentence: number;
  averageSentencesPerParagraph: number;
  longestWord: string;
  shortestWord: string;
  mostCommonWords: Array<{ word: string; count: number }>;
  readabilityScore: number;
  keywordDensity: Array<{ word: string; density: number }>;
}

const analyzeText = (text: string): TextStats => {
  if (!text.trim()) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
      speakingTime: 0,
      averageWordsPerSentence: 0,
      averageSentencesPerParagraph: 0,
      longestWord: '',
      shortestWord: '',
      mostCommonWords: [],
      readabilityScore: 0,
      keywordDensity: []
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Words analysis
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount = words.length;

  // Sentences analysis
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;

  // Paragraphs analysis
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  // Reading and speaking time (average reading: 200 WPM, speaking: 150 WPM)
  const readingTime = Math.ceil(wordCount / 200);
  const speakingTime = Math.ceil(wordCount / 150);

  // Averages
  const averageWordsPerSentence = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;
  const averageSentencesPerParagraph = paragraphCount > 0 ? Math.round(sentenceCount / paragraphCount) : 0;

  // Word length analysis
  const wordLengths = words.map(word => word.length);
  const longestWord = words.reduce((longest, current) =>
    current.length > longest.length ? current : longest, '');
  const shortestWord = words.reduce((shortest, current) =>
    current.length < shortest.length ? current : shortest, words[0] || '');

  // Most common words
  const wordFreq: { [key: string]: number } = {};
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']);

  words.forEach(word => {
    if (!commonWords.has(word) && word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  const mostCommonWords = Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  // Simple readability score (Flesch Reading Ease approximation)
  const avgSentenceLength = averageWordsPerSentence;
  const avgSyllables = words.reduce((total, word) => {
    const syllables = word.match(/[aeiouy]+/g)?.length || 1;
    return total + syllables;
  }, 0) / wordCount || 0;

  const readabilityScore = Math.max(0, Math.min(100,
    206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllables)
  ));

  // Keyword density
  const keywordDensity = mostCommonWords.slice(0, 5).map(({ word, count }) => ({
    word,
    density: Math.round((count / wordCount) * 100 * 100) / 100
  }));

  return {
    characters,
    charactersNoSpaces,
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    readingTime,
    speakingTime,
    averageWordsPerSentence,
    averageSentencesPerParagraph,
    longestWord,
    shortestWord,
    mostCommonWords,
    readabilityScore,
    keywordDensity
  };
};

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [targetWordCount, setTargetWordCount] = useState(500);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return { level: 'Very Easy', color: 'text-green-400' };
    if (score >= 80) return { level: 'Easy', color: 'text-green-300' };
    if (score >= 70) return { level: 'Fairly Easy', color: 'text-yellow-400' };
    if (score >= 60) return { level: 'Standard', color: 'text-orange-400' };
    if (score >= 50) return { level: 'Fairly Difficult', color: 'text-red-400' };
    if (score >= 30) return { level: 'Difficult', color: 'text-red-500' };
    return { level: 'Very Difficult', color: 'text-red-600' };
  };

  const progressPercentage = Math.min((stats.words / targetWordCount) * 100, 100);

  const features = [
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Get instant feedback as you type with live word counting',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Advanced Statistics',
      description: 'Detailed analysis including readability and keyword density',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set word count targets and track your progress',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Reading Time',
      description: 'Estimate reading and speaking time for your content',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const quickStats = [
    { label: 'Characters', value: stats.characters, icon: Hash, color: 'text-blue-400' },
    { label: 'Words', value: stats.words, icon: FileText, color: 'text-green-400' },
    { label: 'Sentences', value: stats.sentences, icon: MessageSquare, color: 'text-purple-400' },
    { label: 'Paragraphs', value: stats.paragraphs, icon: BookOpen, color: 'text-orange-400' }
  ];

  const seoProps = {
    title: 'Word Counter | Social Fetcher',
    description: 'Get instant word counting, advanced statistics, and goal tracking for your social media content. Simplify your social media workflow with our user-friendly tool. Try it now!',
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <Particles />
        <section className="relative z-10 pt-30 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight mt-5">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Word Counter</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
              Analyze your text with advanced statistics, readability scores, and keyword density.
              Perfect for content <br></br> creators, writers, and social media managers.
            </p>

            <Card className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardHeader className="pb-4 pt-3">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="text-left">
                    <h3 className="text-white text-left text-2xl md:text-3xl font-bold leading-tight">Analyze Your Content</h3>
                    <CardDescription className="text-gray-300">
                      Paste or type your content below for instant analysis
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClear}
                      className="bg-white/10 cursor-pointer border-white/20 text-white hover:bg-white/20"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(text)}
                      className="bg-white/10 cursor-pointer border-white/20 text-white hover:bg-white/20"
                      disabled={!text}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Textarea
                    placeholder="Start typing or paste your text here... Perfect for analyzing blog posts, social media captions, video descriptions, and any other content!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[300px] pr-10 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                  />
                  {text && (
                    <div className="absolute right-10 top-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">Live</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-3">
                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                        <div>
                          <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Bar for Target */}
                {text && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white font-medium">Progress to Target</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={targetWordCount}
                          onChange={(e) => setTargetWordCount(parseInt(e.target.value) || 500)}
                          className="w-20 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                          min="1"
                        />
                        <span className="text-gray-400 text-sm">words</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Progress value={progressPercentage} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {stats.words} / {targetWordCount} words
                        </span>
                        <span className={cn(
                          "font-medium",
                          progressPercentage >= 100 ? "text-green-400" : "text-blue-400"
                        )}>
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {text && (
          <section className="relative z-10 py-16 px-4 pt-0">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white">Detailed Analysis</h3>
                <div className="flex items-center gap-2">
                  <Label htmlFor="advanced" className="text-white">Show Advanced</Label>
                  <Switch
                    id="advanced"
                    checked={showAdvanced}
                    onCheckedChange={setShowAdvanced}
                    style
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-6 h-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Reading Time</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Reading:</span>
                        <span className="text-white font-medium">{stats.readingTime} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Speaking:</span>
                        <span className="text-white font-medium">{stats.speakingTime} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Character Analysis */}
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Hash className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-white">Characters</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">With spaces:</span>
                        <span className="text-white font-medium">{stats.characters.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Without spaces:</span>
                        <span className="text-white font-medium">{stats.charactersNoSpaces.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Readability Score */}
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Eye className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">Readability</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">
                          {Math.round(stats.readabilityScore)}
                        </div>
                        <div className={cn("text-sm font-medium", getReadabilityLevel(stats.readabilityScore).color)}>
                          {getReadabilityLevel(stats.readabilityScore).level}
                        </div>
                      </div>
                      <Progress value={stats.readabilityScore} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {showAdvanced && (
                  <>
                    {/* Average Statistics */}
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="w-6 h-6 text-orange-400" />
                          <h3 className="text-lg font-semibold text-white">Averages</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Words/Sentence:</span>
                            <span className="text-white font-medium">{stats.averageWordsPerSentence}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Sentences/Paragraph:</span>
                            <span className="text-white font-medium">{stats.averageSentencesPerParagraph}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Word Length */}
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="w-6 h-6 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Word Length</h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-300 text-sm">Longest:</span>
                            <div className="text-white font-medium break-all">{stats.longestWord}</div>
                          </div>
                          <div>
                            <span className="text-gray-300 text-sm">Shortest:</span>
                            <div className="text-white font-medium">{stats.shortestWord}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Keyword Density */}
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <PieChart className="w-6 h-6 text-pink-400" />
                          <h3 className="text-lg font-semibold text-white">Keyword Density</h3>
                        </div>
                        <div className="space-y-2">
                          {stats.keywordDensity.slice(0, 5).map((keyword, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">{keyword.word}</span>
                              <Badge variant="secondary" className="bg-white/10 text-white">
                                {keyword.density}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              {/* Most Common Words */}
              {showAdvanced && stats.mostCommonWords.length > 0 && (
                <Card className="mt-6 bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-yellow-400" />
                      Most Common Words
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {stats.mostCommonWords.slice(0, 10).map((word, index) => (
                        <div key={index} className="bg-black/20 rounded-lg p-3 text-center border border-white/10">
                          <div className="text-white font-medium">{word.word}</div>
                          <div className="text-gray-400 text-sm">{word.count} times</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="relative z-10 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Powerful Text Analysis Features</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Everything you need to analyze and optimize your content for maximum impact
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

        {/* Use Cases Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Perfect For Every Content Creator</h2>
              <p className="text-gray-300 text-lg">
                Whether you're creating social media content or writing articles, we've got you covered
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: 'Social Media Posts',
                  description: 'Optimize your Instagram captions, Twitter threads, and Facebook posts for maximum engagement',
                  examples: ['Instagram captions', 'Tweet threads', 'Facebook posts', 'LinkedIn articles']
                },
                {
                  icon: FileText,
                  title: 'Blog Content',
                  description: 'Analyze blog posts, articles, and web content for SEO and readability optimization',
                  examples: ['Blog posts', 'Web articles', 'Product descriptions', 'Landing pages']
                },
                {
                  icon: MessageSquare,
                  title: 'Video Content',
                  description: 'Perfect for YouTube descriptions, TikTok captions, and video script analysis',
                  examples: ['YouTube descriptions', 'TikTok captions', 'Video scripts', 'Thumbnails text']
                }
              ].map((useCase, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <useCase.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">{useCase.description}</p>
                    <div className="space-y-2">
                      <Label className="text-gray-400 text-sm">Perfect for:</Label>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((example, i) => (
                          <Badge key={i} variant="secondary" className="bg-white/10 text-white border-white/20">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="relative z-10 py-1 px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-white/20">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                  How to Use the Word Counter
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Get comprehensive text analysis in just a few simple steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-white font-semibold">Paste Your Text</h3>
                    <p className="text-gray-300 text-sm">
                      Copy and paste your content or start typing directly in the text area
                    </p>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Get Instant Analysis</h3>
                    <p className="text-gray-300 text-sm">
                      Watch as statistics update in real-time while you type or edit
                    </p>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Optimize Content</h3>
                    <p className="text-gray-300 text-sm">
                      Use insights to improve readability, SEO, and engagement
                    </p>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Key Metrics Explained:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { metric: 'Readability Score', description: 'Higher scores mean easier to read (90+ is very easy)' },
                      { metric: 'Reading Time', description: 'Estimated time based on 200 words per minute' },
                      { metric: 'Keyword Density', description: 'Percentage of how often words appear in your text' },
                      { metric: 'Average Sentence Length', description: 'Shorter sentences improve readability' }
                    ].map((item, index) => (
                      <div key={index} className="bg-black/20 rounded-lg p-4 border border-white/10">
                        <h5 className="text-white font-medium mb-1">{item.metric}</h5>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border-blue-500/30">
              <CardContent className="p-12">
                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Analyze Your Content?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of content creators, writers, and marketers who use our word counter
                  to create better, more engaging content that resonates with their audience.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                  onClick={() => document.querySelector('textarea')?.focus()}
                >
                  Start Analyzing Text
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
  );
}