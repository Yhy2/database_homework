import { request } from "./http";
export function listUsers() {
    return request({
        url: "/users",
        method: "GET",
    });
}
