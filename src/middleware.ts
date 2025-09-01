import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Admin routes protection
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url))
      }
      
      if (!["ADMIN", "AUTHOR", "EDITOR"].includes(token.role as string)) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    // API routes protection
    if (pathname.startsWith("/api/articles") && req.method !== "GET") {
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      
      if (!["ADMIN", "AUTHOR", "EDITOR"].includes(token.role as string)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    if (pathname.startsWith("/api/users") || pathname.startsWith("/api/admin")) {
      if (!token || token.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/articles/") ||
          pathname.startsWith("/auth/") ||
          pathname.startsWith("/api/auth/") ||
          pathname.startsWith("/_next/") ||
          pathname.startsWith("/static/") ||
          pathname === "/favicon.ico"
        ) {
          return true
        }

        // Require auth for protected routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/articles/:path*",
    "/api/users/:path*",
    "/api/admin/:path*",
    "/profile/:path*"
  ]
}
