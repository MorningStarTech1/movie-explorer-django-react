import { useMoviesContext } from "../context/MovieContext";
import { Movie } from "../types/movie";

const LoadingSkeleton = () => (
  <div className="p-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="animate-pulse flex flex-col gap-2 py-3 border-b">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
    <svg
      className="w-12 h-12 mb-3 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M12 4v16m8-8H4" />
    </svg>
    <p className="text-lg font-medium">No movies found</p>
    <p className="text-sm text-gray-400">
      Try adjusting your search or filters
    </p>
  </div>
);

export const MovieList = () => {
  const {
    moviesData,
    selectedMovie,
    setSelectedMovie,
    isMoviesLoading,
    setPageDetail,
  } = useMoviesContext();

  const handleDetailView = (movie: Movie) => {
    setPageDetail(1);
    setSelectedMovie(movie);
  };

  if (isMoviesLoading) {
    return <LoadingSkeleton />;
  }

  if (!moviesData?.results || moviesData.results.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-3">Movies</h2>
      <ul className="divide-y">
        {moviesData.results.map((movie) => (
          <li
            key={movie.tconst}
            onClick={() => handleDetailView(movie)}
            className={`p-3 cursor-pointer rounded 
          ${
            selectedMovie?.tconst === movie.tconst
              ? "bg-blue-100 text-blue-800 font-bold"
              : "hover:bg-gray-100"
          }`}
          >
            <div className="flex justify-between">
              <span>{movie.title}</span>
              <span className="text-sm text-gray-500">{movie.year}</span>
            </div>
            <div className="text-xs text-gray-500">{movie.genre}</div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-yellow-500 text-sm">⭐</span>
              <span className="text-sm font-medium">
                {movie.average_rating ? movie.average_rating.toFixed(1) : "N/A"}
              </span>
              {movie.num_votes !== null && (
                <span className="text-xs text-gray-400">
                  ({movie.num_votes.toLocaleString()} votes)
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
