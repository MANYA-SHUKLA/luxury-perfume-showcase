import { motion } from "framer-motion";
import ProductCardSkeleton from "./ProductCardSkeleton";
import "./ProductGridSkeleton.css";

const CARD_COUNT = 8;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function ProductGridSkeleton() {
  return (
    <motion.div
      className="product-grid-skeleton"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Array.from({ length: CARD_COUNT }, (_, i) => (
        <motion.div key={i} variants={item}>
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
}
