import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// This config is used by middleware (Edge runtime) — NO Prisma/DB imports allowed here.
export default {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // In middleware, authorize is not called — it only checks the JWT.
            // The actual authorize logic lives in auth.ts
            async authorize() {
                return null
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role as any
                (session.user as any).id = token.id as any
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const userRole = (auth?.user as any)?.role
            const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
            const isPublicRoute = ["/", "/about", "/contact", "/marketplace"].includes(nextUrl.pathname)
            const isAuthRoute = ["/login", "/signup"].includes(nextUrl.pathname)

            if (isApiAuthRoute) return true

            // If logged in and trying to access auth routes, redirect to dashboard
            if (isAuthRoute) {
                if (isLoggedIn) {
                    if (userRole === "ADMIN") return Response.redirect(new URL("/admin", nextUrl))
                    if (userRole === "SUPPLIER") return Response.redirect(new URL("/supplier", nextUrl))
                    if (userRole === "BUYER") return Response.redirect(new URL("/buyer", nextUrl))
                    return Response.redirect(new URL("/", nextUrl))
                }
                return true
            }

            // Route Protection
            if (!isLoggedIn && !isPublicRoute) {
                return Response.redirect(new URL("/login", nextUrl))
            }

            // Role-based route protection
            if (isLoggedIn) {
                if (nextUrl.pathname.startsWith("/admin") && userRole !== "ADMIN") {
                    return Response.redirect(new URL(userRole === "SUPPLIER" ? "/supplier" : "/buyer", nextUrl))
                }
                if (nextUrl.pathname.startsWith("/supplier") && userRole !== "SUPPLIER") {
                    return Response.redirect(new URL(userRole === "ADMIN" ? "/admin" : "/buyer", nextUrl))
                }
                if (nextUrl.pathname.startsWith("/buyer") && userRole !== "BUYER") {
                    return Response.redirect(new URL(userRole === "ADMIN" ? "/admin" : "/supplier", nextUrl))
                }
            }

            return true
        },
    },
} satisfies NextAuthConfig
