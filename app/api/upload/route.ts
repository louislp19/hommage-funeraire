import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const memorialId = formData.get('memorialId') as string;
    const files = formData.getAll('files') as File[];

    if (!memorialId) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }
    if (files.length === 0) {
      return NextResponse.json({ error: 'Aucune photo' }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const timestamp = Date.now();
        const pathname = `memorials/${memorialId}/${timestamp}-${file.name}`;
        const blob = await put(pathname, file, { access: 'public' });
        return { url: blob.url, pathname: blob.pathname, name: file.name };
      })
    );

    return NextResponse.json({ success: true, uploads });

  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
