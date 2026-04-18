import { useQuery } from "@tanstack/react-query";
import { getAllWatchlistItems } from "@/services/watchlist";

export function useGetFromWatchlist() {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: getAllWatchlistItems,
  });
}