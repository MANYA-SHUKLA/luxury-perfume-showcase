import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getProductById } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductDetail from "../components/ProductDetail";
import ProductDetailStory from "../components/ProductDetailStory";
import SimilarProducts from "../components/SimilarProducts";
import DetailSkeleton from "../components/DetailSkeleton";
import ErrorView from "../components/ErrorView";

const DETAIL_LOAD_DELAY_MS = 550;

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  const [viewMode, setViewMode] = useState("details");

  useEffect(() => {
    setIsDetailLoading(true);
    const t = setTimeout(() => setIsDetailLoading(false), DETAIL_LOAD_DELAY_MS);
    return () => clearTimeout(t);
  }, [id]);

  if (!product) {
    return (
      <ErrorView
        title="Product not found"
        message="There is no fragrance with this ID. Please check the link or return to the collection."
      />
    );
  }

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Collection", to: "/products" },
    { label: product.name, to: null },
  ];

  return (
    <>
      <div className="detail-page-breadcrumbs">
        <div className="detail-page-breadcrumbs-inner">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="detail-page-view-toggle" role="tablist" aria-label="View mode">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "details"}
              aria-controls="detail-content"
              id="tab-details"
              className={`detail-page-view-tab ${viewMode === "details" ? "detail-page-view-tab--active" : ""}`}
              onClick={() => setViewMode("details")}
            >
              Details
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "story"}
              aria-controls="story-content"
              id="tab-story"
              className={`detail-page-view-tab ${viewMode === "story" ? "detail-page-view-tab--active" : ""}`}
              onClick={() => setViewMode("story")}
            >
              Story
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isDetailLoading ? (
          <DetailSkeleton key="skeleton" />
        ) : viewMode === "story" ? (
          <motion.div
            key="story"
            id="story-content"
            role="tabpanel"
            aria-labelledby="tab-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProductDetailStory product={product} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            id="detail-content"
            role="tabpanel"
            aria-labelledby="tab-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProductDetail product={product} />
            <SimilarProducts product={product} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
