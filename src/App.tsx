import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const filtered = SAMPLE_MOVIES.filter((m) =>
    m.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="app">
      <h1>CineGrid</h1>
      <SearchBar
        value={query}
        onChange={setQuery}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <MovieList movies={filtered} />
    </div>
  );
}