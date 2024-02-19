import { NextRequest, NextResponse } from "next/server";

import { EnumTokens } from "@/types/enums";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    const acccessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

    const req = await fetch("http://localhost:7000/api/users/by-id", {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${acccessToken}`,
        "Content-Type": "application/json",
      }),
      credentials: "include",
    });
    const res = await req.json();

    if (!res.isAdmin) {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  if (path.startsWith("/auth") && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!path.startsWith("/auth") && !refreshToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
