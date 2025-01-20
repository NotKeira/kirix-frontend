import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { isValid, SessionData } from "./utils/Session";

const sessionCookieName = "userSession";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const sessionCookie = cookies[sessionCookieName];

  const protectedRoutes = ["/profile", "/settings"];

  // PC: Redirect to /login
  if (!protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // VC: Redirect to /login
  if (!sessionCookie) {
    url.pathname = "/authorise";
    return NextResponse.redirect(url);
  }
  const validSession = isValid(sessionCookie as unknown as SessionData);
  if (!validSession) {
    url.pathname = "/authorise";
    return NextResponse.redirect;
  } else {
    return NextResponse.next();
  }
}

// Middleware configuration
export const config = {
  matcher: ["/channels/:path*", "/settings/:path*"],
};
