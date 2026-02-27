import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "sillage-wishlist";
const SOUND_ENABLED_KEY = "sillage-wishlist-sound";

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

function isWishlistSoundEnabled() {
  try {
    const v = localStorage.getItem(SOUND_ENABLED_KEY);
    return v === null || v === "true";
  } catch {
    return true;
  }
}

function playWishlistAddSound() {
  if (!isWishlistSoundEnabled()) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  } catch {}
}

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState(loadWishlist);

  useEffect(() => {
    saveWishlist(wishlistIds);
  }, [wishlistIds]);

  const toggle = useCallback((id) => {
    setWishlistIds((prev) => {
      const isAdding = !prev.includes(id);
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (isAdding) playWishlistAddSound();
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (id) => wishlistIds.includes(id),
    [wishlistIds]
  );

  return { wishlistIds, toggle, isInWishlist };
}
