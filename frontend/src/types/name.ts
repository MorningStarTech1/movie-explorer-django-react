export interface INameResponse  {
   count: number;
   next: string;
   previous: string;
   results: Name[];
}

export interface Name {
  nconst: string;
  name: string;
  birth_year: string | null;
  death_year: string | null;
  primary_professions: string;
  known_for_titles: string;
}