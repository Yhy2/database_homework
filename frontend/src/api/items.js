import { request } from "./http";
export function listItems() {
    return request({
        url: "/items",
        method: "GET",
    });
}
export function createItem(payload) {
    return request({
        url: "/items",
        method: "POST",
        data: payload,
    });
}
export function updateItemPrice(itemId, price) {
    return request({
        url: `/items/${itemId}/price`,
        method: "PATCH",
        data: { price },
    });
}
export function deleteItem(itemId) {
    return request({
        url: `/items/${itemId}`,
        method: "DELETE",
    });
}
