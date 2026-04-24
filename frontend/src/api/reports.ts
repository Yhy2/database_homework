import { request } from "./http";
import type { AggregateReports, BasicReports, Item, JoinReports } from "../types";

export function getBasicReports() {
  return request<BasicReports>({
    url: "/reports/basic",
    method: "GET",
  });
}

export function getJoinReports() {
  return request<JoinReports>({
    url: "/reports/join",
    method: "GET",
  });
}

export function getAggregateReports() {
  return request<AggregateReports>({
    url: "/reports/aggregate",
    method: "GET",
  });
}

export function getSoldItemView() {
  return request<Array<{ item_name: string; buyer_id: string }>>({
    url: "/views/sold-items",
    method: "GET",
  });
}

export function getUnsoldItemView() {
  return request<Array<Omit<Item, "status" | "seller_name">>>({
    url: "/views/unsold-items",
    method: "GET",
  });
}
