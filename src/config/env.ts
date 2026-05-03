export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000",
  appName: import.meta.env.VITE_APP_NAME ?? "SupportFlow",
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",
} as const;
