import { request } from "./http";
import type { User } from "../types";

export function listUsers() {
  return request<User[]>({
    url: "/users",
    method: "GET",
  });
}
