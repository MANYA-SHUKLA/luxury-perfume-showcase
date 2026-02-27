import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    quote: "The first time I wore Noir Absolu, someone stopped me in the lobby to ask what I was wearing. I said nothing — and smiled. That’s Sillage.",
    author: "M. Laurent",
    role: "Paris",
  },
  {
    quote: "I’ve tried every rose on the market. Rose de Silence is the one that doesn’t shout. It just stays.",
    author: "E. V.",
    role: "London",
  },
  {
    quote: "Bois Sacré got me through a brutal deadline. One spray at dawn. By evening the room still felt like a chapel. I’m not spiritual — but that scent is.",
    author: "J. K.",
    role: "Berlin",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reducedMotion = useReducedMotion();

  return (
    <section className="testimonials" id="testimonials" ref={ref} aria-labelledby="testimonials-heading">
      <div className="testimonials-inner">
        <motion.h2
          id="testimonials-heading"
          className="testimonials-title"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Words from wearers
        </motion.h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="testimonial-quote">"{t.quote}"</p>
              <footer className="testimonial-footer">
                <cite className="testimonial-author">{t.author}</cite>
                <span className="testimonial-role">{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
