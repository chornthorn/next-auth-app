import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const baseUrl = process.env.KEYCLOAK_ISSUER;
  const path = "/protocol/openid-connect/token";

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const res = await fetch(baseUrl + path, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.KEYCLOAK_CLIENT_ID || "",
      refresh_token: body.refresh_token || "",
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET || "",
    }),
    headers: config.headers,
  });
  const data = await res.json();

  return Response.json({ data });
}
