import axios, { RawAxiosRequestHeaders } from "axios";
import { auth } from "./auth";
import { signOut } from "next-auth/react";

const HttpClient = ({
  baseUrl,
  headers,
  requiredAuth = false,
}: {
  requiredAuth?: boolean;
  baseUrl?: string;
  headers?: RawAxiosRequestHeaders;
}) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl || process.env.BASE_URL || "",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  // add auth token to request header via interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (requiredAuth) {
        const authInfo = await auth();

        if (authInfo) {
          const accessToken = authInfo?.user?.tokenSet?.accessToken;
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // if access token is expired then refresh token via refreshToken() function
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("response statusCode:", response.status);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("Original url:", originalRequest.url);

      // check if AxiosError
      if (axios.isAxiosError(error)) {
        // if refresh token is expired then logout
        if (
          error.response?.status === 401 &&
          originalRequest.url === "/api/v1.0/auth/refresh-token"
        ) {
          await signOut();
          return Promise.reject(error);
        }

        // if access token is expired then refresh token
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== "/api/v1.0/auth/refresh-token"
        ) {
          originalRequest._retry = true;

          const authInfo = await auth();
          const refreshToken = authInfo?.user?.tokenSet?.refreshToken;

          if (refreshToken) {
            const client = axios.create({
              baseURL: process.env.BASE_URL || "http://localhost:3001",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
              },
            });

            const { data } = await client.post("/api/v1.0/auth/refresh-token");

            console.log("refresh token response:", data);

            if (data) {
              //TODO: update access token in auth state

              axiosInstance.defaults.headers.common["Authorization"] =
                `Bearer ${data.data.accessToken}`;

              return axiosInstance(originalRequest);
            }
          } else {
            console.log("refresh token not found");
          }
        }

        console.log("not refresh token");
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default HttpClient;
