import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchlistItem } from "@/services/watchlist";

export function useDeleteFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    // Fn that does the actual deletion
    mutationFn: (watchlistItemId: string) =>
      deleteWatchlistItem(watchlistItemId),

    // On success, invalidate the "watchlist" query to refetch updated data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },

    // On error, log the error message
    onError: (error) => {
      console.error("Failed to delete:", error.message);
    },
  });
}
