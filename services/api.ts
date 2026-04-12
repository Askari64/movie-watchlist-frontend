const API_BASE = "/api"  // Uses Next.js rewrites

export async function api(endpoint: string, options?: RequestInit) {
  // Step 1: Build the full URL
  const url = `${API_BASE}${endpoint}`
  // Example: endpoint = "/movies?page=1" -> url = "/api/movies?page=1"
try {
  
  // Step 2: Make the fetch call with default settings
  const response = await fetch(url, {
    ...options,              // Spread any custom options passed in
    credentials: "include",  // ALWAYS send cookies (JWT token)
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,   // Merge any custom headers
    },
  })

  // Check content type to avoid parsing non-JSON responses
  const contentType = response.headers.get("Content-Type")

  if (!contentType || !contentType.includes("application/json")) {
    //Response not JSON - throw generic error with status text
    throw new Error(`Server Error (${response.status}). Server might be offline. Please try again later.`)
  }
  // Step 3: Parse the JSON response
  const data = await response.json()

  // Step 4: If response is not OK, throw error with message from backend
  if (!response.ok) {
    // Use backend's error message if available, otherwise generic
    throw new Error(data.error || data.message || "Request failed")
  }

  // Step 5: Return the parsed data
  return data
} catch (error) {
  // Handle Network errors or JSON parsing errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    throw new Error("Cannot connect to server. Please check if backend is running.")
  }

  // Re-throw other errors (including those we threw above) so it dont get swallowed here
  throw error
}
}