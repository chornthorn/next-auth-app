import axios from "axios";

const refreshTokenOAuth = async (
  refreshTokenString: string,
): Promise<{ access_token: string; refresh_token: string }> => {
  const url = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
  const data = {
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
  const response = await axios.post(url, data, config);
  return response.data;
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

export { refreshTokenOAuth, refreshTokenApi };
