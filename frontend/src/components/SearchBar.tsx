import { useEffect, useState } from "react";
import { useMoviesContext } from "../context/MovieContext";

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, setPage } = useMoviesContext();
  const [localValue, setLocalValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localValue);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [localValue, setSearchTerm]);

  return (
    <div className="flex gap-2 mb-4 min-w-80">
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search movies..."
        className="flex-grow border rounded p-2"
      />
    </div>
  );
};
