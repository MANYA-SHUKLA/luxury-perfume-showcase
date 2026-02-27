import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { getSimilarProducts, categories } from "../data/products";
import "./SimilarProducts.css";

const CARD_GAP = 24;
const CARD_MIN_WIDTH = 260;

export default function SimilarProducts({ product }) {
  const scrollRef = useRef(null);
  const similar = getSimilarProducts(product.id, 4);

  if (similar.length === 0) return null;

  const categoryLabel =
    categories.find((c) => c.id === product.category)?.label || product.category;

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const step = (CARD_MIN_WIDTH + CARD_GAP) * 2;
    scrollRef.current.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section className="similar-products" aria-labelledby="similar-products-heading">
      <div className="similar-products-inner">
        <h2 id="similar-products-heading" className="similar-products-title">You might also like</h2>
        <p className="similar-products-desc">
          More from the {categoryLabel} collection
        </p>
        <div className="similar-products-carousel-wrap">
          <button
            type="button"
            className="similar-products-btn similar-products-btn--prev"
            onClick={() => scroll("prev")}
            aria-label="Scroll previous"
          >
            ‹
          </button>
          <div className="similar-products-carousel" ref={scrollRef}>
            {similar.map((p) => (
              <motion.div
                key={p.id}
                className="similar-products-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={p} variant="grid" />
              </motion.div>
            ))}
          </div>
          <button
            type="button"
            className="similar-products-btn similar-products-btn--next"
            onClick={() => scroll("next")}
            aria-label="Scroll next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
