/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist } from "@/services/watchlist";

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ movieId, status }: { movieId: string; status: string }) =>
      addToWatchlist(movieId, status as any),
    onSuccess: () => {
      // Invalidate watchlist cache so it refetches if displayed elsewhere
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (error) => {
      console.error("Failed to add:", error.message);
    },
  });
}