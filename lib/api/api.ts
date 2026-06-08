import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  params: {
    sortBy: "created",
    perPage: 12,
    page: 1,
  },
  withCredentials: true,
});
