import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useWishlistContext } from "../context/WishlistContext";
import { PriceTag, Button } from "./ui";
import "./ProductDetailStory.css";

const fadeUp = (reduced) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 32 },
  visible: { opacity: 1, y: 0 },
});

export default function ProductDetailStory({ product }) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const inView1 = useInView(ref1, { amount: 0.4, once: true });
  const inView2 = useInView(ref2, { amount: 0.4, once: true });
  const inView3 = useInView(ref3, { amount: 0.3, once: true });
  const inView4 = useInView(ref4, { amount: 0.3, once: true });
  const inView5 = useInView(ref5, { amount: 0.3, once: true });
  const reducedMotion = useReducedMotion();
  const wishlist = useWishlistContext();

  if (!product) return null;

  const { id, name, price, fullDescription, fragranceNotes, image } = product;
  const inWishlist = wishlist?.isInWishlist(id);
  const transition = { duration: reducedMotion ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] };

  return (
    <div className="product-detail-story">
      <div
        className="story-sticky-hero"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />

      <section className="story-panel">
        <motion.div
          ref={ref1}
          className="story-panel-content story-panel-content--center"
          variants={fadeUp(reducedMotion)}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          transition={transition}
        >
          <h1 className="story-title">{name}</h1>
        </motion.div>
      </section>

      <section className="story-panel">
        <motion.div
          ref={ref2}
          className="story-panel-content"
          variants={fadeUp(reducedMotion)}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          transition={{ ...transition, delay: 0.1 }}
        >
          <p className="story-price">
            <PriceTag value={price} size="lg" />
          </p>
          <p className="story-tagline">Signature fragrance · Hand-finished in Grasse</p>
        </motion.div>
      </section>

      <section className="story-panel">
        <motion.div
          ref={ref3}
          className="story-panel-content story-panel-content--narrow"
          variants={fadeUp(reducedMotion)}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
          transition={{ ...transition, delay: 0.08 }}
        >
          <p className="story-description">{fullDescription}</p>
        </motion.div>
      </section>

      <section className="story-panel">
        <motion.div
          ref={ref4}
          className="story-panel-content story-panel-content--notes"
          variants={fadeUp(reducedMotion)}
          initial="hidden"
          animate={inView4 ? "visible" : "hidden"}
          transition={{ ...transition, delay: 0.05 }}
        >
          <h2 className="story-notes-heading">Fragrance notes</h2>
          <div className="story-notes-grid">
            <div className="story-note-group">
              <span className="story-note-label">Top</span>
              <span className="story-note-list">{fragranceNotes.top.join(", ")}</span>
            </div>
            <div className="story-note-group">
              <span className="story-note-label">Heart</span>
              <span className="story-note-list">{fragranceNotes.heart.join(", ")}</span>
            </div>
            <div className="story-note-group">
              <span className="story-note-label">Base</span>
              <span className="story-note-list">{fragranceNotes.base.join(", ")}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="story-panel story-panel--last">
        <motion.div
          ref={ref5}
          className="story-panel-content story-panel-content--cta"
          variants={fadeUp(reducedMotion)}
          initial="hidden"
          animate={inView5 ? "visible" : "hidden"}
          transition={transition}
        >
          {wishlist && (
            <Button
              variant="primary"
              size="md"
              onClick={() => wishlist.toggle(id)}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {inWishlist ? "♥ In wishlist" : "♥ Add to wishlist"}
            </Button>
          )}
          <Link to={`/products/${id}`} className="story-link-details">
            View full details
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
