"use client";

import { useParams } from "next/navigation";
import { useGetMovie } from "@/hooks/useGetMovie";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Film } from "lucide-react";
import AddToWatchlist from "@/components/add-to-watchlist";
import Link from "next/link";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params.slug as string; 
  
  const { data, isLoading, error } = useGetMovie(movieId);
  const movie = data?.data || data; // Adjust based on your API response shape

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto" />
          <div className="h-64 bg-muted rounded max-w-2xl mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The movie you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
        </p>
        <Button asChild>
          <Link href="/movies">Back to Movies</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/movies">← Back to Movies</Link>
      </Button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1 relative">
          <Card className="overflow-hidden">
            <img
              src={movie.posterURL}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </Card>
          
          {/* Watchlist Button */}
          <div className="mt-4">
            <AddToWatchlist movieId={movie.id} />
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Title & Year */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {movie.title}
              <span className="text-muted-foreground text-2xl ml-3">
                ({movie.releaseYear})
              </span>
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4">
            {movie.runtime && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{movie.runtime} min</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{movie.releaseYear}</span>
            </div>
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Film className="h-4 w-4" />
                <span>{movie.genres.join(", ")}</span>
              </div>
            )}
          </div>

          {/* Genres as Badges */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: string) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          )}

          {/* Overview */}
          {movie.overview && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Added by</p>
              <p className="font-medium">User #{movie.createdBy?.slice(0, 8) || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Added on</p>
              <p className="font-medium">
                {new Date(movie.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}