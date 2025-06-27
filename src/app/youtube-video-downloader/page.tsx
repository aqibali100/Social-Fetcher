// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
// import { 
//   Download, 
//   Copy, 
//   Search, 
//   Play, 
//   Video, 
//   Zap, 
//   Shield, 
//   Clock,
//   Star,
//   Check,
//   X,
//   History,
//   Trash2,
//   ExternalLink,
//   Youtube,
//   Sparkles,
//   Globe,
//   Users,
//   TrendingUp,
//   Music,
//   FileVideo,
//   Headphones,
//   Settings,
//   Info,
//   AlertCircle,
//   CheckCircle,
//   Loader,
//   Pause,
//   RotateCcw,
//   Share2,
//   Bookmark,
//   Heart,
//   Eye,
//   Calendar,
//   User,
//   Volume2,
//   Maximize,
//   Minimize,
//   Filter,
//   SortDesc,
//   Grid,
//   List,
//   MonitorPlay,
//   Smartphone,
//   Tablet
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface VideoFormat {
//   itag: number;
//   quality: string;
//   format: string;
//   fileSize: string;
//   extension: string;
//   type: 'video' | 'audio';
//   hasAudio: boolean;
//   hasVideo: boolean;
//   fps?: number;
//   bitrate?: string;
// }

// interface VideoData {
//   id: string;
//   title: string;
//   channel: string;
//   channelId: string;
//   description: string;
//   thumbnail: string;
//   duration: string;
//   views: string;
//   likes: string;
//   uploadDate: string;
//   category: string;
//   tags: string[];
//   formats: VideoFormat[];
//   isLive: boolean;
//   isPrivate: boolean;
//   ageRestricted: boolean;
// }

// interface DownloadProgress {
//   id: string;
//   progress: number;
//   status: 'downloading' | 'completed' | 'error' | 'paused';
//   speed: string;
//   eta: string;
// }

// interface DownloadHistory {
//   id: string;
//   title: string;
//   channel: string;
//   thumbnailUrl: string;
//   downloadedAt: Date;
//   quality: string;
//   format: string;
//   fileSize: string;
// }

// interface PlaylistData {
//   id: string;
//   title: string;
//   channel: string;
//   videoCount: number;
//   videos: VideoData[];
// }

// export default function YouTubeVideoDownloaderPage() {
//   const [url, setUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [videoData, setVideoData] = useState(null);
//   const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
//   const [error, setError] = useState('');
//   const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
//   const [downloadProgress, setDownloadProgress] = useState<Map<string, DownloadProgress>>(new Map());
//   const [activeTab, setActiveTab] = useState('downloader');
//   const [selectedFormats, setSelectedFormats] = useState<Set<number>>(new Set());
//   const [filterType, setFilterType] = useState<'all' | 'video' | 'audio'>('all');
//   const [sortBy, setSortBy] = useState<'quality' | 'size' | 'format'>('quality');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [favorites, setFavorites] = useState<Set<string>>(new Set());
//   const [bookmarks, setBookmarks] = useState<VideoData[]>([]);

//   // Load data from localStorage
//   useEffect(() => {
//     const savedHistory = localStorage.getItem('yt-video-history');
//     const savedFavorites = localStorage.getItem('yt-video-favorites');
//     const savedBookmarks = localStorage.getItem('yt-video-bookmarks');
    
//     if (savedHistory) setDownloadHistory(JSON.parse(savedHistory));
//     if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
//     if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
//   }, []);

// const fetchVideoData = async () => {
//   setIsLoading(true);
//   setError('');
//   setVideoData(null);

//   try {
//     const res = await fetch('/api/download-youtube-video', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ url }),
//     });

//     const data = await res.json();

//     if (!res.ok) throw new Error(data.error || 'Failed to fetch data');
//     setVideoData(data); // Save to state for rendering
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };


//   const saveToHistory = (data: Omit<DownloadHistory, 'downloadedAt'>) => {
//     const newEntry: DownloadHistory = { ...data, downloadedAt: new Date() };
//     const updatedHistory = [newEntry, ...downloadHistory.slice(0, 19)];
//     setDownloadHistory(updatedHistory);
//     localStorage.setItem('yt-video-history', JSON.stringify(updatedHistory));
//   };

//   const toggleFavorite = (videoId: string) => {
//     const newFavorites = new Set(favorites);
//     if (newFavorites.has(videoId)) {
//       newFavorites.delete(videoId);
//     } else {
//       newFavorites.add(videoId);
//     }
//     setFavorites(newFavorites);
//     localStorage.setItem('yt-video-favorites', JSON.stringify([...newFavorites]));
//   };

//   const addToBookmarks = (video: VideoData) => {
//     const exists = bookmarks.find(b => b.id === video.id);
//     if (!exists) {
//       const updatedBookmarks = [video, ...bookmarks.slice(0, 49)];
//       setBookmarks(updatedBookmarks);
//       localStorage.setItem('yt-video-bookmarks', JSON.stringify(updatedBookmarks));
//     }
//   };

//   // const extractVideoId = (url: string): string | null => {
//   //   const patterns = [
//   //     /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
//   //     /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
//   //     /youtube\.com\/playlist\?list=([^&\n?#]+)/
//   //   ];
    
//   //   for (const pattern of patterns) {
//   //     const match = url.match(pattern);
//   //     if (match) return match[1];
//   //   }
//   //   return null;
//   // };

//   // const isPlaylistUrl = (url: string): boolean => {
//   //   return url.includes('playlist?list=') || url.includes('&list=');
//   // };

//   // const fetchVideoData = async (videoId: string): Promise<VideoData> => {
//   //   await new Promise(resolve => setTimeout(resolve, 2000));
    
//   //   const mockFormats: VideoFormat[] = [
//   //     { itag: 137, quality: '1080p', format: 'MP4', fileSize: '245 MB', extension: 'mp4', type: 'video', hasAudio: false, hasVideo: true, fps: 30, bitrate: '2500 kbps' },
//   //     { itag: 136, quality: '720p', format: 'MP4', fileSize: '156 MB', extension: 'mp4', type: 'video', hasAudio: false, hasVideo: true, fps: 30, bitrate: '1500 kbps' },
//   //     { itag: 135, quality: '480p', format: 'MP4', fileSize: '89 MB', extension: 'mp4', type: 'video', hasAudio: false, hasVideo: true, fps: 30, bitrate: '800 kbps' },
//   //     { itag: 134, quality: '360p', format: 'MP4', fileSize: '54 MB', extension: 'mp4', type: 'video', hasAudio: false, hasVideo: true, fps: 30, bitrate: '500 kbps' },
//   //     { itag: 18, quality: '360p', format: 'MP4', fileSize: '67 MB', extension: 'mp4', type: 'video', hasAudio: true, hasVideo: true, fps: 30, bitrate: '500 kbps' },
//   //     { itag: 140, quality: '128 kbps', format: 'M4A', fileSize: '12 MB', extension: 'm4a', type: 'audio', hasAudio: true, hasVideo: false, bitrate: '128 kbps' },
//   //     { itag: 251, quality: '160 kbps', format: 'WEBM', fileSize: '15 MB', extension: 'webm', type: 'audio', hasAudio: true, hasVideo: false, bitrate: '160 kbps' },
//   //     { itag: 22, quality: '720p', format: 'MP4', fileSize: '178 MB', extension: 'mp4', type: 'video', hasAudio: true, hasVideo: true, fps: 30, bitrate: '1800 kbps' }
//   //   ];

//   //   return {
//   //     id: videoId,
//   //     title: "Amazing YouTube Video - Complete Tutorial 2024 | Learn Everything",
//   //     channel: "Tech Master Pro",
//   //     channelId: "UCexample123",
//   //     description: "This is a comprehensive tutorial covering everything you need to know about the topic. In this video, we'll explore advanced techniques, best practices, and real-world examples that will help you master the subject.",
//   //     thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
//   //     duration: "15:42",
//   //     views: "2.1M views",
//   //     likes: "89K",
//   //     uploadDate: "2024-01-15",
//   //     category: "Education",
//   //     tags: ["tutorial", "education", "technology", "2024", "guide"],
//   //     formats: mockFormats,
//   //     isLive: false,
//   //     isPrivate: false,
//   //     ageRestricted: false
//   //   };
//   // };

//   // const fetchPlaylistData = async (playlistId: string): Promise<PlaylistData> => {
//   //   await new Promise(resolve => setTimeout(resolve, 2500));
    
//   //   const mockVideos = Array.from({ length: 12 }, (_, i) => ({
//   //     id: `video_${i + 1}`,
//   //     title: `Playlist Video ${i + 1} - Advanced Tutorial Series`,
//   //     channel: "Tech Master Pro",
//   //     channelId: "UCexample123",
//   //     description: `This is video ${i + 1} in our comprehensive tutorial series.`,
//   //     thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
//   //     duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
//   //     views: `${Math.floor(Math.random() * 1000) + 100}K views`,
//   //     likes: `${Math.floor(Math.random() * 50) + 10}K`,
//   //     uploadDate: "2024-01-15",
//   //     category: "Education",
//   //     tags: ["tutorial", "series", "education"],
//   //     formats: [],
//   //     isLive: false,
//   //     isPrivate: false,
//   //     ageRestricted: false
//   //   }));

//   //   return {
//   //     id: playlistId,
//   //     title: "Complete Tutorial Series - Master Class 2024",
//   //     channel: "Tech Master Pro",
//   //     videoCount: 12,
//   //     videos: mockVideos
//   //   };
//   // };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!url.trim()) return;

//   //   setIsLoading(true);
//   //   setError('');
//   //   setVideoData(null);
//   //   setPlaylistData(null);

//   //   try {
//   //     const videoId = extractVideoId(url);
//   //     if (!videoId) {
//   //       throw new Error('Invalid YouTube URL. Please enter a valid YouTube video or playlist URL.');
//   //     }

//   //     if (isPlaylistUrl(url)) {
//   //       const data = await fetchPlaylistData(videoId);
//   //       setPlaylistData(data);
//   //     } else {
//   //       const data = await fetchVideoData(videoId);
//   //       setVideoData(data);
//   //       addToBookmarks(data);
//   //     }
//   //   } catch (err) {
//   //     setError(err instanceof Error ? err.message : 'Failed to fetch video data');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const startDownload = (format: VideoFormat) => {
//     if (!videoData) return;

//     const downloadId = `${videoData.id}_${format.itag}`;
    
//     // Simulate download progress
//     const progressData: DownloadProgress = {
//       id: downloadId,
//       progress: 0,
//       status: 'downloading',
//       speed: '0 MB/s',
//       eta: 'Calculating...'
//     };

//     setDownloadProgress(prev => new Map(prev.set(downloadId, progressData)));

//     const interval = setInterval(() => {
//       setDownloadProgress(prev => {
//         const current = prev.get(downloadId);
//         if (!current || current.progress >= 100) {
//           clearInterval(interval);
//           if (current) {
//             saveToHistory({
//               id: videoData.id,
//               title: videoData.title,
//               channel: videoData.channel,
//               thumbnailUrl: videoData.thumbnail,
//               quality: format.quality,
//               format: format.format,
//               fileSize: format.fileSize
//             });
//           }
//           return new Map(prev.set(downloadId, { ...current!, progress: 100, status: 'completed', speed: '0 MB/s', eta: 'Complete' }));
//         }

//         const newProgress = Math.min(current.progress + Math.random() * 15, 100);
//         const speed = `${(Math.random() * 5 + 1).toFixed(1)} MB/s`;
//         const eta = newProgress < 100 ? `${Math.floor((100 - newProgress) / 10)}s` : 'Complete';

//         return new Map(prev.set(downloadId, {
//           ...current,
//           progress: newProgress,
//           speed,
//           eta
//         }));
//       });
//     }, 500);
//   };

//   // const filteredFormats = videoData?.formats.filter(format => {
//   //   if (filterType === 'all') return true;
//   //   return format.type === filterType;
//   // }).sort((a, b) => {
//   //   switch (sortBy) {
//   //     case 'quality':
//   //       return parseInt(b.quality) - parseInt(a.quality);
//   //     case 'size':
//   //       return parseFloat(b.fileSize) - parseFloat(a.fileSize);
//   //     case 'format':
//   //       return a.format.localeCompare(b.format);
//   //     default:
//   //       return 0;
//   //   }
//   // }) || [];

//   const clearHistory = () => {
//     setDownloadHistory([]);
//     localStorage.removeItem('yt-video-history');
//   };

//   const clearBookmarks = () => {
//     setBookmarks([]);
//     localStorage.removeItem('yt-video-bookmarks');
//   };

//   function formatViewCount(count) {
//   const num = Number(count);
//   if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(0) + 'B';
//   if (num >= 1_000_000) return (num / 1_000_000).toFixed(0) + 'M';
//   if (num >= 1_000) return (num / 1_000).toFixed(0) + 'K';
//   return num.toString();
// }

// function formatYouTubeDuration(isoDuration: string) {
//   const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

//   const hours = parseInt(match?.[1] || "0");
//   const minutes = parseInt(match?.[2] || "0");
//   const seconds = parseInt(match?.[3] || "0");

//   const paddedSeconds = seconds.toString().padStart(2, "0");
//   if (hours > 0) {
//     const paddedMinutes = minutes.toString().padStart(2, "0");
//     return `${hours}:${paddedMinutes}:${paddedSeconds}`;
//   } else {
//     return `${minutes}:${paddedSeconds}`;
//   }
// }

// const rawDuration = videoData?.contentDetails?.duration;
// const formattedDuration = rawDuration ? formatYouTubeDuration(rawDuration) : "0:00";

// const rawDate = videoData?.snippet?.publishedAt;
// const formattedDate = rawDate ? rawDate.substring(0, 10) : "N/A";

// const categoryMap: { [key: string]: string } = {
//   "1": "Film & Animation",
//   "2": "Autos & Vehicles",
//   "10": "Music",
//   "15": "Pets & Animals",
//   "17": "Sports",
//   "18": "Short Movies",
//   "19": "Travel & Events",
//   "20": "Gaming",
//   "22": "People & Blogs",
//   "23": "Comedy",
//   "24": "Entertainment",
//   "25": "News & Politics",
//   "26": "Howto & Style",
//   "27": "Education",
//   "28": "Science & Technology",
//   "29": "Nonprofits & Activism",
// };

// const categoryId = videoData?.snippet?.categoryId;
// const categoryName = categoryMap[categoryId] || "Unknown";

//   return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
//       </div>

//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute animate-float opacity-10 ${
//               i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'
//             }`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.7}s`,
//               animationDuration: `${3 + Math.random() * 2}s`
//             }}
//           >
//             {i % 4 === 0 ? (
//               <Youtube className="w-8 h-8 text-red-400" />
//             ) : i % 4 === 1 ? (
//               <Video className="w-6 h-6 text-blue-400" />
//             ) : i % 4 === 2 ? (
//               <Download className="w-7 h-7 text-green-400" />
//             ) : (
//               <Music className="w-6 h-6 text-purple-400" />
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10">
//         <div className="container mx-auto px-4 py-30">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight mt-5">
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">YouTube Video Downloader</span>
//             </h1>
//                <p className="mt-3 text-lg font-medium text-pretty text-white sm:text-xl/8 mb-8">
//          Download YouTube videos in HD quality with multiple format options. 
//               Support for playlists,<br></br> audio extraction, and batch downloads.
//             </p>

//             <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-12">
//               <div className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-green-400" />
//                 <span>4K Quality</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-green-400" />
//                 <span>Audio Extraction</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-green-400" />
//                 <span>Playlist Support</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-green-400" />
//                 <span>Batch Download</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-green-400" />
//                 <span>No Watermark</span>
//               </div>
//             </div>
//           </div>

//           {/* Main Interface */}
//           <div className="max-w-6xl mx-auto">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-5 bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
//                 <TabsTrigger 
//                   value="downloader" 
//                   className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Downloader
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="progress"
//                   className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
//                 >
//                   <Loader className="w-4 h-4 mr-2" />
//                   Progress
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="history"
//                   className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
//                 >
//                   <History className="w-4 h-4 mr-2" />
//                   History
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="bookmarks"
//                   className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
//                 >
//                   <Bookmark className="w-4 h-4 mr-2" />
//                   Bookmarks
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="features"
//                   className="text-white cursor-pointer data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
//                 >
//                   <Star className="w-4 h-4 mr-2" />
//                   Features
//                 </TabsTrigger>
//               </TabsList>

//               {/* Downloader Tab */}
//               <TabsContent value="downloader" className="mt-8 space-y-8">
//                 <Card className="bg-black/20 backdrop-blur-md border border-gray-700/50 shadow-2xl">
//                   <CardHeader className="text-center pb-6">
//                     <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
//                       <Youtube className="w-8 h-8 text-red-500" />
//                       Enter YouTube URL
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <form className="space-y-4">
//                       <div className="relative">
//                         <Input
//                           type="url"
//                           placeholder="https://www.youtube.com/watch?v=... or playlist URL"
//                           value={url}
//                           onChange={(e) => setUrl(e.target.value)}
//                           className="bg-black/30 border border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg rounded-xl pl-14 pr-32 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
//                           disabled={isLoading}
//                         />
//                         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <Button
//                           onClick={fetchVideoData}
//                           disabled={isLoading || !url.trim()}
//                           className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
//                         >
//                           {isLoading ? (
//                             <div className="flex items-center gap-2">
//                               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                               Analyzing...
//                             </div>
//                           ) : (
//                             <>
//                               <Search className="w-4 h-4 mr-2" />
//                               Analyze
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </form>

//                     {error && (
//                       <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
//                         <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
//                         <span className="text-red-300">{error}</span>
//                       </div>
//                     )}

//                     {isLoading && (
//                       <div className="space-y-4">
//                         <div className="animate-pulse bg-gray-700/50 h-64 rounded-xl"></div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                           {[...Array(6)].map((_, i) => (
//                             <div key={i} className="animate-pulse bg-gray-700/50 h-40 rounded-lg"></div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Single Video Display */}
//                     {videoData && (
//                       <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
//                         <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 backdrop-blur-sm">
//                           <CardContent className="p-6">
//                             <div className="flex items-start gap-6">
//                               <div className="relative group">
//                                 <img
//                                   src={videoData.snippet.thumbnails.default.url}
//                                   alt="Video thumbnail"
//                                   className="w-48 h-36 object-cover rounded-lg border border-gray-600 group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
//                                   <Play className="w-12 h-12 text-white" />
//                                 </div>
//                                 <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
//                                  {formattedDuration}
//                                 </Badge>
//                               </div>
                              
//                               <div className="flex-1 min-w-0 space-y-4">
//                                 <div>
//                                   <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
//                                     {videoData.snippet.title}
//                                   </h3>
//                                   <div className="flex items-center gap-4 text-gray-300 mb-3">
//                                     <span className="flex items-center gap-2">
//                                       <User className="w-4 h-4" />
//                                       {videoData.snippet.channelTitle}
//                                     </span>
//                                     <span className="flex items-center gap-2">
//                                       <Calendar className="w-4 h-4" />
//                                       {formattedDate}
//                                     </span>
//                                   </div>
                                  
//                                   <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
//                                     <span className="flex items-center gap-1">
//                                       <Eye className="w-4 h-4" />
//                                       {formatViewCount(videoData.statistics.viewCount)}
//                                     </span>
//                                     <span className="flex items-center gap-1">
//                                       <Heart className="w-4 h-4" />
//                                      {formatViewCount(videoData.statistics.likeCount)}
//                                     </span>
//                                     <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
//                                       {categoryName}
//                                     </Badge>
//                                   </div>
//                                 </div>

//                                 <div className="flex items-center gap-3">
//                                   <Button
//                                     onClick={() => toggleFavorite(videoData.id)}
//                                     variant="outline"
//                                     size="sm"
//                                     className={cn(
//                                       "bg-transparent cursor-pointer border-gray-600 transition-all duration-300",
//                                       favorites.has(videoData.id) 
//                                         ? "border-red-500 text-red-400 hover:bg-red-500/10" 
//                                         : "text-gray-400 hover:bg-gray-700 hover:text-white"
//                                     )}
//                                   >
//                                     <Heart className={cn("w-4 h-4 mr-2", favorites.has(videoData.id) && "fill-current")} />
//                                     {favorites.has(videoData.id) ? 'Favorited' : 'Add to Favorites'}
//                                   </Button>
                                  
//                                   <Button
//                                     onClick={() => navigator.share?.({ url: `https://youtube.com/watch?v=${videoData.id}` })}
//                                     variant="outline"
//                                     size="sm"
//                                     className="bg-transparent cursor-pointer border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
//                                   >
//                                     <Share2 className="w-4 h-4 mr-2" />
//                                     Share
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         {/* Format Selection Controls */}
//                         <Card className="bg-black/20 backdrop-blur-sm border border-gray-600/50">
//                           <CardContent className="p-6">
//                             <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//                               <h3 className="text-xl font-semibold text-white">Available Formats</h3>
                              
//                               <div className="flex items-center gap-4">
//                                 <div className="flex items-center gap-2">
//                                   <Filter className="w-4 h-4 text-gray-400" />
//                                   <select
//                                     value={filterType}
//                                     onChange={(e) => setFilterType(e.target.value as any)}
//                                     className="bg-black/30 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm"
//                                   >
//                                     <option value="all">All Formats</option>
//                                     <option value="video">Video Only</option>
//                                     <option value="audio">Audio Only</option>
//                                   </select>
//                                 </div>
                                
//                                 <div className="flex items-center gap-2">
//                                   <SortDesc className="w-4 h-4 text-gray-400" />
//                                   <select
//                                     value={sortBy}
//                                     onChange={(e) => setSortBy(e.target.value as any)}
//                                     className="bg-black/30 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm"
//                                   >
//                                     <option value="quality">Sort by Quality</option>
//                                     <option value="size">Sort by Size</option>
//                                     <option value="format">Sort by Format</option>
//                                   </select>
//                                 </div>

//                                 <div className="flex items-center gap-1 bg-black/30 rounded-lg p-1">
//                                   <Button
//                                     onClick={() => setViewMode('grid')}
//                                     variant="ghost"
//                                     size="sm"
//                                     className={cn(
//                                       "p-2",
//                                       viewMode === 'grid' ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
//                                     )}
//                                   >
//                                     <Grid className="w-4 h-4" />
//                                   </Button>
//                                   <Button
//                                     onClick={() => setViewMode('list')}
//                                     variant="ghost"
//                                     size="sm"
//                                     className={cn(
//                                       "p-2",
//                                       viewMode === 'list' ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
//                                     )}
//                                   >
//                                     <List className="w-4 h-4" />
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Formats Display */}
//                             {/* <div className={cn(
//                               "gap-4",
//                               viewMode === 'grid' 
//                                 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
//                                 : "space-y-3"
//                             )}>
//                               {filteredFormats.map((format) => (
//                                 <Card
//                                   key={format.itag}
//                                   className={cn(
//                                     "bg-black/30 backdrop-blur-sm border transition-all duration-300 hover:scale-105 group cursor-pointer",
//                                     selectedFormats.has(format.itag) 
//                                       ? "border-purple-500/70 bg-purple-500/10" 
//                                       : "border-gray-600/50 hover:border-purple-500/50"
//                                   )}
//                                   onClick={() => {
//                                     const newSelected = new Set(selectedFormats);
//                                     if (newSelected.has(format.itag)) {
//                                       newSelected.delete(format.itag);
//                                     } else {
//                                       newSelected.add(format.itag);
//                                     }
//                                     setSelectedFormats(newSelected);
//                                   }}
//                                 >
//                                   <CardContent className={cn(
//                                     "p-4",
//                                     viewMode === 'list' ? "flex items-center justify-between" : "space-y-3"
//                                   )}>
//                                     <div className={cn(
//                                       viewMode === 'list' ? "flex items-center gap-4" : "space-y-2"
//                                     )}>
//                                       <div className="flex items-center gap-2">
//                                         {format.type === 'video' ? (
//                                           <Video className="w-5 h-5 text-blue-400" />
//                                         ) : (
//                                           <Headphones className="w-5 h-5 text-green-400" />
//                                         )}
//                                         <Badge
//                                           variant="secondary"
//                                           className={cn(
//                                             "font-medium",
//                                             format.type === 'video' ? "bg-blue-500/20 text-blue-300" : "bg-green-500/20 text-green-300"
//                                           )}
//                                         >
//                                           {format.quality}
//                                         </Badge>
//                                       </div>
                                      
//                                       <div className={cn(
//                                         "text-sm text-gray-300",
//                                         viewMode === 'list' ? "flex items-center gap-4" : "space-y-1"
//                                       )}>
//                                         <span>{format.format} • {format.fileSize}</span>
//                                         {format.fps && <span>• {format.fps} FPS</span>}
//                                         {format.bitrate && <span>• {format.bitrate}</span>}
//                                       </div>
//                                     </div>

//                                     <div className={cn(
//                                       "flex gap-2",
//                                       viewMode === 'list' ? "" : "mt-3"
//                                     )}>
//                                       <Button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           startDownload(format);
//                                         }}
//                                         className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300"
//                                         size={viewMode === 'list' ? "sm" : "default"}
//                                       >
//                                         <Download className="w-4 h-4 mr-2" />
//                                         Download
//                                       </Button>
//                                     </div>
//                                   </CardContent>
//                                 </Card>
//                               ))}
//                             </div> */}

//                             {selectedFormats.size > 0 && (
//                               <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
//                                 <div className="flex items-center justify-between">
//                                   <span className="text-purple-300">
//                                     {selectedFormats.size} format{selectedFormats.size > 1 ? 's' : ''} selected
//                                   </span>
//                                   <div className="flex gap-2">
//                                     <Button
//                                       onClick={() => setSelectedFormats(new Set())}
//                                       variant="outline"
//                                       size="sm"
//                                       className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
//                                     >
//                                       Clear Selection
//                                     </Button>
//                                     <Button
//                                       onClick={() => {
//                                         selectedFormats.forEach(itag => {
//                                           const format = videoData.formats.find(f => f.itag === itag);
//                                           if (format) startDownload(format);
//                                         });
//                                       }}
//                                       className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
//                                       size="sm"
//                                     >
//                                       <Download className="w-4 h-4 mr-2" />
//                                       Download Selected
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </CardContent>
//                         </Card>
//                       </div>
//                     )}

//                     {/* Playlist Display */}
//                     {playlistData && (
//                       <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
//                         <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 backdrop-blur-sm">
//                           <CardContent className="p-6">
//                             <div className="flex items-center justify-between mb-6">
//                               <div>
//                                 <h3 className="text-2xl font-bold text-white mb-2">{playlistData.title}</h3>
//                                 <p className="text-gray-300">{playlistData.channel} • {playlistData.videoCount} videos</p>
//                               </div>
//                               <Button
//                                 className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
//                               >
//                                 <Download className="w-4 h-4 mr-2" />
//                                 Download All
//                               </Button>
//                             </div>
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                               {playlistData.videos.map((video, index) => (
//                                 <Card key={video.id} className="bg-black/30 backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 group">
//                                   <CardContent className="p-4">
//                                     <div className="relative mb-3">
//                                       <img
//                                         src={video.thumbnail}
//                                         alt={video.title}
//                                         className="w-full h-32 object-cover rounded-lg"
//                                       />
//                                       <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
//                                         {video.duration}
//                                       </Badge>
//                                       <Badge className="absolute top-2 left-2 bg-purple-600 text-white text-xs">
//                                         #{index + 1}
//                                       </Badge>
//                                     </div>
//                                     <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">{video.title}</h4>
//                                     <p className="text-gray-400 text-xs mb-3">{video.views}</p>
//                                     <Button
//                                       onClick={() => {
//                                         setUrl(`https://youtube.com/watch?v=${video.id}`);
//                                         handleSubmit(new Event('submit') as any);
//                                       }}
//                                       className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm"
//                                       size="sm"
//                                     >
//                                       <Download className="w-3 h-3 mr-2" />
//                                       Download
//                                     </Button>
//                                   </CardContent>
//                                 </Card>
//                               ))}
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Progress Tab */}
//               <TabsContent value="progress" className="mt-8">
//                 <Card className="bg-black/20 backdrop-blur-md border border-gray-700/50 shadow-2xl">
//                   <CardHeader>
//                     <CardTitle className="text-2xl text-white flex items-center gap-3">
//                       <Loader className="w-6 h-6" />
//                       Download Progress
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {downloadProgress.size === 0 ? (
//                       <div className="text-center py-12">
//                         <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//                         <h3 className="text-xl text-gray-400 mb-2">No active downloads</h3>
//                         <p className="text-gray-500">Your download progress will appear here</p>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {Array.from(downloadProgress.entries()).map(([id, progress]) => (
//                           <Card key={id} className="bg-gray-800/30 border border-gray-700/50">
//                             <CardContent className="p-4">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-3">
//                                   {progress.status === 'completed' ? (
//                                     <CheckCircle className="w-5 h-5 text-green-400" />
//                                   ) : progress.status === 'error' ? (
//                                     <X className="w-5 h-5 text-red-400" />
//                                   ) : (
//                                     <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
//                                   )}
//                                   <span className="text-white font-medium">Download {id}</span>
//                                 </div>
//                                 <div className="flex items-center gap-4 text-sm text-gray-400">
//                                   <span>{progress.speed}</span>
//                                   <span>{progress.eta}</span>
//                                 </div>
//                               </div>
                              
//                               <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
//                                 <div
//                                   className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
//                                   style={{ width: `${progress.progress}%` }}
//                                 />
//                               </div>
                              
//                               <div className="flex justify-between text-sm text-gray-400">
//                                 <span>{Math.round(progress.progress)}% complete</span>
//                                 <span className="capitalize">{progress.status}</span>
//                               </div>
//                             </CardContent>
//                           </Card>
//                         ))}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* History Tab */}
//               <TabsContent value="history" className="mt-8">
//                 <Card className="bg-black/20 backdrop-blur-md border border-gray-700/50 shadow-2xl">
//                   <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle className="text-2xl text-white flex items-center gap-3">
//                       <History className="w-6 h-6" />
//                       Download History
//                     </CardTitle>
//                     {downloadHistory.length > 0 && (
//                       <Button
//                         onClick={clearHistory}
//                         variant="outline"
//                         size="sm"
//                         className="bg-transparent border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
//                       >
//                         <Trash2 className="w-4 h-4 mr-2" />
//                         Clear All
//                       </Button>
//                     )}
//                   </CardHeader>
//                   <CardContent>
//                     {downloadHistory.length === 0 ? (
//                       <div className="text-center py-12">
//                         <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//                         <h3 className="text-xl text-gray-400 mb-2">No downloads yet</h3>
//                         <p className="text-gray-500">Your download history will appear here</p>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {downloadHistory.map((item, index) => (
//                           <Card key={index} className="bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
//                             <CardContent className="p-4">
//                               <div className="flex items-center gap-4">
//                                 <img
//                                   src={item.thumbnailUrl}
//                                   alt="Thumbnail"
//                                   className="w-20 h-15 object-cover rounded-lg border border-gray-600"
//                                 />
//                                 <div className="flex-1 min-w-0">
//                                   <h4 className="text-white font-medium truncate mb-1">{item.title}</h4>
//                                   <p className="text-gray-400 text-sm mb-2">{item.channel}</p>
//                                   <div className="flex items-center gap-4 text-xs text-gray-500">
//                                     <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
//                                       {item.quality}
//                                     </Badge>
//                                     <span>{item.format}</span>
//                                     <span>{item.fileSize}</span>
//                                     <span>{new Date(item.downloadedAt).toLocaleDateString()}</span>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   <Button
//                                     onClick={() => window.open(`https://youtube.com/watch?v=${item.id}`, '_blank')}
//                                     variant="outline"
//                                     size="sm"
//                                     className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
//                                   >
//                                     <ExternalLink className="w-4 h-4" />
//                                   </Button>
//                                   <Button
//                                     onClick={() => {
//                                       // Re-download functionality
//                                       setUrl(`https://youtube.com/watch?v=${item.id}`);
//                                       setActiveTab('downloader');
//                                     }}
//                                     variant="outline"
//                                     size="sm"
//                                     className="bg-transparent border-green-600 text-green-400 hover:bg-green-700 hover:text-white"
//                                   >
//                                     <RotateCcw className="w-4 h-4" />
//                                   </Button>
//                                 </div>
//                               </div>
//                             </CardContent>
//                           </Card>
//                         ))}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Bookmarks Tab */}
//               <TabsContent value="bookmarks" className="mt-8">
//                 <Card className="bg-black/20 backdrop-blur-md border border-gray-700/50 shadow-2xl">
//                   <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle className="text-2xl text-white flex items-center gap-3">
//                       <Bookmark className="w-6 h-6" />
//                       Saved Videos
//                     </CardTitle>
//                     {bookmarks.length > 0 && (
//                       <Button
//                         onClick={clearBookmarks}
//                         variant="outline"
//                         size="sm"
//                         className="bg-transparent border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
//                       >
//                         <Trash2 className="w-4 h-4 mr-2" />
//                         Clear All
//                       </Button>
//                     )}
//                   </CardHeader>
//                   <CardContent>
//                     {bookmarks.length === 0 ? (
//                       <div className="text-center py-12">
//                         <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//                         <h3 className="text-xl text-gray-400 mb-2">No bookmarks yet</h3>
//                         <p className="text-gray-500">Videos you analyze will be saved here</p>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {bookmarks.map((video) => (
//                           <Card key={video.id} className="bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
//                             <CardContent className="p-4">
//                               <div className="relative mb-4">
//                                 <img
//                                   src={video.thumbnail}
//                                   alt={video.title}
//                                   className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
//                                   {video.duration}
//                                 </Badge>
//                                 <Button
//                                   onClick={() => toggleFavorite(video.id)}
//                                   variant="ghost"
//                                   size="sm"
//                                   className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
//                                 >
//                                   <Heart className={cn(
//                                     "w-4 h-4",
//                                     favorites.has(video.id) ? "fill-red-400 text-red-400" : "text-white"
//                                   )} />
//                                 </Button>
//                               </div>
                              
//                               <h4 className="text-white font-medium mb-2 line-clamp-2">{video.title}</h4>
//                               <p className="text-gray-400 text-sm mb-3">{video.channel}</p>
                              
//                               <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
//                                 <span>{video.views}</span>
//                                 <span>{video.uploadDate}</span>
//                               </div>
                              
//                               <Button
//                                 onClick={() => {
//                                   setUrl(`https://youtube.com/watch?v=${video.id}`);
//                                   setActiveTab('downloader');
//                                 }}
//                                 className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//                                 size="sm"
//                               >
//                                 <Download className="w-4 h-4 mr-2" />
//                                 Download
//                               </Button>
//                             </CardContent>
//                           </Card>
//                         ))}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Features Tab */}
//               <TabsContent value="features" className="mt-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//                   {[
//                     {
//                       icon: Zap,
//                       title: "Ultra Fast Processing",
//                       description: "Advanced algorithms ensure lightning-fast video analysis and download preparation.",
//                       color: "text-yellow-400"
//                     },
//                     {
//                       icon: Shield,
//                       title: "100% Secure & Private",
//                       description: "Your data never leaves your device. All processing happens locally for maximum security.",
//                       color: "text-green-400"
//                     },
//                     {
//                       icon: Video,
//                       title: "4K Quality Support",
//                       description: "Download videos in up to 4K resolution with multiple quality options available.",
//                       color: "text-blue-400"
//                     },
//                     {
//                       icon: Music,
//                       title: "Audio Extraction",
//                       description: "Extract high-quality audio tracks in MP3, M4A, and other popular formats.",
//                       color: "text-purple-400"
//                     },
//                     {
//                       icon: Download,
//                       title: "Batch Downloads",
//                       description: "Download multiple videos or entire playlists with a single click.",
//                       color: "text-pink-400"
//                     },
//                     {
//                       icon: Globe,
//                       title: "Universal Compatibility",
//                       description: "Works with any YouTube video from any region without restrictions.",
//                       color: "text-indigo-400"
//                     },
//                     {
//                       icon: MonitorPlay,
//                       title: "Multiple Formats",
//                       description: "Support for MP4, WEBM, MP3, M4A and many other video and audio formats.",
//                       color: "text-cyan-400"
//                     },
//                     {
//                       icon: Smartphone,
//                       title: "Mobile Optimized",
//                       description: "Fully responsive design that works perfectly on all devices and screen sizes.",
//                       color: "text-orange-400"
//                     },
//                     {
//                       icon: History,
//                       title: "Download History",
//                       description: "Keep track of all your downloads with detailed history and easy re-download options.",
//                       color: "text-teal-400"
//                     }
//                   ].map((feature, index) => (
//                     <Card
//                       key={index}
//                       className="bg-black/30 backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
//                     >
//                       <CardContent className="p-6 text-center space-y-4">
//                         <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
//                           <feature.icon className="w-8 h-8" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
//                         <p className="text-gray-400 leading-relaxed">{feature.description}</p>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>

//                 {/* Advanced Features Section */}
//                 <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md border border-purple-500/20 mb-12">
//                   <CardContent className="p-8">
//                     <div className="text-center mb-8">
//                       <h3 className="text-3xl font-bold text-white mb-2">Advanced Features</h3>
//                       <p className="text-gray-300">Professional-grade tools for content creators</p>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                       <div className="space-y-6">
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Settings className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="text-lg font-semibold text-white mb-2">Custom Quality Selection</h4>
//                             <p className="text-gray-400">Choose specific video quality, frame rate, and audio bitrate for your downloads.</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <FileVideo className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="text-lg font-semibold text-white mb-2">Format Conversion</h4>
//                             <p className="text-gray-400">Automatically convert videos to your preferred format during download.</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Clock className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="text-lg font-semibold text-white mb-2">Scheduled Downloads</h4>
//                             <p className="text-gray-400">Schedule downloads for later or set up automatic playlist monitoring.</p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="space-y-6">
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Volume2 className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="text-lg font-semibold text-white mb-2">Audio Enhancement</h4>
//                             <p className="text-gray-400">Built-in audio processing for better sound quality and noise reduction.</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Share2 className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="text-lg font-semibold text-white mb-2">Cloud Integration</h4>
//                             <p className="text-gray-400">Direct upload to cloud storage services like Google Drive, Dropbox, and more.</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Bookmark className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h4 className="text-lg font-semibold text-white mb-2">Smart Bookmarking</h4>
//                             <p className="text-gray-400">Intelligent video organization with tags, categories, and search functionality.</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Stats Section */}
//                 <Card className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-md border border-gray-700/50">
//                   <CardContent className="p-8">
//                     <div className="text-center mb-8">
//                       <h3 className="text-3xl font-bold text-white mb-2">Trusted Worldwide</h3>
//                       <p className="text-gray-300">Join millions of users who trust our platform</p>
//                     </div>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//                       {[
//                         { icon: Users, label: "Active Users", value: "2M+" },
//                         { icon: Download, label: "Downloads", value: "50M+" },
//                         { icon: TrendingUp, label: "Success Rate", value: "99.8%" },
//                         { icon: Star, label: "User Rating", value: "4.9/5" }
//                       ].map((stat, index) => (
//                         <div key={index} className="space-y-3">
//                           <stat.icon className="w-10 h-10 text-purple-400 mx-auto" />
//                           <div className="text-3xl font-bold text-white">{stat.value}</div>
//                           <div className="text-gray-400">{stat.label}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="container mx-auto px-4 py-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
//               <p className="text-gray-300 text-lg">Everything you need to know about our YouTube video downloader</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 {
//                   question: "What video qualities are supported?",
//                   answer: "We support all available qualities from 144p to 4K (2160p), including 720p, 1080p, and various frame rates up to 60fps."
//                 },
//                 {
//                   question: "Can I download entire playlists?",
//                   answer: "Yes! Simply paste a playlist URL and you can download all videos individually or in batch mode."
//                 },
//                 {
//                   question: "Is audio-only download available?",
//                   answer: "Absolutely! You can extract audio in various formats including MP3, M4A, and WEBM with different bitrates."
//                 },
//                 {
//                   question: "Are there any download limits?",
//                   answer: "No limits! Download as many videos as you need. We believe in providing unlimited access to our users."
//                 },
//                 {
//                   question: "Is it safe and legal to use?",
//                   answer: "Our tool is completely safe. However, please respect copyright laws and only download content you have permission to use."
//                 },
//                 {
//                   question: "Do you store downloaded videos?",
//                   answer: "No, we don't store any videos. All processing happens in your browser and files are downloaded directly to your device."
//                 }
//               ].map((faq, index) => (
//                 <Card key={index} className="bg-black/20 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
//                   <CardContent className="p-6">
//                     <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
//                     <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="container mx-auto px-4 py-12 border-t border-gray-800">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4">
//               <Youtube className="w-8 h-8 text-red-500" />
//               Social Fetcher
//             </div>
//             <p className="text-gray-400 mb-6">
//               Your ultimate tool for social media content extraction and generation
//             </p>
//             <div className="flex justify-center gap-6 mb-8">
//               <Button variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white">
//                 Privacy Policy
//               </Button>
//               <Button variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white">
//                 Terms of Service
//               </Button>
//               <Button variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white">
//                 Contact Support
//               </Button>
//             </div>
//             <p className="text-gray-500 text-sm">
//               © 2024 Social Fetcher. All rights reserved.
//             </p>
//           </div>
//         </footer>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(10deg); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// }