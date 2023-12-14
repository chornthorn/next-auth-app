import { auth } from "@/libs/auth";

export async function GET(req: Request) {
  const authn = await auth();
  const idToken = authn?.id_token;

  if (idToken) {
    const baseUrl = process.env.KEYCLOAK_ISSUER;
    const nextUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const hintId = `?id_token_hint=${idToken}`;
    const query = `&post_logout_redirect_uri=${encodeURIComponent(nextUrl)}`;
    const uri = `${baseUrl}/protocol/openid-connect/logout${hintId}${query}`;

    try {
      const response = await fetch(uri, { method: "GET" });
      await response.json();
    } catch (error) {
      return Response.json({ message: "Error logging out" });
    }
  }

  return Response.json({ message: "Logged out" });
}
