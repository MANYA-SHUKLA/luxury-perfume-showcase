import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./LogoIntroSplash.css";

const SPLASH_STORAGE_KEY = "sillage-splash-seen";
const DURATION_MS = 2200;
const REDUCED_DURATION_MS = 600;

export default function LogoIntroSplash() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(SPLASH_STORAGE_KEY);
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;
    const duration = reducedMotion ? REDUCED_DURATION_MS : DURATION_MS;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
      } catch {}
      setVisible(false);
    }, duration);
    return () => clearTimeout(t);
  }, [visible, reducedMotion]);

  if (!visible) return null;

  const duration = reducedMotion ? 0.15 : 0.5;
  const delay = reducedMotion ? 0 : 0.2;

  return (
    <AnimatePresence>
      <motion.div
        className="logo-intro-splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden="true"
      >
        <div className="logo-intro-splash-inner">
          <motion.p
            className="logo-intro-splash-brand"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
          >
            Sillage
          </motion.p>
          <motion.p
            className="logo-intro-splash-tagline"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: delay + (reducedMotion ? 0 : 0.15), ease: [0.4, 0, 0.2, 1] }}
          >
            Where the scent lingers after you leave.
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
