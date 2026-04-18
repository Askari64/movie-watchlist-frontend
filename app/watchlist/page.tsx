"use client";

import { useGetFromWatchlist } from "@/hooks/useGetFromWatchlist";
import { WatchlistCard } from "@/components/watchlistCard";

export default function Watchlist() {
  const { data, isLoading, error } = useGetFromWatchlist();
  const watchlistItems = data?.data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
        <p>Loading watchlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  console.log("Watchlist items:", watchlistItems);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Watchlist</h1>

      {watchlistItems.length === 0 ? (
        <p className="text-muted-foreground">Your watchlist is empty.</p>
      ) : (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlistItems.map((movie) => (
              <WatchlistCard
                key={movie.id}
                watchlistItemId={movie.id}
                movieId={movie.movie.id}
                title={movie.movie.title}
                imageUrl={movie.movie.posterURL}
                status={movie.status}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
