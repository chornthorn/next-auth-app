import axios from "axios";

export default async function refreshToken(refreshTokenString: string) {
  const client = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshTokenString}`,
    },
  });
  const { data } = await client.post("/api/v1.0/auth/refresh-token");

  return data;
}
