import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import { getAuthToken } from "../auth/session";

interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

const http = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export function attachAuthToken(config: AxiosRequestConfig) {
  const method = config.method?.toLowerCase();
  const authToken = getAuthToken();
  if (authToken && method && ["get", "post", "patch", "delete"].includes(method)) {
    config.headers = { ...(config.headers ?? {}) };
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}

http.interceptors.request.use((config) => {
  return attachAuthToken(config);
});

export async function request<T>(config: AxiosRequestConfig) {
  try {
    const response = await http.request<ApiEnvelope<T>>(config);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const payload = error.response?.data as Partial<ApiEnvelope<unknown>> | undefined;
      throw new ApiRequestError(
        payload?.message || error.message || "请求失败",
        error.response?.status,
        payload?.code,
      );
    }

    throw new ApiRequestError("请求失败");
  }
}
