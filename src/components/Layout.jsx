import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useWishlistContext } from "../context/WishlistContext";
import { Badge } from "./ui";
import ScrollToTop from "./ScrollToTop";
import ScrollProgress from "./ScrollProgress";
import NavigationBar from "./NavigationBar";
import ProductCursor from "./ProductCursor";
import ThemeToggle from "./ThemeToggle";
import "./Layout.css";

export default function Layout() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 0.3;
  const wishlist = useWishlistContext();
  const wishlistCount = wishlist?.wishlistIds?.length ?? 0;

  return (
    <>
      <ScrollProgress />
      <NavigationBar />
      <ProductCursor />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="layout-header">
        <div className="layout-header-inner">
          <Link to="/" className="layout-logo">
            Sillage
          </Link>
          <nav className="layout-nav">
            <ThemeToggle />
            <Link to="/">Home</Link>
            <Link to="/products">Collection</Link>
            <Link to="/wishlist" className="layout-nav-wishlist">
              Wishlist
              {wishlistCount > 0 && (
                <Badge variant="default" className="layout-nav-wishlist-badge" aria-label={`${wishlistCount} items`}>
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content" className="layout-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <ScrollToTop />
      <footer className="layout-footer">
        <div className="layout-footer-inner">
          <span className="layout-footer-brand">Sillage</span>
          <span className="layout-footer-copy">Luxury perfumery. Frontend showcase — no backend.</span>
          <span className="layout-footer-credit">Made with love by Manya Shukla © 2026</span>
          <a className="layout-footer-wp" href="https://wa.me/918005586588" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp 8005586588">
            WhatsApp: 8005586588
          </a>
        </div>
      </footer>
    </>
  );
}
