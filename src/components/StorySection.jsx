import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./StorySection.css";

export default function StorySection({
  id,
  title,
  children,
  className = "",
  as: Tag = "section",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reducedMotion = useReducedMotion();

  return (
    <Tag id={id} className={`story-section ${className}`.trim()} ref={ref}>
      <div className="story-section-inner">
        <motion.h2
          className="story-section-title"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="story-section-content"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </Tag>
  );
}
