import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // NOUVEAU : récupère id avec await (App Router 14+)
    const params = await context.params;
    const { id } = params;
    
    console.log(`🔍 ID reçu: "${id}"`);
    const prefix = `memorials/${id}/`;
    
    console.log(`🔍 Recherche dans: "${prefix}"`);

    // Liste les fichiers
    const { blobs } = await list({ prefix });

    const images = blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      uploadedAt: blob.uploadedAt,
    }));

    console.log(`✅ ${images.length} images trouvées`);

    return NextResponse.json({
      success: true,
      count: images.length,
      id,
      prefix,
      images,
    });

  } catch (error) {
    console.error('❌ Erreur:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
