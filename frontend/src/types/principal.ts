export interface IPrincipalResponse {
   count: number;
   next: string;
   previous: string;
   results: Principal[];
}

export interface Principal {
  id: number;
  category: string;
  characters: string[];
  tconst: string;
  nconst: string;
  person?: {
    nconst: string;
    name: string;
    birth_year: string | null;
    death_year: string | null;
    primary_professions: string;
    known_for_titles: string;
  }
}