/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function Movies() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [totalPages, setTotalPages] = useState(1)

  // ✅ read from URL
  const page = Number(searchParams.get("page") || 1)
  const limit = 10

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        })

        const res = await fetch(
          `http://localhost:5000/movies?${params.toString()}`,
          {
            credentials: "include",
          }
        )

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch")
        }

        setMovies(data.data)
        setTotalPages(data.meta.totalPages)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  // ✅ update URL (this is the key)
  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(newPage))

    router.push(`/movies?${params.toString()}`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Movies</h1>

      {movies.map((movie: any) => (
        <div key={movie.id}>{movie.title}</div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}