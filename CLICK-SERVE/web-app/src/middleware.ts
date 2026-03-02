import NextAuth from "next-auth"
import authConfig from "./auth.config"

// Use the lightweight auth config to avoid importing Prisma/better-sqlite3
// which uses Node.js 'fs' module (not available in Edge runtime).
export default NextAuth(authConfig).auth

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
