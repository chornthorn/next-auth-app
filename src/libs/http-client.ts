import axios, { RawAxiosRequestHeaders } from "axios";
import { auth } from "./auth";
import { refreshTokenOAuth } from "@/libs/services/auth-service";

const HttpClient = ({
  baseUrl,
  headers,
  requiredAuth = true,
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
  axiosInstance.interceptors.request.use(async (config) => {
    if (requiredAuth) {
      const authInfo = await auth();

      if (authInfo) {
        const accessToken = authInfo?.user?.tokenSet?.accessToken;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  });

  // if access token is expired then refresh token via refreshToken() function
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("response statusCode:", response.status);
      return response;
    },
    async (error) => {
      console.log("error response: ", error.response.data);
      const originalRequest = error.config;
      console.log("Original url:", originalRequest.url);

      // check if AxiosError
      if (axios.isAxiosError(error)) {
        // if access token is expired then refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const authInfo = await auth();
          const refreshToken = authInfo?.user?.tokenSet?.refreshToken;

          console.log("refresh token call");

          if (refreshToken) {
            const response = await refreshTokenOAuth(refreshToken);

            if (response) {
              axiosInstance.defaults.headers.common["Authorization"] =
                `Bearer ${response.access_token}`;
              return axiosInstance(originalRequest);
            }
          } else {
            console.log("refresh token not found");
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default HttpClient;
