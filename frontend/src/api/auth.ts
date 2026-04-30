import { request } from "./http";
import type { AuthSession, LoginPayload, RegisterPayload, User } from "../types";

export function login(payload: LoginPayload) {
  return request<AuthSession>({
    url: "/auth/login",
    method: "POST",
    data: payload,
  });
}

export function register(payload: RegisterPayload) {
  return request<AuthSession>({
    url: "/auth/register",
    method: "POST",
    data: payload,
  });
}

export function loginDemoAccount() {
  return request<AuthSession>({
    url: "/auth/demo",
    method: "POST",
  });
}

export function getCurrentUser() {
  return request<User>({
    url: "/auth/me",
    method: "GET",
  });
}
