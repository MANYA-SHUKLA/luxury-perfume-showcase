import "./Heading.css";

const allowedLevels = [1, 2, 3, 4, 5, 6];

export default function Heading({
  level = 2,
  size = "lg",
  align = "left",
  as: overrideAs,
  id,
  className = "",
  children,
  ...props
}) {
  const safeLevel = allowedLevels.includes(level) ? level : 2;
  const Tag = overrideAs || `h${safeLevel}`;
  const classNames = [
    "ds-heading",
    `ds-heading--${size}`,
    `ds-heading--align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classNames} id={id} {...props}>
      {children}
    </Tag>
  );
}
