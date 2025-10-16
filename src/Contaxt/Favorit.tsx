// context/FavoritesContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { NewsArticle } from "../interfaces";

interface FavoritesContextType {
  favorites: NewsArticle[];
  addFavorite: (article: NewsArticle) => void;
  removeFavorite: (article: NewsArticle) => void;
  isFavorite: (article: NewsArticle) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (article: NewsArticle) => {
    if (!favorites.find((a) => a.url === article.url)) {
      setFavorites([...favorites, article]);
    }
  };

  const removeFavorite = (article: NewsArticle) => {
    setFavorites(favorites.filter((a) => a.url !== article.url));
  };

  const isFavorite = (article: NewsArticle) => {
    return favorites.some((a) => a.url === article.url);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
