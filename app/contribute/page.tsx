"use client";

// ============================================
// 1. IMPORTS
// ============================================
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Film,
  Upload,
  Calendar,
  Clock,
  Tag,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useCreateMovie } from "@/hooks/useCreateMovie";

// ============================================
// 2. SCHEMA & TYPES - Fixed Zod syntax
// ============================================
const movieFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  overview: z
    .string()
    .min(1, "Overview is required")
    .max(500, "Overview must be 500 characters or less"),
  releaseYear: z.coerce
    .number()
    .int()
    .min(1888, "Year must be 1888 or later")
    .max(
      new Date().getFullYear() + 5,
      `Year cannot be later than ${new Date().getFullYear() + 5}`
    ),
  runtime: z.coerce
    .number()
    .int()
    .min(1, "Runtime must be at least 1 minute")
    .max(400, "Runtime seems too long"),
  posterURL: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

// Explicitly type the form values
type MovieFormValues = {
  title: string;
  overview: string;
  releaseYear: number;
  runtime: number;
  posterURL?: string;
};

// ============================================
// 3. CONSTANTS
// ============================================
const GENRE_SUGGESTIONS = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History",
  "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport",
  "Thriller", "War", "Western",
] as const;

const DEFAULT_POSTER_URL = "https://cdn5.vectorstock.com/i/1000x1000/22/74/movie-poster-template-vector-16752274.jpg";

// ============================================
// 4. MAIN COMPONENT
// ============================================
export default function ContributionPage() {
  const router = useRouter();
  const { mutate: createMovie, isPending } = useCreateMovie();

  const [genres, setGenres] = useState<string[]>([]);
  const [genreInput, setGenreInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [genreError, setGenreError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema) as any, // Type assertion to bypass Zod inference issue
    defaultValues: {
      title: "",
      overview: "",
      posterURL: "",
    },
  });

  const posterURL = watch("posterURL");

  // ============================================
  // 5. GENRE HANDLERS
  // ============================================
  const addGenre = (genre: string) => {
    const trimmedGenre = genre.trim();
    if (trimmedGenre && !genres.includes(trimmedGenre)) {
      setGenres([...genres, trimmedGenre]);
      setGenreError(null);
    }
    setGenreInput("");
  };

  const removeGenre = (genreToRemove: string) => {
    setGenres(genres.filter((g) => g !== genreToRemove));
  };

  const handleGenreKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addGenre(genreInput);
    }
  };

  // ============================================
  // 6. FORM SUBMISSION
  // ============================================
  const onSubmit = (data: MovieFormValues) => {
    setSubmitError(null);

    if (genres.length === 0) {
      setGenreError("Please add at least one genre");
      return;
    }
    setGenreError(null);

    // Ensure all required fields are present
    if (!data.releaseYear || !data.runtime) {
      setSubmitError("Release year and runtime are required");
      return;
    }

    createMovie(
      {
        title: data.title,
        overview: data.overview,
        releaseYear: data.releaseYear,
        runtime: data.runtime,
        posterURL: data.posterURL || DEFAULT_POSTER_URL,
        genres,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          reset();
          setGenres([]);
          setTimeout(() => setShowSuccess(false), 5000);
        },
        onError: (error: Error) => {
          setSubmitError(error.message || "Failed to create movie. Please try again.");
        },
      }
    );
  };

  // ============================================
  // 7. RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/movies">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Film className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Contribute a Movie
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Share your favorite films with the community. All fields are required unless marked otherwise.
          </p>
        </div>

        {showSuccess && (
          <Alert className="mb-6 border-green-500/50 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              Movie successfully added! You can add another or view it in the movies list.
            </AlertDescription>
          </Alert>
        )}

        {submitError && (
          <Alert className="mb-6 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              {submitError}
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg border-border/50">
          <CardHeader className="border-b border-border/50 bg-muted/30 p-6">
            <CardTitle className="text-xl">Movie Details</CardTitle>
            <CardDescription>
              <span className="text-destructive">*</span> indicates required fields
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Title <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="e.g., The Matrix"
                  {...register("title")}
                  className="max-w-2xl"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Overview <span className="text-destructive">*</span>
                </label>
                <Textarea
                  placeholder="A brief summary of the movie's plot..."
                  {...register("overview")}
                  className="max-w-2xl min-h-25"
                />
                <p className="text-sm text-muted-foreground">
                  {watch("overview")?.length || 0}/500 characters
                </p>
                {errors.overview && (
                  <p className="text-sm text-destructive">{errors.overview.message}</p>
                )}
              </div>

              {/* Year & Runtime */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Release Year <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="2024"
                      {...register("releaseYear", { valueAsNumber: true })}
                      className="pl-10"
                    />
                  </div>
                  {errors.releaseYear && (
                    <p className="text-sm text-destructive">{errors.releaseYear.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Runtime (minutes) <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="120"
                      {...register("runtime", { valueAsNumber: true })}
                      className="pl-10"
                    />
                  </div>
                  {errors.runtime && (
                    <p className="text-sm text-destructive">{errors.runtime.message}</p>
                  )}
                </div>
              </div>

              {/* Genres */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Genres <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1 max-w-2xl">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Type a genre and press Enter"
                      value={genreInput}
                      onChange={(e) => setGenreInput(e.target.value)}
                      onKeyDown={handleGenreKeyDown}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addGenre(genreInput)}
                    disabled={!genreInput.trim()}
                  >
                    Add
                  </Button>
                </div>
                {genreError && (
                  <p className="text-sm text-destructive">{genreError}</p>
                )}
                {genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="px-3 py-1.5 gap-2">
                        {genre}
                        <button
                          type="button"
                          onClick={() => removeGenre(genre)}
                          className="hover:text-destructive transition-colors"
                          aria-label={`Remove ${genre}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {GENRE_SUGGESTIONS.filter((g) => !genres.includes(g))
                      .slice(0, 8)
                      .map((genre) => (
                        <Badge
                          key={genre}
                          variant="outline"
                          className="cursor-pointer hover:bg-secondary transition-colors"
                          onClick={() => addGenre(genre)}
                        >
                          {genre}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>

              {/* Poster URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Poster URL <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://example.com/poster.jpg"
                    {...register("posterURL")}
                    className="pl-10 max-w-2xl"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave blank to use a default poster.
                </p>
                {errors.posterURL && (
                  <p className="text-sm text-destructive">{errors.posterURL.message}</p>
                )}
              </div>

              {/* Preview */}
              {posterURL && !errors.posterURL && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Poster Preview</p>
                  <div className="w-32 h-48 bg-muted rounded-lg overflow-hidden border border-border/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={posterURL}
                      alt="Poster preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_POSTER_URL;
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border/50">
                <Button type="submit" disabled={isPending} className="min-w-30">
                  {isPending ? (
                    <>
                      <span className="mr-2">Adding...</span>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Add Movie
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/movies")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 border-border/50 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-base">Tips for contributing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Use the official movie title for better searchability.</p>
            <p>• Keep the overview concise and spoiler-free.</p>
            <p>• If you don&apos;t have a poster URL, leave it blank – we&apos;ll add a default.</p>
            <p>• Add at least one relevant genre to help others discover the movie.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}