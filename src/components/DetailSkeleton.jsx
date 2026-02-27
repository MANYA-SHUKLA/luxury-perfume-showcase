import { motion } from "framer-motion";
import "./DetailSkeleton.css";

export default function DetailSkeleton() {
  return (
    <motion.article
      className="detail-skeleton-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="detail-skeleton-page__inner">
        <div className="detail-skeleton-page__media">
          <div className="detail-skeleton-page__image" />
        </div>
        <div className="detail-skeleton-page__content">
          <div className="detail-skeleton-page__line detail-skeleton-page__line--title" />
          <div className="detail-skeleton-page__line detail-skeleton-page__line--price" />
          <div className="detail-skeleton-page__line detail-skeleton-page__line--desc" />
          <div className="detail-skeleton-page__line detail-skeleton-page__line--desc" />
          <div className="detail-skeleton-page__line detail-skeleton-page__line--desc detail-skeleton-page__line--short" />
          <div className="detail-skeleton-page__block" />
        </div>
      </div>
    </motion.article>
  );
}
