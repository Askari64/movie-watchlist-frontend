import { api } from "./api";

//TYPESCRIPT INTERFACE
export type watchlistStatus = "PLANNED" | "WATCHING" | "COMPLETED" | "DROPPED";

export type WatchlistItem = {
  movieId: string;
  userId: string;
  status: watchlistStatus;
  rating: number | null;
  notes: string | null;
};

/**
 * GET ALL WATCHLIST ITEMS FOR LOGGED-IN USER
 *
 * No need to pass userId - backend gets it from the JWT cookie
 * @return Array of watchlist items with populated movie details
 */
export async function getAllWatchlistItems() {
  return api("/watchlist");
}

/**
 * ADD MOVIE TO WATCHLIST
 *
 * @param movieId - ID of the movie to add
 * @param status - Initial status (e.g., "PLANNED")
 * @param rating - Optional initial rating 1-10
 * @param notes - Optional initial notes
 * @return The created watchlist item
 */
export async function addToWatchlist(
  movieId: string,
  status: watchlistStatus,
  rating?: number,
  notes?: string,
) {
  return api("/watchlist", {
    method: "POST",
    body: JSON.stringify({ movieId, status, rating, notes }),
  });
}

/**
 * UPDATE WATCHLIST ITEM (status, rating, notes)
 *
 * @param watchlistItemId - The ID of the watchlist item (not movieId!)
 * @param data - Partial data to update (status, rating, notes)
 * @returns Updated watchlist item
 */
export async function updateWatchlistItem(
  watchlistItemId: string,
  data: Partial<Pick<WatchlistItem, "status" | "rating" | "notes">>,
) {
  return api(`/watchlist/${watchlistItemId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE WATCHLIST ITEM
 * 
 * @param watchlistItemId - The ID of the watchlist item to delete (not movieId!)
 * @returns Success message or deleted item details
 */
export async function deleteWatchlistItem(watchlistItemId: string) {
  return api(`/watchlist/${watchlistItemId}`, {
    method: "DELETE",
  });
}
