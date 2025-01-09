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
      className="absolute left-4 sm:left-6 lg:left-8 -top-14 z-10 p-2 hover:bg-white/0 rounded-full transition-colors"
      aria-label="Close modal"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M8 16L24 16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: isHovered ? "M10 10L22 22" : "M8 16L24 16",
            rotate: isHovered ? 0 : 0
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-light-text dark:text-dark-text"
        />
        <motion.path
          d="M16 16L16 16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: isHovered ? "M22 10L10 22" : "M16 16L16 16",
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-light-text dark:text-dark-text"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div 
            className="absolute inset-0 backdrop-blur-md bg-light-bg/90 dark:bg-dark-bg/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <div 
            className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative mt-8"
            >
              <div className="relative bg-black aspect-[16/9] w-full overflow-hidden">
                {image && (
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    quality={95}
                    priority
                  />
                )}
              </div>
              <div className="flex justify-between items-center mt-6">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-medium text-light-text dark:text-dark-text"
                >
                  {image?.title}
                </motion.h2>
                <div className="flex gap-4">
                  <button
                    onClick={onPrevious}
                    className="p-2 text-2xl text-light-text/40 dark:text-dark-text/40 hover:text-light-text dark:hover:text-dark-text transition-colors"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    onClick={onNext}
                    className="p-2 text-2xl text-light-text/40 dark:text-dark-text/40 hover:text-light-text dark:hover:text-dark-text transition-colors"
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 