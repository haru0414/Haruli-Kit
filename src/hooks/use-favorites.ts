"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "haruli-favorites";

export type FavoriteType = "package" | "snippet" | "component";

interface FavoriteItem {
  id: string;
  type: FavoriteType;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (err) {
        console.error("Failed to save favorites:", err);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((id: string, type: FavoriteType) => {
    setFavorites((prev) => {
      // Check if already exists
      if (prev.some((f) => f.id === id && f.type === type)) {
        return prev;
      }
      return [...prev, { id, type, addedAt: Date.now() }];
    });
  }, []);

  const removeFavorite = useCallback((id: string, type: FavoriteType) => {
    setFavorites((prev) => prev.filter((f) => !(f.id === id && f.type === type)));
  }, []);

  const toggleFavorite = useCallback((id: string, type: FavoriteType) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === id && f.type === type);
      if (exists) {
        return prev.filter((f) => !(f.id === id && f.type === type));
      }
      return [...prev, { id, type, addedAt: Date.now() }];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string, type: FavoriteType) => {
      return favorites.some((f) => f.id === id && f.type === type);
    },
    [favorites]
  );

  const getFavoritesByType = useCallback(
    (type: FavoriteType) => {
      return favorites
        .filter((f) => f.type === type)
        .sort((a, b) => b.addedAt - a.addedAt);
    },
    [favorites]
  );

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesByType,
    clearAllFavorites,
    totalCount: favorites.length,
  };
}
