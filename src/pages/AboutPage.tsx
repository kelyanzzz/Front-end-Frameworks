import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="page">
      <h1>About CineGrid</h1>
      <p>
        CineGrid is a movie dashboard built with React, TypeScript and Vite,
        using data from the TMDB API.
      </p>
      <Link to="/">Back to movies</Link>
    </div>
  );
}