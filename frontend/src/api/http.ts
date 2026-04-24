import axios, { AxiosError, type AxiosRequestConfig } from "axios";

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

http.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  const demoToken = import.meta.env.VITE_DEMO_ACCESS_TOKEN || "local-demo-token";
  if (demoToken && method && ["post", "patch", "delete"].includes(method)) {
    config.headers = config.headers ?? {};
    config.headers["X-Demo-Token"] = demoToken;
  }
  return config;
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
