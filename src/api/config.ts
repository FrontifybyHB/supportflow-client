import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { env } from "@/config/env";
import { publishApiNetworkError } from "./errorEvents";
import { ApiError } from "./types";

type RetryableRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
  _networkRetry?: boolean;
  _skipAuthRefresh?: boolean;
  _skipNetworkRetry?: boolean;
  _silentNetworkError?: boolean;
};

let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

export function getAccessToken() {
  return accessToken;
}

const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

function getErrorMessage(error: AxiosError<ApiErrorResponse>) {
  if (!error.response) return "Unable to reach the server. Please check that the backend is running and CORS is configured.";
  return error.response.data?.message || error.message || "Something went wrong. Please try again.";
}

type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string>;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (import.meta.env.DEV) {
    console.info("[api]", config.method?.toUpperCase(), config.url);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (import.meta.env.DEV) {
      console.error("[api:error]", error);
    }

    const method = originalRequest?.method?.toLowerCase();
    const isSafeToRetry = method === "get";
    const isAuthRequest = String(originalRequest?.url ?? "").includes("/api/v1/auth/");

    if (
      !error.response &&
      originalRequest &&
      isSafeToRetry &&
      !originalRequest._networkRetry &&
      !originalRequest._skipNetworkRetry
    ) {
      originalRequest._networkRetry = true;
      try {
        return await api(originalRequest);
      } catch {
        if (!originalRequest._silentNetworkError) {
          publishApiNetworkError({
            title: "Network error",
            message: "The frontend could not reach the backend API. Confirm the backend is running at the configured API URL.",
            retry: () => api(originalRequest),
          });
        }
      }
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest._skipAuthRefresh &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/api/v1/auth/refresh-token", undefined, {
          _skipAuthRefresh: true,
          _skipNetworkRetry: true,
          _silentNetworkError: true,
        } as RetryableRequestConfig);
        const refreshedToken = data?.data?.accessToken;

        if (refreshedToken) {
          setAccessToken(refreshedToken);
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
          return api(originalRequest);
        }
      } catch {
        clearAccessToken();
        window.location.assign("/login");
      }
    }

    if (error.response?.status === 401) {
      clearAccessToken();
      if (!originalRequest?._silentNetworkError) {
        toast.error("Your session expired. Please sign in again.");
      }
      if (!isAuthRequest) window.location.assign("/login");
    } else if (error.response?.status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (!error.response && !originalRequest?._silentNetworkError) {
      toast.error("Network error. Please check your API server.");
    }

    throw new ApiError(getErrorMessage(error), {
      statusCode: error.response?.status,
      errors: error.response?.data?.errors,
      isNetworkError: !error.response,
    });
  },
);

export default api;
