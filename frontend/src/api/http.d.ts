import { type AxiosRequestConfig } from "axios";
export declare class ApiRequestError extends Error {
    readonly status?: number | undefined;
    readonly code?: number | undefined;
    constructor(message: string, status?: number | undefined, code?: number | undefined);
}
export declare function request<T>(config: AxiosRequestConfig): Promise<T>;
