import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, i) => (
          <li key={item.to != null ? item.to : `crumb-${i}`} className="breadcrumbs-item">
            {i > 0 && <span className="breadcrumbs-sep" aria-hidden>/</span>}
            {item.to ? (
              <Link to={item.to} className="breadcrumbs-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumbs-current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
