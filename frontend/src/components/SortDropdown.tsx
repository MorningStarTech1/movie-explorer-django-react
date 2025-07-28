import { useMoviesContext } from "../context/MovieContext";

const sortOptions = [
  { label: "Title (A-Z)", value: "title" },
  { label: "Year (Newest)", value: "-year" },
  { label: "Runtime (Longest)", value: "-runtime" },
];

export const SortDropdown = () => {
  const { sortBy, setSortBy } = useMoviesContext();

  return (
    <div className="mb-4">
      <label className="text-sm text-gray-600 mr-2">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded p-2"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
