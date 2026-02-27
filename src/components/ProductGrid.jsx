import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";
import { useDebounce } from "../hooks/useDebounce";
import "./Listing.css";
import { products, categories, occasionFilters } from "../data/products";

const GRID_LOAD_DELAY_MS = 700;

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

const PARAM_CATEGORY = "category";
const PARAM_SORT = "sort";
const PARAM_Q = "q";
const PARAM_OCCASION = "occasion";
const PARAM_PAGE = "page";
const ITEMS_PER_PAGE = 6;

function matchSearch(product, query) {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  return (
    product.name.toLowerCase().includes(q) ||
    product.shortDescription.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q) ||
    (product.occasion && product.occasion.toLowerCase().includes(q))
  );
}

function readParams(searchParams) {
  const pageRaw = searchParams.get(PARAM_PAGE);
  const page = pageRaw ? Math.max(1, parseInt(pageRaw, 10) || 1) : 1;
  return {
    categoryId: searchParams.get(PARAM_CATEGORY) || "all",
    sort: searchParams.get(PARAM_SORT) || "default",
    q: searchParams.get(PARAM_Q) || "",
    occasionId: searchParams.get(PARAM_OCCASION) || "all",
    page,
  };
}

function matchOccasion(product, occasionId) {
  if (!occasionId || occasionId === "all") return true;
  return product.occasions && product.occasions.includes(occasionId);
}

export default function ProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryId, sort, q: qFromUrl, occasionId, page: pageFromUrl } = readParams(searchParams);
  const [searchInput, setSearchInput] = useState(qFromUrl);
  const searchDebounced = useDebounce(searchInput, 300);
  const skipUrlSyncRef = useRef(false);
  const [isGridLoading, setIsGridLoading] = useState(true);

  useEffect(() => {
    setSearchInput(qFromUrl);
    skipUrlSyncRef.current = true;
  }, [qFromUrl]);

  useEffect(() => {
    const t = setTimeout(() => setIsGridLoading(false), GRID_LOAD_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (skipUrlSyncRef.current) {
      skipUrlSyncRef.current = false;
      return;
    }
    if (searchDebounced !== qFromUrl) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (searchDebounced) next.set(PARAM_Q, searchDebounced);
        else next.delete(PARAM_Q);
        next.delete(PARAM_PAGE);
        return next;
      }, { replace: true });
    }
  }, [searchDebounced]);

  const updateParams = (updates) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (key === PARAM_Q) {
          if (value) next.set(PARAM_Q, value);
          else next.delete(PARAM_Q);
        } else if (key === PARAM_CATEGORY) {
          if (value && value !== "all") next.set(PARAM_CATEGORY, value);
          else next.delete(PARAM_CATEGORY);
        } else if (key === PARAM_SORT) {
          if (value && value !== "default") next.set(PARAM_SORT, value);
          else next.delete(PARAM_SORT);
        } else if (key === PARAM_OCCASION) {
          if (value && value !== "all") next.set(PARAM_OCCASION, value);
          else next.delete(PARAM_OCCASION);
        } else if (key === PARAM_PAGE) {
          if (value && value !== "1") next.set(PARAM_PAGE, String(value));
          else next.delete(PARAM_PAGE);
        }
      });
      return next;
    }, { replace: true });
  };

  const filteredAndSorted = useMemo(() => {
    let list =
      categoryId === "all"
        ? [...products]
        : products.filter((p) => p.category === categoryId);
    list = list.filter((p) => matchOccasion(p, occasionId));
    list = list.filter((p) => matchSearch(p, searchDebounced));

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [categoryId, occasionId, sort, searchDebounced]);

  const totalItems = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const page = Math.min(Math.max(1, pageFromUrl), totalPages);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedList = filteredAndSorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (pageFromUrl > totalPages && totalPages > 0) {
      updateParams({ [PARAM_PAGE]: 1 });
    }
  }, [totalPages, pageFromUrl]);

  const goToPage = (newPage) => {
    updateParams({ [PARAM_PAGE]: newPage });
    document.getElementById("listing-grid-top")?.scrollIntoView({ behavior: "smooth" });
  };

  const showPagination = totalItems > ITEMS_PER_PAGE;
  const rangeStart = totalItems === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  return (
    <section className="listing" id="listing-grid-top">
      <div className="listing-inner">
        <div className="listing-toolbar">
          <div className="listing-search-wrap">
            <label htmlFor="search" className="listing-label">
              Search
            </label>
            <input
              id="search"
              type="search"
              placeholder="Name, description, category, occasion…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="listing-search"
              aria-label="Search products"
              autoComplete="off"
            />
          </div>
          <div className="listing-filters">
            <label htmlFor="category" className="listing-label">
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => updateParams({ [PARAM_CATEGORY]: e.target.value, [PARAM_PAGE]: 1 })}
              className="listing-select"
              aria-label="Filter by category"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="listing-filters">
            <label htmlFor="occasion" className="listing-label">
              Occasion
            </label>
            <select
              id="occasion"
              value={occasionId}
              onChange={(e) => updateParams({ [PARAM_OCCASION]: e.target.value, [PARAM_PAGE]: 1 })}
              className="listing-select"
              aria-label="Filter by occasion"
            >
              {occasionFilters.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="listing-sort">
            <label htmlFor="sort" className="listing-label">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => updateParams({ [PARAM_SORT]: e.target.value, [PARAM_PAGE]: 1 })}
              className="listing-select"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="listing-count" aria-live="polite">
          {totalItems === 0
            ? "No products match your search or filters."
            : showPagination
              ? `Showing ${rangeStart}–${rangeEnd} of ${totalItems}`
              : `${totalItems} ${totalItems === 1 ? "fragrance" : "fragrances"}`}
        </p>
        <AnimatePresence mode="wait">
          {isGridLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProductGridSkeleton />
            </motion.div>
          ) : filteredAndSorted.length === 0 ? (
            <motion.p
              key="empty"
              className="listing-empty"
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Try a different term or category.
            </motion.p>
          ) : (
            <>
              <motion.div
                key="grid"
                className="product-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {paginatedList.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                  >
                    <ProductCard product={product} variant="grid" />
                  </motion.div>
                ))}
              </motion.div>
              {showPagination && (
                <nav
                  className="listing-pagination"
                  aria-label="Product list pagination"
                >
                  <button
                    type="button"
                    className="listing-pagination-btn"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <div className="listing-pagination-pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`listing-pagination-btn listing-pagination-btn--num ${p === page ? "listing-pagination-btn--current" : ""}`}
                        onClick={() => goToPage(p)}
                        aria-label={`Page ${p}`}
                        aria-current={p === page ? "page" : undefined}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="listing-pagination-btn"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
