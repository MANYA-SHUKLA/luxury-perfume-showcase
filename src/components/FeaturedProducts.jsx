import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Section, Container, Heading } from "./ui";
import { products, getFeaturedProductIds } from "../data/products";
import "./FeaturedProducts.css";

const CARD_GAP = 32;
const CARD_MIN_WIDTH = 320;

const container = {
  hidden: { opacity: 0 },
  show: (reduced) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.12,
      delayChildren: reduced ? 0 : 0.15,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: (reduced) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function FeaturedProducts() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  const featuredIds = getFeaturedProductIds();
  const featured = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const step = CARD_MIN_WIDTH + CARD_GAP;
    scrollRef.current.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <Section variant="default" padding="lg" className="featured" ref={sectionRef} aria-labelledby="featured-heading">
      <Container size="default" className="featured-inner">
        <Heading level={2} size="lg" align="center" id="featured-heading" className="featured-heading">Featured</Heading>
        <div className="featured-slider-wrap">
          <button
            type="button"
            className="featured-slider-btn featured-slider-btn--prev"
            onClick={() => scroll("prev")}
            aria-label="Scroll previous"
          >
            ‹
          </button>
          <div className="featured-slider" ref={scrollRef}>
            <motion.div
              className="featured-slider-track"
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              custom={reducedMotion}
            >
              {featured.map((product) => (
                <motion.div
                  key={product.id}
                  className="featured-slider-card"
                  variants={item}
                  custom={reducedMotion}
                >
                  <ProductCard product={product} variant="featured" />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <button
            type="button"
            className="featured-slider-btn featured-slider-btn--next"
            onClick={() => scroll("next")}
            aria-label="Scroll next"
          >
            ›
          </button>
        </div>
      </Container>
    </Section>
  );
}
