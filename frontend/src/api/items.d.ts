import type { CreateItemPayload, Item } from "../types";
export declare function listItems(): Promise<Item[]>;
export declare function createItem(payload: CreateItemPayload): Promise<Item>;
export declare function updateItemPrice(itemId: string, price: number): Promise<Item>;
export declare function deleteItem(itemId: string): Promise<{
    item_id: string;
}>;
