import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import "./ProductCursor.css";

const PRODUCT_SELECTOR = "[data-cursor=\"product\"]";

export default function ProductCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    const target = e.target?.closest?.(PRODUCT_SELECTOR);
    setVisible(!!target);
  }, []);

  const handleLeave = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion, handleMove, handleLeave]);

  if (reducedMotion) return null;

  return (
    <div
      className={`product-cursor ${visible ? "product-cursor--visible" : ""}`}
      style={{ left: position.x, top: position.y }}
      aria-hidden
    />
  );
}
