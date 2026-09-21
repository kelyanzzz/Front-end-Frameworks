import { useState } from "react";
import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";
import { useOptionalAppContext } from "../context/AppContext";

interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const ctx = useOptionalAppContext();
  const [localFavorite, setLocalFavorite] = useState(false);

  const isFavorite = ctx ? ctx.isFavorite(movie.id) : localFavorite;
  const toggleFavorite = () => {
    if (ctx) ctx.toggleFavorite(movie);
    else setLocalFavorite((v) => !v);
  };

  return (
    <article
      className="movie-card"
      tabIndex={0}
      aria-label={movie.title}
      onClick={() => onSelect?.(movie)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect?.(movie);
      }}
    >
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="poster-img"
          loading="lazy"
        />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>
            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          <span className="quick-view-hint">View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{movie.release_date.slice(0, 4)}</span>
          <span>{movie.vote_count} votes</span>
        </div>
        <div className="movie-genres-tags">
          {getGenreNames(movie.genre_ids).map((name) => (
            <span key={name} className="genre-tag">{name}</span>
          ))}
        </div>
      </div>
    </article>
  );
}