import { useMoviesContext } from "../context/MovieContext";

export const MoviePageSizeSelector = () => {
  const { pageSize, setPageSize } = useMoviesContext();

  return (
    <div className="flex items-center gap-2 mb-4">
      <label htmlFor="pageSize" className="text-sm text-gray-600">
        Cast per page:
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};
