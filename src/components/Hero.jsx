import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";
import { useMagnetic } from "../hooks/useMagnetic";
import "./Hero.css";

const container = {
  hidden: { opacity: 0 },
  show: (reduced) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.12,
      delayChildren: reduced ? 0 : 0.08,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: (reduced) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const magnetic = useMagnetic({ strength: 6, radius: 80 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className={`hero ${!reducedMotion ? "hero--parallax" : ""}`} ref={heroRef}>
      {!reducedMotion && (
        <>
          <motion.div
            className="hero-bg"
            style={{ y: backgroundY }}
            aria-hidden
          />
          <motion.div
            className="hero-glow"
            style={{ opacity: glowOpacity }}
            aria-hidden
          />
        </>
      )}
      <motion.div
        className="hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
        custom={reducedMotion}
      >
        <motion.h1 className="hero-title" variants={item} custom={reducedMotion}>
          Sillage
        </motion.h1>
        <motion.p className="hero-tagline" variants={item} custom={reducedMotion}>
          Where the scent lingers after you leave.
        </motion.p>
        <motion.div
          variants={item}
          custom={reducedMotion}
          ref={!reducedMotion ? magnetic.ref : undefined}
          style={!reducedMotion ? magnetic.style : undefined}
        >
          <Button to="/products" variant="primary" size="md" className="hero-cta">
            Explore the collection
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
