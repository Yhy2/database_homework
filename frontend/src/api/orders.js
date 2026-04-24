import { request } from "./http";
export function listOrders() {
    return request({
        url: "/orders",
        method: "GET",
    });
}
export function purchaseItem(payload) {
    return request({
        url: "/purchase",
        method: "POST",
        data: payload,
    });
}
