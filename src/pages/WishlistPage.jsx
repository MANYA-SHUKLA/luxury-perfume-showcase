import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlistContext } from "../context/WishlistContext";
import { getProductById } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./WishlistPage.css";

export default function WishlistPage() {
  const { wishlistIds } = useWishlistContext();
  const wishlistProducts = wishlistIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-page-inner">
          <motion.div
            className="wishlist-empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="wishlist-empty-title">Your wishlist is empty</h1>
            <p className="wishlist-empty-desc">
              Save fragrances you love with the heart icon — they’ll appear here.
            </p>
            <Link to="/products" className="wishlist-empty-cta">
              Explore the collection
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-page-inner">
        <header className="wishlist-page-header">
          <h1 className="wishlist-page-title">Wishlist</h1>
          <p className="wishlist-page-desc">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1 ? "fragrance" : "fragrances"} saved
          </p>
        </header>
        <motion.div
          className="wishlist-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {wishlistProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <ProductCard product={product} variant="grid" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
