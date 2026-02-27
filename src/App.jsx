import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import LogoIntroSplash from "./components/LogoIntroSplash";
import ErrorView from "./components/ErrorView";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));

function PageFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-label="Loading">
      <span className="route-fallback-spinner" aria-hidden />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LogoIntroSplash />
      <ThemeProvider>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageFallback />}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route
              path="products"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ProductListing />
                </Suspense>
              }
            />
            <Route
              path="products/:id"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ProductDetailPage />
                </Suspense>
              }
            />
            <Route
              path="wishlist"
              element={
                <Suspense fallback={<PageFallback />}>
                  <WishlistPage />
                </Suspense>
              }
            />
            <Route path="*" element={<ErrorView />} />
          </Route>
        </Routes>
      </WishlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
