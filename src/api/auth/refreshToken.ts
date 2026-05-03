import type { AxiosRequestConfig } from "axios";
import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { AuthSession } from "@/features/auth/types/auth.types";

let refreshTokenPromise: Promise<AuthSession> | null = null;

const silentRefreshConfig = {
  _skipAuthRefresh: true,
  _skipNetworkRetry: true,
  _silentNetworkError: true,
} as AxiosRequestConfig;

export async function refreshToken(): Promise<AuthSession> {
  refreshTokenPromise ??= api
    .post<ApiEnvelope<AuthSession>>("/api/v1/auth/refresh-token", undefined, silentRefreshConfig)
    .then(({ data }) => unwrapApiData(data))
    .finally(() => {
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
}
