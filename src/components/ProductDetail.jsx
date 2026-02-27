import { useState, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useWishlistContext } from "../context/WishlistContext";
import { PriceTag, Button } from "./ui";
import DetailAccordion from "./DetailAccordion";
import "./Detail.css";

const DetailImageGallery = lazy(() => import("./DetailImageGallery"));
const ProductPreview3D = lazy(() => import("./ProductPreview3D"));

const getContentContainer = (reduced) => ({
  animate: {
    transition: {
      staggerChildren: reduced ? 0 : 0.06,
      delayChildren: reduced ? 0 : 0.1,
    },
  },
});

const getContentItem = (reduced) => ({
  initial: { opacity: 0, y: reduced ? 0 : 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] },
  },
});

export default function ProductDetail({ product }) {
  const [shareFeedback, setShareFeedback] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const wishlist = useWishlistContext();
  const reducedMotion = useReducedMotion();
  const contentContainer = getContentContainer(reducedMotion);
  const contentItem = getContentItem(reducedMotion);

  if (!product) return null;

  const { id, name, price, fullDescription } = product;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const inWishlist = wishlist?.isInWishlist(id);

  const handleShare = async () => {
    const shareData = {
      title: `${name} — Sillage`,
      text: fullDescription.slice(0, 120) + "…",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      } catch {}
    }
  };

  return (
    <article className="detail">
      <div className="detail-inner">
        <div className="detail-media">
          <Suspense
            fallback={
              <div className="detail-gallery-placeholder" aria-hidden>
                <span className="route-fallback-spinner" />
              </div>
            }
          >
            <DetailImageGallery images={images} name={name} />
          </Suspense>
          <div className="detail-3d-cta">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShow3D(true)}
              aria-label={`View ${name} in 3D`}
            >
              View in 3D
            </Button>
          </div>
          {show3D && (
            <Suspense
              fallback={
                <div className="product-preview-3d" aria-busy="true">
                  <div className="detail-gallery-placeholder" style={{ margin: "auto" }}>
                    <span className="route-fallback-spinner" />
                  </div>
                </div>
              }
            >
              <ProductPreview3D
                productName={name}
                onClose={() => setShow3D(false)}
              />
            </Suspense>
          )}
        </div>
        <motion.div
          className="detail-content"
          variants={contentContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="detail-actions" variants={contentItem}>
            {wishlist && (
              <button
                type="button"
                className={`detail-wishlist ${inWishlist ? "detail-wishlist--active" : ""}`}
                onClick={() => wishlist.toggle(id)}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                ♥ {inWishlist ? " In wishlist" : " Add to wishlist"}
              </button>
            )}
            <button
              type="button"
              className="detail-share"
              onClick={handleShare}
              aria-label="Share product"
            >
              {shareFeedback ? "✓ Link copied" : "Share"}
            </button>
          </motion.div>
          <motion.h1 className="detail-title" variants={contentItem}>
            {name}
          </motion.h1>
          <motion.p className="detail-price" variants={contentItem}>
            <PriceTag value={price} size="lg" />
          </motion.p>
          <motion.p className="detail-description" variants={contentItem}>
            {fullDescription}
          </motion.p>

          <motion.div variants={contentItem}>
            <DetailAccordion product={product} />
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}
