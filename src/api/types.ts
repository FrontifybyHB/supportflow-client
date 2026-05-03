export interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors?: Record<string, string>;
}

export class ApiError extends Error {
  statusCode?: number;
  errors?: Record<string, string>;
  isNetworkError: boolean;

  constructor(message: string, options?: { statusCode?: number; errors?: Record<string, string>; isNetworkError?: boolean }) {
    super(message);
    this.name = "ApiError";
    this.statusCode = options?.statusCode;
    this.errors = options?.errors;
    this.isNetworkError = options?.isNetworkError ?? false;
  }
}

export function unwrapApiData<T>(response: ApiEnvelope<T>): T {
  return response.data;
}
