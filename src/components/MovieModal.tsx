import { useEffect } from "react";
import type { Movie } from "../types";
import { getBackdropUrl } from "../data/sampleMovies";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={movie.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          &times;
        </button>
        <img
          className="modal-backdrop-img"
          src={getBackdropUrl(movie.backdrop_path)}
          alt={`${movie.title} backdrop`}
        />
        <h3 className="modal-title">{movie.title}</h3>
        <p className="modal-meta">
          {movie.release_date.slice(0, 4)} - Rating {movie.vote_average.toFixed(1)}
        </p>
        <p className="modal-overview">{movie.overview}</p>
      </div>
    </div>
  );
}