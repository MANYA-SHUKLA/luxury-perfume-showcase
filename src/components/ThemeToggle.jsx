import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="theme-toggle-icon theme-toggle-icon--sun" aria-hidden>
        ☀
      </span>
      <span className="theme-toggle-icon theme-toggle-icon--moon" aria-hidden>
        ☾
      </span>
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" data-dark={isDark} />
      </span>
    </button>
  );
}
