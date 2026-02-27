import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlistContext } from "../context/WishlistContext";
import { PriceTag } from "./ui";
import "./ProductCard.css";

export default function ProductCard({ product, variant = "grid" }) {
  const { id, name, price, shortDescription, image } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const wishlist = useWishlistContext();

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    wishlist?.toggle(id);
  };

  return (
    <article className={`product-card product-card--${variant}`}>
      {wishlist && (
        <button
          type="button"
          className={`product-card-wishlist ${wishlist.isInWishlist(id) ? "product-card-wishlist--active" : ""}`}
          onClick={handleWishlistClick}
          aria-label={wishlist.isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          ♥
        </button>
      )}
      <Link
        to={`/products/${id}`}
        className="product-card-link"
        data-cursor="product"
        onMouseEnter={() => import("../pages/ProductDetailPage")}
      >
        <div className={`product-card-image-wrap ${imageLoaded ? "product-card-image-wrap--loaded" : ""}`}>
          {!imageLoaded && <div className="product-card-skeleton" />}
          <img
            src={image}
            alt={name}
            className="product-card-image"
            loading={variant === "featured" ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="product-card-body">
          <h2 className="product-card-title">{name}</h2>
          <p className="product-card-desc">{shortDescription}</p>
          <PriceTag value={price} size={variant === "featured" ? "lg" : "md"} className="product-card-price" />
          <span className="product-card-cta">View Details</span>
        </div>
      </Link>
    </article>
  );
}
