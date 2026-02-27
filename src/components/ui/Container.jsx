import "./Container.css";

export default function Container({ size = "default", className = "", children, ...props }) {
  const classNames = ["ds-container", `ds-container--${size}`, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
