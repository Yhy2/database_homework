import { request } from "./http";
import type { HealthStatus } from "../types";

export function getHealth() {
  return request<HealthStatus>({
    url: "/health",
    method: "GET",
  });
}
