import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 420);
    return () => clearTimeout(t);
  }, [location.key]);

  return (
    <div
      className={`navigation-bar ${visible ? "navigation-bar--visible" : ""}`}
      role="progressbar"
      aria-hidden="true"
    />
  );
}
