import axios from "axios";
import { auth } from "@/libs/auth";

const httpClient = axios.create({
  baseURL: "http://localhost:3001/api/v1.0",
  headers: {
    "Content-Type": "application/json",
  },
});

// add auth token to request header via interceptor
httpClient.interceptors.request.use(async (config) => {
  const authn = await auth();
  const accessToken = authn?.access_token;

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

export { httpClient };
