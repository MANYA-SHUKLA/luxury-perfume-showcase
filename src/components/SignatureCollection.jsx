import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { getFeaturedProductIds, getProductById } from "../data/products";
import "./SignatureCollection.css";

export default function SignatureCollection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reducedMotion = useReducedMotion();
  const ids = getFeaturedProductIds();
  const items = ids.map((id) => getProductById(id)).filter(Boolean);

  return (
    <section className="signature-collection" id="signature" ref={ref}>
      <div className="signature-collection-inner">
        <motion.h2
          className="signature-collection-title"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Signature collection
        </motion.h2>
        <motion.p
          className="signature-collection-desc"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        >
          Four fragrances that define the house — bold, luminous, meditative, and warm.
        </motion.p>
        <motion.div
          className="signature-collection-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
            >
              <Link to={`/products/${product.id}`} className="signature-collection-item" data-cursor="product">
                <span className="signature-collection-name">{product.name}</span>
                <span className="signature-collection-arrow">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <Link to="/products" className="signature-collection-cta">
            View full collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
