import { createContext, useContext } from "react";
import { useWishlist } from "../hooks/useWishlist";

const WishlistCtx = createContext(null);

export function WishlistProvider({ children }) {
  const wishlist = useWishlist();
  return (
    <WishlistCtx.Provider value={wishlist}>
      {children}
    </WishlistCtx.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistCtx);
}
