import { api } from "./api"

// TYPESCRIPT INTERFACE
export type Movie = {
  id: string
  title: string
  overview: string | null
  releaseYear: number
  genres: string[]
  runtime: number | null
  posterURL: string
  createdBy: string
  createdAt: string
}

/**
 * FETCH ALL MOVIES (with pagination)
 * 
 * @param page - Current page number (default: 1)
 * @param limit - Items per page (default: 20)
 * @returns Promise with movies data and pagination meta
 */
export async function getMovies(page: number = 1, limit: number = 20) {
  // Build query string
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  
  // Call the base wrapper
  // endpoint becomes: "/movies?page=1&limit=10"
  return api(`/movies?${params.toString()}`)
}

/**
 * FETCH A SINGLE MOVIE BY ID
 * 
 * @param movieId - The ID of the movie to fetch
 * @returns Promise with single movie data
 */
export async function getMovieById(movieId: string) {
  return api(`/movies/${movieId}`)
}

/**
 * CREATE A NEW MOVIE
 * 
 * @param movieData - Object with title, releaseYear, etc.
 * @returns Promise with created movie
 */
export async function createMovie(movieData: {
  title: string
  overview?: string
  releaseYear: number
  genres?: string[]
  runtime?: number
  posterURL?: string
}) {
  return api("/movies/add", {
    method: "POST",
    body: JSON.stringify(movieData),
  })
}

/**
 * UPDATE AN EXISTING MOVIE
 * 
 * @param movieId - The ID of the movie to update
 * @param movieData - Fields to update
 * @returns Promise with updated movie
 */
export async function updateMovie(
  movieId: string,
  movieData: Partial<{
    title: string
    overview: string
    releaseYear: number
    genres: string[]
    runtime: number
    posterURL: string
  }>
) {
  return api(`/movies/${movieId}`, {
    method: "PATCH",
    body: JSON.stringify(movieData),
  })
}

/**
 * DELETE A MOVIE
 * 
 * @param movieId - The ID of the movie to delete
 * @returns Promise with success message
 */
export async function deleteMovie(movieId: string) {
  return api(`/movies/${movieId}`, {
    method: "DELETE",
  })
}