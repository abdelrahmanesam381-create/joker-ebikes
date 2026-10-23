import { NextResponse, type NextRequest } from "next/server";
import { models } from "@/data/models";

const known = new Set(models.map((m) => m.slug));

/**
 * Runs before the page renders. Model pages stream (they use Suspense), and once streaming
 * starts the status code is locked at 200, so notFound() inside the page can't send a 404.
 * Checking the slug here, before rendering, gives unknown bikes a real 404 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (!known.has(slug)) {
    // Rewrite to a path no route matches: Next.js serves app/not-found.tsx with status 404,
    // while the address bar keeps the URL the visitor typed.
    return NextResponse.rewrite(new URL("/__unknown-model", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/models/:slug",
};
