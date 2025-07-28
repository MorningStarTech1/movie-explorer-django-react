import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import { MockMovieProvider } from "../tests/utils";

test("updates search term on input", () => {
  render(
    <MockMovieProvider>
      <SearchBar />
    </MockMovieProvider>
  );

  const input = screen.getByPlaceholderText(/search movies/i);
  fireEvent.change(input, { target: { value: "Aladdin" } });

  expect(input).toHaveValue("Aladdin");
});
