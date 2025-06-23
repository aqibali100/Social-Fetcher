'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Upload, Download, Settings, Image as ImageIcon, Trash2, ChevronDown, ChevronUp, Palette, Maximize as Resize, FileImage, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ConvertedFile {
  id: string;
  originalFile: File;
  originalUrl: string;
  convertedUrl?: string;
  convertedBlob?: Blob;
  status: 'pending' | 'converting' | 'completed' | 'error';
  progress: number;
  originalSize: number;
  convertedSize?: number;
}

interface ConversionOptions {
  quality: number;
  format: 'jpeg' | 'jpg';
  backgroundColor: string;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

export default function ImageConverter() {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [options, setOptions] = useState<ConversionOptions>({
    quality: 90,
    format: 'jpeg',
    backgroundColor: '#FFFFFF',
    maintainAspectRatio: true,
  });
  
  const [sectionsOpen, setSectionsOpen] = useState({
    upload: true,
    options: true,
    preview: true,
    download: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (selectedFiles: File[]) => {
    const pngFiles = selectedFiles.filter(file => 
      file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')
    );

    const newFiles: ConvertedFile[] = pngFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      originalFile: file,
      originalUrl: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
      originalSize: file.size,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const convertImage = async (file: ConvertedFile): Promise<ConvertedFile> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        // Handle custom dimensions
        if (options.width || options.height) {
          if (options.maintainAspectRatio) {
            const aspectRatio = width / height;
            if (options.width && options.height) {
              // Use the smaller scale factor to maintain aspect ratio
              const scaleX = options.width / width;
              const scaleY = options.height / height;
              const scale = Math.min(scaleX, scaleY);
              width *= scale;
              height *= scale;
            } else if (options.width) {
              height = options.width / aspectRatio;
              width = options.width;
            } else if (options.height) {
              width = options.height * aspectRatio;
              height = options.height;
            }
          } else {
            width = options.width || width;
            height = options.height || height;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          // Fill background color
          ctx.fillStyle = options.backgroundColor;
          ctx.fillRect(0, 0, width, height);

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const convertedUrl = URL.createObjectURL(blob);
                resolve({
                  ...file,
                  convertedUrl,
                  convertedBlob: blob,
                  status: 'completed',
                  progress: 100,
                  convertedSize: blob.size,
                });
              } else {
                resolve({
                  ...file,
                  status: 'error',
                  progress: 0,
                });
              }
            },
            `image/${options.format}`,
            options.quality / 100
          );
        }
      };

      img.onerror = () => {
        resolve({
          ...file,
          status: 'error',
          progress: 0,
        });
      };

      img.src = file.originalUrl;
    });
  };

  const handleConvertAll = async () => {
    setIsConverting(true);
    
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (let i = 0; i < pendingFiles.length; i++) {
      const file = pendingFiles[i];
      
      // Update status to converting
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'converting', progress: 50 } : f
      ));

      // Convert the file
      const convertedFile = await convertImage(file);
      
      // Update with converted result
      setFiles(prev => prev.map(f => 
        f.id === file.id ? convertedFile : f
      ));

      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsConverting(false);
  };

  const downloadFile = (file: ConvertedFile) => {
    if (!file.convertedBlob) return;

    const url = URL.createObjectURL(file.convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.originalFile.name.replace('.png', '')}.${options.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.convertedBlob);
    
    if (completedFiles.length === 1) {
      downloadFile(completedFiles[0]);
      return;
    }

    // For multiple files, we'll download them individually
    completedFiles.forEach(file => {
      setTimeout(() => downloadFile(file), 100);
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.originalUrl);
        if (fileToRemove.convertedUrl) {
          URL.revokeObjectURL(fileToRemove.convertedUrl);
        }
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const clearAll = () => {
    files.forEach(file => {
      URL.revokeObjectURL(file.originalUrl);
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
    });
    setFiles([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const totalSavings = completedFiles.reduce((acc, file) => {
    if (file.convertedSize) {
      return acc + (file.originalSize - file.convertedSize);
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            PNG to JPG Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert your PNG images to JPG/JPEG format with advanced customization options. 
            Drag, drop, and download with professional-grade quality control.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary" className="gap-1">
              <Zap className="w-3 h-3" />
              Fast Conversion
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <FileImage className="w-3 h-3" />
              Batch Processing
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Settings className="w-3 h-3" />
              Advanced Options
            </Badge>
          </div>
        </div>

        {/* Upload Section */}
        <Collapsible open={sectionsOpen.upload} onOpenChange={() => toggleSection('upload')}>
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    Upload Images
                  </div>
                  {sectionsOpen.upload ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                    isDragOver
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                      : 'border-muted-foreground/25 hover:border-blue-400 hover:bg-muted/20'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        Drag and drop PNG files here
                      </p>
                      <p className="text-muted-foreground">
                        or click to browse your files
                      </p>
                    </div>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".png,image/png"
                  onChange={handleFileInput}
                  className="hidden"
                />

                {files.length > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {files.length} file(s) selected
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Conversion Options */}
        <Collapsible open={sectionsOpen.options} onOpenChange={() => toggleSection('options')}>
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    Conversion Options
                  </div>
                  {sectionsOpen.options ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Quality */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Quality ({options.quality}%)
                    </Label>
                    <Slider
                      value={[options.quality]}
                      onValueChange={(value) => setOptions(prev => ({ ...prev, quality: value[0] }))}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Lower size</span>
                      <span>Higher quality</span>
                    </div>
                  </div>

                  {/* Format */}
                  <div className="space-y-3">
                    <Label>Output Format</Label>
                    <Select
                      value={options.format}
                      onValueChange={(value: 'jpeg' | 'jpg') => setOptions(prev => ({ ...prev, format: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Background Color */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Background Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={options.backgroundColor}
                        onChange={(e) => setOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input
                        value={options.backgroundColor}
                        onChange={(e) => setOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        placeholder="#FFFFFF"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Resize Options */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-base font-medium">
                    <Resize className="w-4 h-4" />
                    Resize Options (Optional)
                  </Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="Auto"
                        value={options.width || ''}
                        onChange={(e) => setOptions(prev => ({ 
                          ...prev, 
                          width: e.target.value ? parseInt(e.target.value) : undefined 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="Auto"
                        value={options.height || ''}
                        onChange={(e) => setOptions(prev => ({ 
                          ...prev, 
                          height: e.target.value ? parseInt(e.target.value) : undefined 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={options.maintainAspectRatio}
                          onChange={(e) => setOptions(prev => ({ 
                            ...prev, 
                            maintainAspectRatio: e.target.checked 
                          }))}
                          className="rounded"
                        />
                        Maintain Aspect Ratio
                      </Label>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="pt-4 border-t">
                    <Button 
                      onClick={handleConvertAll}
                      disabled={isConverting || files.filter(f => f.status === 'pending').length === 0}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                    >
                      {isConverting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Converting...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Convert All Images ({files.filter(f => f.status === 'pending').length})
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Preview Section */}
        {files.length > 0 && (
          <Collapsible open={sectionsOpen.preview} onOpenChange={() => toggleSection('preview')}>
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-green-600" />
                      Image Preview & Progress
                    </div>
                    {sectionsOpen.preview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div key={file.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {file.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                              {file.status === 'converting' && (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                              )}
                              {file.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                              {file.status === 'pending' && <ImageIcon className="w-5 h-5 text-muted-foreground" />}
                            </div>
                            <div>
                              <p className="font-medium">{file.originalFile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(file.originalSize)}
                                {file.convertedSize && ` → ${formatFileSize(file.convertedSize)}`}
                                {file.convertedSize && file.convertedSize < file.originalSize && (
                                  <span className="text-green-600 ml-2">
                                    (-{formatFileSize(file.originalSize - file.convertedSize)})
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {file.status === 'completed' && (
                              <Button size="sm" onClick={() => downloadFile(file)}>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => removeFile(file.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {file.status === 'converting' && (
                          <Progress value={file.progress} className="w-full" />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Original (PNG)</p>
                            <img
                              src={file.originalUrl}
                              alt="Original"
                              className="w-full h-32 object-cover rounded border"
                            />
                          </div>
                          {file.convertedUrl && (
                            <div>
                              <p className="text-sm font-medium mb-2">
                                Converted ({options.format.toUpperCase()})
                              </p>
                              <img
                                src={file.convertedUrl}
                                alt="Converted"
                                className="w-full h-32 object-cover rounded border"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Download Section */}
        {completedFiles.length > 0 && (
          <Collapsible open={sectionsOpen.download} onOpenChange={() => toggleSection('download')}>
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-pink-600" />
                      Download Results
                    </div>
                    {sectionsOpen.download ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{completedFiles.length}</p>
                        <p className="text-sm text-muted-foreground">Files Converted</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatFileSize(completedFiles.reduce((acc, f) => acc + f.originalSize, 0))}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Original Size</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">
                          {totalSavings > 0 ? `-${formatFileSize(totalSavings)}` : 'N/A'}
                        </p>
                        <p className="text-sm text-muted-foreground">Space Saved</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={downloadAll}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download All ({completedFiles.length} files)
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}
      </div>
    </div>
  );
}