import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({
  variant = "primary",
  size = "md",
  as: Component = "button",
  href,
  to,
  children,
  className = "",
  onClick,
  ...props
}) {
  const [ripple, setRipple] = useState(null);
  const innerRef = useRef(null);

  const classNames = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleRipple = useCallback(
    (e) => {
      const el = innerRef.current;
      if (!el || (variant !== "primary" && variant !== "secondary")) {
        onClick?.(e);
        return;
      }
      const rect = el.getBoundingClientRect();
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => setRipple(null), 500);
      onClick?.(e);
    },
    [variant, onClick]
  );

  const inner = (
    <span ref={innerRef} className="ds-button-inner">
      {ripple && (
        <span
          className="ds-button-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      )}
      {children}
    </span>
  );

  if (to != null && typeof to === "string" && !to.startsWith("http")) {
    return (
      <Link to={to} className={classNames} onClick={handleRipple} {...props}>
        {inner}
      </Link>
    );
  }

  if (href || (to && typeof to === "string")) {
    return (
      <a href={href ?? to} className={classNames} onClick={handleRipple} {...props}>
        {inner}
      </a>
    );
  }

  const safeProps = { ...props, onClick: handleRipple };
  if (Component === "button") safeProps.type = safeProps.type ?? "button";
  return (
    <Component className={classNames} {...safeProps}>
      {inner}
    </Component>
  );
}
