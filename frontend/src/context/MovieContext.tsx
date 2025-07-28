import { createContext, useContext, useState } from "react";
import { IMovieResponse, Movie } from "../types/movie";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, searchMovies } from "../queries/movieQueries";

interface MovieContextProps {
  moviesData: IMovieResponse | null;
  selectedMovie: Movie | null;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  isMoviesLoading: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageDetail: number;
  setPageDetail: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(1);
  const [pageDetail, setPageDetail] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("title");
  const [pageSize, setPageSize] = useState<number>(10);

  const moviesQuery = useQuery({
    queryKey: ["movies", page, sortBy, pageSize],
    queryFn: () => fetchMovies(page, pageSize, sortBy),
    enabled: !searchTerm,
  });

  const searchQuery = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchMovies(searchTerm),
    enabled: !!searchTerm,
  });

  const queryToUse = searchTerm ? searchQuery : moviesQuery;

  return (
    <MovieContext.Provider
      value={{
        moviesData: queryToUse.data || null,
        selectedMovie,
        setSelectedMovie,
        isMoviesLoading: queryToUse.isLoading,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        page,
        setPage,
        pageDetail,
        setPageDetail,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMoviesContext = () => {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error("useMoviesContext must be used within a MovieProvider");
  return context;
};
