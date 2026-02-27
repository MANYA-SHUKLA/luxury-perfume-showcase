import "./Badge.css";

export default function Badge({ variant = "default", className = "", children, ...props }) {
  const classNames = ["ds-badge", `ds-badge--${variant}`, className].filter(Boolean).join(" ");

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}
