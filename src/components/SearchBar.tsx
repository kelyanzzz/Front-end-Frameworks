interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onToggleTheme?: () => void;
}

export default function SearchBar({ value, onChange, onToggleTheme }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="icon-btn" aria-label="Show favourites">&hearts;</button>
      <button className="icon-btn" aria-label="Toggle theme" onClick={onToggleTheme}>&#9680;</button>
    </div>
  );
}