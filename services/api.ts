const API_BASE = "/api"  // Uses Next.js rewrites

export async function api(endpoint: string, options?: RequestInit) {
  // Step 1: Build the full URL
  const url = `${API_BASE}${endpoint}`
  // Example: endpoint = "/movies?page=1" -> url = "/api/movies?page=1"

  // Step 2: Make the fetch call with default settings
  const response = await fetch(url, {
    ...options,              // Spread any custom options passed in
    credentials: "include",  // ALWAYS send cookies (JWT token)
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,   // Merge any custom headers
    },
  })

  // Step 3: Parse the JSON response
  const data = await response.json()

  // Step 4: If response is not OK, throw error with message from backend
  if (!response.ok) {
    // Use backend's error message if available, otherwise generic
    throw new Error(data.error || data.message || "Request failed")
  }

  // Step 5: Return the parsed data
  return data
}