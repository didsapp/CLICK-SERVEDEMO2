import NextAuth from "next-auth"
import authConfig from "./auth.config"

// Use the lightweight auth config to avoid importing Prisma/better-sqlite3
// which uses Node.js 'fs' module (not available in Edge runtime).
const { auth } = NextAuth(authConfig)

export async function proxy(...args: Parameters<typeof auth>) {
    return auth(...args)
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:mp4|png|jpg|jpeg|svg|webp|gif|ico|woff2?|css|js)$).*)"
    ],
}
