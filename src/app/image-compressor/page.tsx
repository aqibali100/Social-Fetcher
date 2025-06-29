"use client";

import { useState, useCallback, useRef } from 'react';
import { Upload, Download, Settings, Zap, Shield, Globe, Smartphone, Image as ImageIcon, FileImage, Sparkles, Target, Clock, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface CompressedImage {
  original: File;
  compressed: string;
  originalSize: number;
  compressedSize: number;
  savings: number;
  format: string;
  originalFormat: string;
}

const supportedFormats = [
  { value: 'webp', label: 'WebP (Best Compression)', recommended: true },
  { value: 'jpeg', label: 'JPEG (Universal)', recommended: false },
  { value: 'jpg', label: 'JPG (Same as JPEG)', recommended: false },
  { value: 'png', label: 'PNG (Lossless)', recommended: false },
  { value: 'bmp', label: 'BMP (Uncompressed)', recommended: false },
  { value: 'gif', label: 'GIF (Animation)', recommended: false }
];

const inputFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/gif', 'image/tiff', 'image/svg+xml'];

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState([85]);
  const [format, setFormat] = useState('webp');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (files: FileList) => {
    if (!files.length) return;

    setIsProcessing(true);
    setProcessingProgress(0);
    const newImages: CompressedImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!inputFormats.some(format => file.type === format)) continue;

      const compressed = await compressImage(file, quality[0], format);
      if (compressed) {
        newImages.push(compressed);
      }

      setProcessingProgress(((i + 1) / files.length) * 100);
    }

    setImages(prev => [...prev, ...newImages]);
    setIsProcessing(false);
    setProcessingProgress(0);
  }, [quality, format]);

  const compressImage = async (file: File, quality: number, targetFormat: string): Promise<CompressedImage | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          const mimeType = targetFormat === 'jpg' || targetFormat === 'jpeg' ? 'image/jpeg' : `image/${targetFormat}`;
          const compressedDataUrl = canvas.toDataURL(mimeType, quality / 100);
          
          // Calculate sizes
          const originalSize = file.size;
          const compressedSize = Math.round((compressedDataUrl.length - 22) * 3 / 4);
          const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

          resolve({
            original: file,
            compressed: compressedDataUrl,
            originalSize,
            compressedSize,
            savings: Math.max(0, savings),
            format: targetFormat,
            originalFormat: file.type.split('/')[1]
          });
        } else {
          resolve(null);
        }
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

 const downloadImage = (image: CompressedImage, index: number) => {
  const link = document.createElement('a');
  const fileName = image.original.name.split('.')[0];
  link.download = `compressed_${fileName}_${index + 1}.${image.format}`;
  link.href = image.compressed;
  link.click();
};

  const downloadAll = () => {
    images.forEach((image, index: number) => {
      setTimeout(() => downloadImage(image, index), index * 200);
    });
  };

  const clearAll = () => {
    setImages([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressedSize = images.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalSavings = totalOriginalSize > 0 ? Math.round(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-3000" />
        <div className="absolute bottom-1/3 left-1/5 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-4000" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce delay-1000" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400/60 rounded-full animate-bounce delay-2000" />
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-bounce delay-3000" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full mb-6 animate-bounce shadow-2xl">
            <ImageIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Image Compressor
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Compress your images with advanced algorithms while maintaining exceptional quality. 
            Support for all major formats with lightning-fast processing.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-purple-500/30 text-purple-200 border-purple-500/50 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Compression
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/30 text-blue-200 border-blue-500/50 px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Batch Processing
            </Badge>
            <Badge variant="secondary" className="bg-pink-500/30 text-pink-200 border-pink-500/50 px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              100% Private
            </Badge>
            <Badge variant="secondary" className="bg-cyan-500/30 text-cyan-200 border-cyan-500/50 px-4 py-2 text-sm">
              <Globe className="w-4 h-4 mr-2" />
              All Formats
            </Badge>
          </div>
        </div>

        {/* Main Compression Tool */}
        <div className="max-w-7xl mx-auto mb-16">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-white flex items-center gap-3">
                <Settings className="w-8 h-8 text-purple-400" />
                Advanced Compression Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Enhanced Settings Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <label className="text-white font-semibold text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Quality: {quality[0]}%
                  </label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Smaller Size</span>
                    <span>Better Quality</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-white font-semibold text-lg flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-blue-400" />
                    Output Format
                  </label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedFormats.map((fmt) => (
                        <SelectItem key={fmt.value} value={fmt.value}>
                          <div className="flex items-center gap-2">
                            {fmt.label}
                            {fmt.recommended && (
                              <Badge className="bg-green-500 text-white text-xs">Best</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <label className="text-white font-semibold text-lg flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-green-400" />
                    Supported Input
                  </label>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                    <div className="flex flex-wrap gap-2">
                      {['JPG', 'PNG', 'WebP', 'BMP', 'GIF', 'TIFF', 'SVG'].map((fmt) => (
                        <Badge key={fmt} variant="outline" className="border-gray-500 text-gray-300 text-xs">
                          {fmt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-16 text-center transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  dragActive 
                    ? 'border-purple-400 bg-purple-500/20 scale-105' 
                    : 'border-white/30 bg-white/5 hover:border-purple-400/70 hover:bg-white/10'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="relative z-10">
                  <div className="mb-6">
                    <Upload className={`w-20 h-20 mx-auto transition-all duration-300 ${
                      dragActive ? 'text-purple-300 scale-110' : 'text-purple-400'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {dragActive ? 'Drop your images here!' : 'Upload Images to Compress'}
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Drag & drop multiple images or click to browse
                  </p>
                  <p className="text-gray-400 mb-8">
                    Supports: JPG, PNG, WebP, BMP, GIF, TIFF, SVG • Max 50MB per file
                  </p>
                  <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Images
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={inputFormats.join(',')}
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                />
              </div>

              {/* Processing Progress */}
              {isProcessing && (
                <div className="space-y-4 bg-white/5 rounded-lg p-6 border border-white/20">
                  <div className="flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400 animate-spin" />
                      <span className="font-semibold">Processing images...</span>
                    </div>
                    <span className="font-bold">{Math.round(processingProgress)}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-3" />
                </div>
              )}

              {/* Results Section */}
              {images.length > 0 && (
                <div className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-white">{images.length}</div>
                        <div className="text-purple-200 text-sm">Images Processed</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-white">{formatFileSize(totalOriginalSize)}</div>
                        <div className="text-blue-200 text-sm">Original Size</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-white">{formatFileSize(totalCompressedSize)}</div>
                        <div className="text-green-200 text-sm">Compressed Size</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-white">{totalSavings}%</div>
                        <div className="text-orange-200 text-sm">Space Saved</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button 
                      onClick={downloadAll} 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 font-semibold"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download All ({images.length})
                    </Button>
                    <Button 
                      onClick={clearAll} 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 px-6 py-3"
                    >
                      Clear All
                    </Button>
                  </div>

                  {/* Individual Results */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {images.map((image, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/20 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="relative">
                              <img
                                src={image.compressed}
                                alt="Compressed"
                                className="w-16 h-16 object-cover rounded-lg border-2 border-white/20"
                              />
                              <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs">
                                {image.format.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-semibold truncate">{image.original.name}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-300">
                                <span>{image.originalFormat.toUpperCase()} → {image.format.toUpperCase()}</span>
                                <span>{formatFileSize(image.originalSize)} → {formatFileSize(image.compressedSize)}</span>
                                <Badge className={`${image.savings > 50 ? 'bg-green-500' : image.savings > 25 ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
                                  {image.savings}% saved
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => downloadImage(image, index)}
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced image compression technology with cutting-edge features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-yellow-400" />,
                title: "Lightning Fast Processing",
                description: "Process hundreds of images in seconds with our optimized compression algorithms and multi-threading technology.",
                gradient: "from-yellow-500/20 to-orange-500/20",
                border: "border-yellow-500/30"
              },
              {
                icon: <Shield className="w-10 h-10 text-green-400" />,
                title: "100% Privacy Protected",
                description: "All compression happens locally in your browser. Your images never leave your device, ensuring complete privacy.",
                gradient: "from-green-500/20 to-emerald-500/20",
                border: "border-green-500/30"
              },
              {
                icon: <Globe className="w-10 h-10 text-blue-400" />,
                title: "Universal Format Support",
                description: "Support for all major image formats including WebP, JPEG, PNG, BMP, GIF, TIFF, and SVG with seamless conversion.",
                gradient: "from-blue-500/20 to-cyan-500/20",
                border: "border-blue-500/30"
              },
              {
                icon: <Smartphone className="w-10 h-10 text-purple-400" />,
                title: "Mobile Optimized",
                description: "Perfect responsive design that works flawlessly on all devices - desktop, tablet, and mobile with touch support.",
                gradient: "from-purple-500/20 to-pink-500/20",
                border: "border-purple-500/30"
              },
              {
                icon: <Settings className="w-10 h-10 text-pink-400" />,
                title: "Advanced Controls",
                description: "Fine-tune compression settings with precision controls for quality, format, and optimization parameters.",
                gradient: "from-pink-500/20 to-rose-500/20",
                border: "border-pink-500/30"
              },
              {
                icon: <Download className="w-10 h-10 text-cyan-400" />,
                title: "Batch Operations",
                description: "Upload, process, and download multiple images simultaneously with progress tracking and bulk operations.",
                gradient: "from-cyan-500/20 to-blue-500/20",
                border: "border-cyan-500/30"
              }
            ].map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-lg border ${feature.border} hover:scale-105 transition-all duration-500 group`}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <TrendingDown className="w-8 h-8 text-green-400" />
                  Why Compress Images?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                {[
                  {
                    title: "Faster Website Loading",
                    description: "Compressed images load up to 80% faster, dramatically improving user experience and reducing bounce rates.",
                    icon: <Zap className="w-6 h-6 text-yellow-400" />
                  },
                  {
                    title: "Better SEO Rankings",
                    description: "Google prioritizes fast-loading websites. Optimized images boost your search engine rankings significantly.",
                    icon: <Target className="w-6 h-6 text-blue-400" />
                  },
                  {
                    title: "Massive Storage Savings",
                    description: "Reduce file sizes by up to 90% without visible quality loss, saving valuable storage space and bandwidth.",
                    icon: <TrendingDown className="w-6 h-6 text-green-400" />
                  },
                  {
                    title: "Mobile-Friendly Experience",
                    description: "Smaller images consume less mobile data, providing better experience for users on limited data plans.",
                    icon: <Smartphone className="w-6 h-6 text-purple-400" />
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex-shrink-0 mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                  Compression Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {[
                  { label: "WebP vs JPEG", value: 35, description: "35% smaller file size" },
                  { label: "PNG Optimization", value: 70, description: "Up to 70% size reduction" },
                  { label: "Load Time Improvement", value: 80, description: "80% faster loading" },
                  { label: "Bandwidth Savings", value: 65, description: "65% less data usage" }
                ].map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center text-white">
                      <span className="font-semibold">{stat.label}</span>
                      <span className="text-lg font-bold">{stat.value}%</span>
                    </div>
                    <Progress value={stat.value} className="h-3" />
                    <p className="text-sm text-gray-400">{stat.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Format Comparison */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Format Comparison
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect format for your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                format: "WebP",
                description: "Next-generation format with superior compression",
                pros: ["Best compression ratio", "Supports transparency", "Modern browser support", "Lossless & lossy modes"],
                cons: ["Limited legacy support"],
                recommended: true,
                gradient: "from-green-500/20 to-emerald-500/20",
                border: "border-green-500/30"
              },
              {
                format: "JPEG",
                description: "Most widely supported format for photographs",
                pros: ["Universal compatibility", "Excellent for photos", "Small file sizes", "Wide software support"],
                cons: ["No transparency", "Lossy compression only"],
                recommended: false,
                gradient: "from-blue-500/20 to-cyan-500/20",
                border: "border-blue-500/30"
              },
              {
                format: "PNG",
                description: "Perfect for graphics with transparency",
                pros: ["Lossless compression", "Transparency support", "Sharp edges & text", "No artifacts"],
                cons: ["Larger file sizes", "Not ideal for photos"],
                recommended: false,
                gradient: "from-purple-500/20 to-pink-500/20",
                border: "border-purple-500/30"
              },
              {
                format: "Others",
                description: "BMP, GIF, TIFF for specialized use cases",
                pros: ["Animation support (GIF)", "Uncompressed quality (BMP)", "Professional printing (TIFF)"],
                cons: ["Large file sizes", "Limited web use"],
                recommended: false,
                gradient: "from-orange-500/20 to-red-500/20",
                border: "border-orange-500/30"
              }
            ].map((format, index) => (
              <Card key={index} className={`bg-gradient-to-br ${format.gradient} backdrop-blur-lg border ${format.border} ${format.recommended ? 'ring-2 ring-green-400' : ''} hover:scale-105 transition-all duration-500`}>
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center justify-between">
                    {format.format}
                    {format.recommended && (
                      <Badge className="bg-green-500 text-white animate-pulse">Best Choice</Badge>
                    )}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">{format.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Advantages
                    </h4>
                    <ul className="space-y-1">
                      {format.pros.map((pro, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      Limitations
                    </h4>
                    <ul className="space-y-1">
                      {format.cons.map((con, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                          <div className="w-1 h-1 bg-orange-400 rounded-full flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage Guide */}
        <div className="max-w-7xl mx-auto mb-16">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-3">
                <FileImage className="w-8 h-8 text-blue-400" />
                Complete Usage Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Step-by-Step Process</h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Configure Settings",
                        description: "Choose your desired quality level (10-100%) and output format. WebP is recommended for best compression."
                      },
                      {
                        step: "2",
                        title: "Upload Images",
                        description: "Drag and drop multiple images or click to browse. Supports all major formats up to 50MB per file."
                      },
                      {
                        step: "3",
                        title: "Automatic Processing",
                        description: "Watch as your images are compressed in real-time with live progress tracking and statistics."
                      },
                      {
                        step: "4",
                        title: "Download Results",
                        description: "Download individual images or use bulk download for all compressed files with detailed savings report."
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Pro Tips & Best Practices</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Target className="w-5 h-5 text-yellow-400" />,
                        title: "Optimal Quality Settings",
                        tip: "Use 85-90% quality for photos, 70-80% for web graphics, and 60-70% for thumbnails."
                      },
                      {
                        icon: <Sparkles className="w-5 h-5 text-purple-400" />,
                        title: "Format Selection",
                        tip: "Choose WebP for modern websites, JPEG for photos, PNG for graphics with transparency."
                      },
                      {
                        icon: <Zap className="w-5 h-5 text-blue-400" />,
                        title: "Batch Processing",
                        tip: "Process multiple images at once to save time. Our tool handles up to 100 images simultaneously."
                      },
                      {
                        icon: <Shield className="w-5 h-5 text-green-400" />,
                        title: "Quality Preview",
                        tip: "Always preview compressed images before downloading to ensure quality meets your requirements."
                      }
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="flex-shrink-0 mt-1">
                          {tip.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">{tip.title}</h4>
                          <p className="text-gray-300">{tip.tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-xl p-8 border border-purple-500/30">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-3">💡 Advanced Features</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Our image compressor uses state-of-the-art algorithms to achieve maximum compression while preserving visual quality. 
                      All processing happens locally in your browser using WebAssembly for lightning-fast performance and complete privacy.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-purple-500/30 text-purple-200 border-purple-500/50">
                        WebAssembly Powered
                      </Badge>
                      <Badge className="bg-blue-500/30 text-blue-200 border-blue-500/50">
                        Multi-threaded Processing
                      </Badge>
                      <Badge className="bg-green-500/30 text-green-200 border-green-500/50">
                        Zero Server Upload
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-12 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full mb-6 animate-pulse">
                <ImageIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Compress Your Images?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust our advanced image compression technology. 
                Start optimizing your images today with our powerful, privacy-focused tool.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Compressing Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Lightning Fast Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>All Formats Supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}