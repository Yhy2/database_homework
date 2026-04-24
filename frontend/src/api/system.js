import { request } from "./http";
export function getHealth() {
    return request({
        url: "/health",
        method: "GET",
    });
}
