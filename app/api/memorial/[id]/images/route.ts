import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;  // Récupère l'id de l'URL (ex: "test")
    const prefix = `memorials/${id}/`;  // Chemin dans Blob

    console.log(`🔍 Recherche images pour ${id} dans ${prefix}`);

    // Liste TOUS les fichiers dans ce "dossier"
    const { blobs } = await list({ prefix });

    // Transforme en format simple
    const images = blobs.map((blob) => ({
      url: blob.url,           // URL publique pour afficher l'image
      pathname: blob.pathname, // Chemin complet (ex: memorials/test/123.jpg)
      uploadedAt: blob.uploadedAt, // Quand uploadé
      size: blob.size,         // Taille en octets
    }));

    console.log(`✅ ${images.length} images trouvées`);

    return NextResponse.json({
      success: true,
      count: images.length,
      prefix,
      images,
    });

  } catch (error) {
    console.error('❌ Erreur listage:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors du listage des images',
        details: error instanceof Error ? error.message : 'Inconnu'
      },
      { status: 500 }
    );
  }
}
