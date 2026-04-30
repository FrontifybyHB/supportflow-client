export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api",
  appName: import.meta.env.VITE_APP_NAME ?? "SupportFlow",
} as const;
