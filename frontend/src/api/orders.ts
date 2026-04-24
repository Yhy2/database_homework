import { request } from "./http";
import type { Order, PurchasePayload } from "../types";

export function listOrders() {
  return request<Order[]>({
    url: "/orders",
    method: "GET",
  });
}

export function purchaseItem(payload: PurchasePayload) {
  return request<Order>({
    url: "/purchase",
    method: "POST",
    data: payload,
  });
}
