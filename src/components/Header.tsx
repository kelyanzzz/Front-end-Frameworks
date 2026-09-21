import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <span className="logo">CineGrid</span>
      <nav className="app-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}