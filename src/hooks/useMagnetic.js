import { useRef, useState, useCallback, useEffect } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useMagnetic({ strength = 8, radius = 64 } = {}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = prefersReducedMotion();

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius) {
        setOffset({ x: 0, y: 0 });
        return;
      }
      const t = 1 - dist / radius;
      const pull = t * t * strength;
      setOffset({
        x: (dx / dist) * pull,
        y: (dy / dist) * pull,
      });
    },
    [radius, strength]
  );

  const handleLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onEnter = () => {
      window.addEventListener("mousemove", handleMove);
      document.documentElement.addEventListener("mouseleave", handleLeave);
    };
    const onLeave = () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      handleLeave();
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, handleMove, handleLeave]);

  const style =
    reduced
      ? undefined
      : {
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        };

  return { ref, style };
}
