import axios from "axios";

const refreshTokenOAuth = async (
  refreshTokenString: string,
): Promise<{ access_token: string; refresh_token: string }> => {
  const baseUrl = process.env.KEYCLOAK_ISSUER;
  const path = "/protocol/openid-connect/token";
  const dataBody = {
    grant_type: "refresh_token",
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    refresh_token: refreshTokenString,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
  };
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const client = axios.create({ baseURL: baseUrl, headers: config.headers });
  const { data } = await client.post(path, dataBody);
  console.log("refresh token response: ", data);

  return data;
};

const refreshTokenApi = async (refreshTokenString: string) => {
  const client = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshTokenString}`,
    },
  });
  const { data } = await client.post("/api/v1.0/auth/refresh-token");

  return data;
};

const keycloakSessionLogout = async () => {
  try {
    await fetch("api/auth/logout", { method: "GET" });
  } catch (error) {
    console.log(error);
  }
};

export { refreshTokenOAuth, refreshTokenApi, keycloakSessionLogout };
