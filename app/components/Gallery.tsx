'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { ImageModal } from './ImageModal';
import { CustomCursor } from './CustomCursor';
import { useState } from 'react';

type ArtPiece = {
  id: number;
  title: string;
  src: string;
};

const artPieces: ArtPiece[] = [
  { id: 1, title: "HOUSE FIRE", src: "/house-fire.png" },
  { id: 2, title: "FLEETING", src: "/fleeting.png" },
  { id: 3, title: "GREEN ROOM", src: "/green-room.png" },
  { id: 4, title: "GROCER", src: "/grocery.png" },
  { id: 5, title: "TRECK", src: "/deep-snow.png" }, 
  { id: 6, title: "DUSK TRAINING", src: "/samurai.png" },
  { id: 7, title: "CONDEMNED", src: "/crow.png" },
  { id: 8, title: "ARRIVAL", src: "/airport.png" },
  { id: 9, title: "PORCELAIN", src: "/porcelain-mask.png" },
  { id: 10, title: "FOYER", src: "/foyer.png" },
  { id: 11, title: "SUBURBAN", src: "/suburb.png" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<ArtPiece | null>(null);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      <CustomCursor />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center mb-16 mt-16">
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
              FILM INSPIRED SHOTS, DREAMED INTO REALITY.
            </motion.h2>
          </div>
          <ThemeToggle />
        </header>
        
        <div className="grid grid-cols-1 gap-24 mb-24">
          {artPieces.map((piece, index) => (
            <motion.article
              key={piece.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1,
                delay: 0.35 + index * 0.1,
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
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7,
                  delay: 0.45 + index * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="text-title font-medium text-light-text dark:text-dark-text mt-6"
              >
                {piece.title}
              </motion.h2>
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
          const currentIndex = artPieces.findIndex(p => p.id === selectedImage.id);
          const nextImage = artPieces[currentIndex + 1] || artPieces[0];
          setSelectedImage(nextImage);
        }}
        onPrevious={() => {
          if (!selectedImage) return;
          const currentIndex = artPieces.findIndex(p => p.id === selectedImage.id);
          const prevImage = artPieces[currentIndex - 1] || artPieces[artPieces.length - 1];
          setSelectedImage(prevImage);
        }}
      />
    </>
  );
} 