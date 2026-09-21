import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types";

type Theme = "dark" | "light";

interface State {
  favorites: Movie[];
  theme: Theme;
}

type Action =
  | { type: "TOGGLE_FAVOURITE"; movie: Movie }
  | { type: "SET_THEME"; theme: Theme };

interface AppContextValue {
  favorites: Movie[];
  theme: Theme;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  toggleTheme: () => void;
}

const FAV_KEY = "cinegrid_favorites";
const THEME_KEY = "cinegrid_theme";

export const AppContext = createContext<AppContextValue | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const exists = state.favorites.some((m) => m.id === action.movie.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.movie.id)
          : [...state.favorites, action.movie],
      };
    }
    case "SET_THEME":
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

function init(): State {
  let favorites: Movie[] = [];
  let theme: Theme = "dark";
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) favorites = parsed;
    }
    if (localStorage.getItem(THEME_KEY) === "light") theme = "light";
  } catch {
    // ignore corrupted storage
  }
  return { favorites, theme };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  const value: AppContextValue = {
    favorites: state.favorites,
    theme: state.theme,
    toggleFavorite: (movie) => dispatch({ type: "TOGGLE_FAVOURITE", movie }),
    isFavorite: (id) => state.favorites.some((m) => m.id === id),
    toggleTheme: () =>
      dispatch({ type: "SET_THEME", theme: state.theme === "dark" ? "light" : "dark" }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside an AppProvider");
  return ctx;
}

// Same as useAppContext but returns null outside a provider (used by components
// that must also work standalone in the older milestone tests).
export function useOptionalAppContext(): AppContextValue | null {
  return useContext(AppContext);
}