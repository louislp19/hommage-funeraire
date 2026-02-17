import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    // Récupère les données du formulaire
    const formData = await request.formData();
    const memorialId = formData.get('memorialId') as string;
    const files = formData.getAll('files') as File[];

    if (!memorialId) {
      return NextResponse.json({ error: 'ID du défunt manquant' }, { status: 400 });
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'Aucune photo sélectionnée' }, { status: 400 });
    }

    // Upload chaque fichier vers Vercel Blob
    const uploads = await Promise.all(
      files.map(async (file) => {
        const timestamp = Date.now();
        const pathname = `memorials/${memorialId}/${timestamp}-${file.name}`;
        
        const blob = await put(pathname, file, {
          access: 'public',  // pour que le diaporama puisse les lire
          handleUploadUrl: 'https://blob.vercel-storage.com/', // automatique
        });
        
        return {
          url: blob.url,
          pathname: blob.pathname,
          name: file.name,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: `✅ ${uploads.length} photo(s) uploadées avec succès !`,
      uploads,
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l’upload des photos' },
      { status: 500 }
    );
  }
}
