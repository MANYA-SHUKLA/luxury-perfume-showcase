import "./ProductCardSkeleton.css";

export default function ProductCardSkeleton() {
  return (
    <article className="product-card-skeleton">
      <div className="product-card-skeleton__image" />
      <div className="product-card-skeleton__body">
        <div className="product-card-skeleton__line product-card-skeleton__line--title" />
        <div className="product-card-skeleton__line product-card-skeleton__line--desc" />
        <div className="product-card-skeleton__line product-card-skeleton__line--desc product-card-skeleton__line--short" />
        <div className="product-card-skeleton__line product-card-skeleton__line--price" />
      </div>
    </article>
  );
}
