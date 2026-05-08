"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface Photo {
  id: number;
  url: string;
  description: string;
  uploadTime?: string;
}

export function PhotosGrid({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = useCallback((photo: Photo) => {
    setLightbox(photo);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShow(true));
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setShow(false);
    setTimeout(() => setLightbox(null), 300);
  }, []);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="mb-4 break-inside-avoid group cursor-pointer"
            onClick={() => openLightbox(photo)}
          >
            <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] transition duration-300 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(5,10,35,0.4)]">
              <div className="relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.description}
                  className="w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                {photo.description && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white/90 truncate">{photo.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && lightbox && createPortal(
        <div
          className={`fixed inset-0 flex flex-col items-center justify-center backdrop-blur-md p-6 transition-all duration-300 ease-out ${show ? "bg-black/85" : "bg-black/0"}`}
          style={{ zIndex: 99999 }}
          onClick={closeLightbox}
        >
          <div
            className={`relative flex flex-col items-center transition-all duration-300 ease-out ${show ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-4"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.description}
              className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
            {(lightbox.description || lightbox.uploadTime) && (
              <div className={`mt-4 text-center max-w-[90vw] transition-all duration-300 delay-100 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                {lightbox.description && <p className="text-sm text-white/80">{lightbox.description}</p>}
                {lightbox.uploadTime && (
                  <p className="text-xs text-white/40 mt-1">
                    {lightbox.uploadTime.replace("T", " ").slice(0, 19)}
                  </p>
                )}
              </div>
            )}
            <button
              onClick={closeLightbox}
              className={`absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white text-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/25 ${show ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            >
              ✕
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
