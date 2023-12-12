import { auth } from "@/libs/auth";

export default auth(async (req) => {
  // check if jwt of next-auth
  if (req.auth) {
    // console.log("token:", req.auth.expires);
  } else {
    console.log("no token");
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
