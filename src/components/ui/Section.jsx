import { forwardRef } from "react";
import "./Section.css";

const Section = forwardRef(function Section(
  { variant = "default", padding = "lg", id, className = "", children, ...props },
  ref
) {
  const classNames = [
    "ds-section",
    `ds-section--${variant}`,
    `ds-section--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={ref} className={classNames} id={id} {...props}>
      {children}
    </section>
  );
});

export default Section;
