export async function GET(req: Request) {
  // get header
  const accessToken = req.headers.get("authorization");

  const baseUrl = process.env.PUBLIC_BASE_API_URL;
  const response = await fetch(`${baseUrl}/auth/user/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return Response.json(data);
}
