import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export const fetchPrincipals = (tconst: string, page = 1, pageSize = 10) =>
  axios.get(`${BASE_URL}/principals/?tconst=${tconst}&page=${page}&page_size=${pageSize}`).then((res) => res.data);