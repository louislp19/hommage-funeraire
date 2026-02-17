'use client';

import { useState, useEffect } from 'react';

export default function SlideshowPage() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Récupère les images depuis l'API
  const fetchImages = async () => {
    try {
      const res = await fetch('/api/memorial/test/images');
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
        if (data.images.length > 0) {
          setCurrentIndex(0);
        }
      }
    } catch (error) {
      console.error('Erreur fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  // Au démarrage + toutes les 15s
  useEffect(() => {
    fetchImages();
    const interval = setInterval(fetchImages, 15000);
    return () => clearInterval(interval);
  }, []);

  // Passe à l'image suivante
  useEffect(() => {
    if (images.length > 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 7000); // 7s par image
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, images.length]);

  if (loading) {
    return (
      <div style={styles.center}>
        <h1>Chargement du diaporama...</h1>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div style={styles.center}>
        <h1>Aucune photo pour le moment</h1>
        <p>Les proches peuvent uploader leurs photos ici :</p>
        <a href="/memorial/test" style={styles.link}>Ajouter des photos</a>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div style={styles.fullscreen}>
      <div style={styles.imageContainer}>
        <img
          src={currentImage.url}
          alt="Souvenir"
          style={styles.image}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            setCurrentIndex((prev) => (prev + 1) % images.length);
          }}
        />
        <div style={styles.overlay}>
          <div style={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  fullscreen: {
    width: '100vw',
    height: '100vh',
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'opacity 0.5s ease-in-out',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: 10,
    borderRadius: 8,
  },
  counter: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f0f0f0',
    color: '#333',
  },
  link: {
    marginTop: 20,
    padding: '10px 20px',
    background: '#0070f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: 8,
  },
};
