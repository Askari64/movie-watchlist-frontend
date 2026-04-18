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
              movieId={movie.id}
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



      /*
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <p className="font-medium">Watchlist Item ID: {item.id}</p>
              <p className="font-medium">Movie ID: {item.movieId}</p>
              <p className="text-sm text-muted-foreground">Title: {item.movie.title}</p>
              <p className="text-sm text-muted-foreground">Overview: {item.movie.overview}</p>
              <img src={item.movie.posterURL} alt={item.movie.title} className="w-full h-auto mb-2" />
              <p className="text-sm text-muted-foreground">Release Date: {item.movie.releaseYear}</p>
              <p className="text-sm text-muted-foreground">Status: {item.status}</p>
              <p className="text-xs">Added: {new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
         */