'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, User, Share2, Bookmark, ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Mock blog data (in a real app, this would come from an API)
const blogPost = {
  id: 1,
  title: "Complete Guide to Downloading YouTube Videos in 4K Quality",
  content: `
    <h2>Introduction</h2>
    <p>In today's digital age, being able to download YouTube videos in high quality has become increasingly important for content creators, educators, and media enthusiasts. This comprehensive guide will walk you through the best methods to download YouTube videos in stunning 4K quality.</p>
    
    <h2>Why Download YouTube Videos?</h2>
    <p>There are several legitimate reasons why you might want to download YouTube videos:</p>
    <ul>
      <li><strong>Offline Viewing:</strong> Watch content without an internet connection</li>
      <li><strong>Content Creation:</strong> Use clips for educational or commentary purposes (with proper attribution)</li>
      <li><strong>Backup:</strong> Preserve important content that might be removed</li>
      <li><strong>Research:</strong> Academic or professional research purposes</li>
    </ul>
    
    <h2>Understanding Video Quality</h2>
    <p>Before diving into downloading methods, it's crucial to understand different video quality options:</p>
    <ul>
      <li><strong>720p HD:</strong> Standard high definition (1280x720 pixels)</li>
      <li><strong>1080p Full HD:</strong> Full high definition (1920x1080 pixels)</li>
      <li><strong>1440p 2K:</strong> Quad HD (2560x1440 pixels)</li>
      <li><strong>2160p 4K:</strong> Ultra HD (3840x2160 pixels)</li>
    </ul>
    
    <h2>Method 1: Using Online Download Tools</h2>
    <p>Online YouTube downloaders are the most accessible option for most users. Here's how to use them effectively:</p>
    <ol>
      <li>Copy the YouTube video URL</li>
      <li>Paste it into a reliable online downloader</li>
      <li>Select your desired quality (up to 4K if available)</li>
      <li>Choose your preferred format (MP4, WEBM, etc.)</li>
      <li>Click download and wait for processing</li>
    </ol>
    
    <h2>Method 2: Browser Extensions</h2>
    <p>Browser extensions offer convenience by integrating directly into your browsing experience:</p>
    <ul>
      <li>Install a reputable YouTube downloader extension</li>
      <li>Navigate to the YouTube video you want to download</li>
      <li>Click the download button that appears on the video</li>
      <li>Select your quality preferences</li>
    </ul>
    
    <h2>Method 3: Desktop Applications</h2>
    <p>For power users who download content regularly, desktop applications offer the most features and reliability:</p>
    <ul>
      <li>Batch downloading capabilities</li>
      <li>Advanced quality selection</li>
      <li>Playlist downloading</li>
      <li>Format conversion options</li>
    </ul>
    
    <h2>Quality vs. File Size Considerations</h2>
    <p>When downloading in 4K, consider the following:</p>
    <ul>
      <li><strong>File Size:</strong> 4K videos can be 5-10 times larger than 1080p</li>
      <li><strong>Storage:</strong> Ensure you have adequate storage space</li>
      <li><strong>Bandwidth:</strong> 4K downloads require more time and data</li>
      <li><strong>Device Compatibility:</strong> Verify your device can play 4K content</li>
    </ul>
    
    <h2>Legal Considerations</h2>
    <p>Always remember to respect copyright laws and YouTube's terms of service:</p>
    <ul>
      <li>Only download content you have permission to use</li>
      <li>Respect fair use guidelines</li>
      <li>Give proper attribution when using downloaded content</li>
      <li>Consider reaching out to content creators for permission</li>
    </ul>
    
    <h2>Best Practices for 4K Downloads</h2>
    <p>To ensure the best experience when downloading 4K YouTube videos:</p>
    <ol>
      <li><strong>Check Source Quality:</strong> Ensure the original video is actually in 4K</li>
      <li><strong>Stable Internet:</strong> Use a reliable, high-speed internet connection</li>
      <li><strong>Updated Tools:</strong> Keep your download tools updated</li>
      <li><strong>Virus Protection:</strong> Use reputable tools to avoid malware</li>
      <li><strong>Format Selection:</strong> Choose formats compatible with your devices</li>
    </ol>
    
    <h2>Troubleshooting Common Issues</h2>
    <p>If you encounter problems while downloading:</p>
    <ul>
      <li><strong>Age-Restricted Content:</strong> Some videos require sign-in</li>
      <li><strong>Region Blocks:</strong> Content may not be available in your region</li>
      <li><strong>Quality Limitations:</strong> Not all videos are available in 4K</li>
      <li><strong>Download Failures:</strong> Try different tools or check your connection</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>Downloading YouTube videos in 4K quality is definitely possible with the right tools and knowledge. Remember to always respect copyright laws and use downloaded content responsibly. Whether you choose online tools, browser extensions, or desktop applications, the key is finding a method that works best for your specific needs and technical comfort level.</p>
    
    <p>As technology continues to evolve, we can expect even better tools and higher quality options to become available. Stay updated with the latest developments in video downloading technology to make the most of your YouTube content consumption experience.</p>
  `,
  category: "YouTube",
  author: "Alex Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1200",
  tags: ["YouTube", "4K", "Video Download", "Tutorial"],
  views: 15420,
  likes: 1240,
  comments: 89
};

const relatedPosts = [
  {
    id: 2,
    title: "Instagram Stories & Reels: Advanced Download Techniques",
    image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Instagram"
  },
  {
    id: 3,
    title: "TikTok Video Downloads: No Watermark Method 2024",
    image: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "TikTok"
  },
  {
    id: 4,
    title: "Facebook Video Download: Private & Public Content Guide",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Facebook"
  }
];

export default function BlogPostPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link href="/blogs" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-blue-600 text-white">
                {blogPost.category}
              </Badge>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(blogPost.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-white/80 text-sm">
                <User className="mr-2 h-4 w-4" />
                {blogPost.author}
              </div>
              <div className="flex items-center text-white/80 text-sm">
                <Eye className="mr-2 h-4 w-4" />
                {blogPost.views.toLocaleString()} views
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              {blogPost.readTime}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Actions */}
        <div className="flex items-center justify-between mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="flex items-center space-x-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="transition-all duration-300"
            >
              <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? 'text-white' : ''}`} />
              {blogPost.likes.toLocaleString()}
            </Button>
            
            <Button variant="outline" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              {blogPost.comments}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'text-white' : ''}`} />
            </Button>
            
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-12">
          <CardContent className="p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>
            
            {/* Tags */}
            <Separator className="my-8" />
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Author Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-12">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {blogPost.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{blogPost.author}</h3>
                <p className="text-gray-600 mb-4">
                  Expert in social media content downloading and digital media optimization. 
                  Passionate about helping users navigate the ever-changing landscape of social platforms.
                </p>
                <Button variant="outline" size="sm">
                  Follow Author
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {post.category}
                  </Badge>
                  <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}