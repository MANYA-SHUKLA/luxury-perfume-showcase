import "./PriceTag.css";

export default function PriceTag({
  value,
  currency = "€",
  size = "md",
  className = "",
  ...props
}) {
  const classNames = ["ds-price", `ds-price--${size}`, className].filter(Boolean).join(" ");
  const formatted = typeof value === "number" ? value.toLocaleString("en-US") : value;

  return (
    <span className={classNames} {...props}>
      <span className="ds-price-currency" aria-hidden>
        {currency}
      </span>
      <span className="ds-price-value">{formatted}</span>
    </span>
  );
}
