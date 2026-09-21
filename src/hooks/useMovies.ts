import { useEffect, useState } from "react";
import type { Movie } from "../types";
import { fetchPopularMovies } from "../services/movieService";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchPopularMovies(controller.signal)
      .then((data) => setMovies(data))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { movies, loading, error };
}