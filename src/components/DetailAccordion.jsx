import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./DetailAccordion.css";

const accordionTransition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

export default function DetailAccordion({ product }) {
  const [openId, setOpenId] = useState("notes");

  const { fragranceNotes, size, longevity, occasion, craftsmanship, careInstructions } = product;

  const sections = [
    {
      id: "notes",
      title: "Fragrance notes",
      content: (
        <div className="detail-accordion-notes">
          <div className="detail-accordion-note-group">
            <span className="detail-accordion-note-label">Top</span>
            <span>{fragranceNotes.top.join(", ")}</span>
          </div>
          <div className="detail-accordion-note-group">
            <span className="detail-accordion-note-label">Heart</span>
            <span>{fragranceNotes.heart.join(", ")}</span>
          </div>
          <div className="detail-accordion-note-group">
            <span className="detail-accordion-note-label">Base</span>
            <span>{fragranceNotes.base.join(", ")}</span>
          </div>
        </div>
      ),
    },
    {
      id: "details",
      title: "Details",
      content: (
        <dl className="detail-accordion-dl">
          <div className="detail-accordion-row">
            <dt>Size</dt>
            <dd>{size}</dd>
          </div>
          <div className="detail-accordion-row">
            <dt>Longevity</dt>
            <dd>{longevity}</dd>
          </div>
          <div className="detail-accordion-row">
            <dt>Occasion</dt>
            <dd>{occasion}</dd>
          </div>
        </dl>
      ),
    },
    ...(craftsmanship
      ? [
          {
            id: "craftsmanship",
            title: "Craftsmanship",
            content: <p className="detail-accordion-p">{craftsmanship}</p>,
          },
        ]
      : []),
    ...(careInstructions
      ? [
          {
            id: "care",
            title: "Care instructions",
            content: <p className="detail-accordion-p">{careInstructions}</p>,
          },
        ]
      : []),
  ];

  return (
    <div className="detail-accordion">
      {sections.map(({ id, title, content }) => {
        const isOpen = openId === id;
        return (
          <div key={id} className="detail-accordion-item">
            <button
              type="button"
              className="detail-accordion-trigger"
              onClick={() => setOpenId((prev) => (prev === id ? null : id))}
              aria-expanded={isOpen}
              aria-controls={`accordion-${id}`}
              id={`accordion-trigger-${id}`}
            >
              <span>{title}</span>
              <span className="detail-accordion-icon" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-${id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${id}`}
                  className="detail-accordion-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={accordionTransition}
                >
                  <div className="detail-accordion-content">{content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
