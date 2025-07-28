import { useQuery } from "@tanstack/react-query";
import { useMoviesContext } from "../context/MovieContext";
import { fetchPrincipals } from "../queries/principalQuerues";
import { Principal } from "../types/principal";
import { useState } from "react";

export const MovieDetailsPanel = () => {
  const {
    selectedMovie,
    pageDetail: page,
    setPageDetail: setPage,
  } = useMoviesContext();

  const [pageSize, setPageSize] = useState(10);

  const { data: principals, isLoading: principalsLoading } = useQuery({
    queryKey: ["principals", selectedMovie?.tconst, page, pageSize],
    queryFn: () => fetchPrincipals(selectedMovie!.tconst, page, pageSize),
    enabled: !!selectedMovie,
  });

  if (!selectedMovie) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 italic">
        Select a movie to view details
      </div>
    );
  }

  const getPersonName = (principal: Principal) =>
    principal.person?.name || "Unknown";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        {selectedMovie.year} • {selectedMovie.genre} • {selectedMovie.runtime}{" "}
        mins
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-500 text-xl">⭐</span>
        <span className="text-lg font-semibold">
          {selectedMovie.average_rating
            ? selectedMovie.average_rating.toFixed(1)
            : "N/A"}
        </span>
        {selectedMovie.num_votes !== null && (
          <span className="text-sm text-gray-500">
            ({selectedMovie.num_votes.toLocaleString()} votes)
          </span>
        )}
      </div>

      {principalsLoading ? (
        <div className="text-gray-400 italic">Loading cast...</div>
      ) : (
        <ul className="divide-y">
          {principals?.results?.map((p: Principal) => (
            <li key={p.id} className="py-2">
              <strong>{getPersonName(p)}</strong> – {p.category}
              {p.characters?.length > 0 && (
                <span className="text-gray-500">
                  {" "}
                  as {p.characters.join(", ")}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!principals?.previous}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {Math.ceil(principals?.count / pageSize)}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!principals?.next}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
