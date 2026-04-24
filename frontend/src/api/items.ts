import { request } from "./http";
import type { CreateItemPayload, Item } from "../types";

export function listItems() {
  return request<Item[]>({
    url: "/items",
    method: "GET",
  });
}

export function createItem(payload: CreateItemPayload) {
  return request<Item>({
    url: "/items",
    method: "POST",
    data: payload,
  });
}

export function updateItemPrice(itemId: string, price: number) {
  return request<Item>({
    url: `/items/${itemId}/price`,
    method: "PATCH",
    data: { price },
  });
}

export function deleteItem(itemId: string) {
  return request<{ item_id: string }>({
    url: `/items/${itemId}`,
    method: "DELETE",
  });
}
