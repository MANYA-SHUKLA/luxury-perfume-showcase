import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./ScrollReveal.css";

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  as: Component = "div",
  margin = "-60px 0px -80px 0px",
  once = true,
  delay = 0,
  duration = 0.5,
  variants = defaultVariants,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const reducedMotion = useReducedMotion();

  const transition = {
    duration: reducedMotion ? 0 : duration,
    ease: [0.4, 0, 0.2, 1],
    delay: reducedMotion ? 0 : delay,
  };

  const visibleVariants = reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : variants;

  return (
    <Component ref={ref} className={`scroll-reveal ${className}`.trim()}>
      <motion.div
        className="scroll-reveal-inner"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={visibleVariants}
        transition={transition}
      >
        {children}
      </motion.div>
    </Component>
  );
}
