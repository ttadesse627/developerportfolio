'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageInfo } from '@/types/image';

interface ModalGalleryProps {
  images: ImageInfo[];
  initialIndex: number;
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalGallery({
  images,
  initialIndex,
  projectTitle,
  isOpen,
  onClose,
}: ModalGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, images.length]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close gallery"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Current image */}
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex].src}
            alt={`${projectTitle} - ${images[currentIndex].name}`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}