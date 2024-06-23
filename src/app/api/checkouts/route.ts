import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

import { QrCodePix } from 'qrcode-pix';

export async function POST(request: NextRequest) {
  const requestData = await request.json()
  const qrCodePix = QrCodePix({
    version: '01',
    key: process.env.PIX_KEY || '',
    name: process.env.PIX_NAME || '',
    city: process.env.PIX_CITY || '',
    value: requestData.total / 100,
  })
  const qrCode = await qrCodePix.base64()
  const brCode = qrCodePix.payload()
  const id = await kv.dbsize() + 1
  const data = { id, brCode, qrCode, ...requestData }
  await kv.set(`checkout:${id}`, data)
  return NextResponse.json({ qrCode, brCode })
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
