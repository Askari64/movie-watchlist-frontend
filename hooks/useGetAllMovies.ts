import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/services/movies";

export function useGetAllMovies(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ["movies", page, limit],
    queryFn: () => getMovies(page, limit),
    placeholderData: (previousData) => previousData, // Keeps old data while fetching new page
  });
}