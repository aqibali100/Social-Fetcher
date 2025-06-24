import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
  }

  const apiKey = process.env.YT_API_KEY;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const tags: string[] = data.items[0].snippet.tags || [];

    return NextResponse.json({ tags });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: 'API error', detail: error.message }, { status: 500 });
  }
}
