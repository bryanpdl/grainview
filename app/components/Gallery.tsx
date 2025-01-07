'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { ImageModal } from './ImageModal';
import { CustomCursor } from './CustomCursor';
import { useState, useMemo, useEffect } from 'react';
import { HiOutlineDownload, HiOutlineClipboard } from 'react-icons/hi';

type ArtPiece = {
  id: number;
  title: string;
  src: string;
};

type AspectRatio = 'all' | '1:1' | '4:3' | '16:9';

const artPieces: ArtPiece[] = [
  { id: 1, title: "FLEETING", src: "/images/fleeting.png" },
  { id: 2, title: "HOUSE FIRE", src: "/images/house-fire.png" },
  { id: 3, title: "GREEN ROOM", src: "/images/green-room.png" },
  { id: 4, title: "GROCER", src: "/images/grocery.png" },
  { id: 5, title: "TRECK", src: "/images/deep-snow.png" },
  { id: 6, title: "DUSK TRAINING", src: "/images/samurai.png" },
  { id: 7, title: "CONDEMNED", src: "/images/crow.png" },
  { id: 8, title: "ARRIVAL", src: "/images/airport.png" },
  { id: 9, title: "PORCELAIN", src: "/images/porcelain-mask.png" },
  { id: 10, title: "FOYER", src: "/images/foyer.png" },
  { id: 11, title: "SUBURBAN", src: "/images/suburb.png" },
  { id: 12, title: "THE PLOT", src: "/images/subjects-face.png" },
  { id: 13, title: "DEEP", src: "/images/shark.png" },
  { id: 14, title: "EMBANKED", src: "/images/suv-snow.png" },
  { id: 15, title: "HAZED OUT", src: "/images/balcony-pink.png" },
  { id: 16, title: "PASSAGE", src: "/images/cloak-blue.png" },
  { id: 17, title: "VACANT", src: "/images/hallway.png" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<ArtPiece | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('all');
  const [imageRatios, setImageRatios] = useState<Record<number, AspectRatio>>({});

  const detectAspectRatio = (width: number, height: number): AspectRatio => {
    const ratio = width / height;
    if (Math.abs(ratio - 1) < 0.1) return '1:1';
    if (Math.abs(ratio - 4/3) < 0.1) return '4:3';
    return '16:9';
  };

  const handleImageLoad = (id: number, { naturalWidth, naturalHeight }: { naturalWidth: number, naturalHeight: number }) => {
    const ratio = detectAspectRatio(naturalWidth, naturalHeight);
    setImageRatios(prev => ({ ...prev, [id]: ratio }));
  };

  // Preload all images to detect ratios
  useEffect(() => {
    artPieces.forEach(piece => {
      const img = document.createElement('img');
      img.src = piece.src;
      img.onload = () => {
        handleImageLoad(piece.id, { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
      };
    });
  }, []);

  const filteredPieces = useMemo(() => {
    if (selectedRatio === 'all') return artPieces;
    return artPieces.filter(piece => imageRatios[piece.id] === selectedRatio);
  }, [selectedRatio, imageRatios]);

  const handleDownload = async (piece: ArtPiece) => {
    try {
      const response = await fetch(piece.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${piece.title.toLowerCase().replace(/\s+/g, '-')}-grainview${piece.src.slice(piece.src.lastIndexOf('.'))}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleCopy = async (piece: ArtPiece) => {
    try {
      const response = await fetch(piece.src);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
    } catch (error) {
      console.error('Error copying image:', error);
    }
  };

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      <CustomCursor />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center mb-12 mt-16">
          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="text-display font-bold text-light-text dark:text-dark-text"
            >
              GRAINVIEW
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="text-lg md:text-xl font-medium text-light-text/40 dark:text-dark-text/40"
            >
              FILM-INSPIRED SHOTS, STABELY DIFFUSED AND CURATED TO REALITY.
            </motion.h2>
          </div>
          <ThemeToggle />
        </header>
        
        <motion.div 
          className="flex gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          {(['all', '1:1', '4:3', '16:9'] as AspectRatio[]).map((ratio) => (
            <button
              key={ratio}
              onClick={() => setSelectedRatio(ratio)}
              className={`text-md font-bold transition-opacity duration-300
                ${selectedRatio === ratio 
                  ? 'text-light-text dark:text-dark-text opacity-100' 
                  : 'text-light-text/40 dark:text-dark-text/40 hover:opacity-75'
                }`}
            >
              {ratio === 'all' ? 'ALL' : ratio.toUpperCase()}
            </button>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 gap-24 mb-24">
          {filteredPieces.map((piece, index) => (
            <motion.article
              key={piece.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1,
                delay: 0.35,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="relative"
            >
              <motion.div 
                className="aspect-[16/9] relative overflow-hidden rounded-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(piece)}
                data-image-container="true"
              >
                <Image
                  src={piece.src}
                  alt={piece.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                  onLoadingComplete={(img) => handleImageLoad(piece.id, img)}
                />
              </motion.div>
              <div className="flex items-center justify-between mt-6">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7,
                    delay: 0.45,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="text-3xl font-medium text-light-text dark:text-dark-text"
                >
                  {piece.title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7,
                    delay: 0.45,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="flex gap-4"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(piece);
                    }}
                    className="p-2 text-light-text/40 dark:text-dark-text/40 hover:text-light-text dark:hover:text-dark-text transition-colors"
                    aria-label="Copy image"
                  >
                    <HiOutlineClipboard size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(piece);
                    }}
                    className="p-2 text-light-text/40 dark:text-dark-text/40 hover:text-light-text dark:hover:text-dark-text transition-colors"
                    aria-label="Download image"
                  >
                    <HiOutlineDownload size={20} />
                  </button>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
        onNext={() => {
          if (!selectedImage) return;
          const currentIndex = filteredPieces.findIndex(p => p.id === selectedImage.id);
          const nextImage = filteredPieces[currentIndex + 1] || filteredPieces[0];
          setSelectedImage(nextImage);
        }}
        onPrevious={() => {
          if (!selectedImage) return;
          const currentIndex = filteredPieces.findIndex(p => p.id === selectedImage.id);
          const prevImage = filteredPieces[currentIndex - 1] || filteredPieces[filteredPieces.length - 1];
          setSelectedImage(prevImage);
        }}
      />
    </>
  );
} 