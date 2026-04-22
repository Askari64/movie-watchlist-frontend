import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovie } from "@/services/movies";

export function useCreateMovie() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (movieData: {
      title: string;
      overview: string;
      releaseYear: number;
      genres: string[];
      runtime: number;
      posterURL: string;
    }) => createMovie(movieData),
    
    onSuccess: () => {
      // Invalidate ALL movie queries (list and details)
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    
    onError: (error) => {
      console.error("Failed to create movie:", error.message);
    },
  });
}