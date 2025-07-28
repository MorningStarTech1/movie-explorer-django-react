import { useMoviesContext } from "../context/MovieContext";

export const Pagination = () => {
  const { page, setPage, pageSize, moviesData } = useMoviesContext();

  const hasNext = !!moviesData?.next;
  const hasPrev = !!moviesData?.previous;

  if (!moviesData) return null;

  return (
    <div className="w-full flex justify-between items-center mt-4">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={!hasPrev}
        className={`px-4 py-2 rounded ${
          hasPrev
            ? "bg-gray-200 hover:bg-gray-300"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Previous
      </button>

      <span className="text-gray-600">
        {" "}
        Page {page} of {Math.ceil(moviesData.count / pageSize)}
      </span>

      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 rounded ${
          hasNext
            ? "bg-gray-200 hover:bg-gray-300"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};
