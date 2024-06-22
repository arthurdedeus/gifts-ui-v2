import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestData = await request.json()
  const idx = await kv.dbsize() + 1
  const data = { id: idx, ...requestData }
  await kv.set(`checkout:${idx}`, data)
  return NextResponse.json({ data })
}

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const keys = await kv.keys('checkout:*');
  const dataPromises = keys.map((key) => kv.get(key));
  const data = await Promise.all(dataPromises);
  return NextResponse.json(data);
}
