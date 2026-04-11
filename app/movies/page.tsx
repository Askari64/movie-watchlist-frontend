/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardImage } from "@/components/cardImage";

export default function Movies() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const page = Number(searchParams.get("page") || 1);
  const limit = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        const res = await fetch(
          `http://localhost:5000/movies?${params.toString()}`,
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch");
        }

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

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-muted-foreground">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* === PAGE HEADER === */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
        <p className="text-muted-foreground mt-1">
          Browse our collection of films.
        </p>
      </section>

      {/* === MOVIE GRID === */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: any) => (
            <CardImage
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              imageUrl={movie.posterURL}
            />
          ))}
        </div>
      </section>

      {/* === PAGINATION === */}
      {totalPages > 1 && (
        <section className="pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
