import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/config/env";

export const ACCESS_TOKEN_COOKIE = "supportflow_access_token";

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN_COOKIE);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
