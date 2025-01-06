'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCursor } from './CursorContext';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  image: {
    src: string;
    title: string;
  } | null;
};

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute -left-2 -top-14 z-10 p-2 hover:bg-white/0 rounded-full transition-colors"
      aria-label="Close modal"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M8 16L24 16"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: isHovered ? "M10 10L22 22" : "M8 16L24 16",
            rotate: isHovered ? 0 : 0
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M16 16L16 16"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: isHovered ? "M22 10L10 22" : "M16 16L16 16",
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </svg>
    </motion.button>
  );
};

export function ImageModal({ isOpen, onClose, onNext, onPrevious, image }: ImageModalProps) {
  const { setForceTheme } = useCursor();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    setForceTheme('dark');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      setForceTheme(null);
    };
  }, [isOpen, onNext, onPrevious, onClose, setForceTheme]);

  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50"
          />
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-7xl"
            >
              <CloseButton onClick={onClose} />

              <div 
                className="aspect-[16/9] relative"
                data-image-container="true"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
              </div>

              <div className="mt-10 flex items-center justify-between">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-medium text-white"
                >
                  {image.title}
                </motion.h2>

                <div className="flex items-center gap-4">
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: 0.2 }}
                    onClick={onPrevious}
                    className="p-2 hover:bg-white/0 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <IoChevronBack size={16} className="text-white" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: 0.25 }}
                    onClick={onNext}
                    className="p-2 hover:bg-white/0 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <IoChevronForward size={16} className="text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
} 