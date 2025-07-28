// src/tests/test-utils.tsx
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieContext } from "../../context/MovieContext";
import { IMovieResponse, Movie } from "../../types/movie";

const defaultMoviesData: IMovieResponse = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};

export const MockMovieProvider = ({
  children,
  overrides = {},
}: {
  children: ReactNode;
  overrides?: Partial<React.ContextType<typeof MovieContext>>;
}) => {
  const queryClient = new QueryClient();

  const defaultContext = {
    moviesData: defaultMoviesData,
    selectedMovie: null as Movie | null,
    setSelectedMovie: () => {},
    isMoviesLoading: false,
    searchTerm: "",
    setSearchTerm: () => {},
    sortBy: "title",
    setSortBy: () => {},
    page: 1,
    setPage: () => {},
    pageDetail: 1,
    setPageDetail: () => {},
    pageSize: 10,
    setPageSize: () => {},
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MovieContext.Provider value={{ ...defaultContext, ...overrides }}>
        {children}
      </MovieContext.Provider>
    </QueryClientProvider>
  );
};
