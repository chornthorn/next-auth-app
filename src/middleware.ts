import { auth } from "@/libs/auth";
import { NextResponse } from "next/server";
import { Session } from "next-auth";

export default auth(async (req) => {
  // If the user is not authenticated, redirect to log in
  if (!req.auth) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  // Extract roles from the session
  const session: Session = req.auth;
  const roles = session.user.roles;

  // If the user is trying to access the admin page but is not an admin, redirect to unauthorized
  if (req.nextUrl.pathname === "/admin" && !roles.includes("admin")) {
    return NextResponse.rewrite(new URL("/unauthorized", req.url));
  }

  // If the user is authenticated and authorized, proceed to the requested page
  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
