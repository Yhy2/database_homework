import { request } from "./http";
export function getBasicReports() {
    return request({
        url: "/reports/basic",
        method: "GET",
    });
}
export function getJoinReports() {
    return request({
        url: "/reports/join",
        method: "GET",
    });
}
export function getAggregateReports() {
    return request({
        url: "/reports/aggregate",
        method: "GET",
    });
}
export function getSoldItemView() {
    return request({
        url: "/views/sold-items",
        method: "GET",
    });
}
export function getUnsoldItemView() {
    return request({
        url: "/views/unsold-items",
        method: "GET",
    });
}
