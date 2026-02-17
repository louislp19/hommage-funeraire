export default function MemorialTestPage() {
  return (
    <main style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>📸 Envoyer vos photos</h1>
      <p style={{ color: '#666' }}>
        Choisissez 1 à 5 photos de votre proche. Elles apparaîtront automatiquement dans le diaporama.
      </p>
      
      <form
        action="/api/upload"
        method="post"
        encType="multipart/form-data"
        style={{ marginTop: 30 }}
      >
        <input
          type="hidden"
          name="memorialId"
          value="test"
        />
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
            Sélectionnez vos photos :
          </label>
          <input
            type="file"
            name="files"
            multiple
            accept="image/*"
            style={{
              width: '100%',
              padding: 10,
              border: '2px dashed #ccc',
              borderRadius: 8,
              background: '#f9f9f9'
            }}
          />
          <small style={{ color: '#888' }}>
            Formats : JPG, PNG, GIF. Max 5 Mo par photo.
          </small>
        </div>
        
        <button
          type="submit"
          style={{
            background: '#0070f3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Envoyer vos photos
        </button>
      </form>
      
      <div style={{ marginTop: 30, padding: 20, background: '#f0f8ff', borderRadius: 8 }}>
        <h3>Comment ça marche :</h3>
        <ol>
          <li>Cliquez sur "Sélectionnez vos photos" et choisissez 1 à 5 images.</li>
          <li>Cliquez sur "Envoyer vos photos".</li>
          <li>Les images arriveront automatiquement dans le diaporama de la cérémonie.</li>
        </ol>
      </div>
    </main>
  );
}
