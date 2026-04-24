import type { AggregateReports, BasicReports, Item, JoinReports } from "../types";
export declare function getBasicReports(): Promise<BasicReports>;
export declare function getJoinReports(): Promise<JoinReports>;
export declare function getAggregateReports(): Promise<AggregateReports>;
export declare function getSoldItemView(): Promise<{
    item_name: string;
    buyer_id: string;
}[]>;
export declare function getUnsoldItemView(): Promise<Omit<Item, "status" | "seller_name">[]>;
