import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host");  // e.g. ram.ramprasad.site
  const main = "ramprasad.site";

  // If main site → show normally
  if (host === main || host === "www." + main) {
    return NextResponse.next();
  }

  // Extract subdomain
  const sub = host.split(".")[0]; // ram

  // Rewrite → /showprofile/ram
  return NextResponse.rewrite(
    new URL(`/showprofile/${sub}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
