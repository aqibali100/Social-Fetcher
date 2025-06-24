// import { NextRequest, NextResponse } from 'next/server';
// import Tiktok from '@tobyg74/tiktok-api-dl';

// function extractCleanTikTokUrl(url: string): string {
//   const match = url.match(/https:\/\/www\.tiktok\.com\/(@[\w.-]+)\/video\/(\d+)/);
//   if (match) return `https://www.tiktok.com/${match[1]}/video/${match[2]}`;
//   throw new Error('Invalid TikTok video URL format.');
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const url = body?.url;

//     if (typeof url !== 'string' || !url.trim()) {
//       return NextResponse.json({ error: 'A valid TikTok URL is required.' }, { status: 400 });
//     }

//     let cleanUrl: string;
//     try {
//       cleanUrl = extractCleanTikTokUrl(url);
//       console.log('🧼 Clean TikTok URL:', cleanUrl);
//     } catch (e) {
//       return NextResponse.json({ error: e.message }, { status: 400 });
//     }

//     const response = await Tiktok.Downloader(cleanUrl, {
//       version: 'v2',
//     });

//     const result = response?.result;

//     if (!result) {
//       return NextResponse.json({ error: 'No media data found.' }, { status: 400 });
//     }

//     const videoUrl = Array.isArray(result.video?.playAddr) ? result.video.playAddr[0] : '';

//     if (!videoUrl) {
//       console.error('❌ No video URL found in result:', JSON.stringify(result, null, 2));
//       return NextResponse.json({ error: 'No video URL found.' }, { status: 400 });
//     }

//     return NextResponse.json({
//       id: cleanUrl.split('/').pop() ?? '',
//       title: result.desc ?? '',
//       author: result.author?.nickname ?? '',
//       duration: result.video?.duration ?? 0,
//       views: parseInt(result.statistics?.playCount ?? '0', 10),
//       likes: parseInt(result.statistics?.likeCount?.replace(/[^\d]/g, '') ?? '0', 10),
//       thumbnail: result.video?.cover ?? '',
//       url: videoUrl,
//       raw: result,
//     });

//   } catch (err: any) {
//     console.error('🔥 Unhandled error:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
