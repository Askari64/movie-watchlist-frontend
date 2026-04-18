"use client";

import { useParams } from "next/navigation";
import { useGetMovie } from "@/hooks/useGetMovie";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Film, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params.slug as string;

  const { data, isLoading, error } = useGetMovie(movieId);
  const movie = data?.data || data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="animate-pulse space-y-6 md:space-y-8">
            <div className="h-5 md:h-6 bg-muted rounded w-20 md:w-24" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="aspect-2/3 bg-muted rounded-xl md:rounded-2xl max-w-[250px] md:max-w-none mx-auto md:mx-0" />
              <div className="md:col-span-2 space-y-4 md:space-y-6">
                <div className="h-8 md:h-12 bg-muted rounded w-3/4" />
                <div className="h-5 md:h-6 bg-muted rounded w-1/2 md:w-1/4" />
                <div className="h-24 md:h-32 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Movie Not Found</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            We couldn&apos;t find the movie you&apos;re looking for.
          </p>
          <Button asChild className="mt-4">
            <Link href="/movies">Browse Movies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto max-w-7xl px-4 pt-4 md:pt-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/movies">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Poster Column */}
          <div className="md:col-span-1">
            {/* Mobile: centered, smaller. Desktop: sticky, full size */}
            <div className="md:sticky md:top-24 space-y-4">
              <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl ring-1 ring-border/50 max-w-[250px] md:max-w-none mx-auto md:mx-0">
                <img
                  src={movie.posterURL}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            {/* Title Section */}
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                {movie.title}
              </h1>
              
              {/* Meta Info - Wraps nicely on mobile */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
                <span className="text-base md:text-lg">{movie.releaseYear}</span>
                {movie.runtime && (
                  <>
                    <span className="w-1 h-1 bg-border rounded-full hidden sm:block" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="text-sm md:text-base">{movie.runtime} min</span>
                    </div>
                  </>
                )}
                {movie.genres?.length > 0 && (
                  <>
                    <span className="w-1 h-1 bg-border rounded-full hidden sm:block" />
                    <span className="text-sm md:text-base">{movie.genres[0]}</span>
                  </>
                )}
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {movie.genres.map((genre: string) => (
                  <Badge 
                    key={genre} 
                    variant="secondary" 
                    className="px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-full"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base lg:text-lg max-w-3xl">
                  {movie.overview}
                </p>
              </div>
            )}

            {/* Quick Stats - 2 columns on mobile, 3 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-border/50">
              <div className="space-y-0.5 md:space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 md:gap-1.5">
                  <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  Release Year
                </p>
                <p className="text-sm md:text-base font-medium">{movie.releaseYear}</p>
              </div>
              
              {movie.runtime && (
                <div className="space-y-0.5 md:space-y-1">
                  <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 md:gap-1.5">
                    <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    Runtime
                  </p>
                  <p className="text-sm md:text-base font-medium">{movie.runtime} min</p>
                </div>
              )}
              
              <div className="space-y-0.5 md:space-y-1 col-span-2 md:col-span-1">
                <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 md:gap-1.5">
                  <Film className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  Added
                </p>
                <p className="text-sm md:text-base font-medium">
                  {new Date(movie.createdAt).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-6 md:h-8" />
    </div>
  );
}