/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWatchlistItem } from "@/services/watchlist";

export function useUpdateWatchlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ watchlistItemId, status }: { watchlistItemId: string; status: string }) =>
      updateWatchlistItem(watchlistItemId, { status: status as any }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (error) => {
      console.error("Failed to update:", error.message);
    },
  });
}