import type { Movie } from "../types";

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(signal?: AbortSignal): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, {
    signal,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to load movies (${res.status} ${res.statusText})`);
  }
  const data = await res.json();
  return data.results as Movie[];
}