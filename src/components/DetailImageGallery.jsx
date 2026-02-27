import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./DetailImageGallery.css";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function DetailImageGallery({ images, name }) {
  const list = images && images.length > 0 ? images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerRef = useRef(null);
  const lightboxRef = useRef(null);

  const currentImage = list[selectedIndex];

  const openLightbox = () => list.length > 0 && setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  const handleMainKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (!lightboxOpen || list.length <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIndex((i) => (i === 0 ? list.length - 1 : i - 1));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedIndex((i) => (i === list.length - 1 ? 0 : i + 1));
      }
    };
    if (lightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, list.length]);

  useEffect(() => {
    if (!lightboxOpen || !lightboxRef.current) return;
    const previouslyFocused = document.activeElement;
    const focusables = lightboxRef.current.querySelectorAll(FOCUSABLE);
    const first = focusables[0];
    if (first) first.focus();
    return () => {
      if (triggerRef.current) triggerRef.current.focus();
      else if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen || !lightboxRef.current) return;
    const el = lightboxRef.current;
    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      const focusables = [...el.querySelectorAll(FOCUSABLE)];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    el.addEventListener("keydown", handleTab);
    return () => el.removeEventListener("keydown", handleTab);
  }, [lightboxOpen]);

  if (list.length === 0) return null;

  return (
    <>
      <section className="detail-gallery" aria-label={`Image gallery for ${name}`}>
        <div
          ref={triggerRef}
          className="detail-gallery-main-wrap"
          onClick={openLightbox}
          role="button"
          tabIndex={0}
          onKeyDown={handleMainKeyDown}
          aria-label={`View full size image of ${name}. Current image ${selectedIndex + 1} of ${list.length}`}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedIndex}
              src={currentImage}
              alt={name}
              className="detail-gallery-main"
              loading="eager"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
          <span className="detail-gallery-zoom-hint" aria-hidden>Click to zoom</span>
        </div>
        {list.length > 1 && (
          <div className="detail-gallery-thumbs" role="tablist" aria-label={`Image thumbnails for ${name}`}>
            {list.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                role="tab"
                className={`detail-gallery-thumb ${i === selectedIndex ? "detail-gallery-thumb--active" : ""}`}
                onClick={() => setSelectedIndex(i)}
                aria-label={`${name}, image ${i + 1} of ${list.length}`}
                aria-selected={i === selectedIndex}
                id={`gallery-thumb-${i}`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            className="detail-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox: ${name}, image ${selectedIndex + 1} of ${list.length}. Use arrow keys to navigate, Escape to close.`}
          >
            <button
              type="button"
              className="detail-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox (Escape)"
            >
              ×
            </button>
            {list.length > 1 && (
              <>
                <button
                  type="button"
                  className="detail-lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((i) => (i === 0 ? list.length - 1 : i - 1));
                  }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="detail-lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((i) => (i === list.length - 1 ? 0 : i + 1));
                  }}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
            <div
              className="detail-lightbox-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={currentImage}
                  alt={name}
                  className="detail-lightbox-img"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
