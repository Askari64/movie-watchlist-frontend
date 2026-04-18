/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardImage } from "@/components/cardImage";
import { Button } from "@/components/ui/button";
import { getMovies, type Movie } from "@/services/movies";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Film, AlertCircle } from "lucide-react";

export default function Movies() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const page = Number(searchParams.get("page") || 1);
  const limit = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMovies(page, limit);
        setMovies(data.data);
        setTotalPages(data.meta.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/movies?${params.toString()}`);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          {/* Header Skeleton */}
          <div className="animate-pulse space-y-3 mb-8">
            <div className="h-8 md:h-10 bg-muted rounded w-32 md:w-40" />
            <div className="h-4 md:h-5 bg-muted rounded w-56 md:w-64" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-xl overflow-hidden border border-border/50">
                  {/* Poster Skeleton */}
                  <div className="aspect-video bg-muted" />
                  {/* Content Skeleton */}
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-9 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-10 pt-6 border-t border-border/50">
            <div className="flex items-center justify-center gap-2">
              <div className="h-9 w-20 bg-muted rounded-md" />
              <div className="h-9 w-9 bg-muted rounded-md" />
              <div className="h-9 w-9 bg-muted rounded-md" />
              <div className="h-9 w-9 bg-muted rounded-md" />
              <div className="h-9 w-20 bg-muted rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Failed to Load Movies</h1>
          <p className="text-muted-foreground">
            {error || "We couldn't fetch the movies. Please try again."}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Film className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">No Movies Found</h1>
          <p className="text-muted-foreground">
            There are no movies in the collection yet.
          </p>
          <Button asChild className="mt-4">
            <Link href="/movies/add">Add a Movie</Link>
          </Button>
        </div>
      </div>
    );
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Film className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Movies
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Browse and discover your next favorite film from our collection.
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {movies.map((movie) => (
            <CardImage
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              imageUrl={movie.posterURL}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 md:mt-12 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-1 md:gap-2">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {pageNumbers.map((pageNum, index) =>
                  pageNum === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-muted-foreground"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(pageNum as number)}
                      className="min-w-[36px]"
                    >
                      {pageNum}
                    </Button>
                  ),
                )}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="gap-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Page Info - Mobile Only */}
            <p className="text-center text-xs text-muted-foreground mt-3 sm:hidden">
              Page {page} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
