import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/services/movies";

export function useGetMovie(movieId: string) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !!movieId, // Only run if movieId exists
  });
}