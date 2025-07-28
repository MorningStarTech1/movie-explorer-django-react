import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export const fetchMovies = (page: number, pageSize = 10, sortBy: string) =>
  axios
    .get(
      `${BASE_URL}/movies/?page=${page}&page_size=${pageSize}&ordering=${sortBy}`
    )
    .then((res) => res.data);

export const searchMovies = (query: string) =>
  axios
    .get(`${BASE_URL}/search/?q=${query}`)
    .then((res) => res.data);
