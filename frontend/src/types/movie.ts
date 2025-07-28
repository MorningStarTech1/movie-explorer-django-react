export interface IMovieResponse  {
   count: number;
   next: string | null;
   previous: string | null;
   results: Movie[];
}

export interface Movie {
  tconst: string;
  title: string;
  original_title: string;
  year: string;
  runtime: string;
  genre: string;
  title_type: string;
  is_adult: boolean;
  end_year: string | null;
  average_rating: number;
  num_votes: number;
}
