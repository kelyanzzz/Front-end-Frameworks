import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useMovies } from "../hooks/useMovies";
import { useTheme } from "../hooks/useTheme";
import type { Movie } from "../types";

export default function HomePage() {
  const { movies, loading, error } = useMovies();
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Movie | null>(null);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <h1>Popular Movies</h1>
      <SearchBar query={query} onChange={setQuery} onToggleTheme={toggleTheme} />
      {loading && <p className="status-message">Loading movies...</p>}
      {error && (
        <p className="status-message error" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && <MovieList movies={filtered} onSelect={setSelected} />}
      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </>
  );
}