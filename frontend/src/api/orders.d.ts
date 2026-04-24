import type { Order, PurchasePayload } from "../types";
export declare function listOrders(): Promise<Order[]>;
export declare function purchaseItem(payload: PurchasePayload): Promise<Order>;
