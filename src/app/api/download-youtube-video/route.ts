import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing YouTube URL' }, { status: 400 });
    }

    // Extract Video ID from the URL
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (!videoIdMatch || !videoIdMatch[1]) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const videoId = videoIdMatch[1];
    const apiKey = process.env.YT_API_KEY;

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch video metadata');
    }

    const data = await response.json();

    if (data.items.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(data.items[0]); // Send full video metadata
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
