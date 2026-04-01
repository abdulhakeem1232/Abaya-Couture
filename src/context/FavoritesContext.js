"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const FavoritesContext = createContext();

const FAV_KEY = "abaya_couture_favorites";

function getStoredFavorites() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAV_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFavorites(getStoredFavorites());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  const addToFavorites = useCallback((product) => {
    setFavorites((prev) => {
      if (prev.find((item) => item._id === product._id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromFavorites = useCallback((productId) => {
    setFavorites((prev) => prev.filter((item) => item._id !== productId));
  }, []);

  const isFavorite = useCallback(
    (productId) => favorites.some((item) => item._id === productId),
    [favorites]
  );

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      if (prev.find((item) => item._id === product._id)) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  }, []);

  const favCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite, favCount, loaded }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}
