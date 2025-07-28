import { MovieDetailsPanel } from "./MovieDetailsPanel";
import { MovieList } from "./MovieList";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { MoviePageSizeSelector } from "./SizeSelectro";
import { SortDropdown } from "./SortDropdown";

export const MovieExplorer = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-wrap items-center justify-between bg-white p-4 rounded shadow">
        <div className="flex flex-1 gap-4">
          <SearchBar />
          <SortDropdown />
        </div>
        <MoviePageSizeSelector />
      </div>

      <div className="col-span-7">
        <div className="bg-white rounded shadow p-4 h-[80vh] overflow-y-auto">
          <MovieList />
        </div>
      </div>

      <div className="col-span-5">
        <div className="bg-white rounded shadow p-4 sticky top-4 h-[80vh] overflow-y-auto">
          <MovieDetailsPanel />
        </div>
      </div>

      <div className="col-span-12 flex justify-center mt-4">
        <Pagination />
      </div>
    </div>
  );
};
