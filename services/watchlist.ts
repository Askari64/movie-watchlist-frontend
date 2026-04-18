import { api } from "./api";

//TYPESCRIPT INTERFACE
export type watchlistStatus = "PLANNED" | "WATCHING" | "COMPLETED" | "DROPPED";

export type WatchlistItem = {
  id: string;
  movieId: string;
  userId: string;
  status: watchlistStatus;
  createdAt: string;
  updatedAt: string;
};

export type WatchlistResponse = {
  status: string;
  data: WatchlistItem[];
};

/**
 * GET ALL WATCHLIST ITEMS FOR LOGGED-IN USER
 *
 * No need to pass userId - backend gets it from the JWT cookie
 * @return Array of watchlist items with populated movie details
 */
export async function getAllWatchlistItems(): Promise<WatchlistResponse> {
  return api("/watchlist");
}

/**
 * ADD MOVIE TO WATCHLIST
 *
 * @param movieId - ID of the movie to add
 * @param status - Initial status (e.g., "PLANNED")
 * @return The created watchlist item
 */
export async function addToWatchlist(
  movieId: string,
  status: watchlistStatus,
): Promise<{ status: string; data: WatchlistItem }> {
  return api("/watchlist", {
    method: "POST",
    body: JSON.stringify({ movieId, status }),
  });
}

/**
 * UPDATE WATCHLIST ITEM status
 *
 * @param watchlistItemId - The ID of the watchlist item (not movieId!)
 * @param data - Partial data to update (status, rating, notes)
 * @returns Updated watchlist item
 */
export async function updateWatchlistItem(
  watchlistItemId: string,
  data: Partial<Pick<WatchlistItem, "status">>,
): Promise<{ status: string; data: { watchlistItem: WatchlistItem } }> {
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
export async function deleteWatchlistItem(
  watchlistItemId: string,
): Promise<{ status: string; message: string }> {
  return api(`/watchlist/${watchlistItemId}`, {
    method: "DELETE",
  });
}
