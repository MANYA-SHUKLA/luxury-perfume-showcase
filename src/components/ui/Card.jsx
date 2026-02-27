import "./Card.css";

export default function Card({
  variant = "elevated",
  padding = "md",
  as: Component = "div",
  className = "",
  children,
  ...props
}) {
  const classNames = [
    "ds-card",
    `ds-card--${variant}`,
    `ds-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
}
