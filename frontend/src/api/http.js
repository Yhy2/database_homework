import axios, { AxiosError } from "axios";
export class ApiRequestError extends Error {
    constructor(message, status, code) {
        super(message);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: status
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: code
        });
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
export async function request(config) {
    try {
        const response = await http.request(config);
        return response.data.data;
    }
    catch (error) {
        if (error instanceof AxiosError) {
            const payload = error.response?.data;
            throw new ApiRequestError(payload?.message || error.message || "请求失败", error.response?.status, payload?.code);
        }
        throw new ApiRequestError("请求失败");
    }
}
