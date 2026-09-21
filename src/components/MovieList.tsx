import type { Movie } from "../types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onSelect?: (movie: Movie) => void;
}

export default function MovieList({ movies, onSelect }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="empty-state">No movies found.</p>;
  }
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  );
}