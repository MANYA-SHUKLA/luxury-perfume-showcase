import { useEffect } from "react";
import ProductGrid from "../components/ProductGrid";

const SCROLL_KEY = "sillage-listing-scroll";

export default function ProductListing() {
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      const y = parseInt(saved, 10);
      sessionStorage.removeItem(SCROLL_KEY);
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "auto" }));
    }
  }, []);

  useEffect(() => {
    return () => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  }, []);

  return (
    <div className="listing-page">
      <header className="listing-page-header">
        <h1 className="listing-page-title">The collection</h1>
        <p className="listing-page-desc">
          Eight fragrances. One house. No compromise.
        </p>
      </header>
      <ProductGrid />
    </div>
  );
}
