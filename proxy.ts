import { NextRequest, NextResponse } from "next/server";

// This file is used as a proxy/middleware to check for authentication on protected routes and redirect to signin page if not authenticated. It also redirects to movies page if user is already authenticated and trying to access signin or signup page.

// List public routes because easier to track
const publicRoutes = ["/", "/signin", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //Skip proxy/middleware for API routes - they pass through backend
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check if request is for protected route -  if no then continue to requested route - if yes then check cookie for authentication
  const isProtectedRoute = !publicRoutes.some(
    (route) => pathname == route || pathname.startsWith(`${route}/`),
  );

  const token = request.cookies.get("jwtAccessToken")?.value;

  // if isProtectedRoute and no token then redirect to login page
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // if token exists and user is trying to access signin or signup page then redirect to /movies page
  if (token && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/movies", request.url));
  }

  return NextResponse.next();
}

// add config matcher to apply middleware to specific routes

/*
 * Match all request paths except:
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 * - public folder files
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
