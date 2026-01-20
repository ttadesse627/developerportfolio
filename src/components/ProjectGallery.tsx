'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ImageInfo } from '@/types/image';
import ModalGallery from './ModalGallery'; // You'll need to create this component

interface Props {
  folderName: string;
  projectTitle: string;
  maxImages?: number;
}

export default function ProjectGallery({
  folderName,
  projectTitle,
  maxImages = 4,
}: Props) {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  
  // Disable loop here
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    async function loadImages() {
      const res = await fetch(`/api/images?folder=${folderName}`);
      console.log("Response from the server: ", res);
      const data = await res.json();
      setImages(data);
      setLoading(false);
    }

    loadImages();
  }, [folderName]);

  const scrollPrev = useCallback(() => {
    if (emblaApi && canScrollPrev) emblaApi.scrollPrev();
  }, [emblaApi, canScrollPrev]);

  const scrollNext = useCallback(() => {
    if (emblaApi && canScrollNext) emblaApi.scrollNext();
  }, [emblaApi, canScrollNext]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      onSelect();
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
      
      return () => {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      };
    }
  }, [emblaApi, onSelect]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
    // Scroll the main carousel to the clicked image
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        Loading images…
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500">
        No images found
      </div>
    );
  }

  const displayImages = images.slice(0, maxImages);

  return (
    <>
      <div className="relative group">
        {/* Main Carousel */}
        <div 
          className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
          onClick={() => openModal(selectedIndex)}
        >
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {displayImages.map((image, index) => (
                <div
                  key={image.name}
                  className="relative aspect-video flex-[0_0_100%] min-w-0 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.src}
                    alt={`${projectTitle} - ${image.name}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                  
                  {/* Fullscreen overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="p-3 bg-black/50 text-white rounded-full backdrop-blur-sm">
                      <Maximize2 className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Conditionally rendered and disabled */}
        {displayImages.length > 1 && (
          <>
            <button
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100 ${
                canScrollPrev 
                  ? 'bg-black/50 hover:bg-black/70 cursor-pointer' 
                  : 'bg-black/20 cursor-not-allowed'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              disabled={!canScrollPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100 ${
                canScrollNext 
                  ? 'bg-black/50 hover:bg-black/70 cursor-pointer' 
                  : 'bg-black/20 cursor-not-allowed'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              disabled={!canScrollNext}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {displayImages.length > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10 backdrop-blur-sm">
            {images.length > maxImages 
              ? `${selectedIndex + 1}/${displayImages.length}+` 
              : `${selectedIndex + 1}/${displayImages.length}`}
          </div>
        )}

        {/* Dots Indicator */}
        {displayImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {displayImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'bg-blue-600 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  emblaApi?.scrollTo(index);
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Thumbnail Grid for Additional Images */}
        {images.length > maxImages && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              More images ({images.length})
            </p>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <div
                  key={image.name}
                  className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(index);
                  }}
                >
                  <Image
                    src={image.src}
                    alt={`${projectTitle} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 20vw"
                  />
                  {index >= maxImages && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        +{index - maxImages + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Gallery Component */}
      {modalOpen && (
        <ModalGallery
          images={images}
          initialIndex={modalIndex}
          projectTitle={projectTitle}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}