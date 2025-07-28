import { render, screen } from "@testing-library/react";
import { MovieList } from "../MovieList";
import { MovieContext } from "../../context/MovieContext";
import { IMovieResponse } from "../../types/movie";
import { MockMovieProvider } from "../tests/utils";

test("renders a list of movies", () => {
  const mockMovies: IMovieResponse = {
    results: [
      {
        tconst: "tt0090601",
        title_type: "movie",
        title: "Aladdin",
        original_title: "Superfantagenio",
        is_adult: false,
        year: "1986",
        end_year: null,
        runtime: "95",
        genre: "Adventure,Comedy,Fantasy",
      },

      {
        tconst: "tt0101414",
        title_type: "movie",
        title: "Beauty and the Beast",
        original_title: "Beauty and the Beast",
        is_adult: false,
        year: "1991",
        end_year: null,
        runtime: "84",
        genre: "Animation,Family,Fantasy",
      },
    ],
    count: 2,
    next: null,
    previous: null,
  };

  render(
    <MockMovieProvider overrides={{ moviesData: mockMovies }}>
      <MovieList />
    </MockMovieProvider>
  );

  expect(screen.getByText(/Aladdin/)).toBeInTheDocument();
  expect(screen.getByText(/Beauty and the Beast/)).toBeInTheDocument();
});
