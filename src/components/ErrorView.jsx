import { Button } from "./ui";
import "./ErrorView.css";

export default function ErrorView({ title = "Page not found", message, showHome = true }) {
  return (
    <section className="error-view" aria-labelledby="error-view-title">
      <div className="error-view-inner">
        <h1 id="error-view-title" className="error-view-title">{title}</h1>
        <p className="error-view-message">
          {message ?? "The page or product you’re looking for doesn’t exist or has been moved."}
        </p>
        {showHome && (
          <Button to="/" variant="primary" size="md" className="error-view-link">
            Return home
          </Button>
        )}
      </div>
    </section>
  );
}
