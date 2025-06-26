'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, User, ArrowRight, Play, Download, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to Downloading YouTube Videos in 4K Quality",
    excerpt: "Learn how to download YouTube videos in the highest quality possible, including 4K resolution and various formats.",
    content: "Full blog content here...",
    category: "YouTube",
    author: "Alex Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    tags: ["YouTube", "4K", "Video Download", "Tutorial"],
    views: 15420
  },
  {
    id: 2,
    title: "Instagram Stories & Reels: Advanced Download Techniques",
    excerpt: "Master the art of downloading Instagram Stories and Reels with our comprehensive guide covering all formats.",
    content: "Full blog content here...",
    category: "Instagram",
    author: "Sarah Johnson",
    date: "2024-01-12",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    tags: ["Instagram", "Stories", "Reels", "Download"],
    views: 12350
  },
  {
    id: 3,
    title: "TikTok Video Downloads: No Watermark Method 2024",
    excerpt: "Discover the latest methods to download TikTok videos without watermarks and in original quality.",
    content: "Full blog content here...",
    category: "TikTok",
    author: "Mike Rodriguez",
    date: "2024-01-10",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tags: ["TikTok", "No Watermark", "Video Download"],
    views: 18750
  },
  {
    id: 4,
    title: "Facebook Video Download: Private & Public Content Guide",
    excerpt: "Complete tutorial on downloading Facebook videos, whether they're public posts or private content you have access to.",
    content: "Full blog content here...",
    category: "Facebook",
    author: "Emma Davis",
    date: "2024-01-08",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tags: ["Facebook", "Video Download", "Privacy"],
    views: 9640
  },
  {
    id: 5,
    title: "Automated Tag Generation for Social Media Content",
    excerpt: "Learn how to use AI-powered tag generation to boost your social media content's discoverability and engagement.",
    content: "Full blog content here...",
    category: "Tools",
    author: "David Kim",
    date: "2024-01-05",
    readTime: "10 min read",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    tags: ["AI", "Tags", "Automation", "SEO"],
    views: 7890
  },
  {
    id: 6,
    title: "Twitter/X Media Download: Images, Videos & GIFs",
    excerpt: "Comprehensive guide to downloading all types of media from Twitter/X posts, including high-resolution images.",
    content: "Full blog content here...",
    category: "Twitter",
    author: "Lisa Wang",
    date: "2024-01-03",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tags: ["Twitter", "X", "Media Download", "Images"],
    views: 6520
  }
];

const categories = ["All", "YouTube", "Instagram", "TikTok", "Facebook", "Twitter", "Tools"];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto my-17 px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Social Media
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Insights & Guides
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master social media content downloading, extraction, and optimization with our expert tutorials and latest platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                <Play className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full">
                <Download className="mr-2 h-5 w-5" />
                Download Tools
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts Carousel */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Zap className="mr-3 h-8 w-8 text-yellow-500" />
              Featured Articles
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <FeaturedPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles, tutorials, platforms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg rounded-xl border-0 bg-white/80 focus:bg-white transition-all duration-300"
                />
              </div>

              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full lg:w-auto">
                <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full lg:w-auto bg-gray-100/80 rounded-xl p-1">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              <span className="text-gray-500 ml-2 font-normal">({filteredPosts.length})</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4">
                <Search className="mx-auto h-16 w-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-full"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10 rounded-full"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedPostCard({ post, index }: { post: any; index: number }) {
  return (
    <Card className={`group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up`} style={{ animationDelay: `${index * 150}ms` }}>
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold border-0">
            Featured
          </Badge>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs font-medium">
            {post.category}
          </Badge>
          <span className="text-sm text-gray-500">{post.views.toLocaleString()} views</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>

          <Button variant="ghost" size="sm" className="group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function BlogPostCard({ post, index }: { post: any; index: number }) {
  return (
    <Card className={`group overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <span className="text-xs text-gray-500">{post.views.toLocaleString()} views</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{post.author}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="h-80 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-40 bg-gray-200 rounded-lg mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}